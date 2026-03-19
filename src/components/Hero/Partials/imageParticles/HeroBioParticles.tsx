import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';

import { rasterizeHeroBioToCanvas } from '@/components/Hero/Partials/imageParticles/rasterizeHeroBio';

type HeroBioParticlesProps = {
  /** Scene units wide for the text plane (height follows canvas aspect) */
  targetWidth?: number;
  position?: [number, number, number];
};

/**
 * Flat bio text in the scene (no particle shader). Rasterized canvas on a single plane.
 */
export default function HeroBioParticles({
  targetWidth = 9.8,
  position = [6, -0.48, -2.46],
}: HeroBioParticlesProps) {
  const { texture, cw, ch } = useMemo(() => {
    const canvas = rasterizeHeroBioToCanvas({
      maxWidthPx: 860,
      fontPx: 29,
      lineHeight: 1.4,
      paddingPx: 22,
    });
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return { texture: tex, cw: canvas.width, ch: canvas.height };
  }, []);

  const { planeWidth, planeHeight } = useMemo(() => {
    const pixelScale = targetWidth / Math.max(1, cw);
    return { planeWidth: cw * pixelScale, planeHeight: ch * pixelScale };
  }, [targetWidth, cw, ch]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </group>
  );
}
