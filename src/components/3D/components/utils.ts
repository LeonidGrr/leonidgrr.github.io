import * as THREE from 'three';

export const fillWithPoints = (geometry: THREE.BufferGeometry, count: number): THREE.BufferGeometry => {
    const ray = new THREE.Ray()

    geometry.computeBoundingBox();
    let bbox = geometry.boundingBox!;
    let particles = [];

    const isInside = (v: THREE.Vector3): boolean => {
        ray.set(v, dir);
        let counter = 0;
  
        let pos = geometry.attributes.position;
        let faces = pos.count / 3;
        let vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3();
  
        for(let i = 0; i < faces; i++){
          vA.fromBufferAttribute(pos, i * 3 + 0);
          vB.fromBufferAttribute(pos, i * 3 + 1);
          vC.fromBufferAttribute(pos, i * 3 + 2);
          if (ray.intersectTriangle(vA, vB, vC, false, new THREE.Vector3())) {
              counter++;
          };
        }
  
        return counter % 2 == 1;
    }

    const setRandomVector = (min: THREE.Vector3, max: THREE.Vector3): THREE.Vector3 => {
        let v = new THREE.Vector3(
          THREE.MathUtils.randFloat(min.x, max.x),
          THREE.MathUtils.randFloat(min.y, max.y),
          THREE.MathUtils.randFloat(min.z, max.z)
       );
        if (!isInside(v)){
            return setRandomVector(min, max);
        }
        return v;
    }

    const dir = new THREE.Vector3(1, 1, 1).normalize();
    for (let i = 0; i < count; i++) {
      let p = setRandomVector(bbox.min, bbox.max);
      particles.push(p);
    }

    return new THREE.BufferGeometry().setFromPoints(particles);
}