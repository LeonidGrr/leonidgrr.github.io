import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class CameraManager {
    camera: THREE.PerspectiveCamera;
    state = 'base';

    constructor(renderer: THREE.WebGLRenderer) {
        this.camera = new THREE.PerspectiveCamera(55, document.body.clientWidth / document.body.clientHeight, 0.1, 1000);

        const controls = new OrbitControls(this.camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableRotate = false;
        controls.maxDistance = 15;
        controls.zoomSpeed = 2;
        
        this.setupCamera(this.camera, controls);

        const cameraState: {[key: string]: [THREE.Euler, THREE.Vector3]} = {
            base: [this.camera.rotation.clone(), this.camera.position.clone()],
            screen: [new THREE.Euler(-0.275, -0.225, 0), new THREE.Vector3(1.5, 13.5, -10.75)],
        };

        window.addEventListener('resize', () => {
            this.setupCamera(this.camera, controls);
            cameraState.base = [this.camera.rotation.clone(), this.camera.position.clone()];
            this.state = 'base';
        });

        const render = () => {
            requestAnimationFrame(render);
            if (cameraState[this.state]) {
                this.changeCamera(this.camera, controls, cameraState[this.state][0], cameraState[this.state][1], 0.05);
            }
            controls.update();
        };
        requestAnimationFrame(render);
    }

    changeCamera = (
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
    }

    setupCamera = (camera: THREE.PerspectiveCamera, controls: OrbitControls) => {
        camera.aspect = document.body.clientWidth / document.body.clientHeight;
        camera.updateProjectionMatrix();
        camera.position.set(0, 15, -3);
        if (camera.aspect > 1) {
            camera.fov = 55;
            camera.rotation.set(-0.135, 0, 0);
        } else {
            camera.position.set(7, 15, -3);
            camera.rotation.set(-0.0025, 0.4, 0);
            camera.fov = 77;
        }
        
        camera.updateProjectionMatrix();
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        camera.getWorldPosition(controls.target);
        controls.target.addScaledVector(direction, 1);
        controls.update();
    }
};