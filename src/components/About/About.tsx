import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
export default function About(): JSX.Element {
  return (
    <section
      id='about'
      className='font-mont relative flex h-[100%] w-full flex-col items-center justify-center overflow-hidden bg-white pb-10 md:pt-[200px]'
    >
      <h3 className='font-mont text-primary-blue left-0 top-[140px] py-20 text-xl font-[500] leading-3 tracking-[10px] md:absolute md:-rotate-90 md:py-0'>
        ABOUT
      </h3>
      <div className=' flex w-full max-w-[450px] flex-col gap-3 text-white md:flex-col'>
        <div className='perspective-right ml-3 flex items-start'>
          <h2 className='from-raspberry to-oranger font-mont w-auto justify-end bg-gradient-to-r px-6 py-3 text-xl font-[500]'>
            Hey, I'm Maciej.
          </h2>
        </div>
        <div className='perspective-left mr-3 flex justify-end'>
          <h2 className='from-oranger to-raspberry font-mont bg-gradient-to-r px-6 py-3 text-xl font-[500]'>
            Junior Frontend Developer.
          </h2>
        </div>
      </div>
      <h3
        data-aos='zoom-out'
        className='bg-primary-blue font-mont text-real-white mx-3 mb-10 mt-20 px-4 py-2 text-sm font-[300]'
      >
        Always trying to make something from outer space. Curious about Web,
        WebGL
      </h3>

      <div className='mt-20 flex gap-10'>
        <a href='https://github.com/SkorczanFFF'>
          <BsGithub className='text-primary-blue hover:text-raspberry flex cursor-pointer flex-col items-center gap-3 text-7xl duration-150 hover:drop-shadow-[0_-2px_2px_#80183466]' />
        </a>{' '}
        <a href='https://www.linkedin.com/in/mskorus/'>
          <BsLinkedin className='text-primary-blue hover:text-raspberry flex cursor-pointer flex-col items-center gap-3 text-7xl duration-150 hover:drop-shadow-[0_-2px_2px_#80183466]' />
        </a>
      </div>
    </section>
  );
}
