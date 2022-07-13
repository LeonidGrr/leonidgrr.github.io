import * as THREE from 'three';
import raindrop from '../textures/raindrop.png';
import thunder1 from '../sounds/thunder.ogg';
import rain from '../sounds/rain.ogg';

export const Rain = async (camera: THREE.PerspectiveCamera, scene: THREE.Scene) => {
    const position = new THREE.Vector3(-50, 5, -100);
    const raindropsCount = 500;
    const rainPower = 0.25;
    const maxX = 100;
    const maxY = 100;
    const maxZ = 50;

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
        size: 1.5,
        transparent: true,
        map: sprite,
        sizeAttenuation: true, 
        alphaTest: 0.01,
        blending: THREE.AdditiveBlending,
    });

    const ref = new THREE.Points(geometry, material);
    ref.position.set(
        position.x,
        position.y,
        position.z,
    );
    const positions = ref.geometry.attributes.position;

    // Flashlight
    const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(0, 50, -200);
    scene.add(flash);

    // Sounds
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const sound1 = new THREE.PositionalAudio(listener);
    const buffer1 = await audioLoader.loadAsync(thunder1);
    sound1.setBuffer(buffer1);
    sound1.setRefDistance(500);
	sound1.setVolume(0.1);
    flash.add(sound1);

    const sound2 = new THREE.PositionalAudio(listener);
    const buffer2 = await audioLoader.loadAsync(rain);
    sound2.setBuffer(buffer2);
    sound2.setRefDistance(100);
	sound2.setVolume(0.35);
    sound2.setLoop(true);
    scene.add(sound2);
    sound2.position.z = -50;
    sound2.play();

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

        if (Math.random() > 0.99 || flash.power > 75) {
            Math.random() > 0.8 && sound1.play();
            if (flash.power < 75) {
                flash.position.set(
                    Math.random() * 200,
                    50 + Math.random() * 75,
                    -200,
                );
            }
            flash.power = 50 + Math.random() * 75;
        } else {
            flash.power = 0;
        }

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    scene.add(ref);
};
