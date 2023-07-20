import React from 'react';
import { IoMailOpenSharp } from 'react-icons/io5';

export default function Contact(): JSX.Element {
  return (
    <section
      id='contact'
      className='font-mont ny-20 relative flex h-auto w-full flex-col items-center justify-center overflow-hidden bg-white'
    >
      <div className='arrow-down blue' />
      <h3 className='font-mont text-primary-blue -left-6 top-[150px] mt-[60px] text-xl font-[500] leading-3 tracking-[10px] md:absolute md:mt-0 md:-rotate-90'>
        CONTACT
      </h3>
      <div className='gradient-slow border-primary-blue xsm:w-[450px] my-20 mt-10 flex h-full w-full flex-col items-center gap-3 border-t-2 text-white md:my-20 md:flex-col'>
        <IoMailOpenSharp className='text-primary-blue my-2 text-center text-8xl' />
        <form className='w-full px-6'>
          <div className='xsm:flex-row xsm:gap-2 mb-3 flex w-full flex-col justify-between gap-5'>
            <div className='xsm:min-w-[180px] relative h-11 w-full'>
              <input
                className='focus:border-orange border-primary-blue placeholder-shown:border-primary-blue disabled:bg-primary-blue font-mont peer h-full w-full border-b bg-transparent px-2 pb-1.5 pt-4 text-sm font-[500] text-white outline outline-0 transition-all focus:outline-0 disabled:border-0'
                placeholder=' '
              />
              <label className="after:content[' '] after: text-primary-blue pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Your name
              </label>
            </div>
            <div className='relative h-11 w-full min-w-[180px]'>
              <input
                className='focus:border-orange border-primary-blue placeholder-shown:border-primary-blue disabled:bg-primary-blue font-mont peer h-full w-full border-b bg-transparent px-2 pb-1.5 pt-4 text-sm font-[500] text-white outline outline-0 transition-all focus:outline-0 disabled:border-0'
                placeholder=' '
              />
              <label className="after:content[' '] after: text-primary-blue pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Your mail
              </label>
            </div>
          </div>
          <div className='flex w-full flex-col gap-3'>
            <div className='relative mt-3 h-11 w-full min-w-[180px]'>
              <input
                className='focus:border-orange border-primary-blue placeholder-shown:border-primary-blue disabled:bg-primary-blue font-mont peer h-full w-full border-b bg-transparent px-2 pb-1.5 pt-4 text-sm font-[500] text-white outline outline-0 transition-all focus:outline-0 disabled:border-0'
                placeholder=' '
              />
              <label className="after:content[' '] after: text-primary-blue pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Subject
              </label>
            </div>
            <div className='relative mt-3 h-[250px] w-full min-w-[180px]'>
              <textarea
                className='font-mont peer h-[250px] w-full resize-none border-none  border-transparent bg-transparent px-2 pb-1.5 pt-4 text-sm font-[500] text-white outline-none transition-all focus:border-none focus:border-transparent focus:shadow-none focus:outline-none focus:ring-0 focus:drop-shadow-none disabled:border-0'
                placeholder=' '
              />
              <div className='bg-primary-blue xsm:w-[404px] -mt-1 h-[1px] w-full' />
              <label className="after:content[' '] text-primary-blue pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Message
              </label>
            </div>
          </div>
          <button className='bg-primary-blue hover:text-raspberry mb-5 mt-2 w-full py-3 text-xl tracking-[6px] text-white duration-150 hover:bg-white hover:font-[500] hover:tracking-[10px]'>
            SEND
          </button>
        </form>
      </div>
    </section>
  );
}
