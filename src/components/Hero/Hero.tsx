import { Float } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import React, { Component, Suspense, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Scene from '@/components/Hero/Partials/Scene';
import ScrollButton from '@/components/Hero/Partials/ScrollButton';

class CanvasErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex h-full w-full items-center justify-center text-white'>
          <p>3D scene could not be loaded.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

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
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function FrameloopController({ inView }: { inView: boolean }) {
  const setFrameloop = useThree((s) => s.setFrameloop);
  const hasBeenVisible = React.useRef(false);

  useEffect(() => {
    if (inView) {
      hasBeenVisible.current = true;
      setFrameloop('always');
    } else if (hasBeenVisible.current) {
      setFrameloop('never');
    }
  }, [inView, setFrameloop]);

  return null;
}

function SceneReadyNotifier({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    requestAnimationFrame(() => onReady());
  }, [onReady]);
  return null;
}

export default function Hero(): React.JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.01,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleReady = useCallback(() => setSceneReady(true), []);

  return (
    <section
      ref={ref}
      id='home'
      className='font-grotesk -mt-[60px] flex h-[99vh] w-full flex-col items-center justify-center bg-[#001a2500]'
    >
      {isMounted ? (
        <CanvasErrorBoundary>
          <div
            className={`h-full w-full transition-opacity duration-700 ease-out ${sceneReady ? 'opacity-100' : 'opacity-0'}`}
          >
            <Canvas
              shadows
              frameloop='always'
              camera={{ position: [0, 0, -21], fov: 50 }}
              dpr={[0.25, 1]}
              eventPrefix='client'
              gl={{ antialias: false }}
              className='min-h-[97vh]'
            >
              <color attach='background' args={[0 / 3072, 26 / 3072, 37 / 3072]} />
              <FrameloopController inView={inView} />
              <Rig />
              <spotLight
                position={[20, 20, 10]}
                penumbra={1}
                castShadow
                angle={0.2}
              />
              <Suspense fallback={null}>
                <SceneReadyNotifier onReady={handleReady} />
                <Float floatIntensity={1} speed={0.8}>
                  <Scene />
                </Float>
              </Suspense>
            </Canvas>
          </div>

          {!sceneReady && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='loader' />
            </div>
          )}
        </CanvasErrorBoundary>
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <span className='loader' />
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
