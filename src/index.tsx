import * as THREE from 'three';
import React from 'react';
import ReactDOM from 'react-dom';
import Stats from 'stats-js';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ReactGUI } from './components/ReactGUI';
import { Keyboard } from './components/Keyboard';
import './index.scss';
import { Table } from './components/Table';

const sizes = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
};

const setup = async () => {
    const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const gui = new dat.GUI();
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);

    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
    camera.position.set(-0.669, 12.223, 13.995);
    camera.rotation.set(-0.628, -0.124, -0.090);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.update();

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.position.set(10, 50, 10);
    scene.add(pointLight);

    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    const table = Table();
    scene.add(table.mesh);

    const keyboard = Keyboard(scene, camera);

    ReactDOM.render(<ReactGUI />, document.querySelector('#reactRoot'));

    const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio || 0;
        const width = canvas.clientWidth * pixelRatio;
        const height = canvas.clientHeight * pixelRatio;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    };

    const render = (time: number) => {
        time *= 0.001;
		stats.update();
        controls.update();
        keyboard.update();

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

setup();