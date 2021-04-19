import * as THREE from 'three';

export const Table = () => {
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.rotateX(-Math.PI / 2);
    mesh.rotateZ(-Math.PI / 3);
    mesh.position.y = -0.55;
    
    return { mesh };
};
