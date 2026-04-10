import React, { useCallback, useRef } from 'react';

import { BREAKPOINTS } from '@/lib/breakpoints';
import { gsap, ScrollTrigger } from '@/lib/gsap';
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
        className='card-inner group relative flex h-full flex-col bg-primary-blue will-change-transform'
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Accent top bar */}
        <div
          className={`h-[3px] w-full ${isOdd ? 'bg-orange' : 'bg-raspberry'}`}
        />

        <div
          className='relative flex flex-1 flex-col gap-3 p-6 sm:p-7'
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Faded number */}
          <span
            className={`pointer-events-none absolute -right-1 -top-3 select-none font-unica text-[5.5rem] leading-none font-extralight tracking-wider sm:text-[7rem] ${isOdd ? 'text-orange/[0.04]' : 'text-raspberry/[0.04]'}`}
            style={{ transform: 'translateZ(10px)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <h4
            className='text-[20px] font-semibold text-white uppercase tracking-[0px] transition-[letter-spacing] duration-300 group-hover:tracking-[1px]'
            style={{ transform: 'translateZ(40px)' }}
          >
            {service.title}
          </h4>

          {/* Tagline */}
          <p
            className={`text-[13px] -mt-4 font-medium tracking-wide brightness-150 ${isOdd ? 'text-orange' : 'text-raspberry'}`}
            style={{ transform: 'translateZ(30px)' }}
          >
            {service.tagline}
          </p>

          {/* Description */}
          <p
            className='flex-1 text-[14px] leading-relaxed text-white/80'
            style={{ transform: 'translateZ(20px)' }}
          >
            {service.description}
          </p>
        </div>

        {/* Watermark icon */}
        {Icon && (
          <div
            className='pointer-events-none absolute -bottom-0 -right-0 h-[150px] w-[150px]'
            aria-hidden='true'
            style={{ transform: 'translateZ(5px)' }}
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
    if (!gridRef.current) return [];

    const cards = gsap.utils.toArray<Element>('.service-card', gridRef.current);
    if (!cards.length) return [];

    const isDesktop3Col = window.innerWidth >= BREAKPOINTS.xl;
    const OFFSET = 24;
    const triggers: ScrollTrigger[] = [];

    // Entrance animation — even from left, odd from right
    cards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -80 : 80;
      const endY = isDesktop3Col && i % 3 === 1 ? OFFSET : 0;

      gsap.set(card, { opacity: 0, x: fromX, y: endY });

      const tween = gsap.to(card, {
        opacity: 1,
        x: 0,
        y: endY,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    // Hover simulation on scroll — 1-col and 2-col layouts
    if (!isDesktop3Col) {
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>('.card-inner');
        const title = card.querySelector<HTMLElement>('h4');
        const glow = card.querySelector<HTMLElement>(
          '.card-inner > .pointer-events-none:last-child',
        );

        const activate = () => {
          if (inner)
            gsap.to(inner, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
          if (title)
            gsap.to(title, {
              letterSpacing: '1px',
              duration: 0.3,
              ease: 'power2.out',
            });
          if (glow)
            gsap.to(glow, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        };
        const deactivate = () => {
          if (inner)
            gsap.to(inner, { scale: 1, duration: 0.3, ease: 'power2.out' });
          if (title)
            gsap.to(title, {
              letterSpacing: '0px',
              duration: 0.3,
              ease: 'power2.out',
            });
          if (glow)
            gsap.to(glow, { opacity: 0, duration: 0.4, ease: 'power2.out' });
        };

        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: activate,
            onLeave: deactivate,
            onEnterBack: activate,
            onLeaveBack: deactivate,
          }),
        );
      });
    }

    return triggers;
  }, []);

  return (
    <section
      id='services'
      className='font-grotesk relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-white pt-[100px] lg:pb-[120px] md:pt-[160px] [contain:paint]'
    >
      <h3 className='font-grotesk text-primary-blue py-2 text-xl font-normal leading-3 tracking-[10px] xl:absolute xl:left-[80px] xl:top-[60px] xl:origin-top-left xl:rotate-90 xl:py-0 pb-12'>
        {t.servicesSectionTitle}
      </h3>

      <div
        ref={gridRef}
        className='service-grid mx-auto grid max-w-[1200px] gap-[60px] md:gap-y-0 grid-cols-1 md:gap-x-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-12 max-w-[800px]'
      >
        {t.services.map((service, i) => (
          <div
            key={service.title}
            className={`service-card mx-auto max-w-[370px] md:max-h-[182px] w-full transition-[opacity,filter] duration-300 ${i % 2 === 1 ? 'md:mt-[60px] xl:mt-0' : ''}`}
          >
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
