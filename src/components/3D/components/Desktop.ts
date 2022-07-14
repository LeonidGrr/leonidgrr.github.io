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
    ParticleText,
    Sky
} from '.';
import desktopScene from '../models/sceneDraco.glb';
import background from '../textures/background_half_transparent_0.png';

export enum SceneThemeMode {
    DAY = 'day',
    NIGHT = 'night',
    FREE = 'free',
};

export type SceneTheme = {
    setFreeMode: () => void,
    mode: SceneThemeMode,
};

export const Desktop = async (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    tooltip: Tooltip,
) => {
    const setFreeMode = () => theme.mode = SceneThemeMode.FREE;
    const theme = {
        setFreeMode,
        mode: SceneThemeMode.NIGHT,
    };

    let dat = await import('dat.gui');
    const gui = new dat.GUI();
    gui.add(theme, 'mode', { Day: SceneThemeMode.DAY, Night: SceneThemeMode.NIGHT, Free: SceneThemeMode.FREE }).listen();
    gui.close();

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
            await Lamp(child as THREE.Mesh, scene, theme);
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
            Windows(child as THREE.Mesh, camera, tooltip, theme);
        }
        if (child.name === 'Room') {
            child.traverse(c => {
                if ((c as THREE.Mesh).isMesh) {
                    const mesh = c as THREE.Mesh;
                    (mesh.material as THREE.MeshStandardMaterial).color.set(0x282828);
                }
            });
        }
    });
    scene.add(desktop.scene);

    await Sky(renderer, scene, camera, theme, gui);

    Rain(camera, scene);

    await ParticleText(scene, camera);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 35, 35);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-15, 30, -50);
    directionalLight2.rotateY(-Math.PI / 16);
    scene.add(directionalLight2);

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

    const render = () => {
        if (theme.mode === SceneThemeMode.DAY) {
            directionalLight.intensity = THREE.MathUtils.lerp(directionalLight.intensity, 2.25, 0.1);
            directionalLight2.intensity = THREE.MathUtils.lerp(directionalLight2.intensity, 2, 0.1);
        } else if (theme.mode === SceneThemeMode.NIGHT) {
            directionalLight.intensity = THREE.MathUtils.lerp(directionalLight.intensity, 0, 0.05);
            directionalLight2.intensity = THREE.MathUtils.lerp(directionalLight2.intensity, 0.0, 0.05);
        }
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
}
