uniform vec3 view_vector;
uniform float pulse;
uniform bool is_pulsing;
varying float intensity;

void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));

    intensity = pow(dot(normalize(view_vector), actual_normal), 5.0) * (is_pulsing ? pulse : 1.0);
}