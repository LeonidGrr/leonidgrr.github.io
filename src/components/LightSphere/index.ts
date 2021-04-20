import * as THREE from 'three';

export const LightSphere = (scene: THREE.Scene) => {
    const geometry = new THREE.IcosahedronGeometry(0.5, 16);
    const color = new THREE.Color();
    color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);
    const material = new THREE.MeshStandardMaterial({
        emissive: color,
        emissiveIntensity: 1,
        color,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(-11, 5, -5);
    sphere.layers.enable(1);
    scene.add(sphere);

    const light = new THREE.PointLight(color, 2);
    light.castShadow = true;
    sphere.add(light);

    const update = () => {
        const time = Date.now() * 0.0005;
		sphere.position.y = Math.cos(time) * 0.75 + 1.5;
    };

    return { update };
}