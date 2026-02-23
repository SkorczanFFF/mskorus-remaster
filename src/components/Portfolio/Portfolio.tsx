import React, { useLayoutEffect, useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import { GithubIcon } from '@/lib/shared/Icons';

import PortfolioCard from './Partials/PortfolioCard';
import PortfolioProjectItem from './Partials/PortfolioProjectItem';
import projects from './Partials/projects.json';

export default function Portfolio(): React.JSX.Element {
  const projectRefs = useRef<(HTMLImageElement | null)[]>([]);
  const nonWebCard1Ref = useRef<HTMLDivElement>(null);
  const nonWebCard2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const triggers: ScrollTrigger[] = [];
    const CARD_OFFSET = 80; // match Tailwind space-20 (5rem)

    // Non-web cards: optional card2StartX/card2EndX for <=1280 (start 20px left, move further left on scroll)
    const setupCardScroll = (
      card1Start: number,
      card2Start: number,
      cardTriggers: ScrollTrigger[],
      scrub1 = 2.5,
      scrub2 = 1.5,
      card2X?: { start: number; end: number },
    ) => {
      if (nonWebCard1Ref.current) {
        gsap.set(nonWebCard1Ref.current, { y: card1Start });
        const t1 = gsap.to(nonWebCard1Ref.current, {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: nonWebCard1Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: scrub1,
            invalidateOnRefresh: true,
          },
        });
        if (t1.scrollTrigger) cardTriggers.push(t1.scrollTrigger);
      }
      if (nonWebCard2Ref.current) {
        const startX = card2X?.start ?? 0;
        const endX = card2X?.end ?? 0;
        gsap.set(nonWebCard2Ref.current, {
          y: card2Start,
          x: startX,
        });
        const t2 = gsap.to(nonWebCard2Ref.current, {
          y: 0,
          x: endX,
          ease: 'none',
          scrollTrigger: {
            trigger: nonWebCard2Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: scrub2,
            invalidateOnRefresh: true,
          },
        });
        if (t2.scrollTrigger) cardTriggers.push(t2.scrollTrigger);
      }
    };

    const mm = gsap.matchMedia();
    mm.add('(max-width: 1024px)', () => {
      const cardTriggers: ScrollTrigger[] = [];
      const secondCardOffset = 50;
      setupCardScroll(CARD_OFFSET, secondCardOffset, cardTriggers, 2, 2);
      return () => cardTriggers.forEach((t) => t.kill());
    });
    mm.add('(min-width: 1025px) and (max-width: 1280px)', () => {
      const cardTriggers: ScrollTrigger[] = [];
      const secondCardOffset = 50;
      setupCardScroll(CARD_OFFSET, secondCardOffset, cardTriggers, 2, 2, {
        start: -20,
        end: -CARD_OFFSET,
      });
      return () => cardTriggers.forEach((t) => t.kill());
    });
    mm.add('(min-width: 1281px)', () => {
      const cardTriggers: ScrollTrigger[] = [];
      setupCardScroll(CARD_OFFSET, -CARD_OFFSET, cardTriggers, 2, 1.5);
      return () => cardTriggers.forEach((t) => t.kill());
    });

    projectRefs.current.forEach((img, index) => {
      if (!img) return;

      const isEven = index % 2 === 0;
      const xOffset = isEven ? -100 : 100;

      const tween = gsap.fromTo(
        img,
        {
          opacity: 0,
          x: xOffset,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        },
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id='portfolio'
      className='font-mont bg-primary-blue relative flex h-auto w-full flex-col items-center justify-center overflow-hidden pb-20'
    >
      <div className='arrow-down white pt-[60px]' />
      <h3 className='font-mont -left-[45px] top-[190px] text-xl font-[400] leading-3 tracking-[10px] text-white md:absolute md:rotate-90'>
        PORTFOLIO
      </h3>
      <div className='xxl:w-[1200px] my-[60px] flex w-full flex-col gap-20 px-5 text-white md:mx-0 md:my-20 md:w-[620px] md:flex-col lg:w-[750px] xl:w-[1050px]'>
        {projects.map((project, index) => (
          <PortfolioProjectItem
            key={project.id}
            project={project}
            index={index}
            imageRef={(el) => {
              projectRefs.current[index] = el;
            }}
          />
        ))}
      </div>
      <div className='mt-20 flex w-full flex-col items-center justify-center px-5 md:px-10 lg:px-20'>
        <div className='flex w-full md:max-w-[580px] lg:max-w-[1160px] flex-col gap-5 lg:flex-row max-w-[600px]'>
          <div className='border-1 text-primary-blue border-oranger mt-10 flex max-h-[140px] min-w-[300px] max-w-[300px] flex-col justify-center gap-2 border-r-2 border-[gradient] bg-[#0c2835] p-5 shadow-xl md:p-10'>
            <div className='font-[300] leading-5'>
              <h1 className='text-2xl md:text-3xl lg:text-4xl'>
                <div className='nonweb-text text-end text-raspberry'>NON WEB</div>
                <div className='related-text text-center text-[#b2b2b2]'>RELATED</div>
                <div className='corner-text text-end text-[#b2b2b2]'>CORNER</div>
              </h1>
            </div>
          </div>
          <div className='mt-0 mb-20 lg:mb-0 flex max-w-full flex-col gap-5 xl:flex-row min-[1025px]:mt-10 min-[1281px]:mt-20 max-[1280px]:max-w-[600px]'>
            <div ref={nonWebCard1Ref}>
              <PortfolioCard
                className='border-b-[2px] border-b-[#0C2835]'
                title='Tibia Key Presser'
                tech='Python, Tkinter, pywinauto'
                description='A lightweight Python-based automation tool for Tibia (MMORPG), developed for personal use to assist with magic skill training on Open Tibia Servers. It supports up to eight key-delay pairs with customizable delays from 0 to 10 seconds, along with individual reset and delete options. The tool automatically detects the Tibia game window, provides dynamic UI feedback, and offers simple Start/Stop controls. Designed for efficiency and minimal resource usage, it runs perfectly in the background, without interrupting other activities and games.'
                links={[
                  {
                    href: 'https://github.com/SkorczanFFF/tibia-key-presser',
                    label: 'repo',
                    icon: <GithubIcon className='text-2xl' />,
                  },
                ]}
              />
            </div>
            <div ref={nonWebCard2Ref} className='min-[1025px]:max-[1280px]:-ml-20'>
              <PortfolioCard
                className='h-auto border-t-[2px] border-t-[#0C2835]'
                title='Package Delivery SA:MP Server'
                tech='PawnC, SA:MP'
                description={
                  <>
                    <p>
                      A package delivery system for a San Andreas Multiplayer
                      server, created for fun and educational purposes with a
                      friend. The system includes features for picking up and
                      delivering packages, a map divided into package delivery
                      regions, and dedicated loading/unloading hubs in each
                      city.
                      <br /> To enhance realism and immersion, the system also
                      includes additional scripts such as random tire punctures
                      and a post-shift vehicle condition report. Future plans
                      include expanding the system with housing, personal
                      vehicles, and more in-game functionalities.
                    </p>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <p className='mb-10 mt-[60px] lg:mt-[160px] tracking-[8px] text-white'>
        STAY TUNED
      </p>
    </section>
  );
}
