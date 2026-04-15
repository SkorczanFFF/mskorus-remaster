precision highp float;

uniform sampler2D uTexture;
uniform float uOpacity;

varying vec2 vUv;
varying vec2 vTexUv;
varying float vIntensity;

void main() {
  vec4 source = texture2D(uTexture, vTexUv);

  float border = 0.24;
  float radius = 0.5;
  float dist = radius - distance(vUv, vec2(0.5));

  // Mask on colour, not alpha — MultiplyBlending ignores alpha for colour output.
  float shape = smoothstep(0.0, border, dist);
  shape *= smoothstep(0.03, 0.16, source.a);
  shape *= 0.9 + vIntensity * 0.2;
  shape *= uOpacity;

  float maxC = max(max(source.r, source.g), source.b) + 1e-4;
  vec3 chroma = source.rgb / maxC;
  float srcLum = dot(source.rgb, vec3(0.21, 0.71, 0.07));
  float level = 0.13 + clamp(srcLum * 1.4, 0.0, 0.10);
  vec3 finalCol = chroma * level;

  // Multiply identity is (1,1,1); (0,0,0) would black the backdrop at corners.
  gl_FragColor = vec4(mix(vec3(1.0), finalCol, shape), 1.0);
}
