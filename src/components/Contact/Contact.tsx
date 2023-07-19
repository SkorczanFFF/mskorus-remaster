import React from 'react';
import { IoMailOpenSharp } from 'react-icons/io5';

export default function Contact(): JSX.Element {
  return (
    <section
      id='contact'
      className='font-mont ny-20 relative flex h-auto w-full flex-col items-center justify-center bg-white'
    >
      <div className='arrow-down blue' />
      <h3 className='font-mont text-primary-blue -left-6 top-[150px] mt-[60px] text-xl font-[500] leading-3 tracking-[10px] md:absolute md:mt-0 md:-rotate-90'>
        CONTACT
      </h3>
      <div className='gradient-slow border-primary-blue my-20 mt-10 flex h-[500px] w-[400px] flex-col items-center gap-3 border-t-2 text-white md:my-20 md:flex-col'>
        <IoMailOpenSharp className='text-primary-blue my-2 text-center text-8xl' />
        <form>
          <div className='flex justify-between gap-2'>
            <div className='relative h-11 w-full min-w-[180px]'>
              <input
                className='focus:border-orange border-primary-blue text-primary-blue placeholder-shown:border-primary-blue disabled:bg-primary-blue peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:outline-0 disabled:border-0'
                placeholder=' '
              />
              <label className="after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Your name
              </label>
            </div>
            <div className='relative h-11 w-full min-w-[180px]'>
              <input
                className='focus:border-orange border-primary-blue text-primary-blue placeholder-shown:border-primary-blue disabled:bg-primary-blue peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:outline-0 disabled:border-0'
                placeholder=' '
              />
              <label className="after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Your mail
              </label>
            </div>
          </div>
          <div className='mx-1 mt-2 flex flex-col gap-3'>
            <label
              htmlFor='subject'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Subject
            </label>
            <input
              id='subject'
              className='focus:bg-real-white border-primary-blue focus:ring-none -mt-4 block w-full border border-t-[2px] bg-[#f1f1f1] p-2.5 text-sm text-black duration-150 focus:border-none'
              placeholder='Subject'
            />

            <label
              htmlFor='message'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
            >
              Your message
            </label>
            <textarea
              id='message'
              rows={9}
              className='focus:bg-real-white border-primary-blue -mt-4 block w-full border border-t-[2px] bg-[#f1f1f1] p-2.5 text-sm text-black duration-150 focus:border-transparent focus:ring-transparent'
              placeholder='Aa'
            />
          </div>
        </form>
      </div>
    </section>
  );
}
