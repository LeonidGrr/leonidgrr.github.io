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
    bloomParams?: {
        strength?: number,
        radius?: number,
        threshold?: number,
    },
) => {
    const params = {
        exposure: 1,
        strength: 1.25,
        threshold: 0,
        radius: 0.1,
        ...bloomParams,
    };
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        params.strength,
        params.radius,
        params.threshold,
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
        }), 'baseTexture',
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

    
    // FPS and pixel ratio modifier adjust
    let last = new Date();
    let pixelRatioModifier = 1.0;

    const pixelRatioAdjust = () => {
        const current = new Date();
        const fps = 1000 / (current.getTime() - last.getTime());

        if (fps >= 30) {
            pixelRatioModifier = 1.0;
        } else if (fps < 30 && fps >= 15) {
            pixelRatioModifier = 0.7;
        } else if (fps < 15) {
            pixelRatioModifier = 0.5;
        }
        
        last = current;
    };

    const resizeRenderer = () => {
        pixelRatioAdjust();
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio * pixelRatioModifier;
        const width = canvas.clientWidth * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        if (canvas.width !== width || canvas.height !== height) {
          renderer.setSize(width, height, false);
          bloomComposer.setSize(width, height);
          finalComposer.setSize(width, height);
        }
    };
    requestAnimationFrame(resizeRenderer);

    return {
        finalComposer,
        renderBloom,
    };
};

export default postprocessing;
