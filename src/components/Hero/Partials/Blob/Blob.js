import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { MathUtils } from 'three';

import fragmentShader from './fragmentShader';
import vertexShader from './vertexShader';

const Blob = () => {
  const mesh = useRef();
  const hover = useRef(false);
  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 },
      u_intensity: { value: 0.2 },
    };
  });
  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value =
        0.2 * clock.getElapsedTime();

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
        hover.current ? 1 : 0.15,
        0.2
      );
    }
  });
  return (
    <mesh
      ref={mesh}
      scale={1.5}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      position={[4, 0, -0.5]}
    >
      <icosahedronGeometry args={[2, 30]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;
