import { MeshTransmissionMaterial } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { colors } from '@/components/Hero/Partials/colors';
import DesktopBackground from '@/components/Hero/Partials/DesktopBackground';
import MobileBackground from '@/components/Hero/Partials/MobileBackground';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Scene = (props: any) => {
  const { nodes, materials } = useLoader(
    GLTFLoader,
    '/models/diax.glb',
  ) as GLTFResult;
  const group = useRef<THREE.Group>();

  const IcospherePart = ({
    partNumber,
    position,
  }: {
    partNumber: number;
    position: [number, number, number];
  }) => (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes[`Icosphere001_Part_${partNumber}`].geometry}
        scale={0.025}
      >
        {isMobile ? (
          <meshPhysicalMaterial
            roughness={0.45}
            transmission={2}
            thickness={1.5}
            transparent
            opacity={0.75}
            color={0xffffff}
            clearcoat={1}
          />
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
    </group>
  );

  return (
    <>
      <group
        ref={group}
        {...props}
        dispose={null}
        scale={isMobile ? 1.15 : 1.5}
      >
        <group position={[0.058, 0.269, -2.375]} scale={0.904}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.maciej.geometry}
            scale={0.025}
          >
            <meshStandardMaterial
              attach='material'
              color={colors.orangeColor}
              roughness={0.7}
              metalness={0.5}
            />
          </mesh>
        </group>

        <group position={[0.068, -1.526, -2.632]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.skorus.geometry}
            scale={0.025}
          >
            <meshStandardMaterial
              attach='material'
              color={colors.whiterColor}
              roughness={0.7}
              metalness={0.5}
            />
          </mesh>
        </group>

        <IcospherePart partNumber={1} position={[3.598, -1.416, -2.543]} />
        <IcospherePart partNumber={2} position={[2.478, -1.068, -2.281]} />
        <IcospherePart partNumber={3} position={[2.786, -1.939, -3.437]} />
        <IcospherePart partNumber={4} position={[-0.775, -1.798, -2.648]} />
        <IcospherePart partNumber={5} position={[-1.706, -1.195, -1.81]} />
        <IcospherePart partNumber={6} position={[-3.719, 0.87, -3.019]} />
        <IcospherePart partNumber={7} position={[-0.107, 1.568, -2.393]} />
        <IcospherePart partNumber={8} position={[-0.666, 0.915, -5.196]} />
        <IcospherePart partNumber={9} position={[3.657, 0.795, -4.563]} />
        <IcospherePart partNumber={10} position={[-3.381, -0.357, -4.275]} />
        <IcospherePart partNumber={11} position={[1.67, -1.257, -5.512]} />
        <IcospherePart partNumber={12} position={[2.824, 1.264, -2.902]} />

        {isMobile ? <MobileBackground /> : <DesktopBackground />}
      </group>
    </>
  );
};

export default Scene;
