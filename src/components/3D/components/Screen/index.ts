import * as THREE from 'three';
import { setupRenderTarget } from './renderTarget';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

export const Screen = async (
    mesh: THREE.Mesh,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
) => {
    const screenMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.45,
        clearcoat: 0.39,
        clearcoatRoughness: 0,
        metalness: 0.9,
        color: 0x323138,
    });

    mesh.traverse(async child => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            child.castShadow = true;
            mesh.material = screenMaterial;
        }
    });

    const { rtObject } = await setupRenderTarget(renderer, 'Press any key...');
    rtObject.position.set(3.9, 12.4, -19.95);
    rtObject.rotateY(-Math.PI / 13);
    rtObject.rotateX(-Math.PI / 24);
    scene.add(rtObject);

    RectAreaLightUniformsLib.init();
    const light = new THREE.RectAreaLight(0x0000ff, 5, 7.05, 4.3);
    light.name = 'screen_light';
    light.rotateY(Math.PI - Math.PI / 13);
    light.rotateX(Math.PI / 24);
    light.position.set(
        rtObject.position.x,
        rtObject.position.y,
        rtObject.position.z,
    );
    scene.add(light);
};
