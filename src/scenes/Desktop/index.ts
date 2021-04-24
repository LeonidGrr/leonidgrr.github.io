import * as THREE from 'three';
import { GUI } from 'dat.gui';
import {
    Keyboard,
    Screen,
    Table,
    TextLight,
} from '../../components';

export const Desktop = async (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    gui: GUI,
) => {
    const desktopScene = new THREE.Scene();

    let spotLight = new THREE.SpotLight(0xffffff, 2.5);
    spotLight.position.set(-15, 20, 15);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 1;
    spotLight.decay = 2;
    spotLight.distance = 200;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 50;
    spotLight.shadow.focus = 1;
    desktopScene.add(spotLight);

    // Setup meshes
    // const lamp = SphereLight(scene);
    const textLight = await TextLight('Hello world!', scene);
    textLight.mesh.position.set(-11, 0.1, -1);
    textLight.mesh.rotateY(Math.PI / 8);
    textLight.mesh.rotateX(-Math.PI / 12);

    await Table(desktopScene);
    await Keyboard(desktopScene, camera, gui);
    await Screen(desktopScene, renderer, camera);

    scene.add(desktopScene);
}