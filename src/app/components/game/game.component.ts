import { Component, ElementRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js';
import { Refractor } from 'three/examples/jsm/objects/Refractor.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import { ConvexObjectBreaker } from 'three/examples/jsm/misc/ConvexObjectBreaker.js';
import { MeshPhysicsResult, RapierPhysics } from 'src/app/components/game/rapier';
import * as RAPIER from '@dimforge/rapier3d-compat';


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

    followCam: THREE.Object3D;
    followCamPivot: THREE.Object3D;
    camera: THREE.PerspectiveCamera;
    camTo = new THREE.Vector3();


    scene = new THREE.Scene();
    clock = new THREE.Clock();
    controls: OrbitControls;
    renderer: THREE.WebGLRenderer;
    mouseCoords: THREE.Vector2;
    raycaster: THREE.Raycaster;

    composer: EffectComposer;

    params = { pixelSize: 6, normalEdgeStrength: .3, depthEdgeStrength: .4, pixelAlignedPanning: true }
    crystalMesh: THREE.Mesh;
    crystalMeshCollider: MeshPhysicsResult;
    refractor: Refractor;

    playerMesh: THREE.Mesh;
    playerPhysics: MeshPhysicsResult;
    playerController: RAPIER.KinematicCharacterController
    pvx = 0;
    pvy = 0;
    pvz = 0;

    readonly maxSpeedX = 5;
    readonly maxSpeedY = 5;
    readonly maxSpeedZ = 5;

    convexBreaker = new ConvexObjectBreaker();

    physics = new RapierPhysics();

    constructor(private viewContainer: ViewContainerRef) { }

    async ngAfterViewInit() {

        // THREE.ColorManagement.enabled = false; // TODO: Consider enabling color management.

        // Start ThreeJS engine
        await this.init();

        // Create Scene
        this.initScene();

        this.onWindowResize();
        this.animate();

        this.attachEvents();
        // this.createObjects()
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationFrameRequest);

        window.removeEventListener("keydown", this.onKeyDown.bind(this));
        window.removeEventListener("keyup", this.onKeyUp.bind(this));
    }

    async init() {
        const bounds = this.el.getBoundingClientRect();
        const aspectRatio = bounds.width / bounds.height;

        await this.physics.init();

        this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 200);
        this.camera.position.set(-3, 2, 3);

        this.followCamPivot = new THREE.Object3D();
        this.followCamPivot.rotation.order = 'YXZ';
        this.followCam = new THREE.Object3D();
        this.followCam.position.y = 2;
        this.followCam.position.z = 2;
        this.followCamPivot.add(this.followCam);

        // this.scene.background = new THREE.Color(0x151729);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.composer = new EffectComposer(this.renderer);
        const renderPixelatedPass = new RenderPixelatedPass(6, this.scene, this.camera);
        this.composer.addPass(renderPixelatedPass);

        const controls = this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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
        if (true) {
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
            const texChecker2 = this.pixelTexture(loader.load('assets/checker.png'));
            const texChecker3 = this.pixelTexture(loader.load('assets/checker.png'));
            texChecker2.repeat.set(1.5, 1.5);
            texChecker3.repeat.set(600, 600);

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

                this.physics.addMesh(mesh, 1000);
                return mesh;
            };

            addBox(.4, 0, 0, Math.PI / 4);
            addBox(.5, -.5, -.5, Math.PI / 4);

            const planeSideLength = 200;
            const planeMesh = new THREE.Mesh(
                new THREE.BoxGeometry(planeSideLength, .1, planeSideLength),
                new THREE.MeshPhongMaterial({ map: texChecker3 })
            );
            planeMesh.position.y = 0

            planeMesh.receiveShadow = true;
            // planeMesh.rotation.x = - Math.PI / 2;
            this.scene.add(planeMesh);
            this.physics.addMesh(planeMesh);
        }

        // Add player
        if (true) {
            const playerMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            const player = this.playerMesh = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, .2), playerMaterial);
            player.castShadow = true;
            player.receiveShadow = true;
            player.position.set(0, .15, 1);


            this.enableRotationViz(player);

            this.scene.add(player);
            this.playerPhysics = this.physics.addMesh(player, 400);
            this.playerController = this.physics.world.createCharacterController(0.01);
            this.playerController.setUp({ x: 0.0, y: 0.0, z: 1.0 });

            this.playerController.setMaxSlopeClimbAngle(45 * Math.PI / 180);
            this.playerController.setMinSlopeSlideAngle(30 * Math.PI / 180);
            this.playerController.enableAutostep(0.5, 0.2, true);
            this.playerController.enableSnapToGround(0.5);
            player.add(this.followCamPivot);
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

            const collider = this.crystalMeshCollider = this.physics.addMesh(this.crystalMesh, 10);
            collider.body.setGravityScale(0, false);
            collider.collider.setActiveEvents(1);
            // this.physics.world.
        }
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
            const ballMass = 3500;
            const ballRadius = 0.2;

            const ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 14, 10), new THREE.MeshPhongMaterial({ color: 0x202020 }));
            ball.castShadow = true;
            ball.receiveShadow = true;

            // ballShape.setMargin(5);
            pos.copy(this.raycaster.ray.direction);
            pos.add(this.raycaster.ray.origin);
            quat.set(0, 0, 0, 1);
            ball.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z));
            this.scene.add(ball);


            pos.copy(this.raycaster.ray.direction);
            pos.multiplyScalar(12); // ball velocity
            let phys = this.physics.addMesh(ball, ballMass);
            phys.body.setAngvel(new RAPIER.Vector3(quat.x, quat.y, quat.z), true);
            phys.body.setLinvel(new RAPIER.Vector3(pos.x, pos.y, pos.z), true);
        });

        // const onDocumentMouseMove = (e: MouseEvent) => {
        //     followCamPivot.rotation.y -= e.movementX * 0.002;
        //     followCamPivot.rotation.x -= e.movementY * 0.002;
        //     return false;
        // };

        // const onDocumentMouseWheel = (e: THREE.Event) => {
        //     let newVal = followCam.position.z + e.deltaY * 0.05;
        //     if (newVal > 0.25 && newVal < 10) {
        //         followCam.position.z = newVal;
        //     }
        //     return false;
        // }
    }

    animationFrameRequest;
    canJump = true;
    euler = new THREE.Euler();
    inputVelocity = new THREE.Vector3();
    quat = new THREE.Quaternion();
    humanIsMovingPlayer = false;
    animate() {
        this.animationFrameRequest = requestAnimationFrame(this.animate.bind(this));

        const d = this.clock.getDelta();
        const t = this.clock.getElapsedTime();

        // @ts-ignore Is this still valid?
        this.crystalMesh.material.emissiveIntensity = Math.sin(t * 3) * .5 + .5;

        this.crystalMeshCollider.body.setTranslation({ x: 0, y: .7 + Math.sin(t * 2) * .05, z: 0 }, false);
        this.crystalMeshCollider.body.setRotation({ x: 0, y: this.stopGoEased(t, 2, 4) * 2 * Math.PI , z: 0, w: 0}, false);

        this.processKeys(d);

        // Apply translation
        this.playerPhysics.body.setLinvel(this.inputVelocity, true);

        const quat = this.camera.quaternion.clone();
        const rot = this.playerPhysics.body.rotation();
        quat.x = rot.x;
        quat.z = rot.z;
        this.playerPhysics.body.setRotation(quat, false);

        this.physics.physicsStep(d);

        // If the human is moving the player, tween the camera into position
        if (this.humanIsMovingPlayer) {
            this.followCam.getWorldPosition(this.camTo);
            this.camera.position.lerpVectors(this.camera.position, this.camTo, d*10);
            this.camera.lookAt(this.playerMesh.position);
            this.controls.target = this.playerMesh.position;
        }

        // this.composer.render();
        this.renderer.render(this.scene, this.camera);
    }

    enableRotationViz(parent: THREE.Mesh) {
        const geometryX = new THREE.BufferGeometry();
        const geometryY = new THREE.BufferGeometry();
        const geometryZ = new THREE.BufferGeometry();

        const verticesX = [];
        const verticesY = [];
        const verticesZ = [];

        verticesX.push(0, 0, 0);
        verticesX.push(parent.scale.x, 0, 0);

        verticesY.push(0, 0, 0);
        verticesY.push(0, parent.scale.y, 0);

        verticesZ.push(0, 0, 0);
        verticesZ.push(0, 0, parent.scale.z);

        geometryX.setAttribute('position', new THREE.Float32BufferAttribute(verticesX, 3));
        geometryY.setAttribute('position', new THREE.Float32BufferAttribute(verticesY, 3));
        geometryZ.setAttribute('position', new THREE.Float32BufferAttribute(verticesZ, 3));

        const materialX = new THREE.LineBasicMaterial({ color: 0x0000ff, opacity: 1 });
        const materialY = new THREE.LineBasicMaterial({ color: 0x00ffff, opacity: 1 });
        const materialZ = new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 1 });

        const lineX = new THREE.LineSegments(geometryX, materialX);
        const lineY = new THREE.LineSegments(geometryY, materialY);
        const lineZ = new THREE.LineSegments(geometryZ, materialZ);
        // line.updateMatrix();

        // this.scene.add(line);
        parent.add(lineX);
        parent.add(lineY);
        parent.add(lineZ);
    }

    processKeys(t: number) {
        this.inputVelocity.set(0, 0, 0);
        this.humanIsMovingPlayer = false;

        if (this.heldKeys['w']) {
            this.humanIsMovingPlayer = true;
            this.inputVelocity.z = -200 * t;
        }
        else if (this.heldKeys['s']) {
            this.humanIsMovingPlayer = true;
            this.inputVelocity.z = 200 * t;
        }

        if (this.heldKeys['a']) {
            this.humanIsMovingPlayer = true;
            this.inputVelocity.x = -200 * t;
        }
        else if (this.heldKeys['d']) {
            this.humanIsMovingPlayer = true;
            this.inputVelocity.x = 200 * t;
        }

        if (this.heldKeys[' ']) {
            this.humanIsMovingPlayer = true;
            // this.playerPhysics.body.setTranslation(new RAPIER.Vector3(0, 1, 0), false);
            this.inputVelocity.y = 200 * t;
        }

        // apply camera rotation to inputVelocity
        // this.euler.y = this.followCamPivot.rotation.y;
        // this.euler.order = 'XYZ';
        // this.quat.setFromEuler(this.euler, true);
        this.inputVelocity.applyQuaternion(this.playerMesh.quaternion);
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
        console.log("key", evt.key.toLowerCase());
        this.heldKeys[evt.key.toLowerCase()] = true;
    }

    onKeyUp(evt: KeyboardEvent) {
        this.heldKeys[evt.key.toLowerCase()] = false;
    }
}
