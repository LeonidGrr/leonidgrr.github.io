import * as THREE from 'three';
import { Desktop } from '.';
import postprocessing from '../postprocessing';

export class RenderingManager {
    scene: THREE.Scene;
    allScenes: THREE.Scene[] = [];
    rendering: any;
    
    constructor(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        // Setup desktop scene
        const scene = new THREE.Scene();
        scene.name = 'desktop';
        scene.fog = new THREE.FogExp2(0x000000);
        scene.background = scene.fog.color;
        scene.background.convertSRGBToLinear();
        this.scene = scene;
        
        Desktop(scene, camera, renderer);
        this.allScenes.push(scene);

        // Setup drillrig scene
        const scene2 = new THREE.Scene();
        scene2.name = 'drillrig';
        scene2.fog = new THREE.FogExp2(0xFFFFFF);
        scene2.background = scene2.fog.color;
        scene2.background.convertSRGBToLinear();

        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        scene2.add(mesh);
        this.allScenes.push(scene2);

        // Post-processing
        this.rendering = postprocessing(this.scene, camera, renderer);   
    }

    changeScene = (sceneName: string, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
        // this.finishScene();
        this.startScene('drillrig');
        this.rendering = postprocessing(this.scene, camera, renderer);   
    };

    startScene = (sceneName: string) => {
        this.scene = this.allScenes[1];
        console.log(this.scene)
        // switch (sceneName) {
        //     case 'desktop': {
        //         const light1 = this.scene?.getObjectByName('lamp_light') as THREE.Light;
        //         const light2 = this.scene?.getObjectByName('screen_light') as THREE.Light;
        //         const light3 = this.scene?.getObjectByName('ambient_light') as THREE.Light;
        //         const lamp = this.scene?.getObjectByName('lamp_mesh') as THREE.Mesh;
        //         const lampMaterial = lamp.material as THREE.MeshPhongMaterial;
        //         const text = this.scene?.getObjectByName('text_mesh') as THREE.Mesh;
        //         const textMaterial = text.material as THREE.MeshPhongMaterial;
        //         const lights = [light1, light2, light3];
    
        //         let requestId = null;
        //         let animation = (time: number) => {
        //             requestId = null;
        
        //             lights.forEach(l => {
        //                 if (l?.intensity > 0) {
        //                     l.intensity -= 0.01;
        //                     console.log(l.intensity)
        //                 }
        //             });
    
        //             if (lampMaterial?.emissiveIntensity > 0) {
        //                 lampMaterial.emissiveIntensity -= 0.01;
        //             }
    
        //             if (textMaterial?.emissiveIntensity > 0) {
        //                 textMaterial.emissiveIntensity -= 0.01;
        //             }
        
        //             if (!requestId) {
        //                 requestId = requestAnimationFrame(animation);
        //             }
                   
        //             if (!lights.some(l => l.intensity > 0)) {
        //                 if (requestId) {
        //                     cancelAnimationFrame(requestId);
        //                     requestId = null;
                            
        //                 }
        //             }            
        //         };
        //         requestId = requestAnimationFrame(animation);
        //     }
        // }
    }

    finishScene = () => {
        // const activeSubScene = this.scene.getObjectByName(this.scene.name);
        // console.log(activeSubScene)
        // switch (this.scene.name) {
        //     case 'desktop': {
        //         const light1 = this.scene?.getObjectByName('lamp_light') as THREE.Light;
        //         const light2 = this.scene?.getObjectByName('screen_light') as THREE.Light;
        //         const light3 = this.scene?.getObjectByName('ambient_light') as THREE.Light;
        //         const lamp = this.scene?.getObjectByName('lamp_mesh') as THREE.Mesh;
        //         const lampMaterial = lamp.material as THREE.MeshPhongMaterial;
        //         const text = this.scene?.getObjectByName('text_mesh') as THREE.Mesh;
        //         const textMaterial = text.material as THREE.MeshPhongMaterial;
        //         const lights = [light1, light2, light3];
    
        //         let requestId = null;
        //         let animation = (time: number) => {
        //             requestId = null;
        
        //             lights.forEach(l => {
        //                 if (l?.intensity > 0) {
        //                     l.intensity -= 0.01;
        //                 }
        //             });
    
        //             if (lampMaterial?.emissiveIntensity > 0) {
        //                 lampMaterial.emissiveIntensity -= 0.01;
        //             }
    
        //             if (textMaterial?.emissiveIntensity > 0) {
        //                 textMaterial.emissiveIntensity -= 0.01;
        //             }
        
        //             if (!requestId) {
        //                 requestId = requestAnimationFrame(animation);
        //             }
                   
        //             if (!lights.some(l => l.intensity > 0)) {
        //                 if (requestId) {
        //                     cancelAnimationFrame(requestId);
        //                     requestId = null;
                            
        //                 }
        //             }            
        //         };
        //         requestId = requestAnimationFrame(animation);
        //     }
        // }
    }
}