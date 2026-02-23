import { GroupProps, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Background from '@/components/Hero/Partials/Background';
import { colors } from '@/components/Hero/Partials/colors';

interface GLTFNodes {
  maciej: THREE.Mesh;
  skorus: THREE.Mesh;
  crystal: THREE.Mesh;
}

const MobileScene = (props: GroupProps) => {
  const { nodes } = useLoader(GLTFLoader, '/models/desktopScene.glb') as { nodes: GLTFNodes };
  const group = useRef<THREE.Group>(null);

  return (
    <>
      <ambientLight intensity={1.8} />
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.crystal.geometry}
          position={[-0.368, -0.146, -3.409]}
          rotation={[0, -0.089, 0.168]}
          scale={[3.322, 2.419, 2.524]}
        >
          <meshPhysicalMaterial
            roughness={0.45}
            transmission={2}
            thickness={3.5}
            transparent
            opacity={1.3}
            color={0xffffff}
            clearcoat={1}
          />
        </mesh>
        <Background variant="mobile" />
      </group>
    </>
  );
};

export default MobileScene;
