import * as THREE from 'three';
import raindrop from '../../../../textures/raindrop.png';

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
        size: 1,
        // transparent: true,
        map: sprite,
        sizeAttenuation: true, 
        // alphaTest: 0.1,
        // color: 0xd4e5fc,
        blending: THREE.AdditiveBlending,
    });

    const ref = new THREE.Points(geometry, material);
    ref.position.set(
        position.x,
        position.y,
        position.z,
    );
    const positions = ref.geometry.attributes.position;

    const flash = new THREE.PointLight(0x062d89, 30, 300, 1.7);
    // flash.shadow.mapSize.width = 512;
    // flash.shadow.mapSize.height = 512;
    // flash.shadow.camera.near = 50;
    // flash.shadow.camera.far = 150;
    flash.position.set(0, 50, -200);
    scene.add(flash);

    const h = new THREE.PointLightHelper(flash);
    scene.add(h)

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

        if (Math.random() > 0.95 || flash.power > 100) {
            // flash.castShadow = true;
            if (flash.power < 100) {
                flash.position.set(
                    Math.random() * 200,
                    50 + Math.random() * 100,
                    -200,
                );
            }
            flash.power = 50 + Math.random() * 500;
        } else {
            // flash.castShadow = false;
        }

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    scene.add(ref);
};
