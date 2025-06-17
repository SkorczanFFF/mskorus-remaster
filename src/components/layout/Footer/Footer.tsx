import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const cvLinks = [
  { href: '/pl.pdf', label: 'PL' },
  { href: '/eng.pdf', label: 'EN' },
];

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const getInTouchRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!getInTouchRef.current) return;

    gsap.fromTo(
      getInTouchRef.current,
      {
        opacity: 0,
        scale: 1.2,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: getInTouchRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      },
    );
  }, []);

  return (
    <footer
      id='contact'
      className='font-mont bg-primary-blue flex min-h-[20vh] w-full flex-col items-center overflow-hidden'
    >
      <div className='absolute -mt-[32px] flex w-full flex-col items-center'>
        <p className='font-mont relative pl-3 w-full min-w-[250px] text-start text-2xl font-[400] text-white xl:w-[1200px] xl:px-0 xl:pl-0'>
          <span className='text-raspberry'>M</span>
          <span className='absolute left-[30px] xl:left-[18px] tracking-wider text-white'>
            SKORUS
          </span>
        </p>
        <div className='gradient h-[8px] w-full' />
        <div className='arrow-down orange' />
        <div className='arrow-down blue absolute top-[30px]' />
      </div>
      <div className='flex flex-col w-full items-center justify-center bg-white'>
        <div className='mx-5 flex w-[1000px] flex-col gap-5 md:py-10 pb-20 sm:gap-0'>
          <div className='flex items-center justify-center'>
            <p
              ref={getInTouchRef}
              className='text-primary-blue text-3xl font-[500] tracking-wider my-[60px] mt-[80px] md:my-10'
            >
              GET IN TOUCH
            </p>
          </div>
          <div className='flex items-center justify-center gap-0 md:flex-row flex-col md:gap-[60px] space-y-[60px] md:space-y-0 md:py-10'>
            <a
              href='https://www.linkedin.com/in/mskorus/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='text-primary-blue text-xl rounded-[2px] font-[500] tracking-wider border-2 border-raspberry w-[200px] text-center py-4 hover:bg-raspberry hover:text-white duration-300 hover:rounded-xl'>
                LINKEDIN
              </div>
            </a>
            <a
              href='mailto:skorusmaciej94@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='text-primary-blue text-xl rounded-[2px] font-[500] tracking-wider border-2 border-raspberry w-[200px] text-center py-4 hover:bg-raspberry hover:text-white duration-300 hover:rounded-xl'>
                EMAIL
              </div>
            </a>
            <a
              href='https://github.com/SkorczanFFF'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='text-primary-blue text-xl rounded-[2px] font-[500] tracking-wider border-2 border-raspberry w-[200px] text-center py-4 hover:bg-raspberry hover:text-white duration-300 hover:rounded-xl'>
                GITHUB
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className='bg-white w-full text-center border-b-4 border-raspberry'>
        <p className='p-1 text-xs tracking-widest text-primary-blue pb-4 '>
          &copy; {currentYear} Maciej Skorus
        </p>
      </div>
    </footer>
  );
}
