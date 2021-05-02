import * as THREE from 'three';
import smoke from '../../textures/smoke.png'

export const Coffee = async (mesh: THREE.Mesh) => {
    mesh.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const loader = new THREE.TextureLoader();
    const smokeTexture = loader.load(smoke);
    const smokeGeometry = new THREE.PlaneBufferGeometry(75, 25);
    const smokeMaterial = new THREE.MeshPhongMaterial({
        map: smokeTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
    });
    const smokeMesh = new THREE.Mesh(smokeGeometry, smokeMaterial);
    smokeMesh.rotateY(-Math.PI / 2);
    smokeMesh.position.z = 50;
    smokeMesh.castShadow = false;
    smokeMesh.receiveShadow = false;
    mesh.add(smokeMesh);
};
