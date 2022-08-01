// Reference: 
// https://www.shadertoy.com/view/tltXWM

varying vec3 vPosition;
varying vec3 vNormal;

uniform mat4 modelMatrix;
uniform vec3 lightPosition;
uniform vec3 lightDiffuseColor;
uniform float lightIntensity;
uniform int noiseOctaves;
uniform float time;

// -------- Venusian planet shader --------
// simple sharpen filter
// #define SHARPEN

// Precision-adjusted variations of https://www.shadertoy.com/view/4djSRW
float hash(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }

float noise(vec3 x) {
    const vec3 step = vec3(110, 241, 171);
    vec3 i = floor(x);
    vec3 f = fract(x);
    float n = dot(i, step);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
               mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(0);
	for (int i = 0; i < noiseOctaves; ++i) {
		v += a * noise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

const float pi = 3.1415926535;
float square(float x) { return x * x; }

// returns max of a single vec3
float max3 (vec3 v) {
  return max (max (v.x, v.y), v.z);
}

vec3 getColorForCoord(vec3 coord) {
    // (intermediate) results of fbm
    vec3 q = vec3(0.0);
    vec3 r = vec3(0.0);
	float v = 0.0;
    vec3 color = vec3(0.0);

    // calculate fbm noise (3 steps) 
    // Remove time component for static layer
    q = vec3(fbm(coord + 0.025*time), fbm(coord), fbm(coord));
    r = vec3(fbm(coord + 1.0*q + 0.01*time), fbm(coord + q), fbm(coord + q));
    v = fbm(coord + 5.0*r + time*0.005);
    
    // convert noise value into color
    // three colors: top - mid - bottom (mid being constructed by three colors)
    // Brown colors
    // vec3 col_top = vec3(1.0, 1.0, 1.0);
    // vec3 col_bot = vec3(0.0, 0.0, 0.0);
    // vec3 col_mid1 = vec3(0.1, 0.2, 0.0);
    // vec3 col_mid2 = vec3(0.7, 0.4, 0.3);
    // vec3 col_mid3 = vec3(1.0, 0.4, 0.2);

    // Blue colors
    vec3 col_top = vec3(0.0, 0.5, 0.0);
    vec3 col_bot = vec3(0.0, 1.0, 1.0);
    vec3 col_mid1 = vec3(0.0, 1.0, 0.0);
    vec3 col_mid2 = vec3(0.0, 0.0, 1.0);
    vec3 col_mid3 = vec3(0.0, 0.0, 1.0);

    // mix mid color based on intermediate results
    vec3 col_mid = mix(col_mid1, col_mid2, clamp(r, 0.0, 1.0));
    col_mid = mix(col_mid, col_mid3, clamp(q, 0.0, 1.0));
    col_mid = col_mid;

    // calculate pos (scaling betwen top and bot color) from v
    float pos = v * 2.0 - 1.0;
    color = mix(col_mid, col_top, clamp(pos, 0.0, 1.0));
    color = mix(color, col_bot, clamp(-pos, 0.0, 1.0));

    // clamp color to scale the highest r/g/b to 1.0
    color = color / max3(color);
      
    // create output color, increase light > 0.5 (and add a bit to dark areas)
    color = (clamp((0.4 * pow(v,3.) + pow(v,2.) + 0.5*v), 0.0, 1.0) * 0.9 + 0.1) * color;
    
    return color;
}

void main(void) {    
    #ifdef SHARPEN 
        // use a simple sharpen filter (you could improve that immensely!
        vec3 color =
            getColorForCoord(vNormal) * 3. -
            getColorForCoord(vNormal + vec2(1.0, 0.0)) * 0.5 -
            getColorForCoord(vNormal + vec2(0.0, 1.0)) * 0.5 -
            getColorForCoord(vNormal - vec2(1.0, 0.0)) * 0.5 -
            getColorForCoord(vNormal - vec2(0.0, 1.0)) * 0.5;
    #else
        // just use a single pass
        vec3 color = getColorForCoord(vNormal);
    #endif

    // World values
    vec3 vPositionW = vec3(modelMatrix * vec4(vPosition, 1.0));
    vec3 vNormalW = normalize(vec3(modelMatrix * vec4(vNormal, 0.0)));
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    // Light
    vec3 lightVectorW = normalize(lightPosition - vPositionW);

    // diffuse
    float ndl = max(0.0, dot(vNormalW, lightVectorW));
	vec3 diffuse = vec3(color * ndl);

    // Specular
    // vec3 angleW = normalize(viewDirectionW + lightVectorW);
    // float specComp = max(0.0, dot(vNormalW, angleW));
    // specComp = pow(specComp, max(1.0, 24.0)) * 2.0;

	// gl_FragColor = vec4(diffuse + vec3(specComp), 1.0);

    gl_FragColor = vec4(diffuse.rgb, 1.0);
}
