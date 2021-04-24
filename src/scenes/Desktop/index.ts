import * as THREE from 'three';
import { GUI } from 'dat.gui';
import {
    Keyboard,
    Screen,
    Table,
    Coffee,
    Lamp,
    TextLight,
} from '../../components';

export const Desktop = async (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    gui: GUI,
) => {
    const desktopScene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
    desktopScene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.5);
    spotLight.position.set(-15, 20, 15);
    spotLight.angle = Math.PI / 3;
    spotLight.penumbra = 1;
    spotLight.decay = 1;
    spotLight.distance = 200;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 50;
    spotLight.shadow.focus = 1;
    desktopScene.add(spotLight);

    // Setup meshes
    const textLight = await TextLight('Hello world!', scene);
    textLight.mesh.position.set(-9, 5, -5);
    textLight.mesh.rotateY(Math.PI / 8);
    textLight.mesh.rotateX(-Math.PI / 12);

    await Lamp(desktopScene);
    await Coffee(desktopScene);
    await Table(desktopScene);
    await Keyboard(desktopScene, camera, gui);
    await Screen(desktopScene, renderer, camera);

    scene.add(desktopScene);
}