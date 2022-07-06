import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import {
    Keyboard,
    Screen,
    Lamp,
    Coffee,
    Rain,
    Trees,
    Tooltip,
    Windows,
    TextLight,
    StreetLight,
} from '.';
import desktopScene from '../assets/models/desktopSceneDraco.glb';
import background from '../assets/textures/background.png';

export const Desktop = async (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    tooltip: Tooltip,
) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');
    dracoLoader.preload();

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const desktop = await loader.loadAsync(desktopScene);

    desktop.scene.rotateY(-Math.PI / 2);
    desktop.scene.scale.set(12, 12, 12);
    desktop.scene.children.forEach(async child => {
        if (child.name === 'Desk') {
            child.traverse(function (c) {
                if ((c as THREE.Mesh).isMesh) {
                    c.castShadow = true;
                    c.receiveShadow = true;
                }
            });
        }
        if (child.name === 'Lamp') {
            await Lamp(child as THREE.Mesh, scene);
        }
        if (child.name === 'Keyboard') {
            await Keyboard(child as THREE.Mesh, camera, tooltip);
        }
        if (child.name === 'Floor') {
            child.receiveShadow = true;
            const mesh = child as THREE.Mesh;
            (mesh.material as THREE.MeshStandardMaterial).color.set(0x003c8c);
        }
        if (child.name === 'Screen') {
            await Screen(child as THREE.Mesh, scene, renderer, tooltip);
        }
        if (child.name === 'Coffee') {
            await Coffee(child as THREE.Mesh);
        }
        if (child.name === 'Tree') {
            Trees(child as THREE.Mesh, desktop.scene);
        }
        if (child.name === 'Windows') {
            Windows(child as THREE.Mesh, camera, tooltip);
        }
        if (child.name === 'Room') {
            child.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
                if ((c as THREE.Mesh).isMesh) {
                    const mesh = c as THREE.Mesh;
                    (mesh.material as THREE.MeshStandardMaterial).color.set(0xffffff);
                }
            });
        }
    });
    scene.add(desktop.scene);

    Rain({
        position: new THREE.Vector3(-50, 5, -100),
        raindropsCount: 200,
        rainPower: 0.25,
        maxX: 100,
        maxY: 100,
        maxZ: 50,
    }, camera, scene);

    await TextLight('Hello world!', scene);

    // Night
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.18);
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(background);
    backgroundTexture.wrapS = THREE.RepeatWrapping;
    backgroundTexture.wrapT = THREE.RepeatWrapping;
    backgroundTexture.repeat.set(4, 1);
    const backgroundGeometry = new THREE.PlaneBufferGeometry(500, 75);
    const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });
    const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    backgroundMesh.position.z = -400;
    scene.add(backgroundMesh);

    // Day
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.name = 'directional_light';
    directionalLight.position.set(0, 25, 25);
    scene.add(directionalLight);

    StreetLight(scene);

}