import { Component, ElementRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js';
import { Refractor } from 'three/examples/jsm/objects/Refractor.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import { ConvexObjectBreaker } from 'three/examples/jsm/misc/ConvexObjectBreaker.js';

declare let Ammo;



@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    imports: [

    ],
    standalone: true
})
export class GameComponent {

    @ViewChild("canvas") canvasRef: ElementRef;
    get canvas() { return this.canvasRef.nativeElement as HTMLCanvasElement }
    get el() { return this.viewContainer.element.nativeElement as HTMLElement }

    camera: THREE.PerspectiveCamera;
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    renderer: THREE.WebGLRenderer;
    mouseCoords: THREE.Vector2;
    raycaster: THREE.Raycaster;

    composer: EffectComposer;

    params = { pixelSize: 6, normalEdgeStrength: .3, depthEdgeStrength: .4, pixelAlignedPanning: true }
    crystalMesh: THREE.Mesh;
    refractor: Refractor;

    playerMesh: THREE.Mesh;
    pvx = 0;
    pvy = 0;
    pvz = 0;

    readonly maxSpeedX = 1;
    readonly maxSpeedY = 1;
    readonly maxSpeedZ = 1;

    collisionConfiguration;
    dispatcher;
    broadphase;
    solver;
    physicsWorld;
    convexBreaker = new ConvexObjectBreaker();
    transformAux1;
    tempBtVec3_1;

    // Rigid bodies include all movable objects
    rigidBodies = [];


    constructor(private viewContainer: ViewContainerRef) { }

    async ngAfterViewInit() {

        // THREE.ColorManagement.enabled = false; // TODO: Consider enabling color management.

        // Install Ammo (wasm)
        await Ammo().then(a => Ammo = a);

        // Start physics engine
        this.initPhysics();

        // Start ThreeJS engine
        await this.init();

        // Create Scene
        this.initScene();

        this.onWindowResize();
        this.animate();

        this.attachEvents();
        this.createObjects()
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationFrameRequest);

