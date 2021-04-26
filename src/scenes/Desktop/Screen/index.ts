import * as THREE from 'three';
import { setupRenderTarget } from './renderTarget';

export const Screen = async (
    mesh: THREE.Mesh,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
) => {
    const screenMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.4,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        metalness: 0.7,
        color: 0x323138,
    });

    mesh.traverse(async child => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            child.castShadow = true;
            mesh.material = screenMaterial;
        }
    });

    const { rtObject } = await setupRenderTarget(renderer);
    scene.add(rtObject);
};
