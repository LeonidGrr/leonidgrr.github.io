import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    Keyboard,
    Screen,
    Lamp,
    Coffee,
    Desk,
    RainyWindow,
    Rain,
} from './components';
import { TextLight } from '../../components';
import desktopScene from '../../models/desktopScene.glb';

export const Desktop = async (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    gui: GUI,
) => {
    const loader = new GLTFLoader();
    const desktop = await loader.loadAsync(desktopScene);
    desktop.scene.rotateY(-Math.PI / 2);
    desktop.scene.scale.set(12, 12, 12);
    console.log(desktop.scene.children)
    desktop.scene.children.forEach(async child => {
        if (child.name === 'Desk') {
            await Desk(child as THREE.Mesh);
        }
        if (child.name === 'Lamp') {
            await Lamp(child as THREE.Mesh, scene);
        }
        if (child.name === 'Keyboard') {
            await Keyboard(child as THREE.Mesh, camera);
        }
        
        if (child.name === 'Window') {
            // await RainyWindow(child as THREE.Mesh, scene);
        }
        if (child.name === 'Screen') {
            await Screen(child as THREE.Mesh, scene, renderer);
        }
        if (child.name === 'Coffee') {
            await Coffee(child as THREE.Mesh);
        }
        if (child.name === 'Room') {
            child.receiveShadow = true;
            child.traverse(c => {
                if ((c as THREE.Mesh).isMesh) {
                    const mesh = c as THREE.Mesh;
                    (mesh.material as THREE.MeshStandardMaterial).color.set(0x000000);
                }
            });
        }
    });

    // Rain({
    //     position: new THREE.Vector3(-25, 5, -50),
    //     raindropsCount: 50000,
    //     rainPower: 0.01,
    //     maxX: 50,
    //     maxY: 50,
    //     maxZ: 5,
    // }, scene);

    const textLight = await TextLight('Hello world!', scene);
    textLight.mesh.position.set(-9, 12, -22);
    textLight.mesh.rotateY(Math.PI / 6);
    textLight.mesh.rotateX(-Math.PI / 10);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
    desktop.scene.add(ambientLight);

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
    desktop.scene.add(spotLight);

    scene.add(desktop.scene);
}