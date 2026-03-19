import { ThreeElements, useLoader, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Background, { Vector3Tuple } from '@/components/Hero/Partials/Background';
import HeroBioParticles from '@/components/Hero/Partials/imageParticles/HeroBioParticles';
import ImageParticleField from '@/components/Hero/Partials/imageParticles/ImageParticleField';

interface GLTFResult {
  nodes: {
    [key: string]: THREE.Mesh;
    maciej: THREE.Mesh;
    skorus: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
}

const Scene = (props: ThreeElements['group']) => {
  const { nodes } = useLoader(GLTFLoader, '/models/diax.glb') as unknown as GLTFResult;
  const group = useRef<THREE.Group | null>(null);
  const { gl } = useThree();
  const groupScale = isMobile ? 1.15 : 1.5;
  const portraitGroupX = -1.65;
  const portraitWorldTargetX = -6;
  const portraitParticlesLocalX = (portraitWorldTargetX - portraitGroupX) / groupScale;

  React.useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, [gl]);

  return (
    <>
      <group ref={group} {...props} dispose={null} scale={groupScale}>
        {/* Temporary: hidden maciej/skorus while image particles are active. */}
        <group visible={false} position={[0.058, 0.269, -2.375]} scale={0.904}>
          <mesh castShadow receiveShadow geometry={nodes.maciej.geometry} scale={0.025} />
        </group>

        <group visible={false} position={[0.068, -1.526, -2.632]}>
          <mesh castShadow receiveShadow geometry={nodes.skorus.geometry} scale={0.025} />
        </group>

        {/* Portrait shifted left; bio + draggable SVGs desktop-only via parent Canvas */}
        <ImageParticleField
          position={[portraitGroupX, -0.629, -2.504] as Vector3Tuple}
          imagePath='/me.png'
          targetWidth={9.4}
          threshold={22}
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
