import { useEffect, useState } from 'react';

import { CursorIcon, CursorOverlayIcon } from '@/lib/shared/Icons';

const CURSOR_SIZE = 50;

const CustomCursor = () => {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mq.matches);
    const onChange = () => setHasFinePointer(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const onMouseMove = (event: MouseEvent) => {
      cursor.style.left = `${event.clientX - CURSOR_SIZE / 2}px`;
      cursor.style.top = `${event.clientY - CURSOR_SIZE / 2}px`;
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <div id='cursor' className='invert-cursor' aria-hidden='true'>
      <CursorIcon className='text-2xl -scale-x-100 mt-6 ml-6' aria-hidden />
      <CursorOverlayIcon
        className='pointer-events-none absolute z-10 text-2xl text-[color:var(--color-raspberry)] -scale-x-100 mt-6 ml-6 drop-shadow-sm'
        aria-hidden
      />
    </div>
  );
};

export default CustomCursor;
