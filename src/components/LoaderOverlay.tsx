import { useEffect, useRef } from 'react';

import { gsap } from '@/lib/gsap';

export default function LoaderOverlay({ visible }: { visible: boolean }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (visible) {
      gsap.killTweensOf(overlayRef.current);
      overlayRef.current.style.display = 'flex';
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
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
      style={{ display: 'none', opacity: 0 }}
    >
      <span className='font-unica select-none text-5xl font-bold relative'>
        <span className='absolute right-[-1.5px] bottom-[-1.5px] pointer-events-none' aria-hidden='true'>
          <span className='text-white'>SKOFT</span>
          <span className='text-raspberry'>ware</span>
        </span>
        <span className='relative'>
          <span className='text-orange'>SKO</span>
          <span className='text-raspberry'>FT</span>
          <span className='text-white'>ware</span>
        </span>
      </span>
      <div className='mt-10 flex h-[5em] items-center text-[11px]'>
        <span className='loader' />
      </div>
    </div>
  );
}
