import { MeshTransmissionMaterial } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import React, { useCallback, useMemo, useRef } from 'react';
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

type Vector3Tuple = [number, number, number];

// Original positions for the icosphere parts
const originalPositions = {
  part1: [3.598, -1.416, -2.543],
  part2: [2.478, -1.068, -2.281],
  part3: [2.786, -1.939, -3.437],
  part4: [-0.775, -1.798, -2.648],
  part5: [-1.706, -1.195, -1.81],
  part6: [-3.719, 0.87, -3.019],
  part7: [-0.107, 1.568, -2.393],
  part8: [-0.666, 0.915, -5.196],
  part9: [3.657, 0.795, -4.563],
  part10: [-3.381, -0.357, -4.275],
  part11: [1.67, -1.257, -5.512],
  part12: [2.824, 1.264, -2.902],
} as const;

// Function to scale positions by percentage
const scalePosition = (
  position: readonly number[],
  scale: number,
): Vector3Tuple => {
  const scaleFactor = scale / 100;
  return position.map((coord) => coord * scaleFactor) as Vector3Tuple;
};

// Current scale percentage
const SCALE_PERCENTAGE = 98.2;

// Memoized materials
const createMobileIcosphereMaterial = () => (
  <meshPhysicalMaterial
    roughness={0.45}
    transmission={2}
    thickness={1.5}
    transparent
    opacity={0.75}
    color={0xffffff}
    clearcoat={1}
  />
);

const createDesktopIcosphereMaterial = () => (
  <MeshTransmissionMaterial
    backsideThickness={10}
    thickness={1}
    distortionScale={1}
    temporalDistortion={1}
    transmission={1}
    roughness={0.1}
    metalness={0.1}
  />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Scene = (props: any) => {
  const { nodes } = useLoader(GLTFLoader, '/models/diax.glb') as GLTFResult;
  const group = useRef<THREE.Group>();
  const { gl } = useThree();

  // Optimize renderer
  useMemo(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, [gl]);

  // Memoize materials
  const maciejMaterial = useMemo(
    () => (
      <meshStandardMaterial
        attach='material'
        color={colors.orangeColor}
        roughness={0.7}
        metalness={0.5}
      />
    ),
    [],
  );

  const skorusMaterial = useMemo(
    () => (
      <meshStandardMaterial
        attach='material'
        color={colors.whiterColor}
        roughness={0.7}
        metalness={0.5}
      />
    ),
    [],
  );

  const mobileIcosphereMaterial = useMemo(createMobileIcosphereMaterial, []);
  const desktopIcosphereMaterial = useMemo(createDesktopIcosphereMaterial, []);

  // Pre-calculate scaled positions
  const scaledPositions = useMemo(
    () => ({
      part1: scalePosition(originalPositions.part1, SCALE_PERCENTAGE),
      part2: scalePosition(originalPositions.part2, SCALE_PERCENTAGE),
      part3: scalePosition(originalPositions.part3, SCALE_PERCENTAGE),
      part4: scalePosition(originalPositions.part4, SCALE_PERCENTAGE),
      part5: scalePosition(originalPositions.part5, SCALE_PERCENTAGE),
      part6: scalePosition(originalPositions.part6, SCALE_PERCENTAGE),
      part7: scalePosition(originalPositions.part7, SCALE_PERCENTAGE),
      part8: scalePosition(originalPositions.part8, SCALE_PERCENTAGE),
      part9: scalePosition(originalPositions.part9, SCALE_PERCENTAGE),
      part10: scalePosition(originalPositions.part10, SCALE_PERCENTAGE),
      part11: scalePosition(originalPositions.part11, SCALE_PERCENTAGE),
      part12: scalePosition(originalPositions.part12, SCALE_PERCENTAGE),
    }),
    [],
  );

  // Memoize IcospherePart component
  const IcospherePart = useCallback(
    ({
      partNumber,
      position,
    }: {
      partNumber: number;
      position: Vector3Tuple;
    }) => (
      <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes[`Icosphere001_Part_${partNumber}`].geometry}
          scale={0.025}
        >
          {isMobile ? mobileIcosphereMaterial : desktopIcosphereMaterial}
        </mesh>
      </group>
    ),
    [nodes, mobileIcosphereMaterial, desktopIcosphereMaterial],
  );

  // Memoize the main group scale
  const groupScale = useMemo(() => (isMobile ? 1.15 : 1.5), [isMobile]);

  return (
    <>
      <group ref={group} {...props} dispose={null} scale={groupScale}>
        <group position={[0.058, 0.269, -2.375]} scale={0.904}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.maciej.geometry}
            scale={0.025}
          >
            {maciejMaterial}
          </mesh>
        </group>

        <group position={[0.068, -1.526, -2.632]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.skorus.geometry}
            scale={0.025}
          >
            {skorusMaterial}
          </mesh>
        </group>

        {/* Memoize the array of IcosphereParts */}
        {useMemo(
          () => (
            <>
              <IcospherePart partNumber={1} position={scaledPositions.part1} />
              <IcospherePart partNumber={2} position={scaledPositions.part2} />
              <IcospherePart partNumber={3} position={scaledPositions.part3} />
              <IcospherePart partNumber={4} position={scaledPositions.part4} />
              <IcospherePart partNumber={5} position={scaledPositions.part5} />
              <IcospherePart partNumber={6} position={scaledPositions.part6} />
              <IcospherePart partNumber={7} position={scaledPositions.part7} />
              <IcospherePart partNumber={8} position={scaledPositions.part8} />
              <IcospherePart partNumber={9} position={scaledPositions.part9} />
              <IcospherePart
                partNumber={10}
                position={scaledPositions.part10}
              />
              <IcospherePart
                partNumber={11}
                position={scaledPositions.part11}
              />
              <IcospherePart
                partNumber={12}
                position={scaledPositions.part12}
              />
            </>
          ),
          [scaledPositions],
        )}

        {isMobile ? <MobileBackground /> : <DesktopBackground />}
      </group>
    </>
  );
};

// Memoize the entire Scene component
export default React.memo(Scene);
