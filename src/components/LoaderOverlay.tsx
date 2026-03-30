import { useEffect, useRef } from 'react';

import { gsap } from '@/lib/gsap';

export default function LoaderOverlay({ visible }: { visible: boolean }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dismissed = useRef(false);

  useEffect(() => {
    if (!visible && !dismissed.current && overlayRef.current) {
      dismissed.current = true;
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        },
      });
    }
  }, [visible]);

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary-blue'
    >
      <span className='font-unica select-none text-5xl font-bold'>
        <span className='text-orange'>SKO</span>
        <span className='text-raspberry'>FT</span>
        <span className='text-white'>ware</span>
      </span>
      <div className='mt-10 flex h-[5em] items-center text-[11px]'>
        <span className='loader' />
      </div>
    </div>
  );
}
