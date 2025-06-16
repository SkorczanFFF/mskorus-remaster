import React from 'react';

import { GithubIcon, LinkedinIcon } from '@/lib/shared/Icons';

export default function About(): JSX.Element {
  return (
    <section
      id='about'
      className='font-mont relative flex h-[100%] w-full flex-col items-center justify-center overflow-hidden bg-white pb-10 md:pt-[200px]'
    >
      <h3 className='font-mont text-primary-blue left-0 top-[140px] py-20 text-xl font-[500] leading-3 tracking-[10px] md:absolute md:rotate-90 md:py-0'>
        ABOUT
      </h3>

      <div className='flex w-full max-w-[450px] flex-col gap-3 text-white md:flex-col'>
        <div className='perspective-right ml-10 flex items-start'>
          <h2 className='from-raspberry to-oranger font-mont gradient w-auto justify-end bg-gradient-to-r px-6 py-3 text-xl font-[500]'>
            Hey, I'm Maciej.
          </h2>
        </div>
        <div className='perspective-left mr-10 flex justify-end'>
          <h2 className='from-oranger to-raspberry font-mont gradient bg-gradient-to-r px-6 py-3 text-xl font-[500]'>
            Skorus Maciej.
          </h2>
        </div>
      </div>

      <h3 className=' font-mont text-primary-blue mb-10 mt-[100px] leading-7 max-w-[770px] md:px-10 px-6 py-2 text-[21px] text-sm font-[400] tracking-wide text-center'>
        <b className='text-raspberry'>Versatile and open-minded</b> developer
        focused on building engaging, user-centered frontend solutions, with
        solid hands-on experience in backend work. Skilled in{' '}
        <b className='text-raspberry'>
          Web3 development for the gaming industry
        </b>{' '}
        and in
        <b className='text-raspberry'>
          {' '}
          crafting custom platforms and tools for the medical events sector
        </b>
        , backed by a strong foundation in{' '}
        <b className='text-raspberry'>IT support</b>. Personally passionate
        about
        <b className='text-raspberry'> WebGL</b>,{' '}
        <b className='text-raspberry'>3D graphics</b>, and building{' '}
        <b className='text-raspberry'>automation scripts and tools </b>
        to streamline workflows.
      </h3>

      <div className='mt-[100px] flex gap-10'>
        <a
          href='https://github.com/SkorczanFFF'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GithubIcon className='text-primary-blue hover:text-raspberry flex cursor-pointer flex-col items-center gap-3 text-7xl duration-150 hover:drop-shadow-[0_-2px_2px_#80183466]' />
        </a>
        <a
          href='https://www.linkedin.com/in/mskorus/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <LinkedinIcon className='text-primary-blue hover:text-raspberry flex cursor-pointer flex-col items-center gap-3 text-7xl duration-150 hover:drop-shadow-[0_-2px_2px_#80183466]' />
        </a>
      </div>
    </section>
  );
}
