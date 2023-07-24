import {
  Environment,
  Float,
  Html,
  Lightformer,
  useProgress,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing';
import { easing } from 'maath';
import React, { Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import { useInView } from 'react-intersection-observer';

import DesktopScene from '@/components/Hero/Partials/Scene';
import ScrollButton from '@/components/Hero/Partials/ScrollButton';

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 3,
        state.pointer.y * 3.5,
        15 + Math.cos(state.pointer.x) * 10,
      ],
      0.2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <b className='m-auto text-4xl font-[400] text-[#801834]'>
        {Math.round(progress)}%
      </b>
    </Html>
  );
}

export default function Hero(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.01,
  });
  const glProps = isMobile ? { antialias: false } : { antialias: true };

  return (
    <section
      ref={ref}
      id='home'
      className='font-mont -mt-[45px] flex h-[99vh] w-full flex-col items-center justify-center bg-[#001a2500]'
    >
      {inView ? (
        <Canvas
          shadows
          camera={{ position: [0, 0, -21], fov: 50 }}
          dpr={[0.25, 1]}
          eventPrefix='client'
          gl={glProps}
          className='min-h-[97vh]'
        >
          <color attach='background' args={[0 / 3072, 26 / 3072, 37 / 3072]} />
          <Rig />
          <spotLight
            position={[20, 20, 10]}
            penumbra={1}
            castShadow
            angle={0.2}
          />
          <Suspense fallback={<Loader />}>
            {!isMobile ? (
              <>
                <EffectComposer disableNormalPass>
                  <N8AO aoRadius={5} intensity={15} />
                  <TiltShift2 blur={0.125} />
                </EffectComposer>
                <Environment preset='sunset'>
                  <Lightformer
                    intensity={8}
                    position={[10, 5, 0]}
                    scale={[15, 50, 1]}
                    onUpdate={(self) => self.lookAt(0, 0, 0)}
                  />
                </Environment>
              </>
            ) : (
              <>
                <spotLight intensity={1} position={[10, 10, 20]} />
                <spotLight intensity={1} position={[-10, -10, 20]} />
                <spotLight intensity={1} position={[0, 0, 0]} />
              </>
            )}

            <Float floatIntensity={2}>
              <DesktopScene />
            </Float>
          </Suspense>
        </Canvas>
      ) : (
        <div className='w-100vw flex h-full items-center'>
          <span className='loader'></span>
        </div>
      )}
      <ScrollButton />
      <div className='flex w-full'>
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
        <div className='arrow-down blue-hero' />
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
      </div>
    </section>
  );
}
