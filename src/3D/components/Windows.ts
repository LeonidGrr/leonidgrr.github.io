import * as THREE from 'three';
import { Tooltip } from './Tooltip';

export const Windows = (mesh: THREE.Mesh, camera: THREE.PerspectiveCamera,tooltip: Tooltip) => {
    const glassMaterial = new THREE.MeshStandardMaterial({
        opacity: 0.3,
        transparent: true,
        roughness: 0,
        metalness: 1,
        side: THREE.DoubleSide,
    });

    const targets: THREE.Mesh[] = [];
    let opened = true;
    let windowRef: THREE.Mesh | null = null;
    mesh.traverse(function (c) {
        if (c.name === 'Window') {
            windowRef = c as THREE.Mesh;
        }
        if (c.name === 'Plane') {
            targets.push(c as THREE.Mesh);
            tooltip.addTarget(c as THREE.Mesh, 'Close window', new THREE.Vector3(0, 0, 0));
        }
        if ((c as THREE.Mesh).isMesh && !c.name.includes('Plane')) {
            c.castShadow = true;
            c.receiveShadow = true;
        } else {
            ((c as THREE.Mesh).material as THREE.MeshStandardMaterial) = glassMaterial;
        }
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    document.addEventListener('pointerdown', (e: PointerEvent) => {
        pointer.x = (e.clientX / document.body.clientWidth) * 2 - 1;
        pointer.y = -(e.clientY / document.body.clientHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(targets);
        if (intersects.length > 0) {
            opened = false;
            tooltip.removeTarget(targets[0]?.uuid);
        }
    });

    if (windowRef) {
        windowRef!.rotation.y -= 0.05;
        const clock = new THREE.Clock();
        const render = () => {
            if (opened) {
                windowRef!.rotation.y += Math.sin(clock.getElapsedTime()) * 0.001;
            } else if (windowRef!.rotation.y < 0) {
                windowRef!.rotation.y += 0.02;
            }
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }
}
