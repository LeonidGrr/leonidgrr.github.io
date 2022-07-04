import * as THREE from 'three';

function makeLabelCanvas(baseWidth: number, fontSize: number, name: string) {
    const borderSize = 2;
    const ctx = document.createElement('canvas').getContext('2d')!;
    const font =  `${fontSize}px Prime`;
    ctx.font = font;
    // measure how long the name will be
    const textWidth = ctx.measureText(name).width;

    const doubleBorderSize = borderSize * 2;
    const width = baseWidth + doubleBorderSize;
    const height = fontSize + doubleBorderSize;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // need to set font again after resizing canvas
    ctx.font = font;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
    ctx.fillRect(0, 0, width, height);

    // scale to fit but don't stretch
    const scaleFactor = Math.min(1, baseWidth / textWidth);
    ctx.translate(width / 2, height / 2);
    ctx.scale(scaleFactor, 1);
    ctx.fillStyle = 'white';
    ctx.fillText(name, 0, 0);

    return ctx.canvas;
}

export const setupRenderTarget = async (renderer: THREE.WebGLRenderer) => {
    // Initial scene
    const rtWidth = 512;
    const rtHeight = 512;
    const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);
    const rtCamera = new THREE.PerspectiveCamera();
    rtCamera.position.z = 20;
    rtCamera.lookAt(0, 0, 0);
        
    const rtScene = new THREE.Scene();
    const light = new THREE.AmbientLight(0xFFFFFF, 1);
    rtScene.background = new THREE.Color(0, 0, 1);
    rtScene.add(light);

    const g = new THREE.BoxGeometry(3, 3, 3);
    const m = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        wireframe: true,
        wireframeLinewidth: 3,
    });
    const cube = new THREE.Mesh(g, m);
    rtScene.add(cube);

    const canvas = makeLabelCanvas(300, 64, 'Press any key...');
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const labelMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    });
    const label = new THREE.Sprite(labelMaterial);
    label.scale.x = canvas.width  * 0.01;
    label.scale.y = canvas.height * 0.01;
    label.position.y = -4;
    rtScene.add(label);

    // Terminal

    // Container mesh
    const geometry = new THREE.PlaneGeometry(6.95, 4.25);
    const material = new THREE.MeshStandardMaterial({
        map: renderTarget.texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'screen';
    mesh.layers.enable(1);

    const rtObject = new THREE.Object3D();
    rtObject.add(mesh);

    let activeScene = rtScene;
    const render = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.setRenderTarget(renderTarget);
        renderer.render(activeScene, rtCamera);
        renderer.setRenderTarget(null);
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return { rtObject };
};
