import { MeshTransmissionMaterial } from '@react-three/drei';
import { GroupProps, useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useCallback, useMemo, useRef, useState } from 'react';
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

const Scene = (props: GroupProps) => {
  const { nodes } = useLoader(GLTFLoader, '/models/diax.glb') as GLTFResult;
  const group = useRef<THREE.Group | null>(null);
  const maciejRef = useRef<THREE.Group | null>(null);
  const skorusRef = useRef<THREE.Group | null>(null);
  const { gl } = useThree();
  const [clickCount, setClickCount] = useState(0);
  const icosphereRefs = useRef<{ [key: string]: THREE.Group | null }>({});
  const hasExploded = useRef(false);
  const isResetting = useRef(false);
  const handleClickRef = useRef<() => void>();

  // Store initial positions and rotations
  const initialStates = useRef<{
    [key: string]: {
      position: THREE.Vector3;
      rotation: THREE.Euler;
    };
  }>({});

  // Function to store initial states
  const storeInitialStates = useCallback(() => {
    Object.entries(icosphereRefs.current).forEach(([key, ref]) => {
      if (ref) {
        initialStates.current[key] = {
          position: ref.position.clone(),
          rotation: ref.rotation.clone(),
        };
      }
    });

    if (maciejRef.current) {
      initialStates.current.maciej = {
        position: maciejRef.current.position.clone(),
        rotation: maciejRef.current.rotation.clone(),
      };
    }

    if (skorusRef.current) {
      initialStates.current.skorus = {
        position: skorusRef.current.position.clone(),
        rotation: skorusRef.current.rotation.clone(),
      };
    }
  }, []);

  // Store initial states on mount
  React.useEffect(() => {
    storeInitialStates();
  }, [storeInitialStates]);

  // Function to handle click on any icosphere part
  const handleIcosphereClick = useCallback(() => {
    if (hasExploded.current) {
      if (handleClickRef.current) {
        handleClickRef.current();
      }
      return;
    }

    setClickCount((prev) => {
      const clickCount = prev + 1;
      if (clickCount === 3) {
        // Trigger explosion on third click
        const randomScale = Math.random() * (300 - 250) + 250;
        Object.values(icosphereRefs.current).forEach((ref) => {
          if (ref) {
            const randomRotationX = (Math.random() - 0.5) * Math.PI;
            const randomRotationY = (Math.random() - 0.5) * Math.PI;
            const randomRotationZ = (Math.random() - 0.5) * Math.PI;

            gsap.to(ref.position, {
              x: ref.position.x * (randomScale / 100),
              y: ref.position.y * (randomScale / 100),
              z: ref.position.z * (randomScale / 100),
              duration: 1.5,
              ease: 'power2.out',
            });

            gsap.to(ref.rotation, {
              x: randomRotationX,
              y: randomRotationY,
              z: randomRotationZ,
              duration: 1.5,
              ease: 'power2.out',
            });
          }
        });

        // Animate maciej and skorus text forward with linear easing
        if (maciejRef.current && skorusRef.current) {
          gsap.to(maciejRef.current.position, {
            z: maciejRef.current.position.z + 1,
            duration: 1.5,
            ease: 'none',
            delay: 0.5,
          });

          gsap.to(skorusRef.current.position, {
            z: skorusRef.current.position.z + 1,
            duration: 1.5,
            ease: 'none',
            delay: 0.5,
          });
        }

        hasExploded.current = true;
      }
      return clickCount;
    });
  }, []);

  // Function to reset positions
  const resetPositions = useCallback(() => {
    if (isResetting.current || !hasExploded.current) return;
    isResetting.current = true;
    let completedResets = 0;
    const totalParts = Object.keys(icosphereRefs.current).length;

    // Reset each icosphere part with staggered timing
    Object.entries(icosphereRefs.current).forEach(([key, ref], index) => {
      if (ref && initialStates.current[key]) {
        const delay = index * 0.1; // Stagger the resets

        gsap.to(ref.position, {
          x: initialStates.current[key].position.x,
          y: initialStates.current[key].position.y,
          z: initialStates.current[key].position.z,
          duration: 1.5,
          ease: 'power2.out',
          delay,
        });

        gsap.to(ref.rotation, {
          x: initialStates.current[key].rotation.x,
          y: initialStates.current[key].rotation.y,
          z: initialStates.current[key].rotation.z,
          duration: 1.5,
          ease: 'power2.out',
          delay,
          onComplete: () => {
            completedResets++;
            if (completedResets === totalParts) {
              // All parts are reset, trigger explosion again
              hasExploded.current = false;
              isResetting.current = false;
              handleIcosphereClick();
              handleIcosphereClick();
              handleIcosphereClick();
            }
          },
        });
      }
    });

    // Reset text positions at the end
    if (
      maciejRef.current &&
      skorusRef.current &&
      initialStates.current.maciej &&
      initialStates.current.skorus
    ) {
      const finalDelay = (totalParts - 1) * 0.1 + 1.5; // After last part finishes

      gsap.to(maciejRef.current.position, {
        x: initialStates.current.maciej.position.x,
        y: initialStates.current.maciej.position.y,
        z: initialStates.current.maciej.position.z,
        duration: 1,
        ease: 'none',
        delay: finalDelay,
      });

      gsap.to(skorusRef.current.position, {
        x: initialStates.current.skorus.position.x,
        y: initialStates.current.skorus.position.y,
        z: initialStates.current.skorus.position.z,
        duration: 1,
        ease: 'none',
        delay: finalDelay,
      });
    }
  }, [handleIcosphereClick]);

  // Set up the reset handler
  React.useEffect(() => {
    handleClickRef.current = resetPositions;
  }, [resetPositions]);

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
      <group
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={(ref) => {
          if (ref) {
            icosphereRefs.current[`part${partNumber}`] = ref;
          }
        }}
        onClick={handleIcosphereClick}
      >
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
    [
      nodes,
      mobileIcosphereMaterial,
      desktopIcosphereMaterial,
      handleIcosphereClick,
    ],
  );

  // Memoize the main group scale
  const groupScale = useMemo(() => (isMobile ? 1.15 : 1.5), [isMobile]);

  return (
    <>
      <group ref={group} {...props} dispose={null} scale={groupScale}>
        <group position={[0.058, 0.269, -2.375]} scale={0.904} ref={maciejRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.maciej.geometry}
            scale={0.025}
          >
            {maciejMaterial}
          </mesh>
        </group>

        <group position={[0.068, -1.526, -2.632]} ref={skorusRef}>
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
