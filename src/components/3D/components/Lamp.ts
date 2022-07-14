import * as THREE from 'three';
import { SceneTheme, SceneThemeMode } from './Desktop';

export const Lamp = async (mesh: THREE.Mesh, scene: THREE.Scene, theme: SceneTheme) => {
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

    const light = new THREE.PointLight(0xffffff, 0);
    light.distance = 20;
    
    light.shadow.camera.near = 0.01;
    light.shadow.camera.far = 15;
    light.position.set(-4.125, 14.15, -17.9);
    light.castShadow = true;
    light.add(sphere);

    scene.add(light);

    const render = () => {
        if (theme.mode === SceneThemeMode.DAY) {
            light.intensity = THREE.MathUtils.lerp(light.intensity, 0, 0.1);
            material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, 0, 0.2);
        } else if (theme.mode === SceneThemeMode.NIGHT) {
            light.intensity = THREE.MathUtils.lerp(light.intensity, 4, 0.1);
            material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, 2, 0.1);
        }
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};
