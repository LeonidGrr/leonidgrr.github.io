import * as THREE from 'three';
import { TextLight } from '../../../../components';

export const RainyWindow = async (
    mesh: THREE.Mesh,
    scene: THREE.Scene,
    // renderer: THREE.WebGLRenderer,
) => {
    // const loader = new THREE.CubeTextureLoader();
    // loader.setCrossOrigin("");
    // loader.setPath('https://threejs.org/examples/textures/cube/Park3Med/');

    // const textureCube = loader.load([
    //     'px.jpg', 'nx.jpg',
    //     'py.jpg', 'ny.jpg',
    //     'pz.jpg', 'nz.jpg'
    // ]);
    
    // textureCube.mapping = THREE.CubeRefractionMapping;
    // const backgroundPlaneGeometry = new THREE.PlaneBufferGeometry(100, 100);
    // const backgroundPlaneMaterial = new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     envMap: textureCube,
    // });

    // const backgroundPlane = new THREE.Mesh(backgroundPlaneGeometry, backgroundPlaneMaterial);
    // backgroundPlane.position.set(0, 0, -100);
    // scene.add(backgroundPlane);

    mesh.material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        refractionRatio: 0.98,
        side: THREE.DoubleSide,
        opacity: 0.001,
        transparent: true,
    });

    // const geometry = new THREE.IcosahedronGeometry(0.3, 16);
    // const material = new THREE.MeshPhongMaterial({
    //     emissive: 0xffffff,
    //     emissiveIntensity: 1,
    //     color: 0xffffff,
    // });
    // const sphere = new THREE.Mesh(geometry, material);
    // sphere.layers.enable(1);
    // scene.add(sphere);


    // const light1 = new THREE.PointLight(0xffffff, 6);
    // light1.position.set(0, 15, -60);
    // light1.add(sphere);
    // scene.add(light1);

    // const textLight = await TextLight('Hello world!', scene);
    // textLight.mesh.position.set(-9, 12, -22);
    // textLight.mesh.rotateY(Math.PI / 6);
    // textLight.mesh.rotateX(-Math.PI / 10);

    // const help = new THREE.PointLightHelper(light1);
    // scene.add(help);
};
