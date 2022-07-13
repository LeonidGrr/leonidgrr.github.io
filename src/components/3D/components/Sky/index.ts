import * as THREE from 'three';
import { Sky as SkyExample } from 'three/examples/jsm/objects/Sky';
import { SceneTheme } from '../Desktop';

export const Sky = async (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, theme: SceneTheme, gui: dat.GUI) => {
    let sky = new SkyExample();
    sky.scale.setScalar(1000);
    scene.add(sky);

    let sun = new THREE.Vector3();

    const effectController = {
        turbidity: 10,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 6.4,
        azimuth: -160,
        exposure: 1,
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
        renderer.render(scene, camera);
    };

    const render = () => {
        sky.visible = theme.config[theme.mode].sky;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);


    const folder = gui.addFolder('Sky');
    folder.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(init);
    folder.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(init);
    folder.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(init);
    folder.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(init);
    folder.add(effectController, 'elevation', 0, 90, 0.1).onChange(init);
    folder.add(effectController, 'azimuth', - 180, 180, 0.1).onChange(init);
    folder.add(effectController, 'exposure', 0, 1, 0.0001).onChange(init);

    init();
}

