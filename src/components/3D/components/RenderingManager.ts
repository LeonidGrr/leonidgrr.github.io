import * as THREE from 'three';
import { Desktop, Tooltip, CameraManager } from '.';
import { CameraState } from './CameraManager';

export class RenderingManager {
    activeScene = 'desktop';
    scene: THREE.Scene;
    cameraManager: CameraManager;
    
    constructor(
        renderer: THREE.WebGLRenderer,
        cameraManager: CameraManager,
        setCameraDOM: (name: CameraState) => void,
    ) {
        this.cameraManager = cameraManager;

        // Main scene, camera, tooltips
        this.scene = new THREE.Scene();
        this.scene.name = 'main';
        
        // Night
        this.scene.fog = new THREE.FogExp2(0x000000);
        
        // Day
        // this.scene.fog = new THREE.FogExp2(0xffffff);

        this.scene.background = this.scene.fog.color;
        this.scene.background.convertSRGBToLinear();

        const tooltip = new Tooltip(this.cameraManager.camera, this.scene);

        // Setup desktop scene
        const scene = new THREE.Scene();
        scene.name = 'desktop';
        Desktop(scene, this.cameraManager.camera, renderer, tooltip);
        this.scene.add(scene);

        this.detectClick(setCameraDOM);
    }

    setupTargets = (targets: Record<string, THREE.Object3D>) => {
        if (!targets.screen) {
            const screen = this.scene.getObjectByName('screen');
            if (screen) targets.screen = screen;
        }
        if (!targets.keyboard) {
            const keyboard = this.scene.getObjectByName('Keyboard');
            if (keyboard) targets.keyboard = keyboard;
        }
    }

    detectClick = (setCameraDOM: (name: CameraState) => void) => {
        const raycaster = new THREE.Raycaster();
        const targets: Record<string, THREE.Object3D> = {};
        const pointer = new THREE.Vector2();

        document.addEventListener('pointerdown', (e: PointerEvent) => {
            this.setupTargets(targets);

            pointer.x = (e.clientX / document.body.clientWidth) * 2 - 1;
            pointer.y = -(e.clientY / document.body.clientHeight) * 2 + 1;
            raycaster.setFromCamera(pointer, this.cameraManager.camera);

            const intersects = raycaster.intersectObjects(Object.values(targets));

            if (intersects.length > 0) {
                if (intersects[0].object.name === 'screen' || intersects[0].object.parent?.name === 'Keyboard') {
                    this.cameraManager.state = CameraState.SCREEN;
                    setCameraDOM(CameraState.SCREEN)
                }
            } else {
                this.cameraManager.state = CameraState.BASE;
                setCameraDOM(CameraState.BASE)
            }
        }, false);
    }

    setCameraWebGL = (cameraState: CameraState) => this.cameraManager.state = cameraState;
}