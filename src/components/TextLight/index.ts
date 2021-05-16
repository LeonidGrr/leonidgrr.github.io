import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import fontTtf from '../../fonts/Prime-Regular.ttf'; 

export const TextLight = async (text: string, scene: THREE.Scene) => {
    // Font
    const ttfLoader = new TTFLoader();
    const fontLoader = new THREE.FontLoader()
    let font = await ttfLoader.loadAsync(fontTtf);
    font = fontLoader.parse(font);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        flatShading: true,
        emissive: 0xffffff,
        emissiveIntensity: 1,
    });

    const geometry = new THREE.TextGeometry(text, {
        font: font as THREE.Font,
        size: 1.2,
        height: 0.3,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name="text_mesh"
    mesh.layers.enable(1);

    scene.add(mesh)

    const render = () => {
        requestAnimationFrame(render);
        const time = Date.now() * 0.0005;
        material.emissiveIntensity *= Math.cos(time) * 0.5;
    };
    requestAnimationFrame(render);

    return { mesh }
};
