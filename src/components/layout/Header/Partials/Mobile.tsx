import Link from 'next/link';
import React, { useState } from 'react';
interface LinkItem {
  href: string;
  label: string;
}

interface MobileProps {
  links: LinkItem[];
}
export default function Mobile({ links }: MobileProps): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);

  const handleOpen = () => {
    // setOpened(!opened);
    console.log('xd');
  };

  return (
    <div className='relative block md:hidden'>
      <button className='bg-orange z-50 h-10 w-10' onClick={() => handleOpen}>
        X
      </button>
      <div className='border-primary-blue absolute right-0 mt-[11px] h-[99vh] w-[350px] border-l-2 opacity-95 backdrop-blur-[75px]'>
        <ul className='mx-4 mt-5 flex h-[200px] flex-col items-center justify-between space-x-4'>
          {links.map(({ href, label }) => (
            <Link
              href={href}
              key={`${href}${label}`}
              className='text-real-white hover:text-real-white text-xs uppercase tracking-widest duration-300 hover:tracking-[0.195em] hover:drop-shadow-[0_5px_5px_#972b1a66]'
            >
              <li>{label}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
