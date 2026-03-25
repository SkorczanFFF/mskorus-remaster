import { ThreeElements, useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';

import Background, {
  Vector3Tuple,
} from '@/components/Hero/Partials/Background';
import HeroBioParticles from '@/components/Hero/Partials/imageParticles/HeroBioParticles';
import ImageParticleField from '@/components/Hero/Partials/imageParticles/ImageParticleField';

useLoader.preload(THREE.TextureLoader, '/me.png');

const Scene = (props: ThreeElements['group'] & { onReady?: () => void }) => {
  const { onReady, ...groupProps } = props;
  const group = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (onReady) requestAnimationFrame(() => onReady());
  }, [onReady]);
  const groupScale = isMobile ? 1.15 : 1.5;
  const portraitGroupX = -12;
  const portraitWorldTargetX = -6;
  const portraitParticlesLocalX =
    (portraitWorldTargetX - portraitGroupX) / groupScale;

  return (
    <>
      <group ref={group} {...groupProps} dispose={null} scale={groupScale}>
        <ImageParticleField
          position={[portraitGroupX, -0.629, -2.504] as Vector3Tuple}
          imagePath='/me.png'
          targetWidth={12.5}
          threshold={122}
          maxSampleWidth={220}
          particlesPosition={[portraitParticlesLocalX, 0, 0]}
        />
        <HeroBioParticles />
        <Background variant={isMobile ? 'mobile' : 'desktop'} />
      </group>
    </>
  );
};

export default React.memo(Scene);
