import { useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { colors } from '@/components/Hero/Partials/colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DesktopScene = (props: any) => {
  const { nodes } = useLoader(GLTFLoader, '/models/desktopScene.glb');
  const group = useRef<THREE.Group>();

  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.maciej as THREE.Mesh).geometry}
          material={(nodes.maciej as THREE.Mesh).material}
          position={[-3.842, 1.218, -0.167]}
          rotation={[1.65, -0.037, -0.435]}
          scale={[0.756, 0.8, 0.756]}
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
          position={[-3.854, 0.574, -0.277]}
          rotation={[1.65, -0.037, -0.435]}
          scale={[0.756, 0.8, 0.756]}
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
          geometry={(nodes.frontend as THREE.Mesh).geometry}
          material={(nodes.frontend as THREE.Mesh).material}
          position={[-5.089, -0.691, 1.245]}
          rotation={[Math.PI / 2, 0, -0.611]}
          scale={[0.756, 0.8, 0.756]}
        >
          <meshStandardMaterial
            attach='material'
            color={colors.raspberryColor}
            roughness={0.7}
            metalness={0.5}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.developer as THREE.Mesh).geometry}
          material={(nodes.developer as THREE.Mesh).material}
          position={[-4.429, -1.284, 0.639]}
          rotation={[Math.PI / 2, 0, -0.611]}
          scale={[0.756, 0.8, 0.756]}
        >
          <meshStandardMaterial
            attach='material'
            color={colors.whiterColor}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      </group>
    </>
  );
};

export default DesktopScene;
