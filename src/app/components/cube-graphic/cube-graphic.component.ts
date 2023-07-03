import { Component, ElementRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2.js';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

@Component({
  selector: 'app-cube-graphic',
  templateUrl: './cube-graphic.component.html',
  styleUrls: ['./cube-graphic.component.scss'],
  standalone: true
})
export class CubeGraphicComponent {

    @ViewChild("canvas") canvasRef: ElementRef;
    get canvas() { return this.canvasRef.nativeElement as HTMLCanvasElement; }
    get el() { return this.viewContainer.element.nativeElement as HTMLElement; }

    followCam: THREE.Object3D;
    followCamPivot: THREE.Object3D;
    camera: THREE.PerspectiveCamera;
    camTo = new THREE.Vector3();

    context: WebGL2RenderingContext;
    ext: WEBGL_lose_context;

    scene = new THREE.Scene();
    clock = new THREE.Clock();
    controls: OrbitControls;
    renderer: THREE.WebGLRenderer;
    mouseCoords: THREE.Vector2;
    raycaster: THREE.Raycaster;

    composer: EffectComposer;

    params = { pixelSize: 6, normalEdgeStrength: .3, depthEdgeStrength: .4, pixelAlignedPanning: true };
    crystalMesh: THREE.Mesh;
    cubeGroup: THREE.Group;

    placeholder: string = '';

    constructor(private viewContainer: ViewContainerRef) { }

    async ngAfterViewInit() {
        await this.init();

        this.canvas.addEventListener("webglcontextlost", () => {
            // console.log("canvas context has been lost!");

            this.ngOnDestroy();
        });
        this.canvas.addEventListener("webglcontextrestored", () => {
            // console.log("canvas context has been restored!");
            this.animate();
        });

        // this.canvas.oncontextlost
        // Create Scene
        this.initScene();

        this.onWindowResize();
        this.animate();

        setTimeout(() => {
            // this.placeholder = this.canvas.toDataURL();
            // this.placeholder = this.context.()
        }, 5000);
    }

    test() {
        // this.context.image
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationFrameRequest);
    }

    async init() {
        const bounds = this.el.getBoundingClientRect();
        const aspectRatio = bounds.width / bounds.height;

        this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 200);
        this.camera.position.set(-6, 6, 6);

        // this.followCamPivot = new THREE.Object3D();
        // this.followCamPivot.rotation.order = 'YXZ';
        // this.followCam = new THREE.Object3D();
        // this.followCam.position.y = 2;
        // this.followCam.position.z = 2;
        // this.followCamPivot.add(this.followCam);

        // this.scene.background = new THREE.Color(0x151729);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.shadowMap.enabled = true;
        this.composer = new EffectComposer(this.renderer);
        // const renderPixelatedPass = new RenderPixelatedPass(6, this.scene, this.camera);
        // this.composer.addPass(renderPixelatedPass);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0;
        bloomPass.strength = .1;
        bloomPass.radius = .5;

        this.context = this.renderer.getContext() as any;
        this.ext = this.context.getExtension('WEBGL_lose_context');

        const renderScene = new RenderPass(this.scene, this.camera);
        const fxaaPass = new ShaderPass(FXAAShader);

        this.composer.addPass(renderScene);
        this.composer.addPass(fxaaPass);
        // this.composer.addPass(bloomPass);
        // this.composer.addPass(outputPass);

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

        // Add the crystal
        if (false) {
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

        // wireframe
        if (false) {
            let geo = new THREE.IcosahedronGeometry(.6, 1);

            const geometry = new WireframeGeometry2(geo);

            let matLine = new LineMaterial({

                color: 0x4080ff,
                linewidth: .01, // in pixels
                //resolution:  // to be set by renderer, eventually
                dashed: false

            });

            let wireframe = new Wireframe(geometry, matLine);
            wireframe.computeLineDistances();
            wireframe.scale.set(1, 1, 1);
            this.scene.add(wireframe);
        }

        if (true) {
            const mat = new LineMaterial({
                color: 0xffffff,
                // color: 0x9999ff,
                linewidth: .005, // in pixels
                //resolution:  // to be set by renderer, eventually
                dashed: false
            });

            const group = new THREE.Group();

            const placeWireframeCube = (x, y, z) => {
                const size = 1;
                const cube = this.box(size, size, size);

                const geometry = new WireframeGeometry2(cube);
                const mesh = new THREE.Mesh(geometry, mat);
                mesh.position.addScaledVector(new THREE.Vector3(x, y, z), size);
                group.add(mesh);
                console.log("mes")
            }

            for (let x = -1; x < 2; x++)
                for (let y = -1; y < 2; y++)
                    for (let z = -1; z < 2; z++)
                        placeWireframeCube(x, y, z);

            this.scene.add(this.cubeGroup = group);
        }

        // Show 0,0,0 sphere
        if (false) {
            const sphereG = new THREE.SphereGeometry(.2);
            const sphere = new THREE.Mesh(sphereG, new THREE.MeshPhongMaterial({ color: 0xff0000 }));
            this.scene.add(sphere);
        }
    }

    box(width, height, depth) {


        const geometry = new THREE.BufferGeometry();
        const position = [];

        position.push(
            // Vertical bars
            -width, -height, -depth, //locale
            -width, height, -depth,  //pointa
            -width, height, -depth, //pointb

            width, -height, -depth, //locale
            width, height, -depth,  //pointa
            width, height, -depth,  //pointb

            -width, -height, depth, //locale
            -width, height, depth,  //pointa
            -width, height, depth,  //pointb

            width, -height, depth, //locale
            width, height, depth,  //pointa
            width, height, depth,  //pointb


            // Bottom face
            -width, -height, -depth, //locale
            width, -height, -depth,  //pointa
            width, -height, -depth, //pointb

            -width, -height, -depth, //locale
            -width, -height, depth,  //pointa
            -width, -height, depth, //pointb

            width, -height, depth, //locale
            width, -height, -depth,  //pointa
            width, -height, -depth,  //pointb

            width, -height, depth, //locale
            -width, -height, depth,  //pointa
            -width, -height, depth,  //pointb

            // Top face
            -width, height, -depth, //locale
            width, height, -depth,  //pointa
            width, height, -depth, //pointb

            -width, height, -depth, //locale
            -width, height, depth,  //pointa
            -width, height, depth, //pointb

            width, height, depth, //locale
            width, height, -depth,  //pointa
            width, height, -depth,  //pointb

            width, height, depth, //locale
            -width, height, depth,  //pointa
            -width, height, depth,  //pointb
        );

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));

        return geometry;
    }

    animationFrameRequest;
    animate() {
        this.animationFrameRequest = requestAnimationFrame(this.animate.bind(this));

        // const d = this.clock.getDelta();
        const t = this.clock.getElapsedTime();

        // @ts-ignore Is this still valid?
        // this.crystalMesh.material.emissiveIntensity = Math.sin(t * 3) * .5 + .5;

        // this.crystalMesh.material['emissiveIntensity'] = Math.sin(t * 3) * .5 + .5;
        // this.crystalMesh.position.y = Math.sin(t * 2) * .05;
        // this.crystalMesh.rotation.y = this.stopGoEased(t, 2, 4) * 2 * Math.PI;

        this.cubeGroup.position.y = Math.sin(t * 2) * .05;
        this.cubeGroup.rotation.y = this.stopGoEased(t, 2, 4) * 2 * Math.PI;


        this.composer.render();
        // this.renderer.render(this.scene, this.camera);
    }

    stopGoEased(x, downtime, period) {

        const cycle = (x / period) | 0;
        const tween = x - cycle * period;
        const linStep = this.easeInOutCubic(this.linearStep(tween, downtime, period));
        return cycle + linStep;

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


    @HostListener("window:resize")
    onWindowResize() {
        const bounds = this.el.getBoundingClientRect();

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(bounds.width, bounds.height);
        this.composer.setSize(bounds.width, bounds.height);
    }

    @HostListener("window:focus")
    onWindowFocus() {
        // Attempt to restore canvas context
        if (this.context.isContextLost()) {
            this.ext.restoreContext();
        }
    }
}
