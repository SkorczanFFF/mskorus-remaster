import React, { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import {
  DockerIcon,
  GlobeIcon,
  ReactIcon,
} from '@/lib/shared/Icons';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

import { useLocale } from '@/locale/LocaleContext';
import type { ServiceEntry } from '@/locale/types';

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

const serviceIconMap: Record<string, IconType> = {
  Globe: GlobeIcon,
  React: ReactIcon,
  Extension: DockerIcon,
  Maintenance: DockerIcon,
};

function ServiceCard({ service }: { service: ServiceEntry }) {
  const Icon = serviceIconMap[service.icon];
  return (
    <div className='border border-primary-blue/10 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300'>
      {Icon && <Icon className='text-4xl text-raspberry' />}
      <h4 className='text-xl font-medium text-primary-blue tracking-wider'>
        {service.title}
      </h4>
      <p className='text-primary-blue/80 leading-relaxed text-[15px]'>
        {service.description}
      </p>
    </div>
  );
}

export default function Services(): React.JSX.Element {
  const { t } = useLocale();
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollTriggers(() => {
    if (!gridRef.current || window.innerWidth < 768) return [];

    const cards = gsap.utils.toArray<Element>(
      '.service-card',
      gridRef.current,
    );
    if (!cards.length) return [];

    gsap.set(cards, { opacity: 0, y: 40 });
    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
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
      <h3 className='font-grotesk text-primary-blue -left-8 top-[160px] py-2 text-xl font-medium leading-3 tracking-[10px] md:absolute md:rotate-90 md:py-0'>
        {t.servicesSectionTitle}
      </h3>

      <div
        ref={gridRef}
        className='mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-6 px-6 sm:grid-cols-2'
      >
        {t.services.map((service) => (
          <div key={service.title} className='service-card'>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}
