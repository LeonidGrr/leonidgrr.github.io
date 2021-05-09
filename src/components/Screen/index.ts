import * as THREE from 'three';
import { setupRenderTarget } from './renderTarget';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { Tooltip } from '../Tooltip';

export const Screen = async (
    mesh: THREE.Mesh,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    tooltip: Tooltip,
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

    const { rtObject } = await setupRenderTarget(renderer);
    rtObject.position.set(3.9, 12.5, -19.9);
    rtObject.rotateY(-Math.PI / 13);
    rtObject.rotateX(-Math.PI / 24);
    scene.add(rtObject);

    tooltip?.addTarget(rtObject.children[0] as THREE.Mesh, 'Screen here!', new THREE.Vector3(0, 2, 0));

    RectAreaLightUniformsLib.init();
    const light = new THREE.RectAreaLight(0x0000ff, 5, 7.05, 4.3);
    light.rotateY(Math.PI - Math.PI / 13);
    light.rotateX(Math.PI / 24);
    light.position.set(
        rtObject.position.x,
        rtObject.position.y,
        rtObject.position.z,
    );
    scene.add(light);
};
