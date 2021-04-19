import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import { setupRenderTarget } from './renderTarget';
import screenModel from '../../models/Screen.glb';

export const Screen = (scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
    const renderTarget = setupRenderTarget(renderer, camera);
    const loader = new GLTFLoader();

    loader.load(screenModel,
        gltf => {
            gltf.scene.traverse(function (child) {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    child.castShadow = true;
                    mesh.material = new THREE.MeshPhysicalMaterial({
                        roughness: 0.5,
                        clearcoat: 1.0,
                        clearcoatRoughness: 0.1,
                        color: 0x323138,
                    });
                }
            });
            gltf.scene.scale.set(1.75, 1.75, 1.75);
            gltf.scene.position.set(-1, -0.5, -1.5);
            gltf.scene.rotateY(-Math.PI / 8);
            scene.add(gltf.scene);

            gltf.scene.add(renderTarget.rtObject);

            RectAreaLightUniformsLib.init();
            const rectLight = new THREE.RectAreaLight(0xfff, 10,  6.75, 5.15);
            rectLight.position.set(3.25, 2.65, -1.6);
            rectLight.rotateY(Math.PI);
            rectLight.rotateX(Math.PI / 24);
            gltf.scene.add(rectLight);
        }, 
        progressEvent => {
            console.log(progressEvent)
        },
        error => {
            console.error(error);
        });

    const update = () => {
        renderTarget.update();
    };

    return { update };
};
