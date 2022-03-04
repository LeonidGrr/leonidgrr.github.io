import * as THREE from 'three';

const makeTreeCloneAtPosition = (orig: THREE.Mesh, x: number, y: number, z: number) => {
    const tree = orig.clone();
    tree.position.set(x, y, z);
    tree.rotateY(Math.random() * Math.PI);
    tree.scale.set(
        tree.scale.x * 0.9,
        tree.scale.y * 0.9,
        tree.scale.z * 0.9,
    );
    return tree
};

export const Trees = (mesh: THREE.Mesh, parent: THREE.Group) => {
    mesh.position.set(-5.5, -1.5, 2.5);

    const tree2 = makeTreeCloneAtPosition(mesh, -6.75, -1.25, -2.75);
    parent.add(tree2);

    const tree3 = makeTreeCloneAtPosition(mesh, -7.25, -1.75, -1.75);
    parent.add(tree3);

    const tree4 = makeTreeCloneAtPosition(mesh, -6.25, -1.5, -0.5);
    parent.add(tree4);

    const tree5 = makeTreeCloneAtPosition(mesh, -5.5, -2.25, 0.25);
    parent.add(tree5);

    const clock = new THREE.Clock();
    const render = () => {
        requestAnimationFrame(render);
        [mesh, tree2, tree3, tree3, tree4, tree5].forEach(t => {
            t.rotation.y += Math.sin(clock.getElapsedTime() * Math.random() * 0.05) * Math.random() * 0.001;
            t.rotation.z += Math.sin(clock.getElapsedTime()) * Math.random() * 0.00015;
        });
    };
    requestAnimationFrame(render);
};
