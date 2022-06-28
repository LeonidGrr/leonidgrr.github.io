import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import fontTtf from '../../../fonts/Prime-Regular.ttf'; 
import keySound1 from '../../sounds/key1.aac';
import keySound2 from '../../sounds/key2.aac';
import { Tooltip } from '../Tooltip';
import keyCodeMap from './keycodeMap';

export const Keyboard = async (mesh: THREE.Mesh, camera: THREE.Camera, tooltip: Tooltip) => {
    mesh.position.z -= 0.24;
    mesh.position.x -= 0.255;
    mesh.rotateY(-0.25);

    // Materials
    const keyboardMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.45,
        clearcoat: 0.39,
        clearcoatRoughness: 0,
        metalness: 0.9,
        color: 0x323138,
    });
    const switchMaterial = keyboardMaterial.clone();
    switchMaterial.color.set(0xFFFFFF);

    // Sounds
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const sound1 = new THREE.PositionalAudio(listener);
    const buffer1 = await audioLoader.loadAsync(keySound1);
    sound1.setBuffer(buffer1);
    sound1.setRefDistance(40);
    sound1.setVolume(0.5);
    const sound2 = new THREE.PositionalAudio(listener);
    const buffer2 = await audioLoader.loadAsync(keySound2);
    sound2.setBuffer(buffer2);
    sound2.setVolume(0.5);
    sound2.setRefDistance(40);       

    // Font
    const ttfLoader = new TTFLoader();
    const fontLoader = new FontLoader()
    let font = await ttfLoader.loadAsync(fontTtf);
    font = fontLoader.parse(font);
    const textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
    });

    // Model
    const keyMeshes: THREE.Object3D[] = [];
    mesh.traverse(async child => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (child.name.includes('Cube')
            && child.position.y !== 0) {
                mesh.material = keyboardMaterial;

                const key = Object.values(keyCodeMap).find(value => {;
                    if (Array.isArray(value.name)) {
                        return value.name.includes(mesh.name)
                    }
                    return value.name === mesh.name;
                });

                const textGeometry = new TextGeometry(key?.char || '', {
                    font: font as any,
                    size: 0.005,
                    height: 0.0025,
                });

                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.y = 0.0067;
                textMesh.position.x = -0.0075;
                textMesh.rotateX(-Math.PI / 2);
                textMesh.layers.enable(1);
                child.add(textMesh);

                keyMeshes.push(child);
            } else if (child.name === 'plate') {
                mesh.material = keyboardMaterial;
                child.castShadow = true;
                tooltip?.addTarget(child as THREE.Mesh, 'Press any key...', new THREE.Vector3(0, -0.0175, 0));
            } else {
                mesh.material = switchMaterial;
                mesh.layers.enable(1);
            }
        }
    });
    mesh.add(sound1);
    mesh.add(sound2);

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
                    key.position.y -= 0.001;
                    if (key.position.y <= bottomY) {
                        Math.random() > 0.6 ? sound1.play() : sound2.play();
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
            }, 0.001);
        }
    };

    const pointer = new THREE.Vector2();
    const pointerDownHandler = (e: PointerEvent) => {
        pointer.x = (e.clientX / document.body.clientWidth) * 2 - 1;
        pointer.y = - (e.clientY / document.body.clientHeight) * 2 + 1;
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

    document.addEventListener('pointerdown', pointerDownHandler, false);
    document.addEventListener('keydown', keyPressHandler);
};
