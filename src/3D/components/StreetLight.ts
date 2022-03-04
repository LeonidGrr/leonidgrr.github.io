import * as THREE from 'three';

export const StreetLight = (scene: THREE.Scene) => {
    const geometry = new THREE.IcosahedronGeometry(0.35, 16);
    const material = new THREE.MeshPhongMaterial({
        emissive: 0xf6cd8b,
        emissiveIntensity: 1,
        color: 0xf6cd8b,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.layers.enable(1);

    const light = new THREE.PointLight(0xf6cd8b, 20, 100, 1);
    light.castShadow = true;
    light.position.set(0, -10, -70);
    light.add(sphere);
    scene.add(light);

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
    scene.add(pointLightHelper);

    const render = (time: number) => {
        light.intensity = Math.cos(time) * 0.1 + 1;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};