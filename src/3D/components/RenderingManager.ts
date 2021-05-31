import * as THREE from 'three';
import { Desktop, Tooltip, CameraManager } from '.';

const pointer = new THREE.Vector2();
document.addEventListener('mousemove', (e: MouseEvent) => {
    pointer.x = (e.clientX / document.body.clientWidth) * 2 - 1;
    pointer.y = -(e.clientY / document.body.clientHeight) * 2 + 1;
});

export class RenderingManager {
    activeScene = 'desktop';
    scene: THREE.Scene;
    cameraManager: CameraManager;
    
    constructor(
        renderer: THREE.WebGLRenderer,
        cameraManager: CameraManager,
        setCurrentCamera: (name: string) => void,
    ) {
        this.cameraManager = cameraManager;

        // Main scene, camera, tooltips
        this.scene = new THREE.Scene();
        this.scene.name = 'main';
        this.scene.fog = new THREE.FogExp2(0x000000);
        this.scene.background = this.scene.fog.color;
        this.scene.background.convertSRGBToLinear();

        const tooltip = new Tooltip(this.cameraManager.camera, this.scene);

        // Setup desktop scene
        const scene = new THREE.Scene();
        scene.name = 'desktop';
        Desktop(scene, this.cameraManager.camera, renderer, tooltip);
        this.scene.add(scene);

        // Setup drillrig scene
        const scene2 = new THREE.Scene();
        scene2.name = 'drillrig';
        scene2.visible = false;
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = -10;
        mesh.position.y = 10;
        scene2.add(mesh);

        this.scene.add(scene2);

        this.detectClick(setCurrentCamera);
    }

    detectClick = (setCurrentCamera: (name: string) => void) => {
        const raycaster = new THREE.Raycaster();
        const targets: {[key: string]: THREE.Object3D} = {};

        document.addEventListener('pointerdown', () => {
            if (!targets.screen) {
                const screen = this.scene.getObjectByName('screen');
                if (screen) targets.screen = screen;
            }

            raycaster.setFromCamera(pointer, this.cameraManager.camera);
            const intersects = raycaster.intersectObjects(Object.values(targets)); 
            if (intersects.length > 0) {
                if (intersects[0].object.name === 'screen') {
                    this.cameraManager.state = 'screen';
                    setCurrentCamera('screen')
                }
            } else {
                this.cameraManager.state = 'base';
                setCurrentCamera('base')
            }
        }, false);
    }

    changeCamera = (cameraState: string) => this.cameraManager.state = cameraState;

    changeScene = (sceneName: string) => {
        const current = this.scene.children.find(s => s.name === this.activeScene);
        const next = this.scene.children.find(s => s.name === sceneName);

        if (current && next) {
            this.activeScene = sceneName;
            this.switchScenes(current as THREE.Scene, next as THREE.Scene);
        }      
    }

    switchScenes = (currentScene: THREE.Scene, nextScene: THREE.Scene) => {
        currentScene.visible = false;
        nextScene.visible = true;
    }
}