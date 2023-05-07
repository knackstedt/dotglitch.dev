import * as RAPIER from '@dimforge/rapier3d-compat';

export type MeshPhysicsResult = {
    collider: RAPIER.Collider,
    body: RAPIER.RigidBody
}

export class RapierPhysics {

    async init() {
        await RAPIER.init();
        this.world = new RAPIER.World(this.gravity);
    }

    // Docs: https://rapier.rs/docs/api/javascript/JavaScript3D/

    gravity = { x: 0.0, y: - 9.81, z: 0.0 };

    private _world: RAPIER.World;
    private set world(w: RAPIER.World) {
        this._world = w;
    }
    public get world() { return this._world};


    meshes = [];
    meshMap = new WeakMap();

    addMesh(mesh: THREE.InstancedMesh, mass?: number, restitution?: number): MeshPhysicsResult[]
    addMesh(mesh: THREE.Mesh, mass?: number, restitution?: number): MeshPhysicsResult
    addMesh(mesh: THREE.Mesh, mass = 0, restitution = 0): MeshPhysicsResult | MeshPhysicsResult[] {
        const shape = this.getCollider(mesh.geometry);

        if (shape !== null) {

            shape.setMass(mass);
            shape.setRestitution(restitution);

            if (!mesh.isMesh && mesh['isInstancedMesh'])
                return this.handleInstancedMesh(mesh as THREE.InstancedMesh, mass, shape);
            else if (mesh.isMesh)
                return this.handleMesh(mesh, mass, shape);
        }
        return null;
    }

    setMeshPosition(mesh: THREE.Mesh | THREE.InstancedMesh, position: THREE.Vector3, index = 0) {
        const vector = { x: 0, y: 0, z: 0 };
        if (mesh['isInstancedMesh']) {
            const bodies = this.meshMap.get(mesh);
            const body = bodies[index];

            body.setAngvel(vector);
            body.setLinvel(vector);
            body.setTranslation(position);
        }
        else if (mesh.isMesh) {
            const body = this.meshMap.get(mesh);

            body.setAngvel(vector);
            body.setLinvel(vector);
            body.setTranslation(position);
        }
    }

    physicsStep(delta: number) {
        this.world.timestep = delta;
        this.world.step();

        for (let i = 0, l = this.meshes.length; i < l; i++) {
            const mesh = this.meshes[i];

            if (mesh.isInstancedMesh) {
                const array = mesh.instanceMatrix.array;
                const bodies = this.meshMap.get(mesh);

                for (let j = 0; j < bodies.length; j++) {
                    const body = bodies[j];

                    const position = body.translation();
                    const quaternion = body.rotation();

                    this.compose(position, quaternion, array, j * 16);
                }

                mesh.instanceMatrix.needsUpdate = true;
                mesh.computeBoundingSphere();
            }
            else if (mesh.isMesh) {

                const body = this.meshMap.get(mesh);

                mesh.position.copy(body.translation());
                mesh.quaternion.copy(body.rotation());
            }
        }
    }

    compose(position: THREE.Vector3, quaternion: THREE.Quaternion, array: number[], index: number) {
        const x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
        const x2 = x + x, y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;

        array[index + 0] = (1 - (yy + zz));
        array[index + 1] = (xy + wz);
        array[index + 2] = (xz - wy);
        array[index + 3] = 0;

        array[index + 4] = (xy - wz);
        array[index + 5] = (1 - (xx + zz));
        array[index + 6] = (yz + wx);
        array[index + 7] = 0;

        array[index + 8] = (xz + wy);
        array[index + 9] = (yz - wx);
        array[index + 10] = (1 - (xx + yy));
        array[index + 11] = 0;

        array[index + 12] = position.x;
        array[index + 13] = position.y;
        array[index + 14] = position.z;
        array[index + 15] = 1;
    }

    private handleMesh(mesh: THREE.Mesh | THREE.InstancedMesh, mass: number, shape: RAPIER.ColliderDesc) {
        const position = mesh.position;
        const quaternion = mesh.quaternion;

        const desc = mass > 0 ? RAPIER.RigidBodyDesc.dynamic() : RAPIER.RigidBodyDesc.fixed();
        desc.setTranslation(position.x, position.y, position.z);
        desc.setRotation(quaternion);

        const body = this.world.createRigidBody(desc);
        const collider = this.world.createCollider(shape, body);

        if (mass > 0) {
            this.meshes.push(mesh);
            this.meshMap.set(mesh, body);
        }

        return {
            collider,
            body
        };
    }

    private handleInstancedMesh(mesh: THREE.InstancedMesh, mass: number, shape: RAPIER.ColliderDesc) {
        const array = mesh.instanceMatrix.array;

        const bodies = [];
        const colliders: MeshPhysicsResult[] = [];

        for (let i = 0; i < mesh.count; i++) {
            const index = i * 16;

            const desc = mass > 0 ? RAPIER.RigidBodyDesc.dynamic() : RAPIER.RigidBodyDesc.fixed();
            desc.setTranslation(array[index + 12], array[index + 13], array[index + 14]);

            const body = this.world.createRigidBody(desc);
            const collider = this.world.createCollider(shape, body);
            colliders.push({
                collider,
                body
            });

            bodies.push(body);
        }

        if (mass > 0) {
            this.meshes.push(mesh);
            this.meshMap.set(mesh, bodies);
        }

        return colliders;
    }

    getCollider(geometry) {
        const parameters = geometry.parameters;

        // TODO change type to is*

        if (geometry.type === 'BoxGeometry') {
            const sx = parameters.width !== undefined ? parameters.width / 2 : 0.5;
            const sy = parameters.height !== undefined ? parameters.height / 2 : 0.5;
            const sz = parameters.depth !== undefined ? parameters.depth / 2 : 0.5;

            return RAPIER.ColliderDesc.cuboid(sx, sy, sz);
        }
        else if (geometry.type === 'SphereGeometry' || geometry.type === 'IcosahedronGeometry') {
            const radius = parameters.radius !== undefined ? parameters.radius : 1;

            return RAPIER.ColliderDesc.ball(radius);
        }

        return null;
    }
}
