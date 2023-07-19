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
    </>
  );
}
