import { ThreeElements, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Background from '@/components/Hero/Partials/Background';
import HeroAtoms from '@/components/Hero/Partials/HeroAtoms';
import { colors } from '@/components/Hero/Partials/colors';

interface GLTFNodes {
  maciej: THREE.Mesh;
  skorus: THREE.Mesh;
}

const MobileScene = (props: ThreeElements['group']) => {
  const { nodes } = useLoader(GLTFLoader, '/models/desktopScene.glb') as unknown as { nodes: GLTFNodes };
  const group = useRef<THREE.Group>(null);

  const orbitCenter = React.useMemo<[number, number, number]>(() => {
    // Center between Maciej + Skorus nodes (positions are in this group's local space).
    const maciejPos = new THREE.Vector3(-4.214, 0.287, -1.378);
    const skorusPos = new THREE.Vector3(-4.163, -1.444, -1.392);
    return [
      (maciejPos.x + skorusPos.x) / 2,
      (maciejPos.y + skorusPos.y) / 2,
      (maciejPos.z + skorusPos.z) / 2,
    ];
  }, []);

  return (
    <>
      <ambientLight intensity={4} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, 20, 10]} intensity={5} />
      <group ref={group} {...props} dispose={null} scale={1.15}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.maciej.geometry}
          position={[-4.214, 0.287, -1.378]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.827, 4.685, 1.827]}
        >
          <meshPhongMaterial
            color={colors.orangeColor}
            shininess={100}
            specular={new THREE.Color(0xffffff)}
            emissive={new THREE.Color(0x000000)}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.skorus.geometry}
          position={[-4.163, -1.444, -1.392]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.827, 4.685, 1.827]}
        >
          <meshPhongMaterial
            color={colors.whiterColor}
            shininess={100}
            specular={new THREE.Color(0xffffff)}
            emissive={new THREE.Color(0x000000)}
          />
        </mesh>
        <HeroAtoms
          count={12}
          center={orbitCenter}
          baseRadius={1.8}
          attractionStrength={14}
          pointerStrength={11}
          repelRadius={3.2}
          repelIntensity={1.4}
        />
        <Background variant="mobile" />
      </group>
    </>
  );
};

export default MobileScene;
