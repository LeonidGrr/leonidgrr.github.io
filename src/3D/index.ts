import * as THREE from 'three';
import { RenderingManager, CameraManager } from './components';
import Stats from 'stats-js';
import postprocessing from './postprocessing';
import * as dat from 'dat.gui';

// if (!window.WebGLRenderingContext) {
//     // the browser doesn't even know what WebGL is
//     const link = new Location;
//     link.href = "http://get.webgl.org";
//     window.location = link;
// } else {
//     const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
//     const context = canvas.getContext("webgl");
//     if (!context) {
//         // browser supports WebGL but initialization failed.
//         const link = new Location;
//         link.href = "http://get.webgl.org/troubleshooting";
//         window.location = link;
//     }
// }

const stats = new Stats();
document.body.appendChild(stats.dom);
// const gui = new dat.GUI();

export const init = () => {
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
        activeScene,
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