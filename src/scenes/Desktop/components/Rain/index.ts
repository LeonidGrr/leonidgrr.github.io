import * as THREE from 'three';
import raindrop from '../../../../textures/circle.png';

export const Rain = ({
    position = new THREE.Vector3(),
    raindropsCount = 100000,
    rainPower = 0.01,
    maxX = 100,
    maxY = 100,
    maxZ = 100,
}, scene: THREE.Scene) => {
    const loader = new THREE.TextureLoader();
    const sprite = loader.load(raindrop);
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < raindropsCount; i ++) {
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        const z = Math.random() * maxZ;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        size: 0.025,
        transparent: true,
        map: sprite,
        sizeAttenuation: false, 
        alphaTest: 0.1,
        // color: 0xd4e5fc,
        // color: 0x152238,
        color: 0x000034,
    });

    const ref = new THREE.Points(geometry, material);
    ref.position.set(
        position.x,
        position.y,
        position.z,
    );
    const positions = ref.geometry.attributes.position;

    const render = () => {
        for (let i = 0; i < raindropsCount; i ++) {
            const py = positions.getY(i);
            const targetY = py <= -0.1 * maxY
                ? Math.random() * maxY - maxY / 2
                : THREE.MathUtils.lerp(py, -0.2 * maxY, Math.random() * rainPower);

            positions.setY(
                i,
                targetY,
            );
        }
        ref.geometry.attributes.position.needsUpdate = true;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    scene.add(ref);
};