        window.removeEventListener("keydown", this.onKeyDown.bind(this));
        window.removeEventListener("keyup", this.onKeyUp.bind(this));
    }

    async init() {
        const bounds = this.el.getBoundingClientRect();
        const aspectRatio = bounds.width / bounds.height;

        this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 200);
        this.camera.position.set(-3, 2, 3);
        this.camera.lookAt(this.scene.position);

        // this.scene.background = new THREE.Color(0x151729);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.composer = new EffectComposer(this.renderer);
        const renderPixelatedPass = new RenderPixelatedPass(6, this.scene, this.camera);
        this.composer.addPass(renderPixelatedPass);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.maxZoom = 2;

        this.mouseCoords = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        // lights
        this.addLighting();
    }

    addLighting() {
        this.scene.add(new THREE.AmbientLight(0x2d3645, 1.5));

        const directionalLight = new THREE.DirectionalLight(0xfffc9c, .5);
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.set(2048, 2048);
        this.scene.add(directionalLight);

        const spotLight = new THREE.SpotLight(0xff8800, 1, 10, Math.PI / 16, .02, 2);
        spotLight.position.set(2, 2, 0);
        const target = spotLight.target;
        this.scene.add(target);

        target.position.set(0, 0, 0);
        spotLight.castShadow = true;
        this.scene.add(spotLight);
    }

    initScene() {
        const loader = new THREE.TextureLoader();

        // Add water
        if (false && true) {
            const waterGeometry = new THREE.PlaneGeometry(20, 20);
            const waterHorizon = new THREE.Mesh(waterGeometry, new THREE.MeshPhongMaterial({ color: 0x2196f3, }));
            waterHorizon.position.y = -0.002;
            waterHorizon.rotation.x = Math.PI * -.5;
            this.scene.add(waterHorizon);

            // load dudv map for distortion effect
            const dudvMap = loader.load('assets/waterdudv.jpg');
            dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

            const water = new Water(waterGeometry, {
                color: '#cceeff',
                scale: 4,
                flowDirection: new THREE.Vector2(.1, .1),
                textureWidth: 1024,
                textureHeight: 1024,
                normalMap0: loader.load('assets/Water_1_M_Normal.jpg'),
                normalMap1: loader.load('assets/Water_2_M_Normal.jpg')
            });

            water.position.y = -.001;
            water.rotation.x = Math.PI * - 0.5;

            this.scene.add(water);
        }

        // Add random cubes & the plain
        if (true) {
            const texChecker = this.pixelTexture(loader.load('assets/checker.png'));
            const texChecker2 = this.pixelTexture(loader.load('assets/checker.png'));
            const texChecker3 = this.pixelTexture(loader.load('assets/checker.png'));
            texChecker.repeat.set(3, 3);
            texChecker2.repeat.set(1.5, 1.5);
            texChecker3.repeat.set(50, 50);

            const boxMaterial = new THREE.MeshPhongMaterial({ map: texChecker2 });

            const addBox = (boxSideLength, x, z, rotation) => {
                const mesh = new THREE.Mesh(new THREE.BoxGeometry(boxSideLength, boxSideLength, boxSideLength), boxMaterial);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.rotation.y = rotation;
                mesh.position.y = boxSideLength / 2;
                mesh.position.set(x, boxSideLength / 2 + .0001, z);
                mesh.userData['breakable'] = true;
                this.scene.add(mesh);
                // Note: Why in the holy grail is Ammo scaled by half?
                const shape = new Ammo.btBoxShape(new Ammo.btVector3(boxSideLength * 0.5, boxSideLength * 0.5, boxSideLength * 0.5));
                this.createRigidBody(mesh, shape, 50);
                return mesh;
            };

            addBox(.4, 0, 0, Math.PI / 4);
            addBox(.5, -.5, -.5, Math.PI / 4);

            // const planeSideLength = 200;
            // const planeMesh = new THREE.Mesh(
            //     new THREE.PlaneGeometry(planeSideLength, planeSideLength),
            //     new THREE.MeshPhongMaterial({ map: texChecker3 })
            // );

            // planeMesh.receiveShadow = true;
            // planeMesh.rotation.x = - Math.PI / 2;
            // this.scene.add(planeMesh);
            // const planeShape = new Ammo.btBoxShape(new Ammo.btVector3(planeSideLength * 0.5, planeSideLength * 0.5, 0.001));
        }

        // Add player
        if (true) {
            const playerMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            const player = this.playerMesh = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, .2), playerMaterial);
            player.castShadow = true;
            player.receiveShadow = true;
            player.position.y = 0;
            player.position.set(0, .2 / 2 + .0001, 1);
            this.scene.add(player);
        }

        // Add the crystal
        if (true) {
            const radius = .2;
            const geometry = new THREE.IcosahedronGeometry(radius);
            this.crystalMesh = new THREE.Mesh(
                geometry,
                new THREE.MeshPhongMaterial({
                    color: 0x2379cf,
                    emissive: 0x143542,
                    shininess: 10,
                    specular: 0xffffff
                })
            );
            this.crystalMesh.receiveShadow = true;
            this.crystalMesh.castShadow = true;
            this.scene.add(this.crystalMesh);
        }
    }

    initPhysics() {
        this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
        this.broadphase = new Ammo.btDbvtBroadphase();
        this.solver = new Ammo.btSequentialImpulseConstraintSolver();
        this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration);
        this.physicsWorld.setGravity(new Ammo.btVector3(0, -7.8, 0));

        this.transformAux1 = new Ammo.btTransform();
        this.tempBtVec3_1 = new Ammo.btVector3(0, 0, 0);
    }

    attachEvents() {
        // Attach inputs
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

        window.addEventListener('pointerdown', (event) => {
            const pos = new THREE.Vector3();
            const quat = new THREE.Quaternion();
            console.log("Fire ball");

            this.mouseCoords.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            );

            this.raycaster.setFromCamera(this.mouseCoords, this.camera);

            // Creates a ball and throws it
            const ballMass = 35;
            const ballRadius = 0.2;

            const ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 14, 10), new THREE.MeshPhongMaterial({ color: 0x202020 }));
            ball.castShadow = true;
            ball.receiveShadow = true;

            const ballShape = new Ammo.btSphereShape(ballRadius);
            // ballShape.setMargin(5);
            pos.copy(this.raycaster.ray.direction);
            pos.add(this.raycaster.ray.origin);
            quat.set(0, 0, 0, 1);
            ball.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z));

            const body = this.createRigidBody(ball, ballShape, ballMass);
            body.setAngularVelocity(new Ammo.btVector3(quat.x, quat.y, quat.z));


            pos.copy(this.raycaster.ray.direction);
            pos.multiplyScalar(12); // ball velocity
            body.setLinearVelocity(new Ammo.btVector3(pos.x, pos.y, pos.z));
        });
    }

    animationFrameRequest;
    animate() {
        this.animationFrameRequest = requestAnimationFrame(this.animate.bind(this));

        const d = this.clock.getDelta();
        const t = this.clock.getElapsedTime();

        // @ts-ignore Is this still valid?
        this.crystalMesh.material.emissiveIntensity = Math.sin(t * 3) * .5 + .5;
        this.crystalMesh.position.y = .7 + Math.sin(t * 2) * .05;
        this.crystalMesh.rotation.y = this.stopGoEased(t, 2, 4) * 2 * Math.PI;

        this.processKeys(d);

        // this.playerMesh.translateX(this.pvx);
        // this.playerMesh.translateY(this.pvy);
        // this.playerMesh.translateZ(this.pvz);

        this.updatePhysics(d);

        this.composer.render();
        // this.renderer.render(this.scene, this.camera);
    }





    objectsToRemove = [];

    //     for(let i = 0; i < 500; i ++ ) {
    // objectsToRemove[i] = null;
    // }
    numObjectsToRemove = 0;
    impactPoint = new THREE.Vector3();
    impactNormal = new THREE.Vector3();


    createObject(mass, halfExtents, pos, quat, material) {

        const object = new THREE.Mesh(new THREE.BoxGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2), material);
        object.position.copy(pos);
        object.quaternion.copy(quat);
        this.convexBreaker.prepareBreakableObject(object, mass, new THREE.Vector3(), new THREE.Vector3(), true);
        this.createDebrisFromBreakableObject(object);

    }

    createObjects() {
        const loader = new THREE.TextureLoader();

        const pos = new THREE.Vector3();
        const quat = new THREE.Quaternion();

        // Ground
        pos.set(0, -1, 0);
        quat.set(0, 0, 0, 1);
        const ground = this.createParalellepipedWithPhysics(40, 1, 40, 0, pos, quat, new THREE.MeshPhongMaterial({ color: 0xFFFFFF, opacity: 0 }));
        ground.receiveShadow = true;
        loader.load('textures/grid.png', function (texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(40, 40);
            ground.material.map = texture;
            ground.material.needsUpdate = true;
        });

        // Tower 1
        const towerMass = 1000;
        const towerHalfExtents = new THREE.Vector3(2, 5, 2);
        pos.set(- 8, 5, 0);
        quat.set(0, 0, 0, 1);
        this.createObject(towerMass, towerHalfExtents, pos, quat, this.createMaterial(0xB03014));

        // Tower 2
        pos.set(8, 5, 0);
        quat.set(0, 0, 0, 1);
        this.createObject(towerMass, towerHalfExtents, pos, quat, this.createMaterial(0xB03214));

        //Bridge
        const bridgeMass = 100;
        const bridgeHalfExtents = new THREE.Vector3(7, 0.2, 1.5);
        pos.set(0, 10.2, 0);
        quat.set(0, 0, 0, 1);
        this.createObject(bridgeMass, bridgeHalfExtents, pos, quat, this.createMaterial(0xB3B865));

        // Stones
        const stoneMass = 120;
        const stoneHalfExtents = new THREE.Vector3(1, 2, 0.15);
        const numStones = 8;
        quat.set(0, 0, 0, 1);
        for (let i = 0; i < numStones; i++) {

            pos.set(0, 2, 15 * (0.5 - i / (numStones + 1)));

            this.createObject(stoneMass, stoneHalfExtents, pos, quat, this.createMaterial(0xB0B0B0));

        }

        // Mountain
        const mountainMass = 860;
        const mountainHalfExtents = new THREE.Vector3(4, 5, 4);
        pos.set(5, mountainHalfExtents.y * 0.5, - 7);
        quat.set(0, 0, 0, 1);
        const mountainPoints = [];
        mountainPoints.push(new THREE.Vector3(mountainHalfExtents.x, - mountainHalfExtents.y, mountainHalfExtents.z));
        mountainPoints.push(new THREE.Vector3(- mountainHalfExtents.x, - mountainHalfExtents.y, mountainHalfExtents.z));
        mountainPoints.push(new THREE.Vector3(mountainHalfExtents.x, - mountainHalfExtents.y, - mountainHalfExtents.z));
        mountainPoints.push(new THREE.Vector3(- mountainHalfExtents.x, - mountainHalfExtents.y, - mountainHalfExtents.z));
        mountainPoints.push(new THREE.Vector3(0, mountainHalfExtents.y, 0));
        const mountain = new THREE.Mesh(new ConvexGeometry(mountainPoints), this.createMaterial(0xB03814));
        mountain.position.copy(pos);
        mountain.quaternion.copy(quat);
        this.convexBreaker.prepareBreakableObject(mountain, mountainMass, new THREE.Vector3(), new THREE.Vector3(), true);
        this.createDebrisFromBreakableObject(mountain);

    }

    createParalellepipedWithPhysics(sx, sy, sz, mass, pos, quat, material) {

        const object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(0.05);

        this.createRigidBody(object, shape, mass, pos, quat);

        return object;

    }

    createDebrisFromBreakableObject(object) {

        object.castShadow = true;
        object.receiveShadow = true;

        const shape = this.createConvexHullPhysicsShape(object.geometry.attributes.position.array);
        shape.setMargin(0.05);

        const body = this.createRigidBody(object, shape, object.userData.mass, null, null, object.userData.velocity, object.userData.angularVelocity);

        // Set pointer back to the three object only in the debris objects
        const btVecUserData = new Ammo.btVector3(0, 0, 0);
        btVecUserData.threeObject = object;
        body.setUserPointer(btVecUserData);

    }

    removeDebris(object) {

        this.scene.remove(object);

        this.physicsWorld.removeRigidBody(object.userData.physicsBody);

    }

    createConvexHullPhysicsShape(coords) {

        const shape = new Ammo.btConvexHullShape();

        for (let i = 0, il = coords.length; i < il; i += 3) {

            this.tempBtVec3_1.setValue(coords[i], coords[i + 1], coords[i + 2]);
            const lastOne = (i >= (il - 3));
            shape.addPoint(this.tempBtVec3_1, lastOne);

        }

        return shape;

    }

    createRigidBody(object, physicsShape, mass, pos?, quat?, vel?, angVel?) {

        if (pos) {

            object.position.copy(pos);

        } else {

            pos = object.position;

        }

        if (quat) {

            object.quaternion.copy(quat);

        } else {

            quat = object.quaternion;

        }

        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
        const motionState = new Ammo.btDefaultMotionState(transform);

        const localInertia = new Ammo.btVector3(0, 0, 0);
        physicsShape.calculateLocalInertia(mass, localInertia);

        const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);
        const body = new Ammo.btRigidBody(rbInfo);

        body.setFriction(0.5);

        if (vel) {

            body.setLinearVelocity(new Ammo.btVector3(vel.x, vel.y, vel.z));

        }

        if (angVel) {

            body.setAngularVelocity(new Ammo.btVector3(angVel.x, angVel.y, angVel.z));

        }

        object.userData.physicsBody = body;
        object.userData.collided = false;

        this.scene.add(object);

        if (mass > 0) {

            this.rigidBodies.push(object);

            // Disable deactivation
            body.setActivationState(4);

        }

        this.physicsWorld.addRigidBody(body);

        return body;

    }

    createRandomColor() {

        return Math.floor(Math.random() * (1 << 24));

    }

    createMaterial(color) {

        color = color || this.createRandomColor();
        return new THREE.MeshPhongMaterial({ color: color });

    }

    updatePhysics(deltaTime) {

        // Step world
        this.physicsWorld.stepSimulation(deltaTime, 10);

        // Update rigid bodies
        for (let i = 0, il = this.rigidBodies.length; i < il; i++) {

            const objThree = this.rigidBodies[i];
            const objPhys = objThree.userData.physicsBody;
            const ms = objPhys.getMotionState();

            if (ms) {

                ms.getWorldTransform(this.transformAux1);
                const p = this.transformAux1.getOrigin();
                const q = this.transformAux1.getRotation();
                objThree.position.set(p.x(), p.y(), p.z());
                objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());

                objThree.userData.collided = false;

            }

        }

        for (let i = 0, il = this.dispatcher.getNumManifolds(); i < il; i++) {

            const contactManifold = this.dispatcher.getManifoldByIndexInternal(i);
            const rb0 = Ammo.castObject(contactManifold.getBody0(), Ammo.btRigidBody);
            const rb1 = Ammo.castObject(contactManifold.getBody1(), Ammo.btRigidBody);

            const threeObject0 = Ammo.castObject(rb0.getUserPointer(), Ammo.btVector3).threeObject;
            const threeObject1 = Ammo.castObject(rb1.getUserPointer(), Ammo.btVector3).threeObject;

            if (!threeObject0 && !threeObject1) {

                continue;

            }

            const userData0 = threeObject0 ? threeObject0.userData : null;
            const userData1 = threeObject1 ? threeObject1.userData : null;

            const breakable0 = userData0 ? userData0.breakable : false;
            const breakable1 = userData1 ? userData1.breakable : false;

            const collided0 = userData0 ? userData0.collided : false;
            const collided1 = userData1 ? userData1.collided : false;

            if ((!breakable0 && !breakable1) || (collided0 && collided1)) {

                continue;

            }

            let contact = false;
            let maxImpulse = 0;
            for (let j = 0, jl = contactManifold.getNumContacts(); j < jl; j++) {

                const contactPoint = contactManifold.getContactPoint(j);

                if (contactPoint.getDistance() < 0) {

                    contact = true;
                    const impulse = contactPoint.getAppliedImpulse();

                    if (impulse > maxImpulse) {

                        maxImpulse = impulse;
                        const pos = contactPoint.get_m_positionWorldOnB();
                        const normal = contactPoint.get_m_normalWorldOnB();
                        this.impactPoint.set(pos.x(), pos.y(), pos.z());
                        this.impactNormal.set(normal.x(), normal.y(), normal.z());

                    }

                    break;

                }

            }

            // If no point has contact, abort
            if (!contact) continue;

            // Subdivision

            const fractureImpulse = 250;

            if (breakable0 && !collided0 && maxImpulse > fractureImpulse) {
                // @ts-ignore
                const debris = this.convexBreaker.subdivideByImpact(threeObject0, this.impactPoint, this.impactNormal, 1, 2, 1.5);

                const numObjects = debris.length;
                for (let j = 0; j < numObjects; j++) {

                    const vel = rb0.getLinearVelocity();
                    const angVel = rb0.getAngularVelocity();
                    const fragment = debris[j];
                    fragment.userData['velocity'].set(vel.x(), vel.y(), vel.z());
                    fragment.userData['angularVelocity'].set(angVel.x(), angVel.y(), angVel.z());

                    this.createDebrisFromBreakableObject(fragment);

                }

                this.objectsToRemove[this.numObjectsToRemove++] = threeObject0;
                userData0.collided = true;

            }

            if (breakable1 && !collided1 && maxImpulse > fractureImpulse) {
                // @ts-ignore
                const debris = this.convexBreaker.subdivideByImpact(threeObject1, this.impactPoint, this.impactNormal, 1, 2, 1.5);

                const numObjects = debris.length;
                for (let j = 0; j < numObjects; j++) {

                    const vel = rb1.getLinearVelocity();
                    const angVel = rb1.getAngularVelocity();
                    const fragment = debris[j];
                    fragment.userData['velocity'].set(vel.x(), vel.y(), vel.z());
                    fragment.userData['angularVelocity'].set(angVel.x(), angVel.y(), angVel.z());

                    this.createDebrisFromBreakableObject(fragment);

                }

                this.objectsToRemove[this.numObjectsToRemove++] = threeObject1;
                userData1.collided = true;

            }

        }

        for (let i = 0; i < this.numObjectsToRemove; i++) {

            this.removeDebris(this.objectsToRemove[i]);

        }

        this.numObjectsToRemove = 0;

    }



































    processKeys(t: number) {
        const keys = Object.entries(this.heldKeys);
        const processMove = (pvkey: string, held: boolean, accel: number, decel: number, max: number) => {
            if (accel > 0) {
                if (held)
                    this[pvkey] = Math.min(this[pvkey] + (accel * t), max);
                else if (this[pvkey] > 0) {
                    this[pvkey] = Math.max(this[pvkey] - (decel * t), 0);
                }
            }
            else {
                if (held) {
                    this[pvkey] = Math.max(this[pvkey] + (accel * t), max);
                }
                else if (this[pvkey] < 0) {
                    this[pvkey] = Math.min(this[pvkey] + (decel * t), 0);
                }
            }
        }

        for (let i = 0; i < keys.length; i++) {
            const [key, held] = keys[i];
            switch (key) {
                case "w": {
                    processMove("pvz", held, -.01, .02, -this.maxSpeedZ);
                    // this.playerMesh.translateZ(-1 * t);
                    break;
                }
                case "a": {
                    processMove("pvx", held, -.01, .02, -this.maxSpeedX);
                    // this.playerMesh.translateX(-1 * t);
                    break;
                }
                case "s": {
                    processMove("pvz", held, .01, .02, this.maxSpeedZ);
                    // this.playerMesh.translateZ(1 * t);
                    break;
                }
                case "d": {
                    processMove("pvx", held, .01, .02, this.maxSpeedX);
                    // this.playerMesh.translateX(1 * t);
                    break;
                }
            }
        }
    }

    pixelTexture(texture) {
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        texture.generateMipmaps = false;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        return texture;
    }

    easeInOutCubic(x) {
        return x ** 2 * 3 - x ** 3 * 2;
    }

    linearStep(x, edge0, edge1) {
        const w = edge1 - edge0;
        const m = 1 / w;
        const y0 = - m * edge0;

        return THREE.MathUtils.clamp(y0 + m * x, 0, 1);
    }

    stopGoEased(x, downtime, period) {
        const cycle = (x / period) | 0;
        const tween = x - cycle * period;
        const linStep = this.easeInOutCubic(this.linearStep(tween, downtime, period));

        return cycle + linStep;
    }

    @HostListener("window:resize")
    onWindowResize() {
        const bounds = this.el.getBoundingClientRect();

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(bounds.width, bounds.height);
        this.composer.setSize(bounds.width, bounds.height);
    }

    private heldKeys: { [key: string]: boolean; } = {};
    onKeyDown(evt: KeyboardEvent) {
        this.heldKeys[evt.key.toLowerCase()] = true;
    }

    onKeyUp(evt: KeyboardEvent) {
        this.heldKeys[evt.key.toLowerCase()] = false;
    }
}
