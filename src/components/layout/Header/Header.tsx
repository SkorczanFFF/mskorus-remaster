import React from 'react';

const links = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'About' },
  { href: '#', label: 'Technologies' },
  { href: '#', label: 'Portfolio' },
  { href: '#', label: 'Contact' },
];

export default function Header(): JSX.Element {
  return (
    <header className='font-mont border-primary-blue sticky top-0 z-50 flex h-[45px] items-center justify-between border-b'>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href='/'
        className='hover:text-raspberry relative duration-200 hover:drop-shadow-[0_5px_5px_#80183466]'
      >
        <span className='text-raspberry hover:text-primary-blue mx-4 text-xl'>
          M
        </span>
        <span className='absolute left-4 mx-4 text-xl font-[500] tracking-wide '>
          SKORUS
        </span>
      </a>
      <div className='layout flex h-14 items-center justify-between'>
        <nav>
          <ul className='mx-4 flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <a
                href={href}
                key={`${href}${label}`}
                className='hover:text-raspberry tracking-wide text-white duration-300 hover:tracking-widest'
              >
                <li>{label}</li>
              </a>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
