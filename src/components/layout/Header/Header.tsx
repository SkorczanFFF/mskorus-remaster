import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const links = [
  { href: '#about', label: 'Home' },
  { href: '#', label: 'About' },
  { href: '#', label: 'Technologies' },
  { href: '#', label: 'Portfolio' },
  { href: '#', label: 'Contact' },
];

export default function Header(): JSX.Element {
  const [click, setClick] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const changeBackground = () => {
    const viewportHeight = window.innerHeight;
    if (window.scrollY <= viewportHeight - 45) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  };

  useEffect(() => {
    // Check if running on the client-side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', changeBackground);
    }

    // Clean up the event listener on component unmount
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', changeBackground);
      }
    };
  }, []);

  return (
    <header
      className={`font-mont border-primary-blue sticky top-0 z-50 flex h-[45px] items-center justify-between border-b ${
        navbar
          ? 'navbar-gradient opacity-[98%]'
          : 'opacity-95 backdrop-blur-[100px]'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href='/'
        className='hover:text-raspberry text-primary-blue relative drop-shadow-[0_5px_5px_#ffffff30] duration-200 hover:drop-shadow-[0_5px_5px_#80183466]'
      >
        <span
          className={`text-raspberry hover:text-primary-blue mx-4 text-xl duration-300 ${
            navbar && 'text-real-white font-[100]'
          }`}
        >
          M
        </span>
        <span
          className={`absolute left-4 z-10 mx-4 text-xl font-[500] tracking-wide duration-150 ${
            !navbar && 'text-real-white'
          }`}
        >
          SKORUS
        </span>
      </a>
      <div className='layout hidden h-14 items-center justify-between sm:flex'>
        <nav>
          <ul className='mx-4 flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <Link
                href={href}
                key={`${href}${label}`}
                className={` text-real-white text-xs uppercase tracking-widest duration-300 hover:tracking-[0.195em] ${
                  navbar
                    ? 'hover:text-primary-blue hover:drop-shadow-[0_5px_5px_#14182766]'
                    : 'hover:text-real-white hover:drop-shadow-[0_5px_5px_#972b1a66]'
                }`}
              >
                <li>{label}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
