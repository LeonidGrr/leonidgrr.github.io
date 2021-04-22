import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const sizes = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
};

const pointer = new THREE.Vector2();
const mouse = new THREE.Vector2()
document.addEventListener('mousemove', (e: MouseEvent) => {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
});

export const Camera = (scene: THREE.Scene, renderer: THREE.WebGLRenderer, gui: GUI) => {
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000);
    camera.position.set(0, 8.5, 9);
    camera.rotation.set(0, 0, 0);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enabled = false;
    controls.update();

    const folder = gui.addFolder('Orbit camera');
    folder.add(controls, 'enabled');
    
    const baseRotation = new THREE.Vector3();
    const basePosition = new THREE.Vector3(0, 8.5, 9);

    const keyboardRotation = new THREE.Vector3(0, 0, 2);
    const keyboardPosition = new THREE.Vector3(0, 7, 7.5);

    const screenRotation = new THREE.Vector3(4, 1.75, -5);
    const screenPosition = new THREE.Vector3(0, 8, 7.5);

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
    raycaster.setFromCamera(pointer, camera);
    let keyboard: THREE.Object3D | null = null;
    let screen: THREE.Object3D | null = null;
    const targets: THREE.Object3D[] = [];

    const render = () => {
        if (!keyboard || !screen) {
            keyboard = scene.getObjectByName('plate') || null; 
            screen = scene.getObjectByName('screen') || null;
            keyboard && targets.push(keyboard);
            screen && targets.push(screen);
            console.log(keyboard, screen)
        }
        requestAnimationFrame(render);
        const intersects = raycaster.intersectObjects(targets); 
        if (intersects.length > 0) {
            if (intersects[0].object.name === 'plate') {
                changeCamera(intersects[0].object.position, keyboardPosition);
            }

            if (intersects[0].object.name === 'screen') {
                changeCamera(intersects[0].object.position, screenPosition);
            }
        } else {
            changeCamera(baseRotation, basePosition);
        }
        controls.update();
    };
    requestAnimationFrame(render);

    return camera;
};