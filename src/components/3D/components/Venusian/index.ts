import* as THREE from 'three';
import venusianVert from './shaders/venusian-vert.glsl';
import venusianFrag from './shaders/venusian-frag.glsl';

export const Venusian = (position: THREE.Vector3, scene: THREE.Scene) => {
    const geometry = new THREE.SphereBufferGeometry(5, 16, 16);
    const uniforms = {
        time: { value: 1.0 },
        noiseOctaves: { value: 8 },
        lightDiffuseColor: { value: new THREE.Vector3() },
        lightPosition: { value: new THREE.Vector3(100, 0, 0) },
        lightIntensity: { value: 0.5 },
    };
    const material = new THREE.ShaderMaterial({
        vertexShader: venusianVert,
        fragmentShader: venusianFrag,
        uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
        position.x,
        position.y,
        position.z,
    );
    mesh.layers.enable(1);
    scene.add(mesh);

    const render = (time: number) => {
        uniforms.time.value = time / 1000;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
}