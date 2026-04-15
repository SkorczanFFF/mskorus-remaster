import { useEffect, useState } from 'react';

export interface ViewportSize {
  width: number;
  height: number;
}

const SSR_FALLBACK: ViewportSize = { width: 1920, height: 900 };

function read(): ViewportSize {
  if (typeof window === 'undefined') return SSR_FALLBACK;
  return { width: window.innerWidth, height: window.innerHeight };
}

export function useViewportSize(): ViewportSize {
  // Deterministic SSR seed; effect below syncs to real dimensions after hydration.
  const [size, setSize] = useState<ViewportSize>(SSR_FALLBACK);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setSize(read());
    };
    const onResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    setSize(read());
    window.addEventListener('resize', onResize);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return size;
}
