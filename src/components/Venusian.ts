import* as THREE from 'three';

import venusianVert from '../shaders/venusian-vert.glsl';
import venusianFrag from '../shaders/venusian-frag.glsl';

export const Venusian = () => {
    const geometry = new THREE.SphereGeometry(50, 32, 32);

    const uniforms = {
        time: { value: 1.0 },
        noiseOctaves: { value: 8 },
        lightDiffuseColor: { value: new THREE.Vector3() },
        lightPosition: { value: new THREE.Vector3(100, 100, 100) },
        lightIntensity: { value: 1 },
    };
    const material = new THREE.ShaderMaterial({
        vertexShader: venusianVert,
        fragmentShader: venusianFrag,
        uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    const update = (time: number) => {
        uniforms.time.value = time / 10;
    };

    return { mesh, update };
}