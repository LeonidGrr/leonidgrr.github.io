import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const sizes = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
};

document.addEventListener('mousemove', (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const pointer = new THREE.Vector2();


export const Camera = (scene: THREE.Scene, renderer: THREE.WebGLRenderer, gui: GUI) => {
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 200);
    camera.rotation.set(-0.4, 0, 0);
    camera.position.set(0, 15, -7.5);
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // controls.enabled = false;
    controls.enablePan = false;
    controls.maxAzimuthAngle = Math.PI / 8;
    controls.minAzimuthAngle = -Math.PI / 8;
    controls.maxPolarAngle = Math.PI / 2.4;
    controls.minPolarAngle = Math.PI / 3;
    controls.zoomSpeed = 2;
    camera.getWorldPosition(controls.target);
    controls.target.addScaledVector(direction, 1);
    controls.update();  

    const folder = gui.addFolder('Orbit camera');
    folder.add(controls, 'enabled');

    // const baseRotation = new THREE.Vector3(-0.3, 0, 0);
    // const basePosition = new THREE.Vector3(0, 13.4, -5);

    // const keyboardRotation = new THREE.Vector3(0, 0, 2);
    // const keyboardPosition = new THREE.Vector3(0, 9, 7.5);

    // const screenRotation = new THREE.Vector3(4, 2, -5);
    // const screenPosition = new THREE.Vector3(0, 9, 10);

    // const nextTarget = new THREE.Vector3();
    // const changeCamera = (target: THREE.Vector3, postion: THREE.Vector3, timing: number) => {
    //     camera.position.x = THREE.MathUtils.lerp(camera.position.x, postion.x, timing);
    //     camera.position.y = THREE.MathUtils.lerp(camera.position.y, postion.y, timing);
    //     camera.position.z = THREE.MathUtils.lerp(camera.position.z, postion.z, timing);
    //     nextTarget.x = THREE.MathUtils.lerp(nextTarget.x, target.x, timing);
    //     nextTarget.y = THREE.MathUtils.lerp(nextTarget.y, target.y, timing);
    //     nextTarget.z = THREE.MathUtils.lerp(nextTarget.z, target.z, timing);
    //     controls.target = nextTarget;
    // };

    // const raycaster = new THREE.Raycaster();
    // const targets: {[key: string]: THREE.Object3D} = {};

    const render = () => {
        // if (!targets.keyboard) {
        //     const keyboard = scene.getObjectByName('Keyboard');
        //     if (keyboard) targets.keyboard = keyboard;
        // }
        // if (!targets.screen) {
        //     const screen = scene.getObjectByName('Display');
        //     if (screen) targets.screen = screen;
        // }
        requestAnimationFrame(render);

        // if (!controls.enabled) {
        //     raycaster.setFromCamera(pointer, camera);
        //     const intersects = raycaster.intersectObjects(Object.values(targets)); 
        //     if (intersects.length > 0) {
        //         if (intersects[0].object.name === 'plate') {
        //             changeCamera(keyboardRotation, keyboardPosition, 0.02);
        //         }
        //         if (intersects[0].object.name === 'screen') {
        //             changeCamera(screenRotation, screenPosition, 0.02);
        //         }
        //     } else {
                // changeCamera(baseRotation, basePosition, 0.003)
        //     }
        // }
        
        controls.update();
    };
    requestAnimationFrame(render);

    return camera;
};