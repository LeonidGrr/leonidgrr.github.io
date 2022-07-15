import * as THREE from 'three';
import { Sky as SkyExample } from 'three/examples/jsm/objects/Sky';
import { SceneTheme, SceneThemeMode } from '../Scene';

export const Sky = async (renderer: THREE.WebGLRenderer, scene: THREE.Scene, theme: SceneTheme, gui?: dat.GUI) => {
    let sky = new SkyExample();
    sky.scale.setScalar(1000);
    scene.add(sky);

    let sun = new THREE.Vector3();

    const effectController = {
        turbidity: 0.0,
        rayleigh: 0.0,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 0.0,
        azimuth: -161,
        exposure: 1.25,
    };

    const init = () => {
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
    };

    const render = () => {
        if (theme.mode === SceneThemeMode.DAY) {
                effectController.elevation = THREE.MathUtils.lerp(effectController.elevation, 9.3, 0.02);
                effectController.turbidity = THREE.MathUtils.lerp(effectController.turbidity, 10.0, 0.05);
                effectController.rayleigh = THREE.MathUtils.lerp(effectController.rayleigh, 3.0, 0.05);
        }
        if (theme.mode === SceneThemeMode.DAWN) {
                effectController.elevation = THREE.MathUtils.lerp(effectController.elevation, 4, 0.02);
                effectController.turbidity = THREE.MathUtils.lerp(effectController.turbidity, 0, 0.05);
                effectController.rayleigh = THREE.MathUtils.lerp(effectController.rayleigh, 1.3, 0.05);
        }
        if (theme.mode === SceneThemeMode.NIGHT) {
                effectController.elevation = THREE.MathUtils.lerp(effectController.elevation, 0.0, 0.02);
                effectController.turbidity = THREE.MathUtils.lerp(effectController.turbidity, 0.0, 0.2);
            if (effectController.rayleigh > 0.02) {
                effectController.rayleigh = THREE.MathUtils.lerp(effectController.rayleigh, 0.0, 0.02);
            } else {
                effectController.rayleigh = 0;
            }
        }
        init();
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    if (gui) {
        const folder = gui.addFolder('Sky');
        folder.add(effectController, 'turbidity', -1, 20, 0.1).listen().onChange(theme.setFreeMode);
        folder.add(effectController, 'rayleigh', -1, 4, 0.001).listen().onChange(theme.setFreeMode);
        folder.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).listen().onChange(theme.setFreeMode);
        folder.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).listen().onChange(theme.setFreeMode);
        folder.add(effectController, 'elevation', 0, 90, 0.1).listen().onChange(theme.setFreeMode);
        folder.add(effectController, 'azimuth', -180, 180, 0.1).listen().onChange(theme.setFreeMode);
        folder.add(effectController, 'exposure', -1, 5, 0.0001).listen().onChange(theme.setFreeMode);
    }
}
