import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import fontTtf from '../../../assets/fonts/Prime-Regular.ttf'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { fillWithPoints } from './utils';

const colors = ['#F7A541', '#F45D4C', '#FA2E59', '#4783c3', '#9c6cb7'];

export const TextLight = async (scene: THREE.Scene, camera: THREE.Camera) => {
    // const geometry = new TextGeometry(text, {
    //     font: font as any,
    //     size: 0.45,
    //     height: 0.3,
    // });
    
    // const material = new THREE.MeshPhongMaterial({
    //     color: 0xff0000,
    //     flatShading: true,
    //     emissive: 0xffffff,
    //     emissiveIntensity: 1,
    // });

    // const mesh = new THREE.Mesh(geometries[config.currentIdx], material);
    // mesh.name="text_mesh"
    // mesh.layers.enable(1);
    // mesh.position.set(-4, 9.75, -17);
    // mesh.rotateY(Math.PI / 12);
    // mesh.rotateX(-Math.PI / 10);
    // scene.add(mesh)

    const config = {
        list: [
            'Click me!',
            'Hello world!',
            'Weather: always rainy',
            'leonidgrr@gmail.com',
        ],
        currentIdx: 0,
        updateStarted: 0,
    };

    // Font
    const ttfLoader = new TTFLoader();
    const fontLoader = new FontLoader()
    let font = await ttfLoader.loadAsync(fontTtf);
    font = fontLoader.parse(font);
    
    const geometries = config.list.map(text => {
        return new TextGeometry(text, {
            font: font as any,
            size: 0.4,
            height: 0.5,
        });
    });
    
    const ref = new THREE.Object3D();
    ref.position.set(-5, 9.75, -17);
    ref.rotateY(Math.PI / 12);
    ref.rotateX(-Math.PI / 10);
    scene.add(ref);

    const POINTS_COUNT = 1250;
    const UPDATE_TIME_LIMIT = 1000;
    const particleGeometries: THREE.BufferGeometry[] = geometries
        .map(g => fillWithPoints(g, POINTS_COUNT));
    const particlesMat = new THREE.PointsMaterial({ color: 0xff0000, size: 0.07 });
    const particles = new THREE.Points(particleGeometries[config.currentIdx], particlesMat);
    // particles.layers.enable(1);
    ref.add(particles);

    const positions = particles.geometry.attributes.position;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    document.addEventListener('pointerdown', (e: PointerEvent) => {
        pointer.x = (e.clientX / document.body.clientWidth) * 2 - 1;
        pointer.y = -(e.clientY / document.body.clientHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(ref);
        if (intersects.length > 0) {
            config.currentIdx = config.currentIdx < config.list.length - 1 ? config.currentIdx + 1 : 0;
            config.updateStarted = clock.getElapsedTime();
        }
    });

    const clock = new THREE.Clock();
    const render = () => {
        if (config.updateStarted > 0 && clock.getElapsedTime() - config.updateStarted > UPDATE_TIME_LIMIT) {
            config.updateStarted = 0;
        } else {
            particles.rotation.setFromRotationMatrix(camera.matrixWorld);
            particles.geometry.attributes.position.needsUpdate = true;
    
            for (let i = 0; i < POINTS_COUNT; i++) {   
                const px = positions.getX(i);
                const py = positions.getY(i);
                const pz = positions.getZ(i);
    
                const nextGeometry = particleGeometries[config.currentIdx];
                const targetx = nextGeometry.attributes.position.getX(i);
                const targety = nextGeometry.attributes.position.getY(i);
                const targetz = nextGeometry.attributes.position.getZ(i);
        
                positions.setXYZ(
                    i,
                    THREE.MathUtils.lerp(px, targetx, Math.random() / 10),
                    THREE.MathUtils.lerp(py, targety, Math.random() / 10),
                    THREE.MathUtils.lerp(pz, targetz, Math.random() / 10),
                );
            }
    
            particles.geometry.attributes.position.needsUpdate = true;
        }

        const sin = Math.sin(clock.getElapsedTime());
        ref.position.y += sin * Math.random() * 0.0005;

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

