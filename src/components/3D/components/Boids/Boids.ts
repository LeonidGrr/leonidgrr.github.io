import * as THREE from 'three';

export const Boids = (
    wasm: any,
    initialConfig: {[key: string]: number},
    boidsNumber: number,
    obstacles: THREE.Mesh[],
    scene: THREE.Scene,
) => {
    const config = initialConfig;
    const meshes: THREE.Mesh[] = [];
    const data = [];
    
    const geometry = new THREE.CylinderGeometry(0.1, 1, 2, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    let i = 0;
    while (i < boidsNumber) {
        const b = new THREE.Mesh(geometry, material);
        data.push({
            pos: [Math.random() * 30, Math.random() * 30, Math.random() * 30],
            vel: [1.0, 1.0, 0.0],
            rot: [0.0, 0.0, 0.0, 1.0],
        });
        meshes.push(b);
        scene.add(b);
        i += 1;
    }

    const obstacleData = obstacles.reduce((acc: any[], o: THREE.Mesh) => {
        const { position, uv } = o.geometry.attributes;
        const { index } = o.geometry;
    
        const points: number[] = Array.from(position?.array || []);
        const uvs: number[] = Array.from(uv?.array || []);
        const indices: number[] = Array.from(index?.array || []);

        acc.push({
            points,
            indices,
            uvs,
            position: o.position.toArray(),
        });
        return acc;
    }, []);

    const boids = wasm.boids_initialize(
        obstacleData,
        data,
        config,
    );

    const update = (time: number) => {
        boids.boids_iteration(time)
            .forEach((b: any, i: number) => {
                const { rot, pos } = b;
                meshes[i].position.set(pos[0], pos[1], pos[2]);
                meshes[i].rotation.setFromQuaternion(new THREE.Quaternion(rot[0], rot[1], rot[2], 1));
                meshes[i].quaternion.normalize();
            });
    };

    return { meshes, update }
}
