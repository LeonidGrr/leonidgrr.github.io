import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import deskModel from '../../models/desk.glb';

export const Desk = async (scene: THREE.Scene) => {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(deskModel);
    gltf.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            if (child.name === 'defaultMaterial') {
                child.name = 'table';
            }
            child.receiveShadow = true;
        }
    });
    gltf.scene.scale.set(0.2, 0.2, 0.2);
    gltf.scene.position.set(-17.3, -7.85, 0);
    scene.add(gltf.scene);
};
