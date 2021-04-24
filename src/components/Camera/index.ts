import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const sizes = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
};

document.addEventListener('mousemove', (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
});

const pointer = new THREE.Vector2();


export const Camera = (scene: THREE.Scene, renderer: THREE.WebGLRenderer, gui: GUI) => {
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000);
    camera.rotation.set(0, 2, 0);
    camera.position.set(0, 10, 18);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enabled = false;
    controls.update();

    const folder = gui.addFolder('Orbit camera');
    folder.add(controls, 'enabled');
    
    const baseRotation = new THREE.Vector3(0, 2, 0);
    const basePosition = new THREE.Vector3(0, 10, 18);
    
    // const tableRotation = new THREE.Vector3();
    // const tablePosition = new THREE.Vector3(0, 9, 10);

    const keyboardRotation = new THREE.Vector3(0, 0, 2);
    const keyboardPosition = new THREE.Vector3(0, 9, 7.5);

    const screenRotation = new THREE.Vector3(4, 2, -5);
    const screenPosition = new THREE.Vector3(0, 9, 10);

    const nextTarget = new THREE.Vector3();
    const changeCamera = (target: THREE.Vector3, postion: THREE.Vector3) => {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, postion.x, 0.03);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, postion.y, 0.03);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, postion.z, 0.03);
        nextTarget.x = THREE.MathUtils.lerp(nextTarget.x, target.x, 0.03);
        nextTarget.y = THREE.MathUtils.lerp(nextTarget.y, target.y, 0.03);
        nextTarget.z = THREE.MathUtils.lerp(nextTarget.z, target.z, 0.03);
        controls.target = nextTarget;
    };

    const raycaster = new THREE.Raycaster();
    const targets: {[key: string]: THREE.Object3D} = {};

    const render = () => {
        if (!targets.keyboard) {
            const keyboard = scene.getObjectByName('plate');
            if (keyboard) targets.keyboard = keyboard;
        }
        if (!targets.screen) {
            const screen = scene.getObjectByName('screen');
            if (screen) targets.screen = screen;
        }
        // if (!targets.table) {
        //     const table = scene.getObjectByName('table');
        //     if (table) targets.table = table;
        // }
        requestAnimationFrame(render);

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(Object.values(targets)); 
        if (intersects.length > 0 && !controls.enabled) {
            if (intersects[0].object.name === 'plate') {
                changeCamera(keyboardRotation, keyboardPosition);
            }
            if (intersects[0].object.name === 'screen') {
                changeCamera(screenRotation, screenPosition);
            }
        } else if (!controls.enabled) {
            changeCamera(baseRotation, basePosition)
        }
        controls.update();
    };
    requestAnimationFrame(render);

    return camera;
};