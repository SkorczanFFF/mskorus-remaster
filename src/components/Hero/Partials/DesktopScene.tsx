import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { colors } from '@/components/Hero/Partials/colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DesktopScene = (props: any) => {
  const { nodes } = useLoader(GLTFLoader, '/models/desktop.gltf');
  const group = useRef<THREE.Group>();

  const [isOwnerCubesHovered, setIsOwnerCubesHovered] = useState(false);
  const [isFedeHovered, setIsFedeHovered] = useState(false);
  const [currentOwnerCubesColor, setCurrentOwnerCubesColor] = useState(
    new THREE.Color(colors.whiterColor)
  );
  const [currentFedeColor, setCurrentFedeColor] = useState(
    new THREE.Color(colors.whiterColor)
  );

  const handleFedeHover = () => {
    setIsFedeHovered((prevHovered) => !prevHovered);
  };
  const handleOwnerCubesHover = () => {
    setIsOwnerCubesHovered((prevHovered) => !prevHovered);
  };
  useEffect(() => {
    const targetColor = isOwnerCubesHovered
      ? new THREE.Color(colors.orangerColor)
      : new THREE.Color(colors.raspberryColor);
    const colorTransitionSpeed = 0.2; // Adjust this value to control the speed of the color transition

    const colorTimer = setInterval(() => {
      setCurrentOwnerCubesColor((prevColor) => {
        const r =
          prevColor.r + (targetColor.r - prevColor.r) * colorTransitionSpeed;
        const g =
          prevColor.g + (targetColor.g - prevColor.g) * colorTransitionSpeed;
        const b =
          prevColor.b + (targetColor.b - prevColor.b) * colorTransitionSpeed;

        // Check if the color has reached the target color within a small threshold
        if (
          Math.abs(r - targetColor.r) < 0.01 &&
          Math.abs(g - targetColor.g) < 0.01 &&
          Math.abs(b - targetColor.b) < 0.01
        ) {
          return targetColor.clone(); // Reached the target color, so set it directly
        }

        return new THREE.Color(r, g, b);
      });
    }, 16); // This corresponds to roughly 60 frames per second (1000ms / 60 frames ≈ 16ms)

    return () => clearInterval(colorTimer);
  }, [isOwnerCubesHovered]);

  useEffect(() => {
    const targetColor = isFedeHovered
      ? new THREE.Color(colors.orangerColor)
      : new THREE.Color(colors.whiterColor);
    const colorTransitionSpeed = 0.2; // Adjust this value to control the speed of the color transition

    const colorTimer = setInterval(() => {
      setCurrentFedeColor((prevColor) => {
        const r =
          prevColor.r + (targetColor.r - prevColor.r) * colorTransitionSpeed;
        const g =
          prevColor.g + (targetColor.g - prevColor.g) * colorTransitionSpeed;
        const b =
          prevColor.b + (targetColor.b - prevColor.b) * colorTransitionSpeed;

        // Check if the color has reached the target color within a small threshold
        if (
          Math.abs(r - targetColor.r) < 0.01 &&
          Math.abs(g - targetColor.g) < 0.01 &&
          Math.abs(b - targetColor.b) < 0.01
        ) {
          return targetColor.clone(); // Reached the target color, so set it directly
        }

        return new THREE.Color(r, g, b);
      });
    }, 16); // This corresponds to roughly 60 frames per second (1000ms / 60 frames ≈ 16ms)

    return () => clearInterval(colorTimer);
  }, [isFedeHovered]);

  return (
    <>
      <group
        ref={group}
        {...props}
        dispose={null}
        position={[0, 0, -1]}
        rotateY={132}
      >
        <mesh
          geometry={(nodes.ownerCubes as THREE.Mesh).geometry}
          material={(nodes.ownerCubes as THREE.Mesh).material}
          position={[-2.7, 0.86, -0.1]}
          rotation={[1.66, -0.01, -0.09]}
          scale={[1.12, 0.8, 0.1]}
          onPointerEnter={handleOwnerCubesHover}
          onPointerLeave={handleOwnerCubesHover}
        >
          <meshStandardMaterial
            attach='material'
            color={currentOwnerCubesColor}
            roughness={0.7}
            metalness={0.5}
          />
        </mesh>
        <mesh
          geometry={(nodes.owner as THREE.Mesh).geometry}
          material={(nodes.owner as THREE.Mesh).material}
          position={[-3.82, 2.16, 0.81]}
          rotation={[1.7, 0, -0.17]}
          scale={0.7}
        >
          <meshStandardMaterial
            attach='material'
            color={colors.whiterColor}
            roughness={0.7}
            metalness={0.5}
          />
        </mesh>
        <mesh
          geometry={(nodes.dev as THREE.Mesh).geometry}
          material={(nodes.dev as THREE.Mesh).material}
          position={[0.95, -1.06, 0.08]}
          rotation={[-0.09, -0.09, 0]}
          scale={[0.38, 0.13, 0.49]}
        >
          <meshStandardMaterial
            attach='material'
            color={colors.whiteColor}
            roughness={1}
            metalness={0}
          />
        </mesh>
        <mesh
          geometry={(nodes.elo as THREE.Mesh).geometry}
          material={(nodes.elo as THREE.Mesh).material}
          position={[0.64, -2.04, 0.34]}
          rotation={[-0.09, -0.09, -0.01]}
          scale={[1.06, 0.04, 0.34]}
        >
          <meshStandardMaterial
            attach='material'
            color={colors.primaryBlue}
            roughness={0.7}
            metalness={0.5}
          />
        </mesh>
        <mesh
          geometry={(nodes.per as THREE.Mesh).geometry}
          material={(nodes.per as THREE.Mesh).material}
          position={[-0.15, -2.5, 0.34]}
          rotation={[-0.17, 0, 0]}
          scale={[0.91, 0.26, 0.34]}
        >
          <meshStandardMaterial
            attach='material'
            color={colors.orangerColor}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        <mesh
          geometry={(nodes.fede as THREE.Mesh).geometry}
          material={(nodes.fede as THREE.Mesh).material}
          position={[-0.49, -1.9, 0.23]}
          rotation={[1.48, 0.01, -0.09]}
          scale={[0.8, 0.8, 0.8]}
        >
          <meshStandardMaterial
            attach='material'
            color={colors.raspberryColor}
            roughness={0.7}
            metalness={0.5}
          />
        </mesh>
        <mesh
          geometry={(nodes.Text as THREE.Mesh).geometry}
          material={(nodes.Text as THREE.Mesh).material}
          position={[1.68, -0.39, 0.06]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.9}
          onPointerEnter={handleFedeHover}
          onPointerLeave={handleFedeHover}
        >
          <meshStandardMaterial
            attach='material'
            color={currentFedeColor}
            roughness={0.5}
            metalness={0.5}
          />
        </mesh>
      </group>
    </>
  );
};

export default DesktopScene;
