import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import fontTtf from '../../../assets/fonts/Prime-Regular.ttf'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export const TextLight = async (scene: THREE.Scene, camera: THREE.Camera) => {
    const ttfLoader = new TTFLoader();
    const fontLoader = new FontLoader()
    let font = await ttfLoader.loadAsync(fontTtf);
    font = fontLoader.parse(font);

    const geometry = new TextGeometry('Hello world!', {
        font: font as any,
        size: 0.45,
        height: 0.3,
    });
    
    const material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        flatShading: true,
        emissive: 0xffffff,
        emissiveIntensity: 1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name="text_mesh"
    mesh.layers.enable(1);
    mesh.position.set(-4, 9.75, -17);
    mesh.rotateY(Math.PI / 12);
    mesh.rotateX(-Math.PI / 10);
    scene.add(mesh)

    const clock = new THREE.Clock();
    const render = () => {
        const sin = Math.sin(clock.getElapsedTime());
        mesh.position.y += sin * Math.random() * 0.0005;

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

