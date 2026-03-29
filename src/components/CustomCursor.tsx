import { useEffect, useRef, useState } from 'react';

import { CursorIcon, CursorOverlayIcon } from '@/lib/shared/Icons';

const CURSOR_SIZE = 50;

const CustomCursor = () => {
  const [isActive, setIsActive] = useState(false);
  const rafId = useRef(0);

  useEffect(() => {
    const pointer = window.matchMedia('(pointer: fine)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setIsActive(pointer.matches && !motion.matches);
    update();

    pointer.addEventListener('change', update);
    motion.addEventListener('change', update);
    return () => {
      pointer.removeEventListener('change', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  // Toggle class on <html> so CSS can conditionally hide OS cursor
  useEffect(() => {
    document.documentElement.classList.toggle('custom-cursor', isActive);
    return () => document.documentElement.classList.remove('custom-cursor');
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const onMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        cursor.style.left = `${event.clientX - CURSOR_SIZE / 2}px`;
        cursor.style.top = `${event.clientY - CURSOR_SIZE / 2}px`;
        cursor.style.opacity = '1';
      });
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
      document.documentElement.classList.remove('custom-cursor');
    };

    const onMouseEnter = () => {
      cursor.style.opacity = '1';
      document.documentElement.classList.add('custom-cursor');
    };

    document.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div id='cursor' className='invert-cursor' aria-hidden='true'>
      <CursorIcon className='text-2xl -scale-x-100 mt-6 ml-6' aria-hidden />
      <CursorOverlayIcon
        className='pointer-events-none absolute z-10 text-2xl text-raspberry -scale-x-100 mt-6 ml-6 drop-shadow-xs'
        aria-hidden
      />
    </div>
  );
};

export default CustomCursor;
