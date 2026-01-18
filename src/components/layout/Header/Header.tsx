import Link from 'next/link';
import React, { useState } from 'react';

import Desktop from '@/components/layout/Header/Partials/Desktop';
import Mobile from '@/components/layout/Header/Partials/Mobile';

const links = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#technologies', label: 'Technologies' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#contact', label: 'Contact' },
  { href: '/resume', label: 'Resume' },
];

export default function Header(): JSX.Element {
  const [click, setClick] = useState<boolean>(false);
  const handleClick = () => {
    setClick((prevClick) => !prevClick);
    if (!click) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <header
        className={`font-mont sticky top-0 z-50 flex h-[45px] items-center justify-between opacity-95 backdrop-blur-[10px] ${
          click ? 'opacity-0' : 'opacity-95'
        }`}
      >
        <a
          href='/'
          className='hover:text-raspberry text-primary-blue relative drop-shadow-[0_5px_5px_#ffffff30] duration-200 hover:drop-shadow-[0_5px_5px_#80183466]'
        >
          <span className='text-raspberry hover:text-primary-blue mx-4 text-xl duration-300 '>
            M
          </span>
          <span className='text-real-white absolute left-4 z-10 mx-4 text-xl font-[500] tracking-wide duration-150'>
            SKORUS
          </span>
        </a>
        <div className='flex h-14 items-center justify-between'>
          <Mobile links={links} click={click} handleClick={handleClick} />
          <Desktop links={links} />
        </div>
      </header>

      <div
        className={`bg-[#00000024] fixed inset-0 z-40 flex min-h-screen w-full transform items-center justify-center border-b border-primary-blue backdrop-blur-[10px] transition-transform duration-300 lg:hidden ${
          click ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className='flex h-full w-full flex-col items-center justify-center'>
          <ul className='flex flex-col items-center space-y-8'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`} className='text-center'>
                <Link
                  href={href}
                  scroll={false}
                  className='text-real-white hover:text-real-white text-3xl font-light uppercase tracking-widest drop-shadow-[0_2px_2px_#001a25] transition-all duration-300 hover:tracking-[0.2em] hover:drop-shadow-[0_5px_5px_#972b1a]'
                  onClick={handleClick}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
