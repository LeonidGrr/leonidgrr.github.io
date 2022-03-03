import * as THREE from 'three';

export const Trees = (mesh: THREE.Mesh, parent: THREE.Group) => {
    mesh.position.set(-5.5, -1.27, 2.5);

    const tree2 = mesh.clone();
    tree2.position.set(-7, -1.27, -2.5);
    tree2.rotateY(Math.random() * Math.PI);
    tree2.scale.set(
        tree2.scale.x * 0.9,
        tree2.scale.y * 0.9,
        tree2.scale.z * 0.9,
    );
    parent.add(tree2);

    const tree3 = mesh.clone();
    tree3.position.set(-7.5, -1.27, -1);
    tree3.rotateY(Math.random() * Math.PI);
    tree3.scale.set(
        tree3.scale.x * 0.9,
        tree3.scale.y * 0.9,
        tree3.scale.z * 0.9,
    );
    parent.add(tree3);

    const tree4 = mesh.clone();
    tree4.position.set(-6.5, -1.27, -0.25);
    tree4.rotateY(Math.random() * Math.PI);
    tree4.scale.set(
        tree4.scale.x * 0.9,
        tree4.scale.y * 0.9,
        tree4.scale.z * 0.9,
    );
    parent.add(tree4);

    const tree5 = mesh.clone();
    tree5.position.set(-5, -1.27, 1.0);
    tree5.rotateY(Math.random() * Math.PI);
    tree5.scale.set(
        tree5.scale.x * 0.9,
        tree5.scale.y * 0.9,
        tree5.scale.z * 0.9,
    );
    parent.add(tree5);

    const clock = new THREE.Clock();
    const render = () => {
        requestAnimationFrame(render);
        [mesh, tree2, tree3, tree3, tree4, tree5].forEach(t => {
            t.rotation.y += Math.sin(clock.getElapsedTime() * Math.random() * 0.05) * Math.random() * 0.005;
            t.rotation.z += Math.sin(clock.getElapsedTime() * Math.random() * 0.05) * Math.random() * 0.005;
        });
    };
    requestAnimationFrame(render);
};
