import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import coffeeModel from '../../models/coffee.glb';

export const Coffee = async (scene: THREE.Scene) => {
    const loader = new GLTFLoader();

    const gltf = await loader.loadAsync(coffeeModel);
    console.log(gltf)
    gltf.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            child.castShadow = true;
            child.receiveShadow = true;
            if (mesh.name === 'Cups_Steam_0') {
                console.log(mesh);
                (mesh.material as THREE.MeshStandardMaterial).color.set(0xff0000);
            }
        }
    });
    gltf.scene.scale.set(0.15, 0.15, 0.15);
    gltf.scene.position.set(10, -0.575, 4);
    gltf.scene.rotateY(-Math.PI / 1.5);

    scene.add(gltf.scene);
};
