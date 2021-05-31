import * as THREE from 'three';
import blueNoise from '../textures/noise_blue.png';
import mediumNoise from '../textures/noise_medium.png';

const vertexShader = `
    #define ITR 90
    #define FAR 400.
    #define time iTime

    const vec3 lgt = vec3(-.523, .41, -.747);
    mat2 m2 = mat2( 0.80,  0.60, -0.60,  0.80 );

    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    //form iq, see: http://www.iquilezles.org/www/articles/morenoise/morenoise.htm
    vec3 noised( in vec2 x ) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        vec2 u = f*f*(3.0-2.0*f);
        float a = texture2D(iChannel0,(p+vec2(0.5,0.5))/256.0,0.0).x;
        float b = texture2D(iChannel0,(p+vec2(1.5,0.5))/256.0,0.0).x;
        float c = texture2D(iChannel0,(p+vec2(0.5,1.5))/256.0,0.0).x;
        float d = texture2D(iChannel0,(p+vec2(1.5,1.5))/256.0,0.0).x;
        return vec3(a+(b-a)*u.x+(c-a)*u.y+(a-b-c+d)*u.x*u.y,
                    6.0*f*(1.0-f)*(vec2(b-a,c-a)+(a-b-c+d)*u.yx));
    }

    float terrain(in vec2 p) {
        float rz = 0.;
        float z = 1.;
        vec2  d = vec2(0.0);
        float scl = 2.95;
        float zscl = -.4;
        float zz = 5.;
        for( int i=0; i<5; i++ )
        {
            vec3 n = noised(p);
            d += pow(abs(n.yz),vec2(zz));
            d -= smoothstep(-.5,1.5,n.yz);
            zz -= 1.;
            rz += z*n.x/(dot(d,d)+.85);
            z *= zscl;
            zscl *= .8;
            p = m2*p*scl;
        }
        
        rz /= smoothstep(1.5,-.5,rz)+.75;
        return rz;
    }
    
    void main() {
        vNormal = normal;
        vPosition = position;
        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    

    void main(void) {    
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;
export const Dawn = (scene: THREE.Scene) => {
    const loader = new THREE.TextureLoader();
    const iChannel0 = loader.load(mediumNoise);
    iChannel0.minFilter = THREE.NearestFilter;
    iChannel0.magFilter = THREE.NearestFilter;
    iChannel0.wrapS = THREE.RepeatWrapping;
    iChannel0.wrapT = THREE.RepeatWrapping;
    const iChannel1 = loader.load(blueNoise);
    iChannel1.minFilter = THREE.NearestFilter;
    iChannel1.magFilter = THREE.NearestFilter;
    iChannel1.wrapS = THREE.RepeatWrapping;
    iChannel1.wrapT = THREE.RepeatWrapping;

    const uniforms = {
        iChannel0: { type: 't', value: iChannel0 },
        iChannel1: { type: 't', value: iChannel1 },
    };
    const planeGeometry = new THREE.PlaneBufferGeometry(100, 100);
    const planeMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotateX(-Math.PI / 2);
    planeMesh.position.y = -25;
    scene.add(planeMesh);

    return {};
};
