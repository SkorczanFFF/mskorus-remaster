import React from 'react';

export default function Experience(): JSX.Element {
  return (
    <section
      id='experience'
      className='font-mont relative h-auto w-full overflow-hidden bg-white py-20'
    >
      <div className='flex-flex-col relative h-full min-h-[400px] w-full'>
        <h3 className='font-mont text-primary-blue -left-[30px] top-[190px] text-xl font-[500] leading-3 tracking-[10px] md:absolute md:-rotate-90'>
          WORK EXP
        </h3>
        <div
          data-aos='fade-up'
          data-aos-offset='100'
          data-aos-duration='750'
          className='mx-4 my-20 flex w-full max-w-[1200px] flex-wrap justify-center gap-10 md:mx-8'
        >
          lorem ipsum
        </div>
      </div>
    </section>
  );
}
