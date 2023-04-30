import { Component, ElementRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js';
import { Refractor } from 'three/examples/jsm/objects/Refractor.js';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';

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

    camera: THREE.OrthographicCamera;
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    renderer: THREE.WebGLRenderer;

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

    constructor(private viewContainer: ViewContainerRef) { }

    ngAfterViewInit() {

        // THREE.ColorManagement.enabled = false; // TODO: Consider enabling color management.

        this.init();
        this.onWindowResize();
        this.animate();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationFrameRequest);

        window.removeEventListener("keydown", this.onKeyDown.bind(this));
        window.removeEventListener("keyup", this.onKeyUp.bind(this));
    }

    init() {
        const bounds = this.el.getBoundingClientRect();
        const aspectRatio = bounds.width / bounds.height;

        // this.camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, 1, - 1, 0.1, 10);
        // this.camera.position.y = 2 * Math.tan(Math.PI / 6);
        // this.camera.position.z = 2;

        // @ts-ignore
        this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 200);
        this.camera.position.set(-3, 2, 3);
        this.camera.lookAt(this.scene.position);

        // this.scene.background = new THREE.Color(0x151729);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.composer = new EffectComposer(this.renderer);
        const renderPixelatedPass = new RenderPixelatedPass(1, this.scene, this.camera);
        this.composer.addPass(renderPixelatedPass);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.maxZoom = 2;

        const waterGeometry = new THREE.PlaneGeometry(20, 20);
        // waterGeometry.rotateX(Math.PI + Math.PI/2);
        // waterGeometry.translate(0, -.001, 0);

        // const refractor = this.refractor = new Refractor(waterGeometry, {
        //     color: 0x999999,
        //     textureWidth: 1024,
        //     textureHeight: 1024,
        //     shader: WaterRefractionShader
        // });
        const waterHorizon = new THREE.Mesh(waterGeometry, new THREE.MeshPhongMaterial({ color: 0x2196f3, }));
        waterHorizon.position.y = -0.002;
        waterHorizon.rotation.x = Math.PI * -.5;
        this.scene.add(waterHorizon);

        // refractor.position.set(0, 2, 0);
        // this.scene.add(refractor);
        // load dudv map for distortion effect

        const dudvMap = new THREE.TextureLoader().load('assets/waterdudv.jpg');

        dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;
        // @ts-ignore
        // refractor.material.uniforms.tDudv.value = dudvMap;
        const loader = new THREE.TextureLoader();

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



        const cubeTextureLoader = new THREE.CubeTextureLoader();
        cubeTextureLoader.setPath('assets/');

        const cubeTexture = cubeTextureLoader.load([
            'posx.jpg', 'negx.jpg',
            'posy.jpg', 'negy.jpg',
            'posz.jpg', 'negz.jpg'
        ]);

        this.scene.background = cubeTexture;


        // textures

        const texChecker = this.pixelTexture(loader.load('assets/checker.png'));
        const texChecker2 = this.pixelTexture(loader.load('assets/checker.png'));
        texChecker.repeat.set(3, 3);
        texChecker2.repeat.set(1.5, 1.5);

        // meshes

        const boxMaterial = new THREE.MeshPhongMaterial({ map: texChecker2 });
        const playerMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

        const addBox = (boxSideLength, x, z, rotation) => {
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(boxSideLength, boxSideLength, boxSideLength), boxMaterial);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.rotation.y = rotation;
            mesh.position.y = boxSideLength / 2;
            mesh.position.set(x, boxSideLength / 2 + .0001, z);
            this.scene.add(mesh);

            return mesh;
        }

        addBox(.4, 0, 0, Math.PI / 4);
        addBox(.5, -.5, -.5, Math.PI / 4);

        const player = this.playerMesh = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, .2), playerMaterial);
        player.castShadow = true;
        player.receiveShadow = true;
        player.position.y = 0;
        player.position.set(0, .2 / 2 + .0001, 1);
        this.scene.add(player);

        const planeSideLength = 2;
        const planeMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(planeSideLength, planeSideLength),
            new THREE.MeshPhongMaterial({ map: texChecker })
        );

        planeMesh.receiveShadow = true;
        planeMesh.rotation.x = - Math.PI / 2;
        this.scene.add(planeMesh);

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

        // lights

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

    animationFrameRequest;
    animate() {
        this.animationFrameRequest = requestAnimationFrame(this.animate.bind(this));

        const d = this.clock.getDelta();
        const t = this.clock.getElapsedTime();

        // @ts-ignore Is this still valid?
        this.crystalMesh.material.emissiveIntensity = Math.sin(t * 3) * .5 + .5;
        this.crystalMesh.position.y = .7 + Math.sin(t * 2) * .05;
        this.crystalMesh.rotation.y = this.stopGoEased(t, 2, 4) * 2 * Math.PI;

        // @ts-ignore
        // this.refractor.material.uniforms.time.value = t;

        this.processKeys(d);

        this.playerMesh.translateX(this.pvx);
        this.playerMesh.translateY(this.pvy);
        this.playerMesh.translateZ(this.pvz);

        // this.composer.render();
        this.renderer.render(this.scene, this.camera);
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

        const aspectRatio = bounds.width / bounds.height;
        this.camera.left = -aspectRatio;
        this.camera.right = aspectRatio;
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
