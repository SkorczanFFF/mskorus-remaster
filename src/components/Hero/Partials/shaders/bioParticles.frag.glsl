precision highp float;

varying vec3 vColor;
varying float vAlpha;

void main() {
  // Circular soft particle
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;

  float alpha = smoothstep(0.5, 0.3, d) * vAlpha;

  float core = smoothstep(0.15, 0.0, d) * 0.15;

  gl_FragColor = vec4(vColor + core, alpha);
}
