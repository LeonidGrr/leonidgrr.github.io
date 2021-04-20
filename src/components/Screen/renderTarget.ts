import * as THREE from 'three';

export const setupRenderTarget = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
    const rtWidth = 256;
    const rtHeight = 256;
    const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);
    const rtCamera = new THREE.PerspectiveCamera();
    rtCamera.position.z = 15;
    rtCamera.lookAt(0, 0, 0);
        
    const rtScene = new THREE.Scene();
    const light = new THREE.AmbientLight(0xFFFFFF, 1);
    rtScene.background = new THREE.Color(0, 0, 1);
    rtScene.add(light);

    // Content
    const g = new THREE.BoxGeometry(5, 5, 5);
    const m = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        wireframe: true,
        wireframeLinewidth: 100,
    });
    const cube = new THREE.Mesh(g, m);
    rtScene.add(cube);

    // Container mesh
    const geometry = new THREE.PlaneGeometry(5.15, 3.25);
    const material = new THREE.MeshStandardMaterial({
        map: renderTarget.texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.layers.enable(1);

    const rtObject = new THREE.Object3D();
    rtObject.position.set(3.2, 2.65, -1.775);
    rtObject.rotateX(-Math.PI / 24);
    rtObject.add(mesh);

    const update = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.setRenderTarget(renderTarget);
        renderer.render(rtScene, rtCamera);
        renderer.setRenderTarget(null);
    };

    return {
        update,
        rtObject,
    };
};
