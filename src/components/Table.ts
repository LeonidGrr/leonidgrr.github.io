import * as THREE from 'three';


import COLOR from '../textures/Wood003/Wood_COLOR.png';
import DISP from '../textures/Wood003/Wood_DISP.png';
import NRM from '../textures/Wood003/Wood_NRM.png';
import OCC from '../textures/Wood003/Wood_OCC.png';
import SPEC from '../textures/Wood003/Wood_SPEC.png';

export const Table = () => {
    const loader = new THREE.TextureLoader();
    const colorTexture = loader.load(COLOR);
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.repeat.set(4, 4);

    const normalTexture = loader.load(NRM);
    normalTexture.wrapS = THREE.RepeatWrapping;
    normalTexture.wrapT = THREE.RepeatWrapping;
    normalTexture.repeat.set(4, 4);

    const displacementTexture = loader.load(DISP);
    displacementTexture.wrapS = THREE.RepeatWrapping;
    displacementTexture.wrapT = THREE.RepeatWrapping;
    displacementTexture.repeat.set(4, 4);

    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide,
        // normalMap: normalTexture,
        // roughnessMap: roughnessTexture,
        // map: colorTexture,
        // displacementMap: displacementTexture,
        // aoMap: ambientTexture,
        
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.rotateX(-Math.PI / 2);
    mesh.rotateZ(-Math.PI / 3);
    mesh.position.y = -1.2;
    
    return { mesh };
};
