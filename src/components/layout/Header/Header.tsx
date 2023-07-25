import React from 'react';

import Desktop from '@/components/layout/Header/Partials/Desktop';
import Mobile from '@/components/layout/Header/Partials/Mobile';

const links = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#technologies', label: 'Technologies' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#contact', label: 'Contact' },
  { href: '/resume', label: 'Resume' },
];

export default function Header(): JSX.Element {
  return (
    <header
      className={`font-mont border-primary-blue sticky top-0 z-50 flex h-[45px] items-center justify-between border-b opacity-95 backdrop-blur-[100px]
      `}
    >
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href='/'
        className='hover:text-raspberry text-primary-blue relative drop-shadow-[0_5px_5px_#ffffff30] duration-200 hover:drop-shadow-[0_5px_5px_#80183466]'
      >
        <span className='text-raspberry hover:text-primary-blue mx-4 text-xl duration-300'>
          M
        </span>
        <span className='text-real-white absolute left-4 z-10 mx-4 text-xl font-[500] tracking-wide duration-150'>
          SKORUS
        </span>
      </a>
      <div className='justify-betweenflex h-14 items-center'>
        <Mobile links={links} />
        <Desktop links={links} />
      </div>
    </header>
  );
}
