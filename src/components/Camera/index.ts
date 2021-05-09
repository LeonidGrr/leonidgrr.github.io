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
    targetRotation: THREE.Euler,
    targetPosition: THREE.Vector3,
    timing: number,
) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPosition.x, timing);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPosition.y, timing);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPosition.z, timing);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.x, timing);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.y, timing);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotation.z, timing);

    camera.updateProjectionMatrix();
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    camera.getWorldPosition(controls.target);
    controls.target.addScaledVector(direction, 1);
    controls.update();
};

const setupCamera = (camera: THREE.PerspectiveCamera, controls: OrbitControls) => {
    camera.aspect = document.body.clientWidth / document.body.clientHeight;
    if (camera.aspect > 1) {
        camera.position.set(0, 15, -3);
        camera.rotation.set(-0.185, 0, 0);
        // controls.maxAzimuthAngle = Math.PI / 12;
        // controls.minAzimuthAngle = -Math.PI / 12;
        // controls.maxPolarAngle = Math.PI / 2.2;
        // controls.minPolarAngle = Math.PI / 2.2;
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

export const Camera = (
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
) => {
    const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000);
    scene.add(camera);
    camera.name = 'camera0';

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.maxDistance = 15;
    controls.zoomSpeed = 2;
    
    setupCamera(camera, controls);

    const cameraState: {[key: string]: [THREE.Euler, THREE.Vector3]} = {
        base: [camera.rotation.clone(), camera.position.clone()],
        keyboard: [new THREE.Euler(-0.5, 0, 0), new THREE.Vector3(0, 13, -10.5)],
        screen: [new THREE.Euler(-0.3, -0.05, 0), new THREE.Vector3(0, 13, -10.5)],
    };
    let currentState = 'base';
    let cameraChanged = true;

    addEventListener('resize', () => {
        setupCamera(camera, controls);
        cameraState.base = [camera.rotation.clone(), camera.position.clone()];
    });

    const raycaster = new THREE.Raycaster();
    const targets: {[key: string]: THREE.Object3D} = {};

    document.addEventListener('pointerdown', () => {
        if (!targets.keyboard) {
            const keyboard = scene.getObjectByName('plate');
            if (keyboard) targets.keyboard = keyboard;
        }
        if (!targets.screen) {
            const screen = scene.getObjectByName('screen');
            if (screen) targets.screen = screen;
        }

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(Object.values(targets)); 
        if (intersects.length > 0) {
            if (intersects[0].object.name === 'plate') {
                console.log(scene.getObjectByName('plate'))
                if (currentState !== 'keyboard') {
                    currentState = 'keyboard';
                    cameraChanged = false;
                }
            }
            if (intersects[0].object.name === 'screen') {
                console.log(scene.getObjectByName('screen'))
                if (currentState !== 'screen') {
                    currentState = 'screen';
                    cameraChanged = false;
                }
            }
        } else {
            cameraChanged = true;
        }
    }, false);

    const render = () => {
        requestAnimationFrame(render);

        if (!cameraChanged) {
            changeCamera(camera, controls, cameraState[currentState][0], cameraState[currentState][1], 0.05);
        }
        controls.update();
    };
    requestAnimationFrame(render);

    return camera;
};