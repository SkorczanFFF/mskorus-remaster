const fragmentShader = `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 5.0 * vDisplacement * u_intensity * sin(vUv.y * 5.0 + u_time);
    vec3 color = mix(vec3(1.0), vec3(0.8705882, 0.2823529, 0.1921569), distort);
    color = mix(color, vec3(0.7490196, 0.1215686, 0.2901961), distort);
    color = mix(color, vec3(0.7490196, 0.1215686, 0.2901961), distort);
    // Darken the color by multiplying it with a factor less than 1.0
    color *= 0.5; // Adjust the factor to control the darkness
    gl_FragColor = vec4(color, 3.0);
}

`;

export default fragmentShader;
