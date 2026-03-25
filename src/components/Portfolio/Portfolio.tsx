import React, { useLayoutEffect, useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { GithubIcon } from '@/lib/shared/Icons';

import { useLocale } from '@/locale/LocaleContext';

import PortfolioCard from './Partials/PortfolioCard';
import PortfolioProjectItem from './Partials/PortfolioProjectItem';

export default function Portfolio(): React.JSX.Element {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const mm = gsap.matchMedia();

    // Desktop: horizontal scroll with pin
    mm.add('(min-width: 769px)', () => {
      const totalScroll = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });

      // Per-panel entrance + overlay reveal animations
      const panels = track.querySelectorAll<HTMLElement>('.project-panel');
      panels.forEach((panel) => {
        const overlay = panel.querySelector<HTMLElement>('.project-overlay');
        const title = panel.querySelector<HTMLElement>('.project-title');

        gsap.fromTo(
          panel,
          { opacity: 0.3, x: 80 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 85%',
              end: 'left 40%',
              scrub: true,
            },
          },
        );

        if (title) {
          gsap.fromTo(
            title,
            { x: 200 },
            {
              x: 0,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left 90%',
                end: 'left 35%',
                scrub: true,
              },
            },
          );
        }

        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left 60%',
                end: 'left 30%',
                scrub: true,
              },
            },
          );
        }
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // Mobile: vertical stack with simple fade-in
    mm.add('(max-width: 768px)', () => {
      const triggers: ScrollTrigger[] = [];
      const items = section.querySelectorAll<HTMLElement>('.mobile-fade');
      items.forEach((el) => {
        const tw = gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom-=80',
              toggleActions: 'play none none reverse',
            },
          },
        );
        if (tw.scrollTrigger) triggers.push(tw.scrollTrigger);
      });

      return () => triggers.forEach((st) => st.kill());
    });

    ScrollTrigger.refresh();
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id='portfolio'
      className='font-grotesk bg-primary-blue relative w-full overflow-hidden md:h-screen'
    >
      {/* Section title — rotated on desktop, matching Services/Experience */}
      <h3 className='font-grotesk z-10 py-2 text-xl font-normal leading-3 tracking-[10px] text-white md:absolute md:origin-top-left md:rotate-90 md:left-[80px] md:top-[60px] md:p-4 md:left-[95px] w-full backdrop-blur-[10px]'>
        {t.portfolioTitle}
      </h3>


      {/* Horizontal scroll track (desktop) / vertical stack (mobile) */}
      <div
        ref={trackRef}
        className='flex h-auto w-full flex-col text-white will-change-transform md:h-full md:flex-row md:flex-nowrap'
      >
        {/* Project panels */}
        {t.projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-panel mobile-fade flex w-full shrink-0 items-center justify-center px-5 py-10 md:w-[70vw] md:px-16 md:py-0 ${index === 0 ? 'md:ml-20' : ''}`}
          >
            <PortfolioProjectItem project={project} />
          </div>
        ))}

        {/* Non-web outro panel */}
        <div className='mobile-fade flex w-full shrink-0 flex-col items-center justify-center gap-10 px-8 py-16 md:w-screen md:py-0'>
          <div className='flex w-full max-w-[900px] flex-col gap-5 xl:flex-row'>
            <div className='flex min-w-[260px] max-w-[300px] flex-col justify-center gap-2 border-r-2 border-orange-dark bg-[#0c2835] p-5 shadow-xl md:p-8'>
              <h4 className='text-2xl font-light leading-5 md:text-3xl'>
                <div className='text-end text-raspberry'>{t.portfolioNonWeb}</div>
                <div className='text-center text-[#b2b2b2]'>{t.portfolioRelated}</div>
                <div className='text-end text-[#b2b2b2]'>{t.portfolioCorner}</div>
              </h4>
            </div>
            <div className='flex flex-col gap-5 xl:flex-row'>
              {t.nonWebProjects.map((nwp) => (
                <PortfolioCard
                  key={nwp.title}
                  title={nwp.title}
                  tech={nwp.tech}
                  description={
                    nwp.description.includes('\n') ? (
                      <p>
                        {nwp.description.split('\n').map((part, pi) => (
                          <React.Fragment key={pi}>
                            {pi > 0 && <br />}
                            {part}
                          </React.Fragment>
                        ))}
                      </p>
                    ) : (
                      nwp.description
                    )
                  }
                  links={nwp.links.map((link) => ({
                    ...link,
                    icon: <GithubIcon className='text-2xl' />,
                  }))}
                />
              ))}
            </div>
          </div>
          <p className='tracking-[8px]'>{t.portfolioStayTuned}</p>
        </div>
      </div>
    </section>
  );
}
