import * as THREE from 'three';
import {
    Rain,
    Tooltip,
    ParticleText,
    Sky,
    Desktop
} from '.';
import background from '../textures/background_half_transparent_0.png';
import Stats from 'stats-js';

export enum SceneThemeMode {
    DAY = 'day',
    NIGHT = 'night',
    DAWN = 'dawn',
    FREE = 'free',
};

export type SceneTheme = {
    setFreeMode: () => void,
    mode: SceneThemeMode,
};

export const Scene = async (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    tooltip: Tooltip,
) => {
    // Theme
    const setFreeMode = () => theme.mode = SceneThemeMode.FREE;
    const theme = {
        setFreeMode,
        mode: SceneThemeMode.NIGHT,
    };

    // Debug
    let dat = await import('dat.gui');
    const gui = new dat.GUI();
    gui.add(theme, 'mode', { Day: SceneThemeMode.DAY, Night: SceneThemeMode.NIGHT, Dawn: SceneThemeMode.DAWN, Free: SceneThemeMode.FREE }).listen();
    gui.close();
    gui.hide();

    const stats = new Stats();
    document.body.appendChild(stats.dom);
    stats.dom.style.display = 'none';

    const setMode = (m: MessageEvent<string>) => {
        if (typeof m.data === 'string') {
            const data = m.data.split(':');
            if (data[0] === 'debug') {
                if (data[1] === 'true') {
                    gui.show();
                    stats.dom.style.display = 'block';
                } else {
                    gui.hide();
                    stats.dom.style.display = 'none';
                }
            }
            if (data[0] === 'mode') {
                const modeExist = Object.values(SceneThemeMode).includes(data[1] as SceneThemeMode);
                if (modeExist) {
                    theme.mode = data[1] as SceneThemeMode;
                }
            }
        }
    };
    window.addEventListener('message', setMode);

    // Setup scene
    Desktop(scene, camera, renderer, tooltip, theme, gui);
    await Sky(renderer, scene, theme, gui);
    Rain(camera, scene);
    await ParticleText(scene, camera, gui);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
    directionalLight.position.set(0, 35, 35);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0);
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
        if (theme.mode === SceneThemeMode.DAY || theme.mode === SceneThemeMode.DAWN) {
            directionalLight.intensity = THREE.MathUtils.lerp(directionalLight.intensity, 1.25, 0.1);
            directionalLight2.intensity = THREE.MathUtils.lerp(directionalLight2.intensity, 1, 0.1);
        } else if (theme.mode === SceneThemeMode.NIGHT) {
            directionalLight.intensity = THREE.MathUtils.lerp(directionalLight.intensity, 0, 0.05);
            directionalLight2.intensity = THREE.MathUtils.lerp(directionalLight2.intensity, 0, 0.05);
        }
		stats.update();
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
}
