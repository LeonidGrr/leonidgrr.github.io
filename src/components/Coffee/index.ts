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
    const smokeGeometry = new THREE.PlaneGeometry(40, 25);
    const smokeMaterial = new THREE.MeshPhongMaterial({
        map: smokeTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
    });
    const smokeMesh = new THREE.Mesh(smokeGeometry, smokeMaterial);
    smokeMesh.rotateY(-Math.PI / 2);
    smokeMesh.position.z = 45;
    smokeMesh.castShadow = false;
    smokeMesh.receiveShadow = false;
    mesh.add(smokeMesh);

    const render = () => {
        smokeMesh.position.z += 0.0125;
        smokeMesh.material.opacity -= 0.001;
        if (smokeMesh.material.opacity <= 0) {
            smokeMesh.material.opacity = 0.75;
            smokeMesh.position.set(0, 0, 45);
        }
        smokeMesh.rotateZ(0.001);
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};
