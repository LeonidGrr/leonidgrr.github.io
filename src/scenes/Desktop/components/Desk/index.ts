import * as THREE from 'three';

export const Desk = async (mesh: THREE.Mesh) => {
    mesh.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
};
