import { Float } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useInView } from 'react-intersection-observer';

import { gsap } from '@/lib/gsap';
import { randomizeText, scrambleReveal } from '@/lib/scrambleReveal';

import Scene from '@/components/Hero/Partials/Scene';
import ScrollButton from '@/components/Hero/Partials/ScrollButton';

import { useLocale } from '@/locale/LocaleContext';

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 1.5,
        state.pointer.y * 1.75,
        15 + Math.cos(state.pointer.x) * 5,
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

export default function Hero(): React.JSX.Element {
  const { t } = useLocale();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.01,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const headlinePart1Ref = useRef<HTMLSpanElement>(null);
  const headlinePart2Ref = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (sceneReady) {
      canvasElRef.current = document.querySelector('canvas');
    }
  }, [sceneReady]);

  const forwardPointerToCanvas = useCallback((e: React.PointerEvent) => {
    canvasElRef.current?.dispatchEvent(
      new PointerEvent(e.type, {
        clientX: e.clientX,
        clientY: e.clientY,
        pointerId: e.pointerId,
        pointerType: e.pointerType,
        bubbles: true,
      }),
    );
  }, []);

  const handleReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    if (!sceneReady) return;
    window.dispatchEvent(new Event('hero:ready'));
    if (
      !panelRef.current ||
      !namesRef.current ||
      !headlineRef.current ||
      !greetingRef.current ||
      !nameRef.current ||
      !headlinePart1Ref.current ||
      !headlinePart2Ref.current
    )
      return;

    // Pre-fill both with scrambled text right away
    greetingRef.current!.textContent = randomizeText(t.heroGreeting);
    nameRef.current!.textContent = randomizeText(t.heroName);

    const tl = gsap.timeline({ delay: 0.3 });
    tlRef.current = tl;

    // 1. Fade in backdrop panel
    tl.fromTo(
      panelRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
    );

    // 2. Slide names container in
    tl.fromTo(
      namesRef.current,
      { yPercent: 50, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
      '<0.2',
    );

    // 3. Slide headline container in
    tl.fromTo(
      headlineRef.current,
      { yPercent: 50, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
      '<0.3',
    );

    // 4. Scramble-reveal greeting
    tl.add(scrambleReveal(greetingRef.current!, t.heroGreeting, 1.5), '+=0.3');

    // 5. Scramble-reveal name
    tl.add(scrambleReveal(nameRef.current!, t.heroName, 1.5), '+=0.3');

    // 6. Headline part 1 — slide in from left
    tl.fromTo(
      headlinePart1Ref.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
      '+=0.3',
    );

    // 7. Headline part 2 — slide in from right
    tl.fromTo(
      headlinePart2Ref.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
      '+=0.2',
    );

    return () => {
      tl.kill();
    };
  }, [sceneReady, t.heroGreeting, t.heroName, t.heroHeadline]);

  return (
    <section
      ref={ref}
      id='home'
      className='font-grotesk -mt-[60px] flex h-[99vh] w-full flex-col items-center justify-center bg-[#001a2500] overflow-hidden'
    >
      {isMounted ? (
        <ErrorBoundary
          fallback={
            <div className='flex h-full w-full items-center justify-center text-white'>
              <p>{t.heroErrorFallback}</p>
            </div>
          }
        >
          <div
            className={`h-full w-full transition-opacity duration-700 ease-out ${sceneReady ? 'opacity-100' : 'opacity-0'}`}
          >
            <Canvas
              shadows='percentage'
              frameloop='always'
              camera={{ position: [0, 0, -21], fov: 50 }}
              dpr={[0.25, 1]}
              eventPrefix='client'
              gl={{ antialias: false }}
              className='min-h-[97vh]'
            >
              <color
                attach='background'
                args={[0 / 3072, 26 / 3072, 37 / 3072]}
              />
              <FrameloopController inView={inView} />
              <Rig />
              <spotLight
                position={[20, 20, 10]}
                penumbra={1}
                castShadow
                angle={0.2}
              />
              <Suspense fallback={null}>
                <Float
                  speed={0.8}
                  floatIntensity={0.2}
                  floatingRange={[-3.5, 3.5]}
                  rotationIntensity={0.5}
                >
                  <Scene onReady={handleReady} />
                </Float>
              </Suspense>
            </Canvas>
          </div>

          {/* Backdrop panel — visual only */}
          <div
            ref={panelRef}
            className='md:absolute right-2 w-[33vw] md:w-[calc(50%-100px)] h-[calc(100%-140px)] md:h-[calc(100%-540px)] z-10 pointer-events-none backdrop-blur-[10px] opacity-0'
          />

          {/* Names — top on mobile, right-center on desktop */}
          <div
            ref={namesRef}
            className='absolute z-20 top-[100px] left-[20px] md:top-1/3 md:left-auto md:right-0 md:w-[calc(50%-100px)] pointer-events-none opacity-0'
          >
            <div
              className='pointer-events-auto select-text'
              onPointerMove={forwardPointerToCanvas}
            >
              <h2
                ref={greetingRef}
                className='inline-block gradient bg-linear-to-r from-raspberry to-orange-dark px-6 py-2 text-2xl md:text-6xl md:-ml-[80px] font-medium text-white tracking-wider mb-3 min-h-[1.2em]'
              >
                &nbsp;
              </h2>
              <br />
              <h2
                ref={nameRef}
                className='inline-block gradient bg-linear-to-r from-orange-dark to-raspberry px-6 py-2 text-2xl md:text-6xl font-medium text-white tracking-wider mb-6 min-h-[1.2em]'
              >
                &nbsp;
              </h2>
            </div>
          </div>

          {/* Headline — bottom on mobile, below names on desktop */}
          <div
            ref={headlineRef}
            className=' absolute z-20 bottom-[200px] right-[20px] md:top-[55%] md:bottom-auto md:left-auto md:right-0 md:w-[calc(50%-100px)] md:ml-[20px] pointer-events-none opacity-0 text-right md:text-left backdrop-blur-[10px] md:backdrop-blur-none p-4 md:p-0'
          >
            <div className='flex flex-col gap-6'>
              <span
                ref={headlinePart1Ref}
                className='block text-2xl lg:text-4xl text-white/90 font-light tracking-wide drop-shadow-[0_2px_8px_#00000080] uppercase opacity-0'
              >
                {t.heroHeadline.split('. ')[0]}.
              </span>
              <span
                ref={headlinePart2Ref}
                className='block text-2xl lg:text-4xl text-white font-medium tracking-wide drop-shadow-[0_2px_8px_#00000080] uppercase opacity-0'
              >
                {t.heroHeadline.split('. ')[1]}
              </span>
            </div>
          </div>
        </ErrorBoundary>
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
