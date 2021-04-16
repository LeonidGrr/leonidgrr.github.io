import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import keyboardModel from '../../models/keyboard/keyboard2.glb';
import keySound1 from '../../sounds/key1.ogg';
import keySound2 from '../../sounds/key2.ogg';

const pointer = new THREE.Vector2();
const onPointerMove = (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
};
document.addEventListener('mousemove', onPointerMove);

export const Keyboard = (scene: THREE.Scene, camera: THREE.Camera) => {
    const raycaster = new THREE.Raycaster();
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const sound1 = new THREE.PositionalAudio(listener);
    const sound2 = new THREE.PositionalAudio(listener);
    audioLoader.load(keySound1,
        buffer => {
            sound1.setBuffer(buffer);
            sound1.setRefDistance(20);
        },
        progressEvent => {
            console.log(progressEvent)
        },
        error => {
            console.error(error);
        });

    audioLoader.load(keySound2,
        buffer => {
            sound2.setBuffer(buffer);
            sound2.setRefDistance(20);
        },
        progressEvent => {
            console.log(progressEvent)
        },
        error => {
            console.error(error);
        });

    const loader = new GLTFLoader();    
    const keys: THREE.Object3D[] = [];

    loader.load(keyboardModel,
        gltf => {
            gltf.scene.scale.set(50, 50, 50);
            gltf.scene.position.x = 5;
            gltf.scene.position.z = 2.5;
            gltf.scene.traverse(function (child) {
                if ((child as THREE.Mesh).isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.name.includes('Cube')
                    && child.position.y !== 0) {
                        // ((child as THREE.Mesh).material as THREE.MeshStandardMaterial).color.set(0x323138);
                        ((child as THREE.Mesh).material as THREE.MeshStandardMaterial) = new THREE.MeshPhysicalMaterial({
                            roughness: 0.5,
                            clearcoat: 1.0,
                            clearcoatRoughness: 0.1,
                        });
                        keys.push(child);
                    }
                    if (child.name === 'plate') {
                        ((child as THREE.Mesh).material as THREE.MeshStandardMaterial) = new THREE.MeshPhysicalMaterial({
                            roughness: 0.5,
                            clearcoat: 1.0,
                            clearcoatRoughness: 0.1,
                        });
                    }
                }
            });
            gltf.scene.add(sound1);
            gltf.scene.add(sound2);
            scene.add(gltf.scene);
        }, 
        progressEvent => {
            console.log(progressEvent)
        },
        error => {
            console.error(error);
        });

    const keysPressed: {[key: string]: boolean} = {};
    const animateKeyPress = (key: THREE.Object3D) => {
        if (!keysPressed[key.name]) {
            keysPressed[key.name] = true;
            let direction = 'down';
            let initialY = key.position.y;
            let bottomY = key.position.y - 0.005;
    
            const interval = setInterval(() => {
                if (direction === 'down') {
                    key.position.y -= 0.001;
                    if (key.position.y <= bottomY) {
                        Math.random() > 0.75 ? sound1.play() : sound2.play();
                        direction = 'up';
                    }
                }
                if (direction === 'up') {
                    key.position.y += 0.001;
                    if (key.position.y >= initialY) {
                        direction = 'none';
                        clearInterval(interval);
                        keysPressed[key.name] = false;
                    }
                }
            }, 0.1);
        }
    };

    const keyClickHandler = (e: MouseEvent) => {
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(keys); 
        if (intersects.length > 0) {
            animateKeyPress(intersects[0].object);
            ((intersects[0].object as THREE.Mesh).material as THREE.MeshStandardMaterial).color.set(0xFF0000);

        }
    };

    window.addEventListener('click', keyClickHandler, false);

    const update = () => {
    };

    return { update };
};
