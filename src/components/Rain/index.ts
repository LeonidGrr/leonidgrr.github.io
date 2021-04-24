import * as THREE from 'three';
import raindrop from '../textures/circle.png';

const RAINDROPS_COUNT = 100000;
const RAIN_POWER = 0.005;

export const Rain = () => {
    const loader = new THREE.TextureLoader();
    const sprite = loader.load(raindrop);
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < RAINDROPS_COUNT; i ++) {
        const x = Math.random() * 400 - 200;
        const y = Math.random() * 500 - 250;
        const z = Math.random() * 400 - 200;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        size: 0.025,
        transparent: true,
        map: sprite,
        sizeAttenuation: true, 
        alphaTest: 0.15,
        color: 0xd4e5fc,
    });

    const ref = new THREE.Points(geometry, material);  
    const positions = ref.geometry.attributes.position;

    const update = () => {
        for (let i = 0; i < RAINDROPS_COUNT; i ++) {
            const py = positions.getY(i);
            const targetY = py <= -100
                ? Math.random() * 500 - 250
                : THREE.MathUtils.lerp(py, -200, Math.random() * RAIN_POWER);

            positions.setY(
                i,
                targetY,
            );
        }
        ref.geometry.attributes.position.needsUpdate = true;
    };

    return { ref, update };
};
