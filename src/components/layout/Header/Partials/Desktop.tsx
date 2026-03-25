import Link from 'next/link';
import React from 'react';
export interface LinkItem {
  href: string;
  label: string;
}

interface DesktopProps {
  links: LinkItem[];
  activeSection: string;
}
export default function Desktop({ links, activeSection }: DesktopProps): React.JSX.Element {
  return (
    <>
      <ul className=' hidden h-full max-h-[40px] items-center justify-between space-x-10 px-6 lg:flex '>
        {links.map(({ href, label }) => {
          const linkId = href.startsWith('/#') ? href.slice(2) : href.slice(1);
          const isActive = linkId === activeSection;
          return (
            <li key={`${href}${label}`}>
              <Link
                href={href}
                scroll={false}
                className={`text-sm uppercase tracking-widest duration-300 hover:drop-shadow-[0_5px_5px_#001A2566] ${isActive ? 'text-real-white drop-shadow-[0_3px_4px_#001A2566]' : 'text-real-white/60'}`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
