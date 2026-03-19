import { ThreeElements, useFrame, useLoader } from '@react-three/fiber';
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
  /**
   * Offset (relative to this field's `group`) for the shader particle mesh
   * and its hover hit-plane. The bg plane stays at the group origin.
   */
  particlesPosition?: [number, number, number];
  /** Hit plane + hover-driven uniforms */
  enableHover?: boolean;
  /** Subtle rotation.y wobble */
  enableYawWobble?: boolean;
  idleRandom?: number;
  hoverRandom?: number;
  idleSize?: number;
  hoverSize?: number;
  idleOpacity?: number;
  hoverOpacity?: number;
};

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
  const hoveringRef = useRef(false);

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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- idle* are initial uniform seeds only
    [texture],
  );

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

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
  });

  if (!geometryData) return null;

  return (
    <group ref={groupRef} {...props}>
      <mesh position={[-6, 0, -0.08]}>
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
          onPointerEnter={() => {
            hoveringRef.current = true;
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

/** Loads `imagePath` via TextureLoader (use inside Suspense). */
export function ImageParticleFieldFromPath({ imagePath, ...rest }: ImageParticleFieldFromPathProps) {
  const texture = useLoader(THREE.TextureLoader, imagePath);
  return <ImageParticleFieldCore texture={texture} {...rest} />;
}

export type ImageParticleFieldProps =
  | ImageParticleFieldFromPathProps
  | (ImageParticleFieldCoreProps & { imagePath?: undefined });

/**
 * Image-driven particle field: either `imagePath` (loaded) or `texture` (e.g. CanvasTexture).
 */
export default function ImageParticleField(props: ImageParticleFieldProps) {
  if ('texture' in props && props.texture) {
    return <ImageParticleFieldCore {...props} />;
  }
  if (props.imagePath) {
    return <ImageParticleFieldFromPath {...props} />;
  }
  return null;
}

export { ImageParticleFieldCore };
