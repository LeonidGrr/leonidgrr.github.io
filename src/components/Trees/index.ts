import * as THREE from 'three';

export const Trees = (mesh: THREE.Mesh, parent: THREE.Group) => {
    mesh.position.z += 0.5;
    mesh.position.x = -4.5;
    mesh.scale.set(
        mesh.scale.x * 1.1,
        mesh.scale.y * 1.1,
        mesh.scale.z * 1.1,
    );

    const tree2 = mesh.clone();
    tree2.position.set(-5, -0.27, 1.5);
    tree2.rotateY(Math.random() * Math.PI);
    parent.add(tree2);

    const tree3 = mesh.clone();
    tree3.position.set(-7, -0.27, -2.5);
    tree3.rotateY(Math.random() * Math.PI);
    tree3.scale.set(
        tree3.scale.x * 0.9,
        tree3.scale.y * 0.9,
        tree3.scale.z * 0.9,
    );
    parent.add(tree3);
};
