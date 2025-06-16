import { useEffect } from 'react';

import { CustomCursorIcon } from '@/lib/shared/Icons';

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor');

    const onMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX - 25}px`;
        cursor.style.top = `${e.clientY - 25}px`;
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div id='cursor' className='invert-cursor'>
      <CustomCursorIcon className='text-2xl' />
    </div>
  );
};

export default CustomCursor;
