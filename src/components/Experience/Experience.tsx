import React, { useEffect, useRef, useState } from 'react';

export default function Experience(): JSX.Element {
  const experiences = [
    {
      title: 'BUSINESS SERVICE GALOP',
      date: 'MAY 2024 - NOW',
      icon: 'BSG.PNG',
      details: [
        'Updating and expanding the internal event management system with new functionalities, system optimizations, and bug fixes (PHP, Smarty, MySQL, jQuery/Vanilla JS).',
        'Developing dedicated front-end solutions for medical events (registration forms, linking with external APIs, etc.).',
        'Designing a new participant area within the conference system, customized to client requirements.',
        'Creating a mobile application for Zebra data collectors, enabling QR code scanning with local data storage, an administrative panel, and CSV export/sharing functionality (React Native, Expo).',
        'Building a voting application with an administrative panel (PHP, Vanilla JS, Chart.js).',
        'Developing virtual stands with documentation for companies (Vanilla JS, CSS).',
        'Developing a web application for attendance tracking during event sessions, supporting both self-scanning machines and Zebra mobile scanners (Vanilla JS, PHP).',
        "Creating custom solutions, improving the entire team's workflow.",
        'Providing onsite IT support for colleagues and during business trips (across Poland), ensuring the smooth operation of company applications and maintaining hardware performance.',
        'Assisting event participants as needed, including at international conferences.',
        'Cooperating with backend developer, graphic designers (2D/3D) and the whole team.',
        'Representing the IT department in online client meetings.',
        'Serving as a company driver if needed.',
      ],
    },
    {
      title: 'ANFATA GAMES',
      date: 'SEP 2022 - AUG 2023',
      icon: 'ANFATA.png',
      details: [
        'Development of decentralized app and auction system, integration with Smart Contracts and ImmutableX collections (marketplace, bridging between L1 and L2, transfers, etc.).',
        'Working with Moralis and Firebase cloud functions and databases, TypeScript, Next.js, and version control systems.',
        'Implementation of a new homepage, integration with Sanity CMS blog system, handling custom events on company apps and sites.',
        'Created custom sites for events (e.g. Freemint page).',
        'Testing the alpha version of Pirates of the Arrland game',
        'Cross-team collaboration in a cross-national team for consistent user experience with company products.',
      ],
    },
  ];

  return (
    <section
      id='experience'
      className='font-mont relative flex h-[100%] w-full flex-col items-center justify-center overflow-hidden bg-white py-10 md:pt-[120px]'
    >
      <h3 className='font-mont text-primary-blue left-0 top-[160px] py-10 text-xl font-[500] leading-3 tracking-[10px] md:absolute md:-rotate-90 md:py-0'>
        WORK EXP
      </h3>
      <div className='flex w-full flex-col gap-[60px]'>
        {experiences.map((exp, index) => (
          <ExpandableExperience key={index} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
}

function ExpandableExperience({ exp, index }: { exp: any; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > 500);
    }
  }, []);

  return (
    <div
      className={`flex w-full max-w-[80%] py-0 text-justify text-white shadow-sm ${
        index % 2 === 0
          ? 'gradient-slow self-end pl-10'
          : 'gradient-slow justify-end self-start pr-10'
      }`}
    >
      <div
        className={`bg-primary-blue max-w-[700px] p-10 transition-all duration-300 ${
          expanded ? 'max-w-[1000px]' : 'overflow-hidden'
        }`}
      >
        <h4 className='flex justify-between text-xl font-[500]'>
          <span className='mb-2 flex items-center'>
            <img
              src={`./exp/${exp.icon}`}
              className='mr-2 h-[18px] w-[18px]'
            ></img>
            {exp.title}
          </span>
          <span className='text-[14px] font-[400]'>{exp.date}</span>
        </h4>
        <div className='gradient mb-2 h-[2px] w-full'></div>

        {/* Content container with expandable logic */}
        <div
          ref={contentRef}
          className={`transition-all duration-300 ${
            expanded ? 'max-h-[1000px]' : 'max-h-[320px] overflow-hidden'
          }`}
        >
          {exp.details.map((detail: string, i: number) => (
            <p key={i} className='mb-2'>
              - {detail}
            </p>
          ))}
        </div>
      </div>
      {/* Expand/Collapse Button */}
      {isOverflowing && (
        <button
          onClick={() => setExpanded(!expanded)}
          className='text-primary-blue hover:bg-orange min-h-full bg-white text-center text-sm font-bold transition'
        >
          <span
            style={{
              display: 'inline-block',
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
              letterSpacing: '4px',
              width: '100px',
              height: '40px',
            }}
          >
            {expanded ? 'SHOW LESS' : 'SHOW MORE'}
          </span>
        </button>
      )}
    </div>
  );
}
