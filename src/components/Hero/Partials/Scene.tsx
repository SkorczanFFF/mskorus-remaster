import { MeshTransmissionMaterial } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { colors } from '@/components/Hero/Partials/colors';
import DesktopBackground from '@/components/Hero/Partials/DesktopBackground';
import MobileBackground from '@/components/Hero/Partials/MobileBackground';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Scene = (props: any) => {
  const { nodes } = useLoader(GLTFLoader, '/models/desktopScene.glb');
  const group = useRef<THREE.Group>();

  return (
    <>
      <group
        ref={group}
        {...props}
        dispose={null}
        scale={isMobile ? 1.15 : 1.5}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.maciej as THREE.Mesh).geometry}
          material={(nodes.maciej as THREE.Mesh).material}
          position={[-4.214, 0.287, -1.378]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.827, 4.685, 1.827]}
        >
          <meshStandardMaterial
            attach='material'
            color={colors.orangeColor}
            roughness={0.7}
            metalness={0.5}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.skorus as THREE.Mesh).geometry}
          material={(nodes.skorus as THREE.Mesh).material}
          position={[-4.163, -1.444, -1.392]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.827, 4.685, 1.827]}
        >
          <meshStandardMaterial
            attach='material'
            color={colors.whiterColor}
            roughness={0.7}
            metalness={0.5}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.crystal as THREE.Mesh).geometry}
          material={(nodes.crystal as THREE.Mesh).material}
          position={[-0.368, -0.146, -3.409]}
          rotation={[0, -0.089, 0.168]}
          scale={[3.322, 2.419, 2.524]}
        >
          {isMobile ? (
            <>
              <meshPhysicalMaterial
                roughness={0.45}
                transmission={2}
                thickness={1.5}
                transparent
                opacity={0.75}
                color={0xffffff}
                clearcoat={1}
              />
            </>
          ) : (
            <MeshTransmissionMaterial
              backsideThickness={10}
              thickness={1}
              distortionScale={1}
              temporalDistortion={1}
              transmission={1}
              roughness={0.1}
              metalness={0.1}
            />
          )}
        </mesh>
        {isMobile ? <MobileBackground /> : <DesktopBackground />}
      </group>
    </>
  );
};

export default Scene;
