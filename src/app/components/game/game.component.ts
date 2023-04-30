import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

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

    camera: THREE.OrthographicCamera;
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    renderer: THREE.WebGLRenderer;

    composer: EffectComposer;
    gui = new GUI();

    params = { pixelSize: 6, normalEdgeStrength: .3, depthEdgeStrength: .4, pixelAlignedPanning: true }
    crystalMesh: THREE.Mesh;

    constructor() { }

    ngAfterViewInit() {

        THREE.ColorManagement.enabled = false; // TODO: Consider enabling color management.

        this.init();
        this.animate();
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationFrameRequest);
    }

    init() {
        const aspectRatio = window.innerWidth / window.innerHeight;

        this.camera = new THREE.OrthographicCamera(- aspectRatio, aspectRatio, 1, - 1, 0.1, 10);
        this.camera.position.y = 2 * Math.tan(Math.PI / 6);
        this.camera.position.z = 2;

        this.scene.background = new THREE.Color(0x151729);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.shadowMap.enabled = true;
        //renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.composer = new EffectComposer(this.renderer);
        const renderPixelatedPass = new RenderPixelatedPass(6, this.scene, this.camera);
        this.composer.addPass(renderPixelatedPass);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.maxZoom = 2;

        // gui

        this.gui.add(this.params, 'pixelSize').min(1).max(16).step(1)
            .onChange(() => {

                renderPixelatedPass.pixelSize = this.params.pixelSize;

            });
        this.gui.add(renderPixelatedPass, 'normalEdgeStrength').min(0).max(2).step(.05);
        this.gui.add(renderPixelatedPass, 'depthEdgeStrength').min(0).max(1).step(.05);
        this.gui.add(this.params, 'pixelAlignedPanning');

        // textures

        const loader = new THREE.TextureLoader();
        const texChecker = this.pixelTexture(loader.load('assets/checker.png'));
        const texChecker2 = this.pixelTexture(loader.load('assets/checker.png'));
        texChecker.repeat.set(3, 3);
        texChecker2.repeat.set(1.5, 1.5);

        // meshes

        const boxMaterial = new THREE.MeshPhongMaterial({ map: texChecker2 });

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
        addBox(.5, - .5, - .5, Math.PI / 4);

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

    onWindowResize() {

        const aspectRatio = window.innerWidth / window.innerHeight;
        this.camera.left = - aspectRatio;
        this.camera.right = aspectRatio;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);

    }

    animationFrameRequest;
    animate() {
        this.animationFrameRequest = requestAnimationFrame(this.animate.bind(this));

        const t = this.clock.getElapsedTime();

        // @ts-ignore Is this still valid?
        this.crystalMesh.material.emissiveIntensity = Math.sin(t * 3) * .5 + .5;
        this.crystalMesh.position.y = .7 + Math.sin(t * 2) * .05;
        this.crystalMesh.rotation.y = this.stopGoEased(t, 2, 4) * 2 * Math.PI;

        const rendererSize = this.renderer.getSize(new THREE.Vector2());
        const aspectRatio = rendererSize.x / rendererSize.y;

        if (this.params['pixelAlignedPanning']) {

            this.pixelAlignFrustum(this.camera, aspectRatio, Math.floor(rendererSize.x / this.params['pixelSize']),
                Math.floor(rendererSize.y / this.params['pixelSize']));

        }
        else if (this.camera.left != - aspectRatio || this.camera.top != 1.0) {

            // Reset the Camera Frustum if it has been modified
            this.camera.left = - aspectRatio;
            this.camera.right = aspectRatio;
            this.camera.top = 1.0;
            this.camera.bottom = - 1.0;
            this.camera.updateProjectionMatrix();

        }

        this.composer.render();
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

    pixelAlignFrustum(camera, aspectRatio, pixelsPerScreenWidth, pixelsPerScreenHeight) {

        // 0. Get Pixel Grid Units
        const worldScreenWidth = ((camera.right - camera.left) / camera.zoom);
        const worldScreenHeight = ((camera.top - camera.bottom) / camera.zoom);
        const pixelWidth = worldScreenWidth / pixelsPerScreenWidth;
        const pixelHeight = worldScreenHeight / pixelsPerScreenHeight;

        // 1. Project the current camera position along its local rotation bases
        const camPos = new THREE.Vector3(); camera.getWorldPosition(camPos);
        const camRot = new THREE.Quaternion(); camera.getWorldQuaternion(camRot);
        const camRight = new THREE.Vector3(1.0, 0.0, 0.0).applyQuaternion(camRot);
        const camUp = new THREE.Vector3(0.0, 1.0, 0.0).applyQuaternion(camRot);
        const camPosRight = camPos.dot(camRight);
        const camPosUp = camPos.dot(camUp);

        // 2. Find how far along its position is along these bases in pixel units
        const camPosRightPx = camPosRight / pixelWidth;
        const camPosUpPx = camPosUp / pixelHeight;

        // 3. Find the fractional pixel units and convert to world units
        const fractX = camPosRightPx - Math.round(camPosRightPx);
        const fractY = camPosUpPx - Math.round(camPosUpPx);

        // 4. Add fractional world units to the left/right top/bottom to align with the pixel grid
        camera.left = - aspectRatio - (fractX * pixelWidth);
        camera.right = aspectRatio - (fractX * pixelWidth);
        camera.top = 1.0 - (fractY * pixelHeight);
        camera.bottom = - 1.0 - (fractY * pixelHeight);
        camera.updateProjectionMatrix();
    }
}
