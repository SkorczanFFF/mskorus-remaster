import Link from 'next/link';
import React from 'react';
interface LinkItem {
  href: string;
  label: string;
}

interface DesktopProps {
  links: LinkItem[];
}
export default function Desktop({ links }: DesktopProps): JSX.Element {
  return (
    <>
      <ul className='bg-raspberrybackdrop-blur-[10px] border-primary-blue hidden h-full max-h-[40px] items-center justify-between space-x-10 border-y-2 px-6 md:flex '>
        {links.map(({ href, label }) => (
          <Link
            href={href}
            scroll={false}
            key={`${href}${label}`}
            className='text-real-white hover:text-real-white text-sm uppercase tracking-widest duration-300 hover:tracking-[4px] hover:drop-shadow-[0_5px_5px_#972b1a66]'
          >
            <li>{label}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
