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
    });

    const geometry = new THREE.TextGeometry(text, {
        font: font as THREE.Font,
        size: 1.2,
        height: 0.3,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.layers.enable(1);
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    scene.add(mesh)

    return { mesh }
};
