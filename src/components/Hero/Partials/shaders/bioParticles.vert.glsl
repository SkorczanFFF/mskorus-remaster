precision highp float;

uniform float uTime;
uniform float uDuration;
uniform float uPointSizeBase;
uniform vec3 uMouse;
uniform float uRepelRadius;
uniform float uRepelStrength;

// Click shockwaves: (localX, localY, age01, intensity); age01 < 0 = inactive.
uniform vec4 uPulses[2];
uniform float uPulseStrength;
uniform float uMaxRadius;
uniform float uRingThick;
uniform float uTurbulence;

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

float pulseEnv(float t) {
  if (t < 0.0 || t >= 1.0) return 0.0;
  float attack = smoothstep(0.0, 0.08, t);
  float release = 1.0 - smoothstep(0.5, 1.0, t);
  return attack * release;
}

void main() {
  float tProgress = mod((uTime + aOffset), uDuration) / uDuration;

  float angle = aAxisAngle.w * tProgress;
  vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);

  vec3 pos = rotateVector(tQuat, position);
  pos += cubicBezier(aStartPosition, aControlPoint1, aControlPoint2, aEndPosition, tProgress);

  // ---- Continuous mouse repel (desktop hover) ----------------------------
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

  // ---- Click-driven shockwave pulses --------------------------------------
  float pulseTotalEnv = 0.0;
  float wavefrontFlash = 0.0;
  float jitter = fract(aOffset * 17.13); // per-particle phase delay


  for (int i = 0; i < 2; i++) {
    float age = uPulses[i].z;
    if (age < 0.0) continue;
    float ageJ = age - jitter * 0.04;
    float env = pulseEnv(ageJ);
    if (env <= 0.0) continue;

    pulseTotalEnv += env;

    // Expanding wavefront with damped oscillation.
    float radius = uMaxRadius * (0.18 + 0.82 * ageJ)
                 + sin(ageJ * 16.0) * exp(-ageJ * 4.0) * 0.45;

    vec2 dP = pos.xy - uPulses[i].xy;
    float dPlen = length(dP);
    // Ring band: nonzero only inside [radius - thick, radius + thick].
    float ringIn  = smoothstep(radius - uRingThick, radius, dPlen);
    float ringOut = 1.0 - smoothstep(radius, radius + uRingThick, dPlen);
    float ring = ringIn * ringOut;

    float force = ring * env * uPulses[i].w * uPulseStrength;
    if (force > 0.001) {
      vec2 dir = normalize(dP + 0.0001);
      vec2 tangent = vec2(-dir.y, dir.x);
      float drift = sin(aOffset * 31.4) * 0.4;
      pos.xy += (dir + tangent * drift) * force;
      pos.z += force * 0.35;
    }

    // Impact flash for very young pulses.
    wavefrontFlash += env * (1.0 - smoothstep(0.0, 0.18, ageJ));
  }

  // Curl-noise-ish turbulence during the pulse window.
  if (pulseTotalEnv > 0.001 && uTurbulence > 0.0) {
    float n1 = sin(pos.x * 0.45 + uTime * 1.3) * cos(pos.y * 0.4 - uTime * 1.1);
    float n2 = sin(pos.y * 0.42 - uTime * 1.4) * cos(pos.z * 0.5 + uTime * 0.9);
    pos += vec3(n2, -n1, n1 * 0.5) * pulseTotalEnv * uTurbulence;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  float sizeBoost = 1.0 + wavefrontFlash * 0.6;
  gl_PointSize = uPointSizeBase * aSize * sizeBoost * (300.0 / -mvPosition.z);

  float fadeIn = smoothstep(0.0, 0.08, tProgress);
  float fadeOut = smoothstep(1.0, 0.85, tProgress);
  vAlpha = aAlpha * fadeIn * fadeOut;

  float pulse = 0.9 + 0.1 * sin(tProgress * 6.2831 * 3.0 + aOffset * 10.0);
  vColor = aColor * pulse * (1.0 + wavefrontFlash * 0.5);

  gl_Position = projectionMatrix * mvPosition;
}
