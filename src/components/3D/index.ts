import * as THREE from 'three';
import { RenderingManager, CameraManager } from './components';
import Stats from 'stats-js';
import postprocessing from './postprocessing';

export const init = (canvas: HTMLCanvasElement) => {
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        // antialias: true,
        powerPreference: "high-performance",
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;

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
		stats.update();

        rendering.renderBloom();
        rendering.finalComposer.render();
    };
    requestAnimationFrame(renderLoop);
};