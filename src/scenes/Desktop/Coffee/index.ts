import * as THREE from 'three';

export const Coffee = async (mesh: THREE.Mesh) => {
    mesh.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            child.castShadow = true;
            child.receiveShadow = true;
            if (mesh.name === 'Cups_Steam_0') {
                // console.log(mesh);
                (mesh.material as THREE.MeshStandardMaterial).color.set(0xff0000);
            }
        }
    });
};
