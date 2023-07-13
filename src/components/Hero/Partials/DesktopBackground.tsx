import React, { RefObject, useRef } from 'react';
import { Mesh } from 'three';

import { colors } from '@/components/Hero/Partials/colors';

function SlimeSphere() {
  const ref: RefObject<Mesh> = useRef<Mesh>(null);

  return (
    <>
      <mesh ref={ref} position={[-5.5, 1, -5]} rotation={[120, 120, 180]}>
        <sphereGeometry args={[3, 30, 30, 0, 7.6]} />
        <meshStandardMaterial
          attach='material'
          color={colors.raspberryColor}
          roughness={0.7}
          metalness={0.5}
        />
      </mesh>
    </>
  );
}

export default function DesktopBackground() {
  return (
    <>
      <SlimeSphere />
    </>
  );
}
