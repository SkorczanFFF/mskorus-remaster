import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const links = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#technologies', label: 'Technologies' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#contact', label: 'Contact' },
  { href: '/resume', label: 'Resume' },
];

export default function Header(): JSX.Element {
  const [click, setClick] = useState<boolean>(false);

  const handleOpen = () => {
    console.log('handleOpen is called'); // Check if this log appears in the console
    setClick(true);
  };

  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    console.log(click); // Check if the state changes in the console
  }, [click]);
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
      <div className=' h-14 items-center'>
        <ul className='mx-4 hidden h-full items-center justify-between space-x-4 md:flex'>
          {links.map(({ href, label }) => (
            <Link
              href={href}
              scroll={false}
              key={`${href}${label}`}
              className='text-real-white hover:text-real-white text-xs uppercase tracking-widest duration-300 hover:tracking-[0.195em] hover:drop-shadow-[0_5px_5px_#972b1a66]'
            >
              <li>{label}</li>
            </Link>
          ))}
        </ul>

        {/* <div className='flex w-[100%] md:hidden'>
          {click ? (
            <AiFillCloseSquare
              className='absolute right-3 mt-2 h-10 w-10 text-4xl text-white'
              onClick={handleOpen}
            />
          ) : (
            <RxHamburgerMenu
              className='absolute right-3 mt-2 h-10 w-10 text-4xl text-white'
              onClick={closeMobileMenu}
            />
          )}
          <div className='relative -left-[60px] h-[400px] w-[96vw] backdrop-blur-[75px]'></div>
        </div> */}
      </div>

      {/* <Mobile links={links} /> */}
    </header>
  );
}
