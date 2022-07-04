import * as THREE from 'three';

export const Lamp = async (mesh: THREE.Mesh, scene: THREE.Scene) => {
    mesh.position.z -= 0.1;

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
    light.shadow.bias = 0.005;
    light.distance = 25;
    
    light.shadow.camera.near = 0.01;
    light.shadow.camera.far = 25;
    light.position.set(-4.125, 14.15, -17.9);
    light.castShadow = true;
    light.add(sphere);

    scene.add(light);
};
