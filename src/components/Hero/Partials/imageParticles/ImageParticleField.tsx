import { ThreeElements, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import fragmentShader from '@/components/Hero/Partials/shaders/heroParticles.frag.glsl';
import vertexShader from '@/components/Hero/Partials/shaders/heroParticles.vert.glsl';

import {
  getImageSourceFromTexture,
  sampleTextureToParticleGeometry,
} from '@/components/Hero/Partials/imageParticles/geometryFromImageSource';

export type ImageParticleFieldCoreProps = ThreeElements['group'] & {
  texture: THREE.Texture;
  threshold?: number;
  targetWidth?: number;
  maxSampleWidth?: number;
  particlesPosition?: [number, number, number];
  enableHover?: boolean;
  enableYawWobble?: boolean;
  idleRandom?: number;
  hoverRandom?: number;
  idleSize?: number;
  hoverSize?: number;
  idleOpacity?: number;
  hoverOpacity?: number;
};

function sampleAlphaMap(texture: THREE.Texture, sampleSize = 256): ImageData | null {
  const src = texture.image as HTMLImageElement | HTMLCanvasElement | ImageBitmap | undefined;
  if (!src) return null;
  const w = 'naturalWidth' in src ? src.naturalWidth : src.width;
  const h = 'naturalHeight' in src ? src.naturalHeight : src.height;
  if (!w || !h) return null;

  const scale = Math.min(1, sampleSize / Math.max(w, h));
  const sw = Math.max(1, Math.round(w * scale));
  const sh = Math.max(1, Math.round(h * scale));

  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(src as CanvasImageSource, 0, 0, sw, sh);
  const data = ctx.getImageData(0, 0, sw, sh);
  canvas.width = 0;
  canvas.height = 0;
  return data;
}

function isOpaqueAtUv(
  alphaMap: ImageData,
  u: number,
  v: number,
  alphaThreshold = 30,
): boolean {
  const px = Math.floor(u * (alphaMap.width - 1));
  const py = Math.floor((1 - v) * (alphaMap.height - 1));
  const idx = (py * alphaMap.width + px) * 4 + 3;
  return alphaMap.data[idx] > alphaThreshold;
}

function ImageParticleFieldCore({
  texture,
  threshold = 20,
  targetWidth = 6.8,
  maxSampleWidth = 260,
  particlesPosition = [0, 0, 0],
  enableHover = true,
  enableYawWobble = true,
  idleRandom = 0.06,
  hoverRandom = 0.9,
  idleSize = 0.08,
  hoverSize = 0.1,
  idleOpacity = 0.7,
  hoverOpacity = 0.15,
  ...props
}: ImageParticleFieldCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particleMeshRef = useRef<THREE.Mesh>(null);
  const hoveringRef = useRef(false);
  const alphaMap = useMemo(() => sampleAlphaMap(texture), [texture]);
  const { camera, pointer } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const localMouse = useMemo(() => new THREE.Vector3(0, 0, -9999), []);

  const geometryData = useMemo(() => {
    const src = getImageSourceFromTexture(texture);
    if (!src) return null;
    return sampleTextureToParticleGeometry(
      src.source,
      src.width,
      src.height,
      threshold,
      targetWidth,
      maxSampleWidth,
    );
  }, [maxSampleWidth, targetWidth, texture, threshold]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRandom: { value: idleRandom },
      uDepth: { value: 0.06 },
      uSize: { value: idleSize },
      uOpacity: { value: idleOpacity },
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector3(0, 0, -9999) },
      uRepelRadius: { value: 1.2 },
      uRepelStrength: { value: 0.5 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- idle* are initial uniform seeds only
    [texture],
  );

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    const geo = geometryData?.geometry;
    return () => {
      geo?.dispose();
    };
  }, [geometryData]);

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.getElapsedTime();

    const t = 1 - Math.pow(0.001, delta);
    const targetRandom = hoveringRef.current ? hoverRandom : idleRandom;
    uniforms.uRandom.value += (targetRandom - uniforms.uRandom.value) * t;

    const targetSize = hoveringRef.current ? hoverSize : idleSize;
    uniforms.uSize.value += (targetSize - uniforms.uSize.value) * t;

    const targetOpacity = hoveringRef.current ? hoverOpacity : idleOpacity;
    uniforms.uOpacity.value += (targetOpacity - uniforms.uOpacity.value) * t;

    if (enableYawWobble && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.045;
    }

    if (particleMeshRef.current) {
      raycaster.setFromCamera(pointer, camera);
      const wPos = particleMeshRef.current.getWorldPosition(new THREE.Vector3());
      const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -wPos.z);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(zPlane, hit)) {
        particleMeshRef.current.worldToLocal(hit);
        localMouse.copy(hit);
      }
    }
    uniforms.uMouse.value.copy(localMouse);
  });

  if (!geometryData) return null;

  return (
    <group ref={groupRef} {...props}>
      <mesh position={[particlesPosition[0], particlesPosition[1], particlesPosition[2] - 0.08]}>
        <planeGeometry args={[geometryData.planeWidth, geometryData.planeHeight]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>

      <mesh
        ref={particleMeshRef}
        geometry={geometryData.geometry}
        position={particlesPosition}
        frustumCulled={false}
      >
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {enableHover ? (
        <mesh
          position={particlesPosition}
          onPointerMove={(e) => {
            if (!alphaMap || !e.uv) {
              hoveringRef.current = false;
              return;
            }
            hoveringRef.current = isOpaqueAtUv(alphaMap, e.uv.x, e.uv.y);
          }}
          onPointerLeave={() => {
            hoveringRef.current = false;
          }}
        >
          <planeGeometry args={[geometryData.planeWidth, geometryData.planeHeight]} />
          <meshBasicMaterial transparent opacity={0.0001} depthWrite={false} depthTest={false} />
        </mesh>
      ) : null}
    </group>
  );
}

export type ImageParticleFieldFromPathProps = Omit<ImageParticleFieldCoreProps, 'texture'> & {
  imagePath: string;
};

export function ImageParticleFieldFromPath({ imagePath, ...rest }: ImageParticleFieldFromPathProps) {
  const texture = useLoader(THREE.TextureLoader, imagePath);
  return <ImageParticleFieldCore texture={texture} {...rest} />;
}

export type ImageParticleFieldProps =
  | ImageParticleFieldFromPathProps
  | (ImageParticleFieldCoreProps & { imagePath?: undefined });

export default function ImageParticleField(props: ImageParticleFieldProps) {
  if ('texture' in props && props.texture) {
    return <ImageParticleFieldCore {...props} />;
  }
  if (props.imagePath) {
    return <ImageParticleFieldFromPath {...props} />;
  }
  return null;
}
