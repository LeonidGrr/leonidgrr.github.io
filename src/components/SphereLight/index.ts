import * as THREE from 'three';

export const SphereLight = (scene: THREE.Scene) => {
    const geometry = new THREE.IcosahedronGeometry(0.5, 16);
    const color = new THREE.Color();
    color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);
    const material = new THREE.MeshPhongMaterial({
        emissive: color,
        emissiveIntensity: 1,
        color,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.layers.enable(1);

    const light = new THREE.PointLight(0xffffff, 2);
    light.shadow.mapSize = new THREE.Vector2(1024, 1024);
    light.shadow.bias = 0.001;
    
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 20;
    // light.shadow.bias = 0.0001;
    // light.shadow.bias = - 0.005; 
    light.position.set(-12, 4, -6);
    light.castShadow = true;
    light.add(sphere);

    scene.add(light);

    const update = () => {
        const time = Date.now() * 0.0005;
		light.position.y = Math.cos(time) * 0.75 + 3;
    };

    return { update };
}