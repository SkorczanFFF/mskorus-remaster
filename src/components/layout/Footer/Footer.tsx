import React from 'react';
import { IoMailOpenSharp } from 'react-icons/io5';
import { IoDocumentTextSharp } from 'react-icons/io5';

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='font-mont bg-primary-blue flex min-h-[20vh] w-full flex-col items-center overflow-hidden'>
      <div className='w-full min-w-[250px] px-2 xl:w-[1100px] xl:px-0'>
        <div className='arrow-down white' />
        <p className='font-mont relative ml-3 text-start text-2xl font-[400] text-white'>
          <span className='text-raspberry'>M</span>
          <span className='absolute left-5 tracking-wider text-white'>
            SKORUS
          </span>
        </p>
        <div className='gradient mb-2 h-[2px]' />
      </div>
      <div className='flex w-full items-center justify-center bg-white'>
        <div className='mx-5 flex w-[1000px] flex-col items-center justify-between gap-5 py-10 sm:flex-row sm:gap-0'>
          <div
            className='font-mont text-primary-blue flex w-full items-center gap-2'
            data-aos='zoom-out-right'
          >
            <IoMailOpenSharp className='hover:text-raspberry cursor-pointer text-8xl duration-150' />
            <div className='flex flex-col'>
              <h3 className='font-mont text-xl font-[500] tracking-wide'>
                CONTACT
              </h3>

              <a
                href='mailto:skorusmaciej94@gmail.com'
                className='hover:text-raspberry text-sm duration-150'
              >
                skorusmaciej94@gmail.com
              </a>
            </div>
          </div>
          <div
            className='font-mont text-primary-blue flex w-full flex-row-reverse items-center gap-2'
            data-aos='zoom-out-left'
          >
            <IoDocumentTextSharp className='hover:text-raspberry cursor-pointer text-[82px] duration-150' />
            <div className='flex flex-col items-end '>
              <h3 className='font-mont text-xl font-[500] tracking-wide'>
                RESUME
              </h3>

              <a
                href='/cv.pdf'
                download='Maciej Skorus - CV'
                className=' hover:text-raspberrier text-sm duration-150'
              >
                English (PDF)
              </a>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href='/resume'
                className=' hover:text-raspberrer text-sm duration-150'
              >
                English (WEB)
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='gradient w-full text-center'>
        <p className='p-2 text-xs tracking-wider text-white'>
          &copy; {currentYear} Maciej Skorus
        </p>
      </div>
    </footer>
  );
}
