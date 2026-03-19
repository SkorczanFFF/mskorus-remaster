precision highp float;

uniform float uTime;
uniform float uRandom;
uniform float uDepth;
uniform float uSize;
uniform sampler2D uTexture;

attribute vec3 offset;
attribute vec2 sampleUv;
attribute float pindex;
attribute float angle;
attribute float intensity;

varying vec2 vUv;
varying vec2 vTexUv;
varying float vGrey;
varying float vIntensity;

float rand(float n) {
  return fract(sin(n) * 43758.5453123);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 texUv = sampleUv;

  vec4 texCol = texture2D(uTexture, texUv);
  float grey = texCol.r * 0.21 + texCol.g * 0.71 + texCol.b * 0.07;

  vec3 displaced = offset;
  float r = rand(pindex);
  float n = hash(texUv * 37.0 + vec2(uTime * 0.08, pindex * 0.001));
  displaced.xy += vec2(r - 0.5, rand(offset.x + pindex) - 0.5) * uRandom * (0.5 + intensity);
  displaced.z += ((n - 0.5) + sin(uTime * 0.6 + pindex * 0.035) * 0.25) * uDepth;

  float psize = (sin(uTime * 0.8 + pindex * 0.17) + 2.0);
  psize *= max(grey, 0.18);
  psize *= uSize;

  vec3 transformed = displaced + vec3(position.xy * psize, 0.0);

  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  vUv = uv;
  vTexUv = texUv;
  vGrey = grey;
  vIntensity = intensity;
}
