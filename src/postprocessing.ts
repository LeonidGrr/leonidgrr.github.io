import { GUI } from 'dat.gui';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform sampler2D baseTexture;
    uniform sampler2D bloomTexture;
    varying vec2 vUv;
    void main() {
        gl_FragColor = (texture2D(baseTexture, vUv) + vec4(1.0) * texture2D(bloomTexture, vUv));
    }
`;

const bloomLayer = new THREE.Layers();
bloomLayer.set(1);

const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
const materials: {[key: string]: THREE.Material | THREE.Material[]} = {};

const postprocessing = (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    gui: GUI,
) => {
    const params = {
        exposure: 1,
        bloomStrength: 1.25,
        bloomThreshold: 0,
        bloomRadius: 0.1,
    };
    const folder = gui.addFolder('Bloom Parameters');
    folder.add(params, 'exposure', 0.1, 2).step(0.01).onChange(function (value) {
        renderer.toneMappingExposure = Math.pow(value, 4.0);
    });

    folder.add(params, 'bloomThreshold', 0.0, 1.0).step(0.01).onChange(function (value) {
        bloomPass.threshold = Number(value);
    });

    folder.add(params, 'bloomStrength', 0.0, 10.0).step(0.1).onChange(function (value) {
        bloomPass.strength = Number(value);
    });

    folder.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function (value) {
        bloomPass.radius = Number(value);
    });


    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        params.bloomStrength,
        params.bloomRadius,
        params.bloomThreshold,
    );

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const finalPass = new ShaderPass(
        new THREE.ShaderMaterial({
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture }
            },
            vertexShader,
            fragmentShader,
            defines: {}
        }), "baseTexture"
);
    finalPass.needsSwap = true;

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    const darkenNonBloomed = (obj: THREE.Object3D) => {
        const o = obj as THREE.Mesh;
        if (o.isMesh && bloomLayer.test(o.layers) === false) {
            materials[o.uuid] = o.material;
            o.material = darkMaterial;
        }
    };
    const restoreMaterial = (obj: THREE.Object3D) => {
        if (obj.type === 'Scene') {
            obj.layers.mask = 0;
        }
        const o = obj as THREE.Mesh;
        if (materials[o.uuid]) {
            o.material = materials[o.uuid];
            delete materials[o.uuid];
        }
    };
    const renderBloom = () => {
        scene.traverse(darkenNonBloomed);
        bloomComposer.render();
        scene.traverse(restoreMaterial);
    };

    return {
        bloomComposer,
        finalComposer,
        renderBloom,
    };
};

export default postprocessing;
