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
    Sky
} from '.';
import desktopScene from '../models/sceneDraco.glb';
import background from '../textures/background_half_transparent_0.png';

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
    desktop.scene.children[0].children.forEach(async child => {
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
            (mesh.material as THREE.MeshStandardMaterial).color.set(0x0f0f0f);
        }
        if (child.name === 'Screen') {
            await Screen(child as THREE.Mesh, scene, renderer);
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
                    (mesh.material as THREE.MeshStandardMaterial).color.set(0x282828);
                }
            });
        }
    });
    scene.add(desktop.scene);

    await Sky(renderer, scene, camera);

    Rain(camera, scene);

    await TextLight('Hello world!', scene);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(0, 35, 35);
    scene.add(directionalLight);

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(background);
    backgroundTexture.wrapS = THREE.RepeatWrapping;
    backgroundTexture.wrapT = THREE.RepeatWrapping;
    backgroundTexture.repeat.set(4, 1);
    const backgroundGeometry = new THREE.PlaneBufferGeometry(500, 75);
    const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });
    backgroundMaterial.transparent = true;
    const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    backgroundMesh.position.z = -250;
    scene.add(backgroundMesh);
}
