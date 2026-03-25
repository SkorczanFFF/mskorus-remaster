import Lenis from 'lenis';
import { AppProps } from 'next/app';
import { useEffect } from 'react';

import '@/styles/globals.css';

import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/layout/Header/Header';

import { LocaleProvider } from '@/locale/LocaleContext';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <LocaleProvider>
      <Header />
      <Component {...pageProps} />
      <CustomCursor />
    </LocaleProvider>
  );
}

export default MyApp;
