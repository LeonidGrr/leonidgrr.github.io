uniform vec3 glow_color;
uniform float glow_opacity;
varying float intensity;

void main() {
    vec3 glow = glow_color * intensity;
    gl_FragColor = vec4(glow, glow_opacity);
}