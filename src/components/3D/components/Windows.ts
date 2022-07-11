import * as THREE from 'three';
import { Tooltip } from './Tooltip';
import raindropVert from '../shaders/raindrop-vert.glsl';
import raindropFrag from '../shaders/raindrop-frag.glsl';
import background from '../textures/background.png';

export const Windows = (mesh: THREE.Mesh, camera: THREE.PerspectiveCamera, tooltip: Tooltip) => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(background);
    const uniforms = {
        iTime: { value: 0 },
        iResolution:  { value: new THREE.Vector2(200.0, 200.0) },
        zoom: { value: 0.25 },
        iChannel0: { value: texture },
    };
    const rainyWindowMaterial = new THREE.ShaderMaterial({
        vertexShader: raindropVert,
        fragmentShader: raindropFrag,
        uniforms,
    });
    rainyWindowMaterial.extensions.derivatives = true;

    const targets: THREE.Mesh[] = [];
    let opened = true;
    let windowRef: THREE.Mesh | null = null;

    mesh.traverse(function (c) {
        if (c.name === 'Window') {
            windowRef = c as THREE.Mesh;
            windowRef!.rotation.y -= 0.4;
        }
        if (c.name === 'Plane') {
            targets.push(c as THREE.Mesh);
            tooltip.addTarget(c as THREE.Mesh, 'Close window', new THREE.Vector3(0, 0, 0));
        }
        if ((c as THREE.Mesh).isMesh && !c.name.includes('Plane')) {
            c.castShadow = true;
            c.receiveShadow = true;
        } else {
            (c as THREE.Mesh).material = rainyWindowMaterial;
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

            uniforms.iTime.value = clock.getElapsedTime();
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }
}
