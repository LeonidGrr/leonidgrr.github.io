varying vec3 vNormal;
varying vec3 vPosition;

void main(void) {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vPosition = position;
    vNormal = normal;
}