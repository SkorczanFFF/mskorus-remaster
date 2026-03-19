precision highp float;

uniform sampler2D uTexture;
uniform float uOpacity;

varying vec2 vUv;
varying vec2 vTexUv;
varying float vGrey;
varying float vIntensity;

void main() {
  vec4 source = texture2D(uTexture, vTexUv);

  float border = 0.24;
  float radius = 0.5;
  float dist = radius - distance(vUv, vec2(0.5));
  float alpha = smoothstep(0.0, border, dist);
  alpha *= smoothstep(0.03, 0.16, source.a);
  alpha *= 0.9 + vIntensity * 0.2;
  alpha *= uOpacity;

  vec3 greyCol = vec3(vGrey);
  vec3 finalCol = mix(greyCol, source.rgb, 0.55) + vec3(0.12);

  gl_FragColor = vec4(finalCol, alpha);
}
