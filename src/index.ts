import * as THREE from 'three';
import Stats from 'stats-js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { Venusian } from './components/Venusian';
// import { Atmo } from './components/Atmo';
import { Dawn } from './components/Dawn';
import { Rain } from './components/Rain';
// import { ParticlePointer } from './components/ParticlePointer';
import './index.scss';
// import { Venusian } from './components/Venusian';

const sizes = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
};

const setup = async () => {
    const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
    const renderer = new THREE.WebGLRenderer({ canvas });

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 10;
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.update();

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    // const planeGeometry = new THREE.PlaneGeometry(100, 100);
    // const planeMaterial = new THREE.MeshBasicMaterial({
    //     wireframe: true,
    // });
    // const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    // planeMesh.rotateX(-Math.PI / 2);
    // planeMesh.position.y = -10;
    // scene.add(planeMesh);

    const dawn = Dawn(scene);

    // const rain = Rain();
    // scene.add(rain.ref);

    // const wasm = await import('../boids-wasm/pkg/boids_wasm');
    // const obstacles: THREE.Mesh[] = [];
    // const obstacleGeometry = new THREE.BoxGeometry(100, 100, 100);
    // const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
    // obstacleMaterial.opacity = 0.0;
    // const obstacle1 = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    // obstacles.push(obstacle1);
    // scene.add(obstacle1);
    // const config = wasm.boids_config();
    // config.time_scale = 0.001;
    // config.obstacle_dist = 10;
    // const boids = Boids(wasm, config, 300, obstacles, scene);

    // Pointer targets
    // const materialExample = new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: true });

    // const geometryExample2 = new THREE.SphereGeometry(5).toNonIndexed();
    // const meshExample2 = new THREE.Mesh(geometryExample2, materialExample);
    // meshExample2.position.x = 40;
    // scene.add(meshExample2);

    // const geometryExample3 = new THREE.BoxGeometry(10, 3, 16).toNonIndexed();
    // const meshExample3 = new THREE.Mesh(geometryExample3, materialExample);
    // meshExample2.position.x = -40;
    // scene.add(meshExample3);

    // const pointer = ParticlePointer([meshExample1, meshExample2, meshExample3]);
    // scene.add(pointer.refMesh);

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
        // rain.update();

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