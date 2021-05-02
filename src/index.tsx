import * as THREE from 'three';
// import React from 'react';
// import ReactDOM from 'react-dom';
import Stats from 'stats-js';
import * as dat from 'dat.gui';
import { Camera, Loader, Desktop } from './components';

import postprocessing from './postprocessing';
import './index.scss';

// const stats = new Stats();
// document.body.appendChild(stats.dom);
// const gui = new dat.GUI();

// ReactDOM.render(<ReactGUI />, document.querySelector('#reactRoot'));

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

    Loader();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000);
    scene.background = scene.fog.color;
    scene.background.convertSRGBToLinear()

    const camera = Camera(scene, renderer);

    // Post-processing
    const {
        bloomComposer,
        finalComposer,
        renderBloom,
    } = postprocessing(scene, camera, renderer);

    // Scenes
    // Sky(scene, renderer, gui);
    Desktop(scene, camera, renderer);

    // Rendering
    const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
        const canvas = renderer.domElement;
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
          bloomComposer.setSize(width, height);
          finalComposer.setSize(width, height);
        }
        return needResize;
    };

    const render = (time: number) => {
        requestAnimationFrame(render);
        time *= 0.001;
		// stats.update();

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderBloom();
        finalComposer.render();
    };
    requestAnimationFrame(render);
})();
