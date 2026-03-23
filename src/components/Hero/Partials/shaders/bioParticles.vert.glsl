precision highp float;

uniform float uTime;
uniform float uDuration;
uniform float uPointSizeBase;
uniform vec3 uMouse;
uniform float uRepelRadius;
uniform float uRepelStrength;

attribute float aOffset;
attribute vec3 aStartPosition;
attribute vec3 aControlPoint1;
attribute vec3 aControlPoint2;
attribute vec3 aEndPosition;
attribute vec4 aAxisAngle;
attribute vec3 aColor;
attribute float aAlpha;
attribute float aSize;

varying vec3 vColor;
varying float vAlpha;

vec3 cubicBezier(vec3 p0, vec3 c0, vec3 c1, vec3 p1, float t) {
  float tn = 1.0 - t;
  return tn * tn * tn * p0 + 3.0 * tn * tn * t * c0 + 3.0 * tn * t * t * c1 + t * t * t * p1;
}

vec4 quatFromAxisAngle(vec3 axis, float angle) {
  float halfAngle = angle * 0.5;
  return vec4(axis * sin(halfAngle), cos(halfAngle));
}

vec3 rotateVector(vec4 q, vec3 v) {
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

void main() {
  float tProgress = mod((uTime + aOffset), uDuration) / uDuration;

  float angle = aAxisAngle.w * tProgress;
  vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);

  vec3 pos = rotateVector(tQuat, position);
  pos += cubicBezier(aStartPosition, aControlPoint1, aControlPoint2, aEndPosition, tProgress);

  vec2 diff2 = pos.xy - uMouse.xy;
  float dist2 = length(diff2);
  float influence = smoothstep(uRepelRadius, 0.0, dist2);
  if (influence > 0.001) {
    vec2 dir = normalize(diff2 + 0.001);
    vec2 tangent = vec2(-dir.y, dir.x);
    float drift = sin(aOffset * 31.4) * 0.4;
    pos.xy += (dir + tangent * drift) * influence * uRepelStrength;
    pos.z += influence * 1.5;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  gl_PointSize = uPointSizeBase * aSize * (300.0 / -mvPosition.z);

  float fadeIn = smoothstep(0.0, 0.08, tProgress);
  float fadeOut = smoothstep(1.0, 0.85, tProgress);
  vAlpha = aAlpha * fadeIn * fadeOut;

  float pulse = 0.9 + 0.1 * sin(tProgress * 6.2831 * 3.0 + aOffset * 10.0);
  vColor = aColor * pulse;

  gl_Position = projectionMatrix * mvPosition;
}
