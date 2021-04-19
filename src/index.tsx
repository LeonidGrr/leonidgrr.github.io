import * as THREE from 'three';
import React from 'react';
import ReactDOM from 'react-dom';
import Stats from 'stats-js';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ReactGUI } from './components/ReactGUI';
import { Keyboard } from './components/Keyboard';
import { Screen } from './components/Screen';
import { Table } from './components/Table';
import postprocessing from './postprocessing';
import './index.scss';

// const stats = new Stats();
// document.body.appendChild(stats.dom);
// const gui = new dat.GUI();
const sizes = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
};

(async () => {
    const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    scene.background = scene.fog.color;
    scene.background.convertSRGBToLinear()

    const light = new THREE.AmbientLight(0xFFFFFF, 0.1);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
    camera.position.set(0, 7.5, 12.5);
    camera.layers.enable(1);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.update();

    // Post-processing
    const {
        bloomComposer,
        finalComposer,
        renderBloom,
    } = postprocessing(scene, camera, renderer);

    // Setup meshes
    const table = Table();
    scene.add(table.mesh);

    const keyboard = Keyboard(scene, camera);
    const screen = Screen(scene, renderer, camera);

    // GUI
    // ReactDOM.render(<ReactGUI />, document.querySelector('#reactRoot'));

    // Rendering
    const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio || 0;
        const width = canvas.clientWidth * pixelRatio;
        const height = canvas.clientHeight * pixelRatio;
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
        controls.update();
        keyboard.update();
        screen.update();

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
