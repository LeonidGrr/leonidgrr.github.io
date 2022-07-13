import * as THREE from 'three';
import { Sky as SkyExample } from 'three/examples/jsm/objects/Sky';

export const Sky = async (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => {
   let sky = new SkyExample();
    sky.scale.setScalar(450000);
    scene.add(sky);

    let sun = new THREE.Vector3();

    /// GUI
    const effectController = {
        turbidity: 10,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 0,
        azimuth: 180,
        exposure: 1.0,
    };

    if (typeof window !== "undefined") {
        let dat = await import('dat.gui');
        const gui = new dat.GUI();

        const guiChanged = () => {
            const uniforms = sky.material.uniforms;
            uniforms['turbidity'].value = effectController.turbidity;
            uniforms['rayleigh'].value = effectController.rayleigh;
            uniforms['mieCoefficient'].value = effectController.mieCoefficient;
            uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

            const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
            const theta = THREE.MathUtils.degToRad(effectController.azimuth);

            sun.setFromSphericalCoords(1, phi, theta);

            uniforms['sunPosition'].value.copy(sun);

            renderer.toneMappingExposure = effectController.exposure;
            renderer.render(scene, camera);
        };

        gui.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(guiChanged);
        gui.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(guiChanged);
        gui.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(guiChanged);
        gui.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(guiChanged);
        gui.add(effectController, 'elevation', 0, 90, 0.1).onChange(guiChanged);
        gui.add(effectController, 'azimuth', - 180, 180, 0.1).onChange(guiChanged);
        gui.add(effectController, 'exposure', 0, 1, 0.0001).onChange(guiChanged);

        gui.close();
        guiChanged();
    }
}

