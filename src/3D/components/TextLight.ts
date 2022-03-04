import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import fontTtf from '../../fonts/Prime-Regular.ttf'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export const TextLight = async (text: string, scene: THREE.Scene) => {
    // Font
    const ttfLoader = new TTFLoader();
    const fontLoader = new FontLoader()
    let font = await ttfLoader.loadAsync(fontTtf);
    font = fontLoader.parse(font);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        flatShading: true,
        emissive: 0xffffff,
        emissiveIntensity: 1,
    });

    const geometry = new TextGeometry(text, {
        font: font as any,
        size: 0.45,
        height: 0.3,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name="text_mesh"
    mesh.layers.enable(1);

    mesh.position.set(-4.5, 9.75, -15.5);
    mesh.rotateY(Math.PI / 12);
    mesh.rotateX(-Math.PI / 10);

    scene.add(mesh)

    const clock = new THREE.Clock();
    const render = () => {
        requestAnimationFrame(render);
        const sin = Math.sin(clock.getElapsedTime());
        material.emissiveIntensity *= sin * 0.5;
        mesh.position.y += sin * Math.random() * 0.0005;
    };
    requestAnimationFrame(render);
};
