
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import lampMmodel from '../../models/lamp.glb';

export const Lamp = async (scene: THREE.Scene) => {
    const loader = new GLTFLoader();

    const gltf = await loader.loadAsync(lampMmodel);
    gltf.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;            
        }
    });
    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.position.set(-13, 4.6, -4);
    gltf.scene.rotateY(Math.PI / 1.25);

    scene.add(gltf.scene);

    const geometry = new THREE.IcosahedronGeometry(0.4, 16);
    const material = new THREE.MeshPhongMaterial({
        emissive: 0xffffff,
        emissiveIntensity: 1,
        color: 0xffffff,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.layers.enable(1);

    const light = new THREE.PointLight(0xffffff, 3);
    light.shadow.mapSize = new THREE.Vector2(512, 512);
    light.shadow.bias = 0.001;
    light.distance = 20;
    
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 50;
    light.position.set(
        gltf.scene.position.x + 3.2,
        gltf.scene.position.y + 2.5,
        gltf.scene.position.z + 2.35,
    );
    light.castShadow = true;
    light.add(sphere);
    scene.add(light);
};
