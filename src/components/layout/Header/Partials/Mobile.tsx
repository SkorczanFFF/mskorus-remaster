import React, { useEffect, useState } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
interface LinkItem {
  href: string;
  label: string;
}

interface MobileProps {
  links: LinkItem[];
}
export default function Mobile({ links }: MobileProps): JSX.Element {
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
    <>
      <div className='flex w-full md:hidden'>
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
        <div className='relative -left-10 h-[400px] w-[70vw] backdrop-blur-[75px]'></div>
      </div>
    </>
  );
}
