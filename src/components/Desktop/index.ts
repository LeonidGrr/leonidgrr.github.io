import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
    Keyboard,
    Screen,
    Lamp,
    Coffee,
    Desk,
    Rain,
    Trees,
    StreetLight,
} from '..';
import { TextLight } from '..';
import desktopScene from '../../models/desktopScene.glb';
import background from '../../textures/background.png';

export const Desktop = async (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    gui: GUI,
) => {
    const loader = new GLTFLoader();
    const desktop = await loader.loadAsync(desktopScene);
    desktop.scene.rotateY(-Math.PI / 2);
    desktop.scene.scale.set(12, 12, 12);
    console.log(desktop.scene.children)
    desktop.scene.children.forEach(async child => {
        if (child.name === 'Desk') {
            await Desk(child as THREE.Mesh);
        }
        if (child.name === 'Lamp') {
            await Lamp(child as THREE.Mesh, scene);
        }
        if (child.name === 'Keyboard') {
            await Keyboard(child as THREE.Mesh, camera);
        }
        if (child.name === 'Floor') {
            child.receiveShadow = true;
            const mesh = child as THREE.Mesh;
            (mesh.material as THREE.MeshStandardMaterial).color.set(0x003c8c);
        }
        if (child.name === 'Screen') {
            await Screen(child as THREE.Mesh, scene, renderer);
        }
        if (child.name === 'Coffee') {
            await Coffee(child as THREE.Mesh);
        }
        if (child.name === 'Tree') {
            Trees(child as THREE.Mesh, desktop.scene);
        }
        if (child.name === 'Room') {
            child.receiveShadow = true;
            child.castShadow = true;
            child.traverse(c => {
                if ((c as THREE.Mesh).isMesh) {
                    const mesh = c as THREE.Mesh;
                    (mesh.material as THREE.MeshStandardMaterial).color.set(0x000000);
                }
            });
        }
    });
    scene.add(desktop.scene);

    Rain({
        position: new THREE.Vector3(-50, 5, -100),
        raindropsCount: 200,
        rainPower: 0.25,
        maxX: 100,
        maxY: 100,
        maxZ: 50,
    }, camera, scene);

    const textLight = await TextLight('Hello world!', scene);
    textLight.mesh.position.set(-9, 10, -22);
    textLight.mesh.rotateY(Math.PI / 6);
    textLight.mesh.rotateX(-Math.PI / 10);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight);

    // StreetLight(new THREE.Vector3(-15, 15, -70), scene);

    // const spotLight = new THREE.SpotLight(0xffffff, 5);
    // spotLight.position.set(-5, 40, 40);
    // // spotLight.angle = Math.PI / 3;
    // // spotLight.penumbra = 1;
    // // spotLight.decay = 1;
    // // spotLight.distance = 200;

    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 512;
    // spotLight.shadow.mapSize.height = 512;
    // spotLight.shadow.camera.near = 1;
    // spotLight.shadow.camera.far = 50;
    // spotLight.shadow.focus = 1;
    // scene.add(spotLight);

    // const h = new THREE.SpotLightHelper(spotLight);
    // scene.add(h);

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(background);
    backgroundTexture.wrapS = THREE.RepeatWrapping;
    backgroundTexture.wrapT = THREE.RepeatWrapping;
    backgroundTexture.repeat.set(3, 1);
    const backgroundGeometry = new THREE.PlaneBufferGeometry(400, 100);
    const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });
    const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    backgroundMesh.position.z = -300;
    scene.add(backgroundMesh);
}