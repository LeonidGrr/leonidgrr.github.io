import * as THREE from 'three';
import { RenderingManager, CameraManager } from './components';
import postprocessing from './postprocessing';

export const init = (canvas: HTMLCanvasElement) => {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // Scene and camera manager
    const cameraManager = new CameraManager();
    const {
        scene,
    } = new RenderingManager(renderer, cameraManager);

    // Rendering
    const rendering = postprocessing(scene, cameraManager.camera, renderer);   
    const renderLoop = (time: number) => {
        requestAnimationFrame(renderLoop);
        time *= 0.001;

        rendering.renderBloom();
        rendering.finalComposer.render();
    };
    requestAnimationFrame(renderLoop);
};