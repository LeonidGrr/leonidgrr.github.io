import * as THREE from 'three';
import { Tooltip } from './Tooltip';
import raindropVert from '../shaders/raindrop-vert.glsl';
import raindropFrag from '../shaders/raindrop-frag.glsl';
import background from '../textures/background0.png';

export const Windows = (mesh: THREE.Mesh, camera: THREE.PerspectiveCamera, tooltip: Tooltip) => {
    const iTime = { value: 0 };

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(background);
    texture.flipY = false;
    const rainyWindowMaterial = new THREE.ShaderMaterial({
        vertexShader: raindropVert,
        fragmentShader: raindropFrag,
        uniforms: {
            iTime,
            zoom: { value: 1 },
            iChannel0: { value: texture },
        },
    });
    rainyWindowMaterial.extensions.derivatives = true;

    const texture2 = textureLoader.load(background);
    texture2.flipY = false;
    const rainyWindowMaterial2 = new THREE.ShaderMaterial({
        vertexShader: raindropVert,
        fragmentShader: raindropFrag,
        uniforms: {
            iTime,
            zoom: { value: 1 },
            iChannel0: { value: texture2 },
        },
    });
    rainyWindowMaterial2.extensions.derivatives = true;
    
    const texture3 = textureLoader.load(background);
    texture3.flipY = false;
    texture3.wrapS = THREE.RepeatWrapping;
    texture3.repeat.set(3, 1);
    const rainyWindowMaterial3 = new THREE.ShaderMaterial({
        vertexShader: raindropVert,
        fragmentShader: raindropFrag,
        uniforms: {
            iTime,
            zoom: { value: 20 },
            iChannel0: { value: texture3 },
        },
    });
    rainyWindowMaterial3.extensions.derivatives = true;

    const targets: THREE.Mesh[] = [];
    let opened = true;
    let windowRef: THREE.Mesh | null = null;

    mesh.traverse(function (c) {
        if (c.name === 'Window') {
            windowRef = c as THREE.Mesh;
            windowRef!.rotation.y -= 0.35;
        }
        if (c.name === 'Plane') {
            targets.push(c as THREE.Mesh);
            tooltip.addTarget(c as THREE.Mesh, 'Close window', new THREE.Vector3(0, 0, 0));
            (c as THREE.Mesh).material = rainyWindowMaterial;
        }
        if ((c as THREE.Mesh).isMesh && !c.name.includes('Plane')) {
            c.castShadow = true;
            c.receiveShadow = true;
        } else if (!c.name.includes('Plane002')) {
            (c as THREE.Mesh).material = rainyWindowMaterial3;
        } else if (!c.name.includes('Plane001')) {
            (c as THREE.Mesh).material = rainyWindowMaterial2;
        }
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    document.addEventListener('pointerdown', (e: PointerEvent) => {
        pointer.x = (e.clientX / document.body.clientWidth) * 2 - 1;
        pointer.y = -(e.clientY / document.body.clientHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(targets);
        if (intersects.length > 0) {
            opened = false;
            tooltip.removeTarget(targets[0]?.uuid);
        }
    });

    if (windowRef) {
        const clock = new THREE.Clock();
        const render = () => {
            if (opened) {
                windowRef!.rotation.y += Math.sin(clock.getElapsedTime()) * 0.00025;
            } else if (windowRef!.rotation.y < 0) {
                windowRef!.rotation.y += 0.02;
            }

            iTime.value = clock.getElapsedTime();
            // const defaultResolution = new THREE.Vector2(100.0, 100.0);
            // iResolution.value = defaultResolution.multiplyScalar(camera.position.distanceTo(mesh.position) / 15);
            // zoom.value = camera.position.distanceTo(mesh.position) / 15;
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }
}
