import React from 'react';

import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PdfIcon,
} from '@/lib/shared/Icons';

const cvLinks = [
  { href: '/pl.pdf', label: 'PL' },
  { href: '/eng.pdf', label: 'EN' },
];

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='font-mont bg-primary-blue flex min-h-[20vh] w-full flex-col items-center overflow-hidden'>
      <div className='absolute -mt-[32px] flex w-full flex-col items-center'>
        <p className='font-mont relative ml-3 w-full min-w-[250px] text-start text-2xl font-[400] text-white xl:w-[1200px] xl:px-0 '>
          <span className='text-raspberry'>M</span>
          <span className='absolute left-5 tracking-wider text-white'>
            SKORUS
          </span>
        </p>
        <div className='gradient h-[8px] w-full' />
        <div className='arrow-down orange' />
        <div className='arrow-down blue absolute top-[30px]' />
      </div>
      <div className='flex w-full items-center justify-center bg-white'>
        <div className='mx-5 flex w-[1000px] flex-col items-center justify-between gap-5 py-10 sm:flex-row sm:gap-0'>
          <div className='flex flex-col items-center'>
            <p className='text-primary-blue text-xl font-[400] tracking-wider'>
              REACH ME THROUGH
            </p>
            <div className='flex gap-5 pt-4'>
              <a
                href='https://www.linkedin.com/in/maciej-skorus/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary-blue hover:text-raspberry text-5xl duration-200'
              >
                <LinkedinIcon />
              </a>
              <a
                href='mailto:skorusmaciej94@gmail.com'
                className='text-primary-blue hover:text-raspberry text-5xl duration-200'
              >
                <MailIcon />
              </a>
              <a
                href='https://github.com/SkorczanFFF'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary-blue hover:text-raspberry text-[44px] duration-200'
              >
                <GithubIcon />
              </a>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-primary-blue text-xl font-[400] tracking-wider'>
              CURRICULUM VITAE
            </p>
            <div className='flex gap-4 pt-4'>
              {cvLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`text-primary-blue hover:text-raspberry text-md flex items-center gap-1 font-[500] duration-200 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <PdfIcon className='text-5xl' />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='gradient w-full text-center'>
        <p className='p-1 text-xs tracking-wider text-white'>
          &copy; {currentYear} Maciej Skorus
        </p>
      </div>
    </footer>
  );
}
