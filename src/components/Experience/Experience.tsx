import React, { useEffect, useRef, useState } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function Experience(): JSX.Element {
  const experiences = [
    {
      job: 'BUSINESS SERVICE GALOP',
      title: 'Front-End Developer',
      date: 'MAY 2024 - NOW',
      icon: 'BSG.PNG',
      details: [
        'Updating and expanding the internal event management system with new functionalities (e.g. proof verification, PDF report generation for companies post-conference), system optimizations, and bug fixes (PHP, Smarty, MySQL, jQuery/Vanilla JS).',
        'Developing dedicated front-end solutions for medical events (registration forms, linking with external APIs etc.).',
        'Designing a new participant area within the conference system, customized to client requirements.',
        'Creating a mobile application for Zebra data collectors, enabling QR code scanning with local data storage, an administrative panel, and CSV export/sharing functionality (React Native, Expo).',
        'Building a voting application with an administrative panel (PHP, Vanilla JS, Chart.js).',
        'Developing virtual stands with documentation for companies (Vanilla JS, CSS).',
        'Developing a web application for attendance tracking during event sessions, supporting both self-scanning machines and Zebra mobile scanners (Vanilla JS, PHP).',
        'Developing responsive and consistent mailings, compatible across all major email services.',
        "Creating custom solutions, improving the entire team's workflow.",
        'Providing onsite IT support for colleagues and during business trips (across Poland), ensuring the smooth operation of company applications and maintaining hardware performance.',
        'Assisting event participants as needed, including at international conferences.',
        'Cooperating with backend developer, graphic designers (2D/3D) and whole team.',
        'Representing the IT department in online client meetings.',
        'Serving as a company driver if needed.',
      ],
    },
    {
      job: 'ANFATA GAMES',
      title: 'Junior Web3 Frontend Developer',
      date: 'SEP 2022 - AUG 2023',
      icon: 'ANFATA.png',
      details: [
        'Developed a decentralized application integrated with Smart Contracts and ImmutableX collections, including building a marketplace, bridging NFTs between L1 and L2, enabling transfers between accounts, and implementing a live auction system.',
        'Worked with Moralis and Firebase databases and cloud functions, using TypeScript, Next.js, GSAP, and version control systems like GitLab and Bitbucket.',
        'Implemented a new homepage, integrated a Sanity CMS blog system, and built custom event-oriented websites and features across company platforms.',
        'Performed manual testing of Pirates of the Arrland, including the 3D MOBA game and 2D strategic map components within the decentralized app.',
        'Collaborated closely with cross-functional and international teams to deliver integrated Web3 experiences.',
      ],
    },
  ];

  return (
    <section
      id='experience'
      className='font-mont relative flex h-[100%] w-full flex-col items-center justify-center overflow-hidden bg-white py-10 md:pt-[120px]'
    >
      <h3 className='font-mont text-primary-blue -left-8 top-[160px] py-2 text-xl font-[500] leading-3 tracking-[10px] md:absolute md:rotate-90 md:py-0'>
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
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if gsap is available (client-side only)
    if (!gsap) return;

    if (containerRef.current) {
      gsap.set(containerRef.current, {
        x: index % 2 === 0 ? 200 : -200,
      });

      gsap.to(containerRef.current, {
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
          toggleActions: 'play none none reverse',
          markers: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });
    }

    return () => {
      ScrollTrigger?.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, [index]);

  useEffect(() => {
    // Check if gsap is available (client-side only)
    if (!gsap) return;

    if (containerRef.current && contentRef.current) {
      const timeline = gsap.timeline();

      if (expanded) {
        timeline
          .to(containerRef.current, {
            maxWidth: '900px',
            duration: 0.6,
            ease: 'power2.inOut',
          })
          .to(
            contentRef.current,
            {
              maxHeight: contentRef.current.scrollHeight,
              duration: 0.6,
              ease: 'power2.inOut',
            },
            '>-0.2'
          );
      } else {
        timeline
          .to(contentRef.current, {
            maxHeight: exp.job === 'ANFATA GAMES' ? 'auto' : '284px',
            duration: 0.6,
            ease: 'power2.inOut',
          })
          .to(containerRef.current, {
            maxWidth: '700px',
            duration: 0.6,
            ease: 'power2.inOut',
          });
      }
    }
  }, [expanded]);

  useEffect(() => {
    if (contentRef.current) {
      setShowButton(contentRef.current.scrollHeight > 350);
    }
  }, []);

  return (
    <div
      className={`border-primary-blue flex w-full max-w-[80%] border-y-2 py-0 text-justify text-white shadow-sm ${
        index % 2 === 0
          ? 'gradient-slow self-end pl-10'
          : 'gradient-slow justify-end self-start pr-10'
      }`}
    >
      <div ref={containerRef} className='flex'>
        <div
          className={`bg-primary-blue p-8 text-[14px] transition-all duration-300 ${
            expanded ? 'max-w-[900px]' : ' overflow-hidden'
          }`}
        >
          <h4 className='flex justify-between text-xl font-[500]'>
            <span className='pb-2 text-[20px] text-white'>{exp.title}</span>
            <span className='text-[14px] font-[400]'>{exp.date}</span>
          </h4>
          <div className='gradient mb-2 h-[2px] w-full'></div>

          <div ref={contentRef} className='overflow-hidden'>
            <span className='mb-2 flex items-center text-[#b6b6b6]'>
              <img
                src={`./exp/${exp.icon}`}
                className='mr-2 h-[18px] w-[18px]'
              ></img>
              {exp.job}
            </span>
            {exp.details.map((detail: string, i: number) => (
              <p
                key={i}
                className={`${
                  i === exp.details.length - 1 ? 'mb-1' : 'mb-2'
                } font-[300] leading-4 text-[#f8f8f8]`}
              >
                - {detail}
              </p>
            ))}
          </div>
        </div>

        {showButton && (
          <button
            onClick={() => setExpanded(!expanded)}
            className={`min-h-full text-center text-sm font-bold transition-all duration-300 ease-in-out ${
              expanded
                ? 'bg-primary-blue w-[70px] border-r-2 border-white text-white'
                : 'text-primary-blue hover:bg-primary-blue w-[50px] border-r-2 border-white bg-white hover:w-[70px] hover:text-white'
            }`}
          >
            <span
              style={{
                display: 'flex',
                transform: 'rotate(90deg)',
                transformOrigin: 'center',
                letterSpacing: '4px',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                height: '70px',
              }}
            >
              {expanded ? 'SHOW LESS' : 'SHOW MORE'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
