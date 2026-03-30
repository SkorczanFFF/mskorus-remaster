import React, { useCallback, useEffect, useRef } from 'react';

import { BREAKPOINTS } from '@/lib/breakpoints';
import { gsap } from '@/lib/gsap';
import {
  CubeIcon,
  GlobeIcon,
  PhoneIcon,
  ReactIcon,
  SparklesIcon,
  WrenchIcon,
} from '@/lib/shared/Icons';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

import { useLocale } from '@/locale/LocaleContext';
import type { ServiceEntry } from '@/locale/types';

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

const serviceIconMap: Record<string, IconType> = {
  Globe: GlobeIcon,
  React: ReactIcon,
  Sparkles: SparklesIcon,
  Cube: CubeIcon,
  Phone: PhoneIcon,
  Wrench: WrenchIcon,
};

const MAX_TILT = 8;

function useTilt(prefersReducedMotion: boolean) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(cardRef.current, {
        rotateX: -y * MAX_TILT,
        rotateY: x * MAX_TILT,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },
    [prefersReducedMotion],
  );

  const onMouseEnter = useCallback(() => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
  }, [prefersReducedMotion]);

  const onMouseLeave = useCallback(() => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    });
  }, [prefersReducedMotion]);

  return { cardRef, onMouseMove, onMouseEnter, onMouseLeave };
}

function ServiceCard({
  service,
  index,
  prefersReducedMotion,
}: {
  service: ServiceEntry;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const Icon = serviceIconMap[service.icon];
  const isOdd = index % 2 === 1;
  const { cardRef, onMouseMove, onMouseEnter, onMouseLeave } =
    useTilt(prefersReducedMotion);

  return (
    <div style={{ perspective: 600 }}>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className='group relative flex h-full flex-col overflow-hidden bg-primary-blue will-change-transform'
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Accent top bar */}
        <div
          className={`h-[3px] w-full ${isOdd ? 'bg-orange' : 'bg-raspberry'}`}
        />

        <div className='relative flex flex-1 flex-col gap-3 p-6 sm:p-7'>
          {/* Faded number */}
          <span
            className={`pointer-events-none absolute -right-1 -top-3 select-none font-unica text-[5.5rem] leading-none font-extralight tracking-wider sm:text-[7rem] ${isOdd ? 'text-orange/[0.04]' : 'text-raspberry/[0.04]'}`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <h4 className='text-[20px] font-semibold text-white uppercase tracking-[0px] transition-[letter-spacing] duration-300 group-hover:tracking-[1px]'>
            {service.title}
          </h4>

          {/* Tagline */}
          <p
            className={`text-[13px] -mt-4 font-medium tracking-wide brightness-150 ${isOdd ? 'text-orange' : 'text-raspberry'}`}
          >
            {service.tagline}
          </p>

          {/* Description */}
          <p className='flex-1 text-[14px] leading-relaxed text-white/80'>
            {service.description}
          </p>
        </div>

        {/* Watermark icon */}
        {Icon && (
          <div
            className='pointer-events-none absolute -bottom-0 -right-0 h-[150px] w-[150px]'
            aria-hidden='true'
          >
            <Icon
              className={`h-full w-full ${isOdd ? 'text-orange/[0.25]' : 'text-raspberry/[0.25]'}`}
            />
          </div>
        )}

        {/* Hover glow */}
        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${isOdd ? 'bg-gradient-to-b from-orange/[0.03] to-transparent' : 'bg-gradient-to-b from-raspberry/[0.03] to-transparent'}`}
        />
      </div>
    </div>
  );
}

export default function Services(): React.JSX.Element {
  const { t } = useLocale();
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useScrollTriggers(() => {
    if (!gridRef.current || window.innerWidth < BREAKPOINTS.md) return [];

    const cards = gsap.utils.toArray<Element>('.service-card', gridRef.current);
    if (!cards.length) return [];

    gsap.set(cards, { opacity: 0, y: 30 });
    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return tween.scrollTrigger ? [tween.scrollTrigger] : [];
  }, []);

  return (
    <section
      id='services'
      className='font-grotesk relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-white py-[100px] md:py-[160px]'
    >
      <h3 className='font-grotesk text-primary-blue py-2 text-xl font-normal leading-3 tracking-[10px] xl:absolute xl:left-[80px] xl:top-[60px] xl:origin-top-left xl:rotate-90 xl:py-0'>
        {t.servicesSectionTitle}
      </h3>

      <div
        ref={gridRef}
        className='service-grid mx-auto grid w-full max-w-[1200px] auto-rows-fr grid-cols-1 gap-4 px-6 sm:gap-5 md:grid-cols-2 xl:grid-cols-3'
      >
        {t.services.map((service, i) => (
          <div key={service.title} className='service-card transition-[opacity,filter] duration-300'>
            <ServiceCard
              service={service}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
