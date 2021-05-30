import * as THREE from 'three';
import { Tooltip } from './Tooltip';

export const Window = (mesh: THREE.Mesh, tooltip: Tooltip) => {
    let state = 'open';
    mesh.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    mesh.rotation.y -= 0.05;
    // tooltip.addTarget(mesh, 'Window', new THREE.Vector3(0, 0, 0));
    // setTimeout(() => state = 'closed', 5000);
    const clock = new THREE.Clock();
    const render = () => {
        if (state === 'open') {
            mesh.rotation.y += Math.sin(clock.getElapsedTime()) * 0.001;

        } else if (mesh.rotation.y < 0) {
            mesh.rotation.y += 0.01;
        }

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
}
