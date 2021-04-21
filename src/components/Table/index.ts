import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import tableModel from '../../models/table.glb';

export const Table = async (scene: THREE.Scene) => {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(tableModel);
    gltf.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            child.receiveShadow = true;
        }
    });
    gltf.scene.scale.set(16, 16, 16);
    gltf.scene.position.set(0, -9.18, 0);
    scene.add(gltf.scene);

    const update = () => {
    };

    return { update };
};
