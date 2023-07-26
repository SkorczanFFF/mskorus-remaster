import React from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
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
          <AiFillCloseSquare
            className='text-raspberry absolute right-[10px] mt-2 h-10 w-10 text-4xl'
            onClick={handleClick} // Fix the onClick event here
          />
        ) : (
          <RxHamburgerMenu
            className='text-real-white absolute right-3 mt-2 h-10 w-9 text-4xl'
            onClick={handleClick}
          />
        )}
      </div>
    </>
  );
}
