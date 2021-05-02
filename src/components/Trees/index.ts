import * as THREE from 'three';

export const Trees = (mesh: THREE.Mesh, parent: THREE.Group) => {
    mesh.position.z += 0.5;
    mesh.position.x = -4.5;

    const tree2 = mesh.clone();
    tree2.position.set(-7, -0.27, -2.5);
    tree2.rotateY(Math.random() * Math.PI);
    tree2.scale.set(
        tree2.scale.x * 0.9,
        tree2.scale.y * 0.9,
        tree2.scale.z * 0.9,
    );
    parent.add(tree2);
};
