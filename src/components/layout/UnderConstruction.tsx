import React, { useState } from 'react';

import { WarningIcon } from '@/lib/shared/Icons';

export default function UnderConstruction(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300); // Match animation duration
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-1 right-1 z-50 m-5 flex items-center gap-1 rounded-[2px] bg-raspberry p-2 text-white shadow-lg transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <WarningIcon className='h-5 w-5 danger-animation' />
      <span className='text-sm'>This page is still under construction</span>
      <button
        onClick={handleClose}
        className='ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 hover:bg-white/30'
        aria-label='Close notice'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3 w-3'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </div>
  );
}
