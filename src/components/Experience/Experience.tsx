import React, { useEffect, useRef } from 'react';
import { BiLogoPhp } from 'react-icons/bi';
import { IoLogoGithub, IoLogoReact } from 'react-icons/io5';
import {
  SiBitbucket,
  SiFirebase,
  SiGitlab,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiSanity,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

import { gsap, ScrollTrigger } from '@/lib/gsap';

import experiencesData from '@/components/Experience/Partials/experiences.json';

const getTechIcon = (tech: string): JSX.Element | null => {
  const iconMap: { [key: string]: JSX.Element } = {
    PHP: <BiLogoPhp className='text-xl' />,
    MySQL: <SiMysql className='text-xl' />,
    Laravel: <SiLaravel className='text-xl' />,
    'React Native': <IoLogoReact className='text-xl' />,
    'Vanilla JS': <SiJavascript className='text-xl' />,
    TypeScript: <SiTypescript className='text-xl' />,
    'Next.js': <SiNextdotjs className='text-xl' />,
    TailwindCSS: <SiTailwindcss className='text-xl' />,
    Git: <IoLogoGithub className='text-xl' />,
    'Sanity CMS': <SiSanity className='text-xl' />,
    Firebase: <SiFirebase className='text-xl' />,
    GitLab: <SiGitlab className='text-xl' />,
    Bitbucket: <SiBitbucket className='text-xl' />,
  };

  return iconMap[tech] || null;
};

export default function Experience(): JSX.Element {
  return (
    <section
      id='experience'
      className='font-mont relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white py-10 md:pt-[120px]'
    >
      <h3 className='font-mont text-primary-blue -left-8 top-[160px] py-2 text-xl font-[500] leading-3 tracking-[10px] md:absolute md:rotate-90 md:py-0'>
        WORK EXP
      </h3>
      <div className='flex h-full w-full flex-col gap-[60px]'>
        {experiencesData.experiences.map((exp, index) => (
          <ExperienceSection key={index} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
}

function ExperienceSection({ exp, index }: { exp: any; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  return (
    <div
      className={`border-primary-blue flex h-full w-full max-w-[80%] border-y-2 py-0 text-justify text-white shadow-sm ${
        index % 2 === 0
          ? 'gradient-slow self-end pl-10'
          : 'gradient-slow justify-end self-start pr-10'
      }`}
    >
      <div ref={containerRef} className='flex w-full max-w-[750px]'>
        <div className='bg-primary-blue flex-1 p-6 py-4 text-[14px]'>
          <h4 className='flex justify-between text-xl font-[500]'>
            <span className='pb-2 text-[20px] text-white'>{exp.title}</span>
            <span className='text-[14px] font-[400]'>{exp.date}</span>
          </h4>
          <div className='gradient mb-2 h-[2px] w-full'></div>

          <div>
            <div className='flex justify-between'>
              <span className='mb-2 flex items-center text-[#b6b6b6]'>
                <img
                  src={`/exp/${exp.icon}`}
                  className='mr-2 h-[18px] w-[18px]'
                  alt={exp.job}
                />
                {exp.job}
              </span>
              <div className='flex justify-between'>
                {exp.stack.map((tech: string, i: number) => {
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
      </div>
    </div>
  );
}
