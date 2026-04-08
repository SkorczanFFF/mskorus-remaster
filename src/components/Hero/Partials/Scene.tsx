import { ThreeElements, useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import Background, {
  Vector3Tuple,
} from '@/components/Hero/Partials/Background';
import HeroBioParticles from '@/components/Hero/Partials/imageParticles/HeroBioParticles';
import ImageParticleField from '@/components/Hero/Partials/imageParticles/ImageParticleField';

import type { Viewport } from '@/hooks/useViewport';

useLoader.preload(THREE.TextureLoader, '/me.png');

type GyroRef = React.MutableRefObject<{ x: number; y: number }>;

const SCENE_CONFIG = {
  mobile: { scale: 0.9, groupX: 0, targetX: 0 },
  tablet: { scale: 1.15, groupX: -4, targetX: -1 },
  desktop: { scale: 1.5, groupX: -10, targetX: -6 },
} as const;

const Scene = (props: ThreeElements['group'] & { onReady?: () => void; isMobile?: boolean; viewport?: Viewport; gyroRef?: GyroRef }) => {
  const { onReady, isMobile = false, viewport = 'desktop', gyroRef, ...groupProps } = props;
  const group = useRef<THREE.Group | null>(null);
  const cfg = SCENE_CONFIG[viewport];

  useEffect(() => {
    if (onReady) requestAnimationFrame(() => onReady());
  }, [onReady]);
  const groupScale = cfg.scale;
  const portraitGroupX = cfg.groupX;
  const portraitWorldTargetX = cfg.targetX;
  const portraitParticlesLocalX =
    (portraitWorldTargetX - portraitGroupX) / groupScale;

  return (
    <>
      <group ref={group} {...groupProps} dispose={null} scale={groupScale}>
        <ImageParticleField
          position={[portraitGroupX, isMobile ? -2.429 : -1.029, -2.504] as Vector3Tuple}
          imagePath='/me.png'
          targetWidth={12.5}
          threshold={122}
          maxSampleWidth={220}
          particlesPosition={[portraitParticlesLocalX, 0, 0]}
          enableHover={!isMobile}
          repelTimeout={isMobile ? 3000 : undefined}
        />
        <HeroBioParticles />
        <Background variant={isMobile ? 'mobile' : 'desktop'} gyroRef={gyroRef} />
      </group>
    </>
  );
};

export default React.memo(Scene);
