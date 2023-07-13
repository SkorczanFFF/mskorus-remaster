import React from 'react';
import { IoMailOpenSharp } from 'react-icons/io5';

export default function Contact(): JSX.Element {
  return (
    <section className='font-mont ny-20 relative flex h-auto w-full flex-col items-center justify-center bg-white'>
      <div className='arrow-down blue' />
      <h3 className='font-mont text-primary-blue absolute -left-6 top-[150px] -rotate-90 text-xl font-[500] leading-3 tracking-[10px]'>
        CONTACT
      </h3>
      <div className='gradient-slow border-primary-blue my-20 flex h-[500px] w-[400px] flex-col items-center gap-3 border-t-2 text-white md:flex-col'>
        <IoMailOpenSharp className='text-real-white my-2 text-center text-8xl' />
        <form>
          <div className='flex justify-between'>
            <input
              placeholder='Your name'
              type='text'
              className='focus-none border-b-2 border-none border-white bg-transparent text-xs text-white'
            ></input>
            <input type='text' placeholder='Your mail' className='text-xs' />
          </div>
          <div className='mx-1 mt-2 flex flex-col gap-3'>
            <input className='w-full' placeholder='Subject'></input>
            <input className='w-full' placeholder='Your message'></input>
          </div>
        </form>
      </div>
    </section>
  );
}
