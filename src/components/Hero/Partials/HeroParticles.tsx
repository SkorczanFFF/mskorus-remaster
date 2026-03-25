import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type HeroParticlesProps = ThreeElements['group'] & {
  count?: number;
  radius?: number;
  size?: number;
  raysStrength?: number;
};

function makeSoftDiscTexture(size = 64) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.2, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.25)');
  g.addColorStop(1.0, 'rgba(255,255,255,0)');

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

function makeRadialRaysTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const cx = size / 2;
  const cy = size / 2;

  ctx.clearRect(0, 0, size, size);

  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
  glow.addColorStop(0.0, 'rgba(255,255,255,0.75)');
  glow.addColorStop(0.25, 'rgba(255,255,255,0.22)');
  glow.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  ctx.translate(cx, cy);
  const rayCount = 64;
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
    const len = size * (0.35 + Math.random() * 0.55);
    const w = 1 + Math.random() * 2.5;
    const alpha = 0.03 + Math.random() * 0.05;

    ctx.save();
    ctx.rotate(angle);
    const grad = ctx.createLinearGradient(0, 0, len, 0);
    grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len, 0);
    ctx.stroke();
    ctx.restore();
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

function randn() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

const HeroParticles = ({
  count = 500,
  radius = 1.9,
  size = 0.045,
  raysStrength = 0.7,
  ...props
}: HeroParticlesProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const raysMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const pulseRef = useRef(0);
  const { pointer } = useThree();

  const sprite = useMemo(() => makeSoftDiscTexture(64), []);
  const raysSprite = useMemo(() => makeRadialRaysTexture(256), []);

  useEffect(() => {
    return () => {
      sprite?.dispose();
      raysSprite?.dispose();
    };
  }, [sprite, raysSprite]);

  const { geometry, baseOpacity, basePositions, seeds } = useMemo(() => {
    const coreCount = Math.round(count * 0.62);

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seedArr = new Float32Array(count);

    const coreColor = new THREE.Color(0xffffff);
    const haloColor = new THREE.Color(0x801834);

    const coreR = new THREE.Vector3(
      radius * 0.55,
      radius * 0.42,
      radius * 0.55,
    );
    const haloR = new THREE.Vector3(radius * 1.35, radius * 0.95, radius * 1.2);

    for (let i = 0; i < count; i++) {
      const isCore = i < coreCount;
      const r = isCore ? coreR : haloR;

      const s = Math.random();
      const rr = (isCore ? 0.25 + s * 0.45 : 0.35 + s * 0.65) * radius;
      const angle = Math.random() * Math.PI * 2;
      const spin = rr * (isCore ? 1.25 : 0.9);

      const x = (Math.cos(angle + spin) * rr + randn() * 0.22) * (r.x / radius);
      const y = (Math.sin(angle + spin) * rr + randn() * 0.22) * (r.y / radius);
      const z = randn() * (isCore ? 0.18 : 0.26) * r.z;

      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const c = isCore
        ? coreColor.clone().lerp(haloColor, Math.random() * 0.12)
        : coreColor.clone().lerp(haloColor, 0.18 + Math.random() * 0.35);

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      seedArr[i] = Math.random();
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const sizeFactor = THREE.MathUtils.clamp(
      0.08 / Math.max(0.01, size),
      0.35,
      1,
    );
    const opacity = (count <= 300 ? 0.92 : 0.82) * sizeFactor;

    return {
      geometry: g,
      baseOpacity: opacity,
      basePositions: positions.slice() as Float32Array,
      seeds: seedArr,
    };
  }, [count, radius, size]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (!pointsRef.current) return;

    const targetX = pointer.x * 0.7;
    const targetY = pointer.y * 0.45;
    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * (1 - Math.pow(0.001, delta));
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * (1 - Math.pow(0.001, delta));

    groupRef.current.rotation.y += delta * 0.06;
    groupRef.current.rotation.x += delta * 0.03;
    const t = state.clock.elapsedTime * 0.6;
    const breathe = 1 + Math.sin(t) * 0.03;
    groupRef.current.scale.setScalar(breathe);

    const attr = pointsRef.current.geometry.getAttribute(
      'position',
    ) as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const now = state.clock.elapsedTime;
    const swirl = 0.35;
    const jitter = 0.06;

    for (let i = 0; i < seeds.length; i++) {
      const i3 = i * 3;
      const sx = basePositions[i3];
      const sy = basePositions[i3 + 1];
      const sz = basePositions[i3 + 2];

      const seed = seeds[i];
      const a = now * (0.35 + seed * 0.65);
      const cs = Math.cos(a);
      const sn = Math.sin(a);

      const rx = sx * cs - sy * sn;
      const ry = sx * sn + sy * cs;

      const wobX = Math.sin(now * (1.1 + seed * 2.2) + seed * 10) * jitter;
      const wobY = Math.cos(now * (1.0 + seed * 2.0) + seed * 7) * jitter;
      const wobZ =
        Math.sin(now * (0.9 + seed * 1.8) + seed * 5) * (jitter * 0.65);

      arr[i3] = rx + wobX;
      arr[i3 + 1] = ry + wobY;
      arr[i3 + 2] = sz * (1 + Math.sin(now + seed * 6) * swirl * 0.08) + wobZ;
    }

    attr.needsUpdate = true;

    if (pulseRef.current > 0 && materialRef.current) {
      pulseRef.current = Math.max(0, pulseRef.current - delta * 2.2);
      const p = pulseRef.current;
      materialRef.current.size = size * (1 + p * 0.9);
      materialRef.current.opacity = Math.min(1, baseOpacity + p * 0.18);
    } else if (materialRef.current) {
      materialRef.current.size = size;
      materialRef.current.opacity = baseOpacity;
    }

    if (raysMatRef.current) {
      raysMatRef.current.opacity = Math.min(
        0.9,
        (0.18 + pulseRef.current * 0.12) * raysStrength,
      );
    }
  });

  return (
    <group
      ref={groupRef}
      {...props}
      onPointerDown={(e) => {
        e.stopPropagation();
        pulseRef.current = 1;
      }}
    >
      {raysSprite ? (
        <mesh position={[0, 0, -0.6]}>
          <planeGeometry args={[radius * 3.0, radius * 3.0]} />
          <meshBasicMaterial
            ref={raysMatRef}
            map={raysSprite}
            transparent
            opacity={0.18 * raysStrength}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ) : null}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          ref={materialRef}
          size={size}
          sizeAttenuation
          transparent
          opacity={baseOpacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={sprite ?? undefined}
          alphaTest={0.01}
          vertexColors
        />
      </points>
    </group>
  );
};

export default React.memo(HeroParticles);
