import * as THREE from 'three';

export const Trees = (mesh: THREE.Mesh, parent: THREE.Group) => {
    mesh.position.set(-4.5, -1.5, 2.5);

    const clock = new THREE.Clock();
    const render = () => {
        requestAnimationFrame(render);
        mesh.rotation.y += Math.sin(clock.getElapsedTime() * Math.random() * 0.05) * Math.random() * 0.001;
        mesh.rotation.z += Math.sin(clock.getElapsedTime()) * Math.random() * 0.00015;
    };
    requestAnimationFrame(render);
};
