import * as THREE from 'three';

export enum CameraState {
    BASE = 'base',
    SCREEN = 'screen',
    WINDOWS = 'windows',
}

export class CameraManager {
    camera: THREE.PerspectiveCamera;
    state = CameraState.BASE;

    constructor() {
        this.camera = new THREE.PerspectiveCamera(55, document.body.clientWidth / document.body.clientHeight, 0.1, 1000);

        this.setupCamera(this.camera);

        const cameraModes: Record<string, [THREE.Euler, THREE.Vector3]> = {
            base: [this.camera.rotation.clone(), this.camera.position.clone()],
            screen: [new THREE.Euler(-0.275, -0.225, -0.05), new THREE.Vector3(1.5, 13.5, -10.75)],
            windows: [new THREE.Euler(-0.1, 0.0, 0.0), new THREE.Vector3(-3, 15, -17.8)],
        };

        window.addEventListener('resize', () => {
            this.setupCamera(this.camera);
            cameraModes.base = [this.camera.rotation.clone(), this.camera.position.clone()];
            this.state = CameraState.BASE;
        });

        const render = () => {
            requestAnimationFrame(render);
            if (cameraModes[this.state]) {
                this.changeCamera(this.camera, cameraModes[this.state][0], cameraModes[this.state][1], 0.05);
            }
        };
        requestAnimationFrame(render);
    }

    changeCamera = (
        camera: THREE.PerspectiveCamera,
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
    }

    setupCamera = (camera: THREE.PerspectiveCamera) => {
        camera.aspect = document.body.clientWidth / document.body.clientHeight;
        camera.updateProjectionMatrix();

        if (camera.aspect > 1) {
            camera.position.set(0, 15, -3);
            camera.rotation.set(-0.135, 0, 0);
            camera.fov = 55;
        } else {
            camera.position.set(10, 16, -1.5);
            camera.rotation.set(-0.005, 0.5, 0);
            camera.fov = 67;
        }
        
        camera.updateProjectionMatrix();
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
    }
};
