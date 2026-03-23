import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { rasterizeHeroBioToCanvas } from '@/components/Hero/Partials/imageParticles/rasterizeHeroBio';
import bioFragShader from '@/components/Hero/Partials/shaders/bioParticles.frag.glsl';
import bioVertShader from '@/components/Hero/Partials/shaders/bioParticles.vert.glsl';

const PARTICLE_COUNT = 8000;
const DURATION = 20;

function randFloat(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildParticleGeometry(): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const aOffset = new Float32Array(PARTICLE_COUNT);
  const aStartPosition = new Float32Array(PARTICLE_COUNT * 3);
  const aControlPoint1 = new Float32Array(PARTICLE_COUNT * 3);
  const aControlPoint2 = new Float32Array(PARTICLE_COUNT * 3);
  const aEndPosition = new Float32Array(PARTICLE_COUNT * 3);
  const aAxisAngle = new Float32Array(PARTICLE_COUNT * 4);
  const aColor = new Float32Array(PARTICLE_COUNT * 3);
  const aAlpha = new Float32Array(PARTICLE_COUNT);
  const aSize = new Float32Array(PARTICLE_COUNT);

  const color = new THREE.Color();
  const axis = new THREE.Vector3();
  const palette = [0xea4f33, 0xd82958, 0xedfcff, 0x00242d];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const i4 = i * 4;

    positions[i3] = 0;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = 0;

    aOffset[i] = (i / PARTICLE_COUNT) * DURATION;

    aStartPosition[i3] = -12;
    aStartPosition[i3 + 1] = -2;
    aStartPosition[i3 + 2] = -1;

    aControlPoint1[i3] = randFloat(-37, 9);
    aControlPoint1[i3 + 1] = randFloat(-3, 22);
    aControlPoint1[i3 + 2] = randFloat(-6, -26);

    aControlPoint2[i3] = randFloat(-15, 25);
    aControlPoint2[i3 + 1] = randFloat(-25, 15);
    aControlPoint2[i3 + 2] = randFloat(-30, -15);

    aEndPosition[i3] = 25;
    aEndPosition[i3 + 1] = 10;
    aEndPosition[i3 + 2] = 2;

    axis.set(randFloat(-1, 1), randFloat(-1, 1), randFloat(-1, 1)).normalize();
    const angle = Math.PI * (16 + Math.floor(Math.random() * 17));

    aAxisAngle[i4] = axis.x;
    aAxisAngle[i4 + 1] = axis.y;
    aAxisAngle[i4 + 2] = axis.z;
    aAxisAngle[i4 + 3] = angle;

    color.set(palette[Math.floor(Math.random() * palette.length)]);
    color.multiplyScalar(randFloat(0.85, 1.2));

    aColor[i3] = color.r;
    aColor[i3 + 1] = color.g;
    aColor[i3 + 2] = color.b;

    aAlpha[i] = randFloat(0.5, 0.95);
    aSize[i] = randFloat(0.2, 0.8);
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aOffset', new THREE.BufferAttribute(aOffset, 1));
  geo.setAttribute(
    'aStartPosition',
    new THREE.BufferAttribute(aStartPosition, 3),
  );
  geo.setAttribute(
    'aControlPoint1',
    new THREE.BufferAttribute(aControlPoint1, 3),
  );
  geo.setAttribute(
    'aControlPoint2',
    new THREE.BufferAttribute(aControlPoint2, 3),
  );
  geo.setAttribute('aEndPosition', new THREE.BufferAttribute(aEndPosition, 3));
  geo.setAttribute('aAxisAngle', new THREE.BufferAttribute(aAxisAngle, 4));
  geo.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(aAlpha, 1));
  geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));

  return geo;
}

type HeroBioParticlesProps = {
  targetWidth?: number;
  position?: [number, number, number];
};

export default function HeroBioParticles({
  targetWidth = 13,
  position = [6, -0.48, -2.46],
}: HeroBioParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera, pointer } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const hitPoint = useMemo(() => new THREE.Vector3(), []);
  const localMouse = useMemo(() => new THREE.Vector3(0, 0, -9999), []);

  const { texture, cw, ch } = useMemo(() => {
    const canvas = rasterizeHeroBioToCanvas({
      maxWidthPx: 760,
      fontPx: 29,
      lineHeight: 1.4,
      paddingPx: 22,
    });
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return { texture: tex, cw: canvas.width, ch: canvas.height };
  }, []);

  const { planeWidth, planeHeight } = useMemo(() => {
    const pixelScale = targetWidth / Math.max(1, cw);
    return { planeWidth: cw * pixelScale, planeHeight: ch * pixelScale };
  }, [targetWidth, cw, ch]);

  const particleGeometry = useMemo(() => buildParticleGeometry(), []);

  const particleMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uDuration: { value: DURATION },
          uPointSizeBase: { value: 2.0 },
          uMouse: { value: new THREE.Vector3(0, 0, -9999) },
          uRepelRadius: { value: 8.0 },
          uRepelStrength: { value: 4.0 },
        },
        vertexShader: bioVertShader,
        fragmentShader: bioFragShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [],
  );

  useFrame((_state, delta) => {
    particleMaterial.uniforms.uTime.value += delta;
    particleMaterial.uniforms.uTime.value %= DURATION;

    if (pointsRef.current) {
      raycaster.setFromCamera(pointer, camera);
      const wPos = pointsRef.current.getWorldPosition(hitPoint.set(0, 0, 0));
      const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -wPos.z);
      const intersect = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(zPlane, intersect)) {
        pointsRef.current.worldToLocal(intersect);
        localMouse.copy(intersect);
      }
    }
    particleMaterial.uniforms.uMouse.value.copy(localMouse);
  });

  useEffect(() => {
    return () => {
      texture.dispose();
      particleMaterial.dispose();
      particleGeometry.dispose();
    };
  }, [texture, particleMaterial, particleGeometry]);

  const bgPadding = 0.8;

  return (
    <group position={[0, 0, -4]}>
      <points
        ref={pointsRef}
        geometry={particleGeometry}
        material={particleMaterial}
        frustumCulled={false}
      />

      <group position={position}>
        <mesh position={[0, 0, -0.08]}>
          <planeGeometry
            args={[
              planeWidth + bgPadding + 0.08,
              planeHeight + bgPadding + 0.08,
            ]}
          />
          <meshBasicMaterial color='#801834' transparent opacity={0.5} />
        </mesh>

        <mesh position={[0, 0, -0.05]}>
          <planeGeometry
            args={[planeWidth + bgPadding, planeHeight + bgPadding]}
          />
          <meshBasicMaterial color='#000000' />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[planeWidth, planeHeight]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={1}
            depthWrite={true}
            depthTest={false}
          />
        </mesh>
      </group>
    </group>
  );
}
