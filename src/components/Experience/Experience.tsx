import React, { useState } from 'react';

export default function Experience(): JSX.Element {
  type TabKeys = 'BSG' | 'ANFATA';
  const [activeTab, setActiveTab] = useState<TabKeys>('BSG');

  const tabContent: Record<TabKeys, React.JSX.Element> = {
    BSG: (
      <div>
        <h4 className='flex justify-between text-xl font-[500]'>
          <span>BUSINESS SERVICE GALOP</span>
          <span className='text-[14px] font-[400]'>MAY 2024 - NOW</span>
        </h4>
        <div className='gradient mb-2 h-[2px] w-full'></div>
        <p className='mt-2'>
          <p className='mb-2'>
            - Updating and expanding the internal event management system (PHP,
            Smarty, MySQL, jQuery/Vanilla JS) with new functionalities, (e.g.
            including proof verification, PDF report generation for companies
            post-conference), system optimizations, and bug fixes.
          </p>
          <p className='mb-2'>
            - Developing dedicated front-end solutions for medical events
            (registration forms, linking with external APIs etc.).
          </p>
          <p className='mb-2'>
            - Designing a new participant area within the conference system,
            customized to client requirements.
          </p>
          <p className='mb-2'>
            - Creating a mobile application for Zebra data collectors, enabling
            QR code scanning with local data storage, an administrative panel,
            and CSV export/sharing functionality (React Native, Expo).
          </p>
          <p className='mb-2'>
            - Building a voting application with an administrative panel (PHP,
            Vanilla JS, Chart.js).
          </p>
          <p className='mb-2'>
            - Developing virtual stands with documentation for companies
            (Vanilla JS, CSS).
          </p>
          <p className='mb-2'>
            - Developing a web application for attendance tracking during event
            sessions, supporting both self-scanning machines and Zebra mobile
            scanners (Vanilla JS, PHP).
          </p>
          <p className='mb-2'>
            - Creating custom solutions, improving the entire team's workflow.
          </p>
          <p className='mb-2'>
            - Providing onsite IT support for colleagues and during business
            trips (across Poland), ensuring the smooth operation of company
            applications and maintaining hardware performance.
          </p>
          <p className='mb-2'>
            - Assisting event participants as needed, including at international
            conferences.
          </p>
          <p className='mb-2'>
            - Cooperating with graphic designers (2D/3D) and the whole team.
          </p>
          <p className='mb-2'>
            - Representing the IT department in online client meetings.
          </p>
          <p className='mb-2'>- Serving as a company driver if needed.</p>
        </p>
      </div>
    ),
    ANFATA: (
      <div>
        <h4 className='flex justify-between text-xl font-[500]'>
          <span>ANFATA GAMES</span>
          <span className='text-[14px] font-[400]'>SEP 2022 - AUG 2023</span>
        </h4>
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
            - Created custom sites for events (e.g. Freemint page)
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
      <div className=' flex w-full max-w-[1100px]'>
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
        <div className='bg-primary-blue perspective-left border-raspberry max-h-[332px] w-full overflow-y-scroll border-2 border-b-4 border-r-[3px] p-4 text-white shadow-sm'>
          {tabContent[activeTab]}
        </div>
      </div>
    </section>
  );
}
