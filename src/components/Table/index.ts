import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import tableModel from '../../models/table.glb';

export const Table = (scene: THREE.Scene) => {
    const loader = new GLTFLoader();
    loader.load(tableModel,
        gltf => {
            gltf.scene.traverse(function (child) {
                if ((child as THREE.Mesh).isMesh) {
                    // const mesh = child as THREE.Mesh;
                    child.receiveShadow = true;
                    // mesh.material = new THREE.MeshPhysicalMaterial({
                    //     roughness: 0.5,
                    //     clearcoat: 1.0,
                    //     clearcoatRoughness: 0.1,
                    //     color: 0x323138,
                    // });
                }
            });
            gltf.scene.scale.set(16, 16, 16);
            gltf.scene.position.set(0, -9.2, 0);
            scene.add(gltf.scene);

        }, 
        progressEvent => {
            console.log(progressEvent)
        },
        error => {
            console.error(error);
        });

    const update = () => {
    };

    return { update };
    // const geometry = new THREE.PlaneGeometry(1000, 1000);
    // const material = new THREE.MeshPhysicalMaterial({
    //     color: 0xFFFFFF,
    // });
    // const mesh = new THREE.Mesh(geometry, material);
    // mesh.receiveShadow = true;
    // mesh.rotateX(-Math.PI / 2);
    // mesh.rotateZ(-Math.PI / 3);
    // mesh.position.y = -0.55;
    
    // return { mesh };
};
