import React, { useEffect, useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  BitbucketIcon,
  FirebaseIcon,
  GithubIcon,
  GitlabIcon,
  JavascriptIcon,
  LaravelIcon,
  MysqlIcon,
  NextjsIcon,
  PhpIcon,
  ReactIcon,
  SanityIcon,
  TailwindIcon,
  TypescriptIcon,
} from '@/lib/shared/Icons';

import experiencesData from '@/components/Experience/Partials/experiences.json';

interface ExperienceData {
  title: string;
  date: string;
  job: string;
  icon: string;
  stack: string[];
  details: string[];
}

const getTechIcon = (tech: string): JSX.Element | null => {
  const iconMap: { [key: string]: JSX.Element } = {
    PHP: <PhpIcon className='text-xl' />,
    MySQL: <MysqlIcon className='text-xl' />,
    Laravel: <LaravelIcon className='text-xl' />,
    'React Native': <ReactIcon className='text-xl' />,
    'Vanilla JS': <JavascriptIcon className='text-xl' />,
    TypeScript: <TypescriptIcon className='text-xl' />,
    'Next.js': <NextjsIcon className='text-xl' />,
    TailwindCSS: <TailwindIcon className='text-xl' />,
    Git: <GithubIcon className='text-xl' />,
    'Sanity CMS': <SanityIcon className='text-xl' />,
    Firebase: <FirebaseIcon className='text-xl' />,
    GitLab: <GitlabIcon className='text-xl' />,
    Bitbucket: <BitbucketIcon className='text-xl' />,
  };

  return iconMap[tech] || null;
};

export default function Experience(): JSX.Element {
  return (
    <section
      id='experience'
      className='font-mont relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white py-20 md:pt-[120px] pb-10'
    >
      <h3 className='font-mont text-primary-blue -left-8 top-[160px] py-2 text-xl font-[500] leading-3 tracking-[10px] md:absolute md:rotate-90 md:py-0'>
        WORK EXP
      </h3>
      <div className='flex h-full w-full flex-col gap-[60px] pt-20 md:py-0 pb-0'>
        {experiencesData.experiences.map((exp, index) => (
          <ExperienceSection key={index} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
}

interface ExperienceSectionProps {
  exp: ExperienceData;
  index: number;
}

function ExperienceSection({ exp, index }: ExperienceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsap) return;

    if (containerRef.current) {
      const isSmallScreen = window.innerWidth < 1024;
      const isMediumScreen =
        window.innerWidth >= 1024 && window.innerWidth < 1280;

      if (isSmallScreen) {
        // Disable scroll trigger for small screens
        gsap.set(containerRef.current, { x: 0 });
      } else {
        // Set initial position based on screen size
        gsap.set(containerRef.current, {
          x:
            index % 2 === 0
              ? isMediumScreen
                ? 100
                : 200
              : isMediumScreen
                ? -100
                : -200,
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
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });
      }
    }

    return () => {
      ScrollTrigger?.getAll().forEach((trigger: ScrollTrigger) =>
        trigger.kill(),
      );
    };
  }, [index]);

  return (
    <div
      className={`border-primary-blue flex h-full w-full md:max-w-[85%] lg:max-w-[80%] border-y-2 py-0 text-justify text-white shadow-sm ${
        index % 2 === 0
          ? 'gradient-slow self-end pl-2 md:pl-10'
          : 'gradient-slow justify-end self-start pr-2 md:pr-10'
      }`}
    >
      <div ref={containerRef} className='flex w-full max-w-[750px]'>
        <div className='bg-primary-blue flex-1 p-6 md:py-4 text-[14px] lg:mx-auto'>
          <h4 className='flex flex-col sm:flex-row sm:justify-between text-xl font-[500]'>
            <span className='pb-0 sm:pb-2 text-[20px] text-white'>
              {exp.title}
            </span>
            <span className='text-[14px] font-[400]'>{exp.date}</span>
          </h4>
          <div className='gradient mb-2 h-[2px] w-full'></div>

          <div>
            <div className={`flex justify-between flex-col sm:flex-row `}>
              <span className='mb-2 flex items-center text-[#b6b6b6]'>
                <img
                  src={`/exp/${exp.icon}`}
                  className='mr-2 h-[18px] w-[18px]'
                  alt={exp.job}
                />
                {exp.job}
              </span>
              <div className='flex justify-between mb-2 sm:mb-0'>
                {exp.stack.map((tech, i) => {
                  const icon = getTechIcon(tech);
                  return icon ? (
                    <span
                      key={i}
                      className='hover:text-raspberry px-1 py-[0] text-[#c7c7c7] transition-colors duration-200'
                    >
                      {icon}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            {exp.details.map((detail, i) => (
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
      </div>
    </div>
  );
}
