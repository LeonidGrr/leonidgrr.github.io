import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import { setupRenderTarget } from './renderTarget';
import screenModel from '../../models/Screen.glb';

export const Screen = async (
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
) => {
    const screenMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.4,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
        metalness: 0.7,
        color: 0x323138,
    });

    const renderTarget = await setupRenderTarget(renderer, camera);
    const loader = new GLTFLoader();

    const gltf = await loader.loadAsync(screenModel);
    gltf.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            child.castShadow = true;
            mesh.material = screenMaterial;
        }
    });
    gltf.scene.scale.set(1.95, 1.95, 1.95);
    gltf.scene.position.set(-1.5, -0.575, -2);
    gltf.scene.rotateY(-Math.PI / 8);
    scene.add(gltf.scene);

    gltf.scene.add(renderTarget.rtObject);

    RectAreaLightUniformsLib.init();
    const rectLight = new THREE.RectAreaLight(0xfff, 10,  6.75, 5.15);
    rectLight.position.set(3.25, 2.65, -1.6);
    rectLight.rotateY(Math.PI);
    rectLight.rotateX(Math.PI / 24);
    gltf.scene.add(rectLight);

    return {};
};
