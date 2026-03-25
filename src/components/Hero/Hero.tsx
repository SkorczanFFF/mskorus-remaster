import { Float } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import React, {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useInView } from 'react-intersection-observer';

import { gsap } from '@/lib/gsap';

import Scene from '@/components/Hero/Partials/Scene';
import ScrollButton from '@/components/Hero/Partials/ScrollButton';

import { useLocale } from '@/locale/LocaleContext';

class CanvasErrorBoundary extends Component<
  { children: React.ReactNode; fallbackText?: string },
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
          <p>{this.props.fallbackText}</p>
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

export default function Hero(): React.JSX.Element {
  const { t } = useLocale();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.01,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
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
    if (!panelRef.current || !greetingRef.current || !nameRef.current || !headlineRef.current) return;

    const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%';

    function randomString(text: string) {
      let result = '';
      for (let i = 0; i < text.length; i++) {
        result +=
          text[i] === ' '
            ? ' '
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      return result;
    }

    function scrambleReveal(el: HTMLElement, text: string, duration: number) {
      const len = text.length;
      // Pre-fill with scrambled chars immediately
      el.textContent = randomString(text);
      const proxy = { progress: 0 };
      return gsap.to(proxy, {
        progress: 1,
        duration,
        ease: 'power1.in',
        onUpdate() {
          const locked = Math.floor(proxy.progress * len);
          let result = text.substring(0, locked);
          for (let i = locked; i < len; i++) {
            result +=
              text[i] === ' '
                ? ' '
                : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          el.textContent = result;
        },
        onComplete() {
          el.textContent = text;
        },
      });
    }

    // Pre-fill both with scrambled text right away
    greetingRef.current!.textContent = randomString(t.heroGreeting);
    nameRef.current!.textContent = randomString(t.heroName);

    const tl = gsap.timeline({ delay: 0.3 });
    tlRef.current = tl;

    // 1. Slide panel up from below
    tl.fromTo(
      panelRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
    );

    // 2. Scramble-reveal greeting
    tl.add(scrambleReveal(greetingRef.current!, t.heroGreeting, 1.5), '+=0.3');

    // 3. Scramble-reveal name
    tl.add(scrambleReveal(nameRef.current!, t.heroName, 1.5), '+=0.3');

    // 4. Fade in headline
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '+=0.3',
    );

    return () => {
      tl.kill();
    };
  }, [sceneReady, t.heroGreeting, t.heroName, t.heroHeadline]);

  return (
    <section
      ref={ref}
      id='home'
      className='font-grotesk -mt-[60px] flex h-[99vh] w-full flex-col items-center justify-center bg-[#001a2500]'
    >
      {isMounted ? (
        <CanvasErrorBoundary fallbackText={t.heroErrorFallback}>
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
                <Float speed={0.8} floatIntensity={0.5}>
                  <Scene onReady={handleReady} />
                </Float>
              </Suspense>
            </Canvas>
          </div>

          {!sceneReady && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='loader' />
            </div>
          )}

          <div
            ref={panelRef}
            className='absolute right-0 w-[calc(50%-100px)] h-[calc(100%-540px)] z-10 pointer-events-none flex backdrop-blur-[10px] items-center opacity-0'
          >
            <div
              className='pointer-events-auto select-text'
              onPointerMove={forwardPointerToCanvas}
            >
              <h2
                ref={greetingRef}
                className='inline-block gradient bg-gradient-to-r from-raspberry to-orange-dark px-6 py-2 text-lg md:text-6xl -ml-[80px] font-medium text-white tracking-wider mb-3 min-h-[1.2em]'
              >
                &nbsp;
              </h2>
              <br />
              <h2
                ref={nameRef}
                className='inline-block gradient bg-gradient-to-r from-orange-dark to-raspberry px-6 py-2 text-lg md:text-6xl font-medium text-white tracking-wider mb-6 min-h-[1.2em]'
              >
                &nbsp;
              </h2>
              <p
                ref={headlineRef}
                className='text-base md:text-xl lg:text-3xl text-white/90 font-light tracking-wide leading-relaxed drop-shadow-[0_2px_8px_#00000080] uppercase mt-[40px] opacity-0 ml-[20px]'
              >
                {t.heroHeadline}
              </p>
            </div>
          </div>
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
