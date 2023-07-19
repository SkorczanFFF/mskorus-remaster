import { MeshTransmissionMaterial, Text } from '@react-three/drei';
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
      <group ref={group} {...props} dispose={null} scale={1.5}>
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
          <MeshTransmissionMaterial
            backsideThickness={10}
            thickness={2}
            distortionScale={1}
            temporalDistortion={1}
            transmission={1}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        <Text
          fontSize={6}
          letterSpacing={0}
          color='#eaeaea'
          {...props}
          position={[10, 12, -23]}
        >
          FRONTENDFRONTENDFRONTENDFRONTENDFRONTEND
        </Text>
        <Text
          fontSize={6}
          letterSpacing={0}
          color='#eaeaea'
          {...props}
          position={[5, 7, -23]}
        >
          FRONTENDFRONTENDFRONTENDFRONTENDFRONTEND
        </Text>
        <Text
          fontSize={6}
          letterSpacing={0}
          color='#eaeaea'
          {...props}
          position={[0, 2, -23]}
        >
          FRONTENDFRONTENDFRONTENDFRONTENDFRONTEND
        </Text>
        <Text
          fontSize={6}
          letterSpacing={0}
          color='#801834'
          {...props}
          position={[5, -8, -23]}
        >
          DEVELOPERDEVELOPERDEVELOPERDEVELOPER
        </Text>
        <Text
          fontSize={6}
          letterSpacing={0}
          color='#801834'
          {...props}
          position={[0, -3, -23]}
          rotation={[0, 0, 0]}
        >
          DEVELOPERDEVELOPERDEVELOPERDEVELOPER
        </Text>
        <Text
          fontSize={6}
          letterSpacing={0}
          color='#801834'
          {...props}
          position={[-5, -13, -23]}
          rotation={[0, 0, 0]}
        >
          DEVELOPERDEVELOPERDEVELOPERDEVELOPER
        </Text>
        {/* <Blob /> */}
      </group>
    </>
  );
};

export default DesktopScene;
