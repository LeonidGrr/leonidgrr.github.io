import * as THREE from 'three';
import { fillWithPoints } from '../utils'

const POINTS_COUNT = 10000;

export const ParticlePointer = (targets?: THREE.Mesh[]) => {
    const particleGeometries: THREE.BufferGeometry[] = (targets || [])
        .reduce((acc: THREE.BufferGeometry[], t, idx) => {
            t.name = `${idx}`;
            acc.push(fillWithPoints(t.geometry, POINTS_COUNT));
            return acc;
        }, []);

    const refGeometry = new THREE.PlaneGeometry(1000, 1000);
    const refMaterial = new THREE.MeshBasicMaterial({ color: 0x404040, wireframe: true });
    const refMesh = new THREE.Mesh(refGeometry, refMaterial);
    refMesh.position.z = -100;
    refMesh.name = 'pointerRef';

    const particlesGeometry = fillWithPoints(new THREE.SphereBufferGeometry(), POINTS_COUNT);
    const particlesMat = new THREE.PointsMaterial({ color: "aqua", size: 0.1 });
    const particles = new THREE.Points(particlesGeometry.clone(), particlesMat);
    refMesh.add(particles);
    
    const raycaster = new THREE.Raycaster();
    const positions = particles.geometry.attributes.position;
    const pointer = new THREE.Vector3(0, 0, 0);
    document.addEventListener('mousemove', e => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
    });

    const update = (camera: THREE.PerspectiveCamera) => {
        refMesh.rotation.setFromRotationMatrix(camera.matrixWorld);
		refMesh.geometry.attributes.position.needsUpdate = true;

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(targets || []);
        const intersectsRef = raycaster.intersectObjects([refMesh]);

        for (let i = 0; i < POINTS_COUNT; i++) {   
            const px = positions.getX(i);
            const py = positions.getY(i);
            const pz = positions.getZ(i);   
            if (intersects.length > 0) {
                const target = intersects[0].object;
                particles.parent = target;
                const geometry = particleGeometries[parseInt(target.name)];
                const targetx = geometry.attributes.position.getX(i);
                const targety = geometry.attributes.position.getY(i);
                const targetz = geometry.attributes.position.getZ(i);
    
                positions.setXYZ(
                    i,
                    THREE.MathUtils.lerp(px, targetx, Math.random() / 10),
                    THREE.MathUtils.lerp(py, targety, Math.random() / 10),
                    THREE.MathUtils.lerp(pz, targetz, Math.random() / 10),
                );
            } else if (intersectsRef.length > 0) {
                particles.parent = refMesh;
                const target = intersectsRef[0].point;
                positions.setXYZ(
                    i,
                    THREE.MathUtils.lerp(px, target.x, 0.1),
                    THREE.MathUtils.lerp(py, target.y, 0.1),
                    THREE.MathUtils.lerp(pz, target.z, 0.1),
                );
            }
        }

		particles.geometry.attributes.position.needsUpdate = true;
    };

    return { update, refMesh };
};
