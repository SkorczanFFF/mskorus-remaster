import React from 'react';

interface LinkItem {
  href: string;
  label: string;
}

interface MobileProps {
  links: LinkItem[];
  click: boolean;
  handleClick: () => void;
}

export default function Mobile({
  click,
  handleClick,
}: MobileProps): JSX.Element {
  return (
    <button
      onClick={handleClick}
      className='relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden'
      aria-label='Toggle Menu'
    >
      <span
        className={`h-[2px] w-6 transform transition-all duration-300 ease-in-out ${
          click ? 'translate-y-[7px] rotate-45 bg-real-white' : 'bg-real-white'
        }`}
      />
      <span
        className={`h-[2px] w-6 transition-all duration-300 ease-in-out ${
          click ? 'opacity-0 bg-real-white' : 'bg-real-white'
        }`}
      />
      <span
        className={`h-[2px] w-6 transform transition-all duration-300 ease-in-out ${
          click
            ? '-translate-y-[7px] -rotate-45 bg-real-white'
            : 'bg-real-white'
        }`}
      />
    </button>
  );
}
