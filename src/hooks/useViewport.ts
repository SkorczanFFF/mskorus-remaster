import { useEffect, useState } from 'react';

import { BREAKPOINTS } from '@/lib/breakpoints';

export type Viewport = 'mobile' | 'tablet' | 'desktop';

function getViewport(w: number): Viewport {
  if (w <= BREAKPOINTS.md) return 'mobile';
  if (w < BREAKPOINTS.xl) return 'tablet';
  return 'desktop';
}

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(() =>
    typeof window !== 'undefined' ? getViewport(window.innerWidth) : 'desktop',
  );

  useEffect(() => {
    const update = () => setViewport(getViewport(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return viewport;
}
