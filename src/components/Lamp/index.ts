import * as THREE from 'three';

export const Lamp = async (mesh: THREE.Mesh, scene: THREE.Scene) => {
    mesh.traverse(async child => {
        if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;            
        }
    });

    const geometry = new THREE.IcosahedronGeometry(0.3, 16);
    const material = new THREE.MeshPhongMaterial({
        emissive: 0xffffff,
        emissiveIntensity: 1,
        color: 0xffffff,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.name = 'lamp_mesh';
    sphere.layers.enable(1);

    const light = new THREE.PointLight(0xffffff, 4);
    light.name = 'lamp_light';
    light.shadow.mapSize = new THREE.Vector2(512, 512);
    light.shadow.bias = 0.001;
    light.distance = 25;
    
    light.shadow.camera.near = 0.01;
    light.shadow.camera.far = 15;
    light.position.set(-5.32, 14, -17.9);
    light.castShadow = true;
    light.add(sphere);
    scene.add(light);
};
