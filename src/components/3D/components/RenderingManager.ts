import * as THREE from 'three';
import { Tooltip, CameraManager, Scene } from '.';
import { CameraState } from './CameraManager';

export class RenderingManager {
    activeScene = 'desktop';
    scene: THREE.Scene;
    cameraManager: CameraManager;
    
    constructor(
        renderer: THREE.WebGLRenderer,
        cameraManager: CameraManager,
    ) {
        this.cameraManager = cameraManager;
        this.scene = new THREE.Scene();
        this.scene.name = 'main';

        this.scene.fog = new THREE.FogExp2(0x000000);

        this.scene.background = this.scene.fog.color;
        this.scene.background.convertSRGBToLinear();

        const tooltip = new Tooltip(this.cameraManager.camera, this.scene);

        // Setup desktop scene
        const scene = new THREE.Scene();
        scene.name = 'desktop';
        Scene(scene, this.cameraManager.camera, renderer, tooltip);
        this.scene.add(scene);

        this.detectClick();

        window.addEventListener('message', this.setCameraWebGL);
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
        if (!targets.windows) {
            const windows = this.scene.getObjectByName('Windows');
            if (windows) targets.windows = windows;
        }
    }

    detectClick = () => {
        const raycaster = new THREE.Raycaster();
        const targets: Record<string, THREE.Object3D> = {};
        const pointer = new THREE.Vector2();

        document.addEventListener('pointerdown', (e: PointerEvent) => {
            this.setupTargets(targets);
            
            if ((e.target as Element).className === 'webgl') {
                pointer.x = (e.clientX / document.body.clientWidth) * 2 - 1;
                pointer.y = -(e.clientY / document.body.clientHeight) * 2 + 1;
                raycaster.setFromCamera(pointer, this.cameraManager.camera);
    
                const intersects = raycaster.intersectObjects(Object.values(targets));
    
                if (intersects.length > 0) {
                    if (this.cameraManager.state !== CameraState.SCREEN && (intersects[0].object.name === 'screen' || intersects[0].object.parent?.name === 'Keyboard')) {
                        this.cameraManager.state = CameraState.SCREEN;
                        postMessage(`change_camera_from_webgl:${CameraState.SCREEN}`);
                    } else if (this.cameraManager.state !== CameraState.WINDOWS && intersects[0].object.parent?.name === 'Windows') {
                        this.cameraManager.state = CameraState.WINDOWS;
                        postMessage(`change_camera_from_webgl:${CameraState.WINDOWS}`);
                    }
                } else {
                    this.cameraManager.state = CameraState.BASE;
                    postMessage(`change_camera_from_webgl:${CameraState.BASE}`);
                }
            }
        }, false);
    }

    setCameraWebGL = (m: MessageEvent<string>) => {
        if (typeof m.data === 'string') {
            const data = m.data.split(':');
            const state = data[1] as CameraState;
            const stateExist = Object.values(CameraState).includes(state);
    
            if (stateExist && data[0] === 'change_camera_from_dom' && this.cameraManager.state !== state) {
                this.cameraManager.state = state;
            }
        }
    };
}
