import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import fontTtf from '../../../../assets/fonts/Prime-Regular.ttf'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { fillWithPoints } from '../utils';
import data1 from './1.json';
import data2 from './2.json';
import data3 from './3.json';
import data4 from './4.json';

const POINTS_COUNT = 2048;
const UPDATE_TIME_LIMIT = 1000;
const colors = ['#F7A541', '#F45D4C', '#FA2E59', '#4783c3', '#9c6cb7'];

// Use this to create JSONs with prebuilt buffer geometries
const getStringifiedGeometries = async () => {
    const list = [
        'Click me',
        'Hello world!',
        'Weather: always rainy',
        'leonidgrr@gmail.com',
    ];

    const ttfLoader = new TTFLoader();
    const fontLoader = new FontLoader()
    let font = await ttfLoader.loadAsync(fontTtf);
    font = fontLoader.parse(font);
    
    const geometries = list.map(text => {
        return new TextGeometry(text, {
            font: font as any,
            size: 0.4,
            height: 0.5,
        });
    });

    return geometries.map(g => {
        const r = fillWithPoints(g, POINTS_COUNT);
        return JSON.stringify(r.toJSON());
    });
};

export const ParticleText = async (scene: THREE.Scene, camera: THREE.Camera) => {
    const config = {
        data: ['1.json', '2.json', '3.json', '4.json'],
        currentIdx: 0,
        updateStarted: 0,
    };
    
    const loader = new THREE.BufferGeometryLoader();
    const particleGeometries = [data1, data2, data3, data4].map(v => loader.parse(v));

    const ref = new THREE.Object3D();
    ref.position.set(-5, 9.5, -17);
    ref.rotateY(Math.PI / 16);
    ref.rotateX(-Math.PI / 10);
    scene.add(ref);

    const particlesMat = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 0.075,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
    });
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
            config.currentIdx = config.currentIdx < config.data.length - 1 ? config.currentIdx + 1 : 0;
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

