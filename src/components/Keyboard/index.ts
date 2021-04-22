import { GUI } from 'dat.gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import fontTtf from '../../fonts/Prime-Regular.ttf'; 
import keyboardModel from '../../models/keyboard.glb';
import keySound1 from '../../sounds/key1.ogg';
import keySound2 from '../../sounds/key2.ogg';
import keyCodeMap from './keycodeMap';

export const Keyboard = async (scene: THREE.Scene, camera: THREE.Camera, gui: GUI) => {
    // Materials
    const keyboardMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.45,
        clearcoat: 0.39,
        clearcoatRoughness: 0,
        metalness: 0.9,
        color: 0x323138,
        // color: 0xffffff,
    });
    const switchMaterial = keyboardMaterial.clone();
    switchMaterial.color.set(0xFFFFFF);

    // GUI
    const folder = gui.addFolder('Keyboard Parameters');
    folder.add(keyboardMaterial, 'roughness', 0.1, 1).step(0.01).onChange(function (value) {
        keyboardMaterial.roughness = Number(value);
    });

    folder.add(keyboardMaterial, 'clearcoat', 0.0, 1.0).step(0.01).onChange(function (value) {
        keyboardMaterial.clearcoat = Number(value);
    });

    folder.add(keyboardMaterial, 'clearcoatRoughness', 0.0, 1.0).step(0.01).onChange(function (value) {
        keyboardMaterial.clearcoatRoughness = Number(value);
    });

    folder.add(keyboardMaterial, 'metalness', 0.0, 1.0).step(0.01).onChange(function (value) {
        keyboardMaterial.metalness = Number(value);
    });

    // Sounds
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const sound1 = new THREE.PositionalAudio(listener);
    const sound2 = new THREE.PositionalAudio(listener);
    const buffer1 = await audioLoader.loadAsync(keySound1);
    sound1.setBuffer(buffer1);
    sound1.setRefDistance(20);
    const buffer2 = await audioLoader.loadAsync(keySound2);
    sound2.setBuffer(buffer2);
    sound2.setRefDistance(20);       

    // Font
    const ttfLoader = new TTFLoader();
    const fontLoader = new THREE.FontLoader()
    let font = await ttfLoader.loadAsync(fontTtf);
    font = fontLoader.parse(font);
    const textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
    });

    // Model
    const loader = new GLTFLoader();
    const keyMeshes: THREE.Object3D[] = [];

    const gltf = await loader.loadAsync(keyboardModel);    
    gltf.scene.scale.set(33, 33, 33);
    gltf.scene.position.z = 4;
    gltf.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            child.castShadow = true;
            if (child.name.includes('Cube')
            && child.position.y !== 0) {
                mesh.material = keyboardMaterial;

                const key = Object.values(keyCodeMap).find(value => {;
                    if (Array.isArray(value.name)) {
                        return value.name.includes(mesh.name)
                    }
                    return value.name === mesh.name;
                });

                const textGeometry = new THREE.TextGeometry(key?.char || '', {
                    font: font as THREE.Font,
                    size: 0.005,
                    height: 0.0025,
                });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.y = 0.0065;
                textMesh.position.x = -0.0075;
                textMesh.rotateX(-Math.PI / 2);
                textMesh.layers.enable(1);
                child.add(textMesh);

                keyMeshes.push(child);
            } else if (child.name === 'plate') {
                mesh.material = keyboardMaterial;
            } else {
                mesh.material = switchMaterial;
                mesh.layers.enable(1);
            }
        }
    });
    gltf.scene.add(sound1);
    gltf.scene.add(sound2);
    scene.add(gltf.scene);

    // Events
    const pointer = new THREE.Vector2();
    const onPointerMove = (e: MouseEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
    };
    const raycaster = new THREE.Raycaster();
    const keysPressed: {[key: string]: boolean} = {};
    const animateKeyPress = (key: THREE.Object3D) => {
        if (!keysPressed[key.name]) {
            keysPressed[key.name] = true;
            let direction = 'down';
            let initialY = key.position.y;
            let bottomY = key.position.y - 0.005;
    
            const interval = setInterval(() => {
                if (direction === 'down') {
                    key.position.y -= 0.0005;
                    if (key.position.y <= bottomY) {
                        Math.random() > 0.75 ? sound1.play() : sound2.play();
                        direction = 'up';
                    }
                }
                if (direction === 'up') {
                    key.position.y += 0.0005;
                    if (key.position.y >= initialY) {
                        direction = 'none';
                        clearInterval(interval);
                        keysPressed[key.name] = false;
                    }
                }
            }, 0.001);
        }
    };

    const keyClickHandler = (e: MouseEvent) => {
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(keyMeshes); 
        if (intersects.length > 0) {
            animateKeyPress(intersects[0].object);
        }
    };

    const keyPressHandler = (e: KeyboardEvent) => {
        const key = keyCodeMap[e.keyCode];
        if (key) {
            const mesh = keyMeshes.find(k => {
                if (Array.isArray(key.name)) {
                    return key.name.includes(k.name);
                }
                return key.name === k.name;
            });
            animateKeyPress(mesh as THREE.Object3D);
        }
    };

    window.addEventListener('click', keyClickHandler, false);
    window.addEventListener('keydown', keyPressHandler);
    window.addEventListener('mousemove', onPointerMove);


    // let dissolve = false;
    // const torusGeometry = new THREE.TorusBufferGeometry();

    const update = () => {
    //     if (dissolve) {
    //         model?.traverse(function (child) {
    //             if ((child as THREE.Mesh).isMesh) {
    //                 const mesh = child as THREE.Mesh;
    //                 const positions = mesh.geometry.attributes.position;
    //                 for (let i = 0; i < positions.array.length; i++) {   
    //                     const px = positions.getX(i);
    //                     const py = positions.getY(i);
    //                     const pz = positions.getZ(i);   
    //                     positions.setXYZ(
    //                         i,
    //                         px + Math.random() * 0.001 - 0.0005,
    //                         py + Math.random() * 0.001 - 0.0005,
    //                         pz + Math.random() * 0.001 - 0.0005,
    //                     );
    //                 }
    //                 mesh.geometry.attributes.position.needsUpdate = true;
    //             }
    //         });
    //     }
    };
    
    // setTimeout(() => {
    //     const allPoints: THREE.Points[] = [];
    //     const material = new THREE.PointsMaterial({ color: 0x000000, size: 0.1 });
    //     model?.traverse(function (child) {
    //         if ((child as THREE.Mesh).isMesh) {
    //             const mesh = child as THREE.Mesh;
    //             setTimeout(() => {
    //                 (mesh.material as THREE.MeshStandardMaterial).wireframe = true;
    //             }, Math.random() * 750);
    //             let points = new THREE.Points(mesh.geometry, material);
    //             child.add(points);
    //             allPoints.push(points);
    //         }
    //     });
    //     setTimeout(() => {
    //         dissolve = true;
    //     }, 1000);
    // }, 5000);

    return {  };
};
