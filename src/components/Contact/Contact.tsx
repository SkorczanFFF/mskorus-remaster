import React from 'react';
export default function Contact(): JSX.Element {
  return (
    <section
      data-testid='contact-section'
      id='contact'
      className='font-mont ny-20 relative flex h-auto w-full flex-col items-center justify-center overflow-hidden bg-white'
    >
      <div className='arrow-down blue' />
      <h3 className='font-mont text-primary-blue -left-6 top-[170px] mb-6 mt-[60px] text-xl font-[500] leading-3 tracking-[10px] md:absolute md:mb-0 md:mt-0 md:-rotate-90'>
        CONTACT
      </h3>
      <div className='gradient-slow border-primary-blue xsm:w-[450px] my-20 mt-10 flex h-full w-full flex-col items-center gap-3 border-t-2 text-white md:my-20 md:flex-col'></div>
    </section>
  );
}
