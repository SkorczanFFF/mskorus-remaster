import React, { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { DocumentIcon, LinkIcon, UsersIcon } from '@/lib/shared/Icons';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';
import { useTilt } from '@/hooks/useTilt';

import { useLocale } from '@/locale/LocaleContext';
import type { IndustryEntry } from '@/locale/types';

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

const industryIconMap: Record<string, IconType> = {
  Users: UsersIcon,
  Link: LinkIcon,
  Document: DocumentIcon,
};

function IndustryCard({
  industry,
  index,
  prefersReducedMotion,
}: {
  industry: IndustryEntry;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const Icon = industryIconMap[industry.icon];
  const isOdd = index % 2 === 1;
  const { cardRef, onMouseMove, onMouseEnter, onMouseLeave } = useTilt(
    prefersReducedMotion,
    { maxTilt: 5, hoverScale: 1.03 },
  );

  return (
    <div style={{ perspective: 800 }} className='h-full'>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className='group bg-primary-blue relative flex h-full flex-col will-change-transform'
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`h-[3px] w-full ${isOdd ? 'bg-orange' : 'bg-raspberry'}`}
        />

        <div
          className='flex flex-1 flex-col gap-4 p-6 sm:p-7'
          style={{ transformStyle: 'preserve-3d' }}
        >
          {Icon && (
            <Icon
              className={`text-4xl ${isOdd ? 'text-orange' : 'text-raspberry'} brightness-150`}
              aria-hidden='true'
              style={{ transform: 'translateZ(30px)' }}
            />
          )}

          <h3
            className='text-[20px] font-semibold uppercase leading-tight tracking-[0px] text-white transition-[letter-spacing] duration-300 group-hover:tracking-[1px]'
            style={{ transform: 'translateZ(40px)' }}
          >
            {industry.title}
          </h3>

          <p
            className='text-[14px] leading-relaxed text-white/80'
            style={{ transform: 'translateZ(20px)' }}
          >
            {industry.description}
          </p>

          <ul
            className='mt-auto flex flex-wrap gap-1.5 pt-2'
            style={{ transform: 'translateZ(10px)' }}
          >
            {industry.proof.map((item) => (
              <li
                key={item}
                className={`rounded-[2px] border px-2 py-[3px] text-[11px] leading-tight text-white/70 ${
                  isOdd ? 'border-orange/40' : 'border-raspberry/40'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-b ${
            isOdd
              ? 'from-orange/[0.05] to-transparent'
              : 'from-raspberry/[0.05] to-transparent'
          }`}
          aria-hidden='true'
        />
      </div>
    </div>
  );
}

export default function Industries(): React.JSX.Element {
  const { t } = useLocale();
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useScrollTriggers(() => {
    if (!gridRef.current) return [];

    const cards = gsap.utils.toArray<Element>('.industry-card', gridRef.current);
    if (!cards.length) return [];

    gsap.set(cards, { opacity: 0, y: 40 });

    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return [tween.scrollTrigger];
  }, []);

  return (
    <section
      id='industries'
      className='font-grotesk relative flex w-full flex-col items-center overflow-hidden bg-white pb-[100px] pt-[80px] md:pb-[120px] md:pt-[120px] [contain:paint]'
    >
      <h2 className='font-grotesk text-primary-blue py-2 text-xl font-normal leading-3 tracking-[10px] xl:absolute xl:left-[80px] xl:top-[60px] xl:origin-top-left xl:rotate-90 xl:py-0'>
        {t.industriesSectionTitle}
      </h2>

      <p className='text-deep-blue/60 mx-auto mb-12 mt-8 max-w-[640px] px-6 text-center text-[15px] leading-relaxed md:text-[17px] xl:mt-0'>
        {t.industriesLead}
      </p>

      <div
        ref={gridRef}
        className='mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-3'
      >
        {t.industries.map((industry, i) => (
          <div key={industry.title} className='industry-card h-full'>
            <IndustryCard
              industry={industry}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
