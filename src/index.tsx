import * as THREE from 'three';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactGUI } from './ReactGUI';
import { Loader, RenderingManager, Camera } from './components';
import Stats from 'stats-js';
import postprocessing from './postprocessing';
import * as dat from 'dat.gui';

import './index.scss';

if (!window.WebGLRenderingContext) {
    // the browser doesn't even know what WebGL is
    const link = new Location;
    link.href = "http://get.webgl.org";
    window.location = link;
} else {
    const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
    const context = canvas.getContext("webgl");
    if (!context) {
        // browser supports WebGL but initialization failed.
        const link = new Location;
        link.href = "http://get.webgl.org/troubleshooting";
        window.location = link;
    }
}

const stats = new Stats();
document.body.appendChild(stats.dom);
// const gui = new dat.GUI();

(async () => {
    const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;

    const camera = Camera(renderer);

    // Rendering
    const renderingManager = new RenderingManager(camera, renderer);
    const handleChangeScene = (sceneName: string) => renderingManager.changeScene(sceneName);

    // Post-processing
    const rendering = postprocessing(renderingManager.scene, camera, renderer);   
    
    Loader(() => ReactDOM.render(<ReactGUI
        onChangeScene={handleChangeScene}
    />, document.querySelector('#reactRoot')));

    const render = (time: number) => {
        requestAnimationFrame(render);
        time *= 0.001;
		stats.update();

        rendering.renderBloom();
        rendering.finalComposer.render();
    };
    requestAnimationFrame(render);
})();
