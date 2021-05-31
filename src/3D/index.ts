import * as THREE from 'three';
import { RenderingManager, CameraManager } from './components';
import Stats from 'stats-js';
import postprocessing from './postprocessing';
import * as dat from 'dat.gui';

const stats = new Stats();
document.body.appendChild(stats.dom);
// const gui = new dat.GUI();

export const init = (
    setCurrentCamera: (name: string) => void,
) => {
    const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;

    // Scene and camera manager
    const cameraManager = new CameraManager(renderer);
    const {
        scene,
        changeScene,
        changeCamera,
    } = new RenderingManager(renderer, cameraManager, setCurrentCamera);

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

    return {
        changeScene,
        changeCamera,
    };
};