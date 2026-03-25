import React, { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { techIconMap } from '@/lib/shared/techMap';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

import { useLocale } from '@/locale/LocaleContext';
import type { ExperienceEntry } from '@/locale/types';

export default function Experience(): React.JSX.Element {
  const { t } = useLocale();

  return (
    <section
      id='experience'
      className='font-grotesk relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white'
    >
      <h3 className='font-grotesk text-primary-blue -left-8 top-[160px] py-2 text-xl font-medium leading-3 tracking-[10px] md:absolute md:rotate-90 md:py-0'>
        {t.experienceSectionTitle}
      </h3>
      <div className='flex h-full w-full flex-col gap-[60px] py-[160px]'>
        {t.experiences.map((exp, index) => (
          <ExperienceSection key={index} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
}

interface ExperienceSectionProps {
  exp: ExperienceEntry;
  index: number;
}

function ExperienceSection({ exp, index }: ExperienceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollTriggers(() => {
    if (!containerRef.current) return [];

    const isSmallScreen = window.innerWidth < 1024;
    const isMediumScreen =
      window.innerWidth >= 1024 && window.innerWidth < 1280;

    if (isSmallScreen) {
      gsap.set(containerRef.current, { x: 0 });
      return [];
    }

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

    const tween = gsap.to(containerRef.current, {
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

    return [tween.scrollTrigger];
  }, [index]);

  return (
    <div
      className={`border-primary-blue flex h-full w-full md:max-w-[85%] lg:max-w-[80%] border-y-2 py-0 text-justify text-white shadow-sm ${index % 2 === 0
          ? 'gradient-slow self-end pl-2 md:pl-10'
          : 'gradient-slow justify-end self-start pr-2 md:pr-10'
        }`}
    >
      <div ref={containerRef} className='flex w-full max-w-[750px]'>
        <div className='bg-primary-blue flex-1 p-6 md:py-4 text-[14px] lg:mx-auto'>
          <h4 className='flex flex-col sm:flex-row sm:justify-between text-xl font-medium'>
            <span className='pb-0 sm:pb-2 text-[20px] text-white'>
              {exp.position}
            </span>
            <span className='text-[14px] font-normal'>{exp.date}</span>
          </h4>
          <div className='gradient mb-2 h-[2px] w-full'></div>

          <div>
            <div className={`flex justify-between flex-col sm:flex-row `}>
              <span className='mb-2 flex items-center text-[#b6b6b6]'>
                <img
                  src={`/exp/${exp.icon}`}
                  className='mr-2 h-[18px] w-[18px]'
                  alt={exp.company}
                />
                {exp.company}
              </span>
              <div className='flex justify-between mb-2 sm:mb-0'>
                {exp.stack.map((tech, i) => {
                  const Icon = techIconMap[tech];
                  return Icon ? (
                    <span
                      key={i}
                      className='hover:text-raspberry px-1 py-[0] text-[#c7c7c7] transition-colors duration-200'
                    >
                      <Icon className='text-xl' />
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            {exp.duties.map((duty, i) => (
              <p
                key={i}
                className={`${i === exp.duties.length - 1 ? 'mb-1' : 'mb-2'
                  } font-light leading-4 text-[#f8f8f8]`}
              >
                - {duty}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
