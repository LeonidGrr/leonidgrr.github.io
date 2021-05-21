import * as THREE from 'three';
import { Desktop, Tooltip } from '.';

export class RenderingManager {
    active = 'desktop';
    scene: THREE.Scene;
    
    constructor(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        // Main scene
        this.scene = new THREE.Scene();
        this.scene.name = 'main';
        this.scene.fog = new THREE.FogExp2(0x000000);
        this.scene.background = this.scene.fog.color;
        this.scene.background.convertSRGBToLinear();
        const tooltip = new Tooltip(camera, this.scene);

        // Setup desktop scene
        const scene = new THREE.Scene();
        scene.name = 'desktop';
        Desktop(scene, camera, renderer, tooltip);
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

    }

    changeScene = (sceneName: string) => {
        const current = this.scene.children.find(s => s.name === this.active);
        const next = this.scene.children.find(s => s.name === sceneName);

        if (current && next) {
            this.active = sceneName;
            this.switchScenes(current as THREE.Scene, next as THREE.Scene);
        }      
    };

    switchScenes = (currentScene: THREE.Scene, nextScene: THREE.Scene) => {
        currentScene.visible = false;
        nextScene.visible = true;

        // switch (currentScene.name) {
        //     case 'desktop': {
        //         const light1 = this.scene?.getObjectByName('lamp_light') as THREE.Light;
        //         const light2 = this.scene?.getObjectByName('screen_light') as THREE.Light;
        //         const light3 = this.scene?.getObjectByName('ambient_light') as THREE.Light;
        //         const lamp = this.scene?.getObjectByName('lamp_mesh') as THREE.Mesh;
        //         const lampMaterial = lamp.material as THREE.MeshPhongMaterial;
        //         const lights = [light1, light2, light3];
    
        //         let requestId = null;
        //         let animation = () => {
        //             requestId = null;
        
        //             lights.forEach(l => {
        //                 if (l?.intensity > 0) {
        //                     l.intensity -= 0.01;
        //                 }
        //             });
    
        //             if (lampMaterial?.emissiveIntensity > 0) {
        //                 lampMaterial.emissiveIntensity -= 0.01;
        //             }

        //             if (!requestId) {
        //                 requestId = requestAnimationFrame(animation);
        //             }
                   
        //             if (!lights.some(l => l.intensity > 0)) {
        //                 if (requestId) {
        //                     cancelAnimationFrame(requestId);
        //                     requestId = null;
                            
        //                     setTimeout(() => {
        //                         currentScene.visible = false;
        //                         this.startScene(nextScene);
        //                     }, 1500);
        //                 }
        //             }            
        //         };
        //         requestId = requestAnimationFrame(animation);
        //         break;
        //     }
        //     case 'drillrig': {
        //         currentScene.visible = false;
        //         this.startScene(nextScene);
        //         break;
        //     }
        //     default: {
        //         console.log('No such scenes!');
        //     }
        // }
    }
}