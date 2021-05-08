import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const sizes = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
};

const pointer = new THREE.Vector2();
document.addEventListener('mousemove', (e: MouseEvent) => {
    pointer.x = (e.clientX / document.body.clientWidth) * 2 - 1;
    pointer.y = -(e.clientY / document.body.clientHeight) * 2 + 1;
});

const changeCamera = (
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    target: THREE.Vector3,
    nextTarget: THREE.Vector3,
    position: THREE.Vector3,
    timing: number,
) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, position.x, timing);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, position.y, timing);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, position.z, timing);
    nextTarget.x = THREE.MathUtils.lerp(nextTarget.x, target.x, timing);
    nextTarget.y = THREE.MathUtils.lerp(nextTarget.y, target.y, timing);
    nextTarget.z = THREE.MathUtils.lerp(nextTarget.z, target.z, timing);
    controls.target = nextTarget;
};

const setupCamera = (camera: THREE.PerspectiveCamera, controls: OrbitControls) => {
    camera.aspect = document.body.clientWidth / document.body.clientHeight;
    if (camera.aspect > 1) {
        camera.position.set(0, 15, -3);
        camera.rotation.set(-0.185, 0, 0);
        controls.maxAzimuthAngle = Math.PI / 12;
        controls.minAzimuthAngle = -Math.PI / 12;
        controls.maxPolarAngle = Math.PI / 2.2;
        controls.minPolarAngle = Math.PI / 2.2;
    } else {
        camera.position.set(14, 17, 4);
        camera.rotation.set(0, 0.55, 0);
        controls.maxAzimuthAngle = Math.PI / 4.5;
        controls.minAzimuthAngle = Math.PI / 7.5;
        controls.maxPolarAngle = Math.PI / 2;
        controls.minPolarAngle = Math.PI / 2;
    }
    camera.updateProjectionMatrix();
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    camera.getWorldPosition(controls.target);
    controls.target.addScaledVector(direction, 1);
    controls.update();
};


export const Camera = (scene: THREE.Scene, renderer: THREE.WebGLRenderer) => {
    const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.maxDistance = 10;
    controls.minDistance = 0.02;
    controls.zoomSpeed = 2;
    
    setupCamera(camera, controls);

    // const baseRotation = new THREE.Vector3(-0.3, 0, 0);
    // const basePosition = new THREE.Vector3(0, 13.4, -5);

    // const keyboardRotation = new THREE.Vector3(0, 0, 2);
    // const keyboardPosition = new THREE.Vector3(0, 9, 7.5);

    // const screenRotation = new THREE.Vector3(4, 2, -5);
    // const screenPosition = new THREE.Vector3(0, 9, 10);

    // const nextTarget = new THREE.Vector3();
    
    // const raycaster = new THREE.Raycaster();
    // const targets: {[key: string]: THREE.Object3D} = {};

    addEventListener('resize', () => setupCamera(camera, controls));

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