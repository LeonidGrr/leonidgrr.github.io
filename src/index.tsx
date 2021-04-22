import * as THREE from 'three';
// import React from 'react';
// import ReactDOM from 'react-dom';
import Stats from 'stats-js';
import * as dat from 'dat.gui';
import {
    Keyboard,
    Screen,
    Table,
    SphereLight,
    TextLight,
    Camera,
} from './components';
import postprocessing from './postprocessing';
import './index.scss';

const stats = new Stats();
document.body.appendChild(stats.dom);
const gui = new dat.GUI();

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

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    scene.background = scene.fog.color;
    scene.background.convertSRGBToLinear()

    
    const camera = Camera(scene, renderer, gui);

    const light = new THREE.AmbientLight(0xFFFFFF, 0.4);
    scene.add(light);

    let spotLight = new THREE.SpotLight(0xffffff, 2.5);
    spotLight.position.set(-15, 20, 15);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 1;
    spotLight.decay = 2;
    spotLight.distance = 200;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 50;
    spotLight.shadow.focus = 1;
    scene.add(spotLight);

    let lightHelper = new THREE.SpotLightHelper( spotLight );
    scene.add( lightHelper );

    let shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    scene.add( shadowCameraHelper );

    // Post-processing
    const {
        bloomComposer,
        finalComposer,
        renderBloom,
    } = postprocessing(scene, camera, renderer, gui);

    // Setup meshes
    // const lamp = SphereLight(scene);
    const textLight = await TextLight('Hello world!', scene);
    textLight.mesh.position.set(-11, 0.1, -1);
    textLight.mesh.rotateY(Math.PI / 8);
    textLight.mesh.rotateX(-Math.PI / 12);

    await Table(scene);
    await Keyboard(scene, camera, gui);
    await Screen(scene, renderer, camera);

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
		stats.update();

        // lamp.update();

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
