import React, { useState } from 'react';

export default function Experience(): JSX.Element {
  type TabKeys = 'BSG' | 'ANFATA';
  const [activeTab, setActiveTab] = useState<TabKeys>('BSG');

  const tabContent: Record<TabKeys, React.JSX.Element> = {
    BSG: (
      <div>
        <h4 className='text-xl font-[500]'>BUSINESS SERVICE GALOP</h4>
        <div className='gradient mb-2 h-[2px] w-full'></div>
        <p className='mt-2 text-sm'>
          <p>- </p>
        </p>
      </div>
    ),
    ANFATA: (
      <div>
        <h4 className='text-xl font-[500]'>ANFATA GAMES</h4>
        <div className='gradient mb-2 h-[2px] w-full'></div>
        <p className='mt-2'>
          <p className='mb-2'>
            - Development of decentralized app and auction system, integration
            with Smart Contracts and ImmutableX collections (marketplace,
            bridging between L1 and L2, transfers, etc.)
          </p>
          <p className='mb-2'>
            - Working with Moralis and Firebase cloud functions and databases,
            TypeScript, Next.js and version control systems
          </p>
          <p className='mb-2'>
            - Implementation of a new homepage, integration with Sanity CMS blog
            system, handling custom events on company apps and sites
          </p>
          <p className='mb-2'>
            - Cross-team collaboration in cross-national team for consistent
            user experience with company products
          </p>
        </p>
      </div>
    ),
  };

  return (
    <section
      id='experience'
      className='font-mont relative flex h-[100%] w-full flex-col items-center justify-center overflow-hidden bg-white py-10 md:pt-[120px]'
    >
      <h3 className='font-mont text-primary-blue left-0 top-[160px] py-10 text-xl font-[500] leading-3 tracking-[10px] md:absolute md:-rotate-90 md:py-0'>
        WORK EXP
      </h3>
      <div className=' flex w-full max-w-[800px]'>
        <div className='perspective-right flex flex-col'>
          {/* Tab Buttons */}
          <button
            onClick={() => setActiveTab('BSG')}
            className={`${
              activeTab === 'BSG'
                ? 'from-raspberry to-oranger gradient text-primary-blue scale-[102%] bg-gradient-to-r'
                : 'bg-raspberry'
            } hover:text-primary-blue flex min-w-[230px] cursor-pointer gap-2 px-[15px] py-[10px] text-[14px] font-[500] text-white shadow-md duration-75`}
          >
            <img
              src='/exp/BSG.jpg'
              alt='Business Service Galop'
              className='mt-[2px] max-h-[18px] rounded-xl'
            />
            Business Service Galop
          </button>
          <div className='bg-primary-blue h-[2px] w-full'></div>
          <button
            onClick={() => setActiveTab('ANFATA')}
            className={`${
              activeTab === 'ANFATA'
                ? 'from-raspberry to-oranger gradient text-primary-blue scale-[102%] bg-gradient-to-r '
                : 'bg-raspberry'
            } hover:text-primary-blue flex cursor-pointer gap-2 px-[15px] py-[10px] text-[14px] font-[500] text-white shadow-md duration-75`}
          >
            <img
              src='/exp/ANFATA.png'
              alt='Anfata Games'
              className='max-h-[18px] pt-[4px]'
            />
            Anfata Games
          </button>
        </div>
        {/* Dynamic Content */}
        <div className='bg-primary-blue perspective-left border-raspberry min-h-[500px] w-full border-2 border-b-4 border-r-[3px] p-4 text-white shadow-sm'>
          {tabContent[activeTab]}
        </div>
      </div>
    </section>
  );
}
