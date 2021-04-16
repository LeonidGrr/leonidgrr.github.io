import * as THREE from 'three';
import Stats from 'stats-js';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Keyboard } from './components/Keyboard';
import './index.scss';

const sizes = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
};

const setup = async () => {
    const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
    const renderer = new THREE.WebGLRenderer({ canvas });
    // renderer.shadowMap.enabled = true;

    const gui = new dat.GUI();
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);

    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000);
    camera.position.set(1.157, 10.921, 10.312);
    camera.rotation.set(-0.9, 0.08, 0.1);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.update();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
    directionalLight.position.set(10, 50, 25);
    scene.add(directionalLight);

    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.receiveShadow = true;
    planeMesh.rotateX(-Math.PI / 2);
    planeMesh.position.y = -0.9;
    scene.add(planeMesh);

    const keyboard = Keyboard(scene, camera);

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