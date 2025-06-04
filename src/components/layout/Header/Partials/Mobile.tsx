import React from 'react';

import { CloseIcon, HamburgerIcon } from '@/lib/shared/Icons';

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
    <>
      <div className='flex w-full cursor-pointer md:hidden'>
        {click ? (
          <CloseIcon
            className='text-raspberry absolute right-[10px] mt-2 h-10 w-10 text-4xl'
            onClick={handleClick}
          />
        ) : (
          <HamburgerIcon
            className='text-real-white absolute right-3 mt-2 h-10 w-9 text-4xl'
            onClick={handleClick}
          />
        )}
      </div>
    </>
  );
}
