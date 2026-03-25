import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

import { CallIcon, GithubIcon, GlobeIcon, LinkedinIcon, MailIcon, PdfIcon } from '@/lib/shared/Icons';

import { useLocale } from '@/locale/LocaleContext';

const CURRENT_YEAR = new Date().getFullYear();

const networkLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mskorus/',
    icon: LinkedinIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/SkorczanFFF',
    icon: GithubIcon,
  },
] as const;

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%';

function randomString(text: string) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result +=
      text[i] === ' '
        ? ' '
        : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }
  return result;
}

function scrambleReveal(el: HTMLElement, text: string, duration: number) {
  const len = text.length;
  el.textContent = randomString(text);
  const proxy = { progress: 0 };
  return gsap.to(proxy, {
    progress: 1,
    duration,
    ease: 'power1.in',
    onUpdate() {
      const locked = Math.floor(proxy.progress * len);
      let result = text.substring(0, locked);
      for (let i = locked; i < len; i++) {
        result +=
          text[i] === ' '
            ? ' '
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = result;
    },
    onComplete() {
      el.textContent = text;
    },
  });
}

export default function Footer(): React.JSX.Element {
  const { t } = useLocale();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const finalText = t.footerHeading;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        tlRef.current?.kill();
        const tl = gsap.timeline();
        tl.add(scrambleReveal(el, finalText, 1.5));
        tlRef.current = tl;
      },
      onEnterBack: () => {
        tlRef.current?.kill();
        const tl = gsap.timeline();
        tl.add(scrambleReveal(el, finalText, 1.5));
        tlRef.current = tl;
      },
    });

    return () => {
      trigger.kill();
      tlRef.current?.kill();
    };
  }, [t.footerHeading]);

  return (
    <footer id='contact' className='font-grotesk w-full overflow-hidden'>
      {/* Gradient bar + arrows */}
      <div className='relative flex w-full flex-col items-center top-6'>
        <div className='gradient h-[8px] w-full' />
        <div className='arrow-down gradient' />
        <div className='arrow-down blue absolute -top-[2px]' />
      </div>

      {/* Main footer content */}
      <div className='w-full bg-[#f9f9f9] pt-4'>
        <div className='mx-auto flex max-w-7xl flex-col gap-16 px-8 py-24 md:flex-row md:justify-between md:gap-24 md:px-12'>
          {/* Narrative column */}
          <div className='md:w-3/5'>
            <h2
              ref={headingRef}
              className='font-unica mb-12 text-6xl font-extrabold tracking-tighter text-primary-blue md:text-8xl lg:text-8xl -mt-2 break-words'
            >
              {t.footerHeading}
            </h2>

            <p className='mb-8 max-w-md text-lg font-light leading-tight text-primary-blue/60 md:text-xl'>
              {t.footerNarrative}
            </p>

            <div className='flex flex-col gap-2'>
              <span className='text-[0.65rem] uppercase tracking-[0.2em] text-primary-blue/40'>
                {t.footerDirectLabel}
              </span>
              <a
                href={`mailto:${t.contactEmail}`}
                className='group flex items-center gap-2 text-lg font-semibold text-primary-blue transition-all duration-200 hover:translate-x-1 hover:text-raspberry'
              >
                {t.contactEmail}
                <MailIcon className='text-base opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
              </a>
              <a
                href={`tel:${t.contactPhone.replace(/\s/g, '')}`}
                className='group flex items-center gap-2 text-lg font-semibold text-primary-blue transition-all duration-200 hover:translate-x-1 hover:text-raspberry'
              >
                {t.contactPhone}
                <CallIcon className='text-base opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
              </a>
            </div>
          </div>

          {/* Identity & links column */}
          <div className='flex flex-col items-start justify-between text-left md:w-1/3 md:items-end md:text-right'>
            <div className='mb-12 md:mb-0'>
              <div className='mb-8'>
                <h3 className='text-2xl font-extrabold tracking-tighter'>
                  <span className='text-orange'>SKO</span>
                  <span className='text-raspberry'>FT</span>
                  <span className='text-primary-blue'>ware</span>
                  <span className='text-primary-blue'> Maciej Skorus</span>
                </h3>
                <p className='mt-1 text-sm font-medium tracking-wide text-primary-blue/50'>
                  {t.contactCompanyInfo}
                </p>
              </div>

              <div className='flex flex-col gap-4 md:items-end'>
                <span className='text-[0.65rem] uppercase tracking-[0.2em] text-primary-blue/40'>
                  {t.footerNetworkLabel}
                </span>
                <nav className='flex flex-col gap-3 md:items-end'>
                  {networkLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 font-bold text-primary-blue/50 transition-all duration-200 hover:translate-x-1 hover:text-raspberry md:flex-row-reverse'
                    >
                      <Icon className='text-base' />
                      <span>{label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className='flex flex-col gap-4 md:items-end mt-6'>
                <span className='text-[0.65rem] uppercase tracking-[0.2em] text-primary-blue/40'>
                  {t.footerResume}
                </span>
                <nav className='flex flex-col gap-3 md:items-end'>
                  <Link
                    href='/resume'
                    className='flex items-center gap-2 font-bold text-primary-blue/50 transition-all duration-200 hover:translate-x-1 hover:text-raspberry md:flex-row-reverse'
                  >
                    <GlobeIcon className='text-base' />
                    <span>{t.footerResumeOnline}</span>
                  </Link>
                  <Link
                    href='/resume?download=1'
                    className='flex items-center gap-2 font-bold text-primary-blue/50 transition-all duration-200 hover:translate-x-1 hover:text-raspberry md:flex-row-reverse'
                  >
                    <PdfIcon className='text-base' />
                    <span>{t.footerResumeDownload}</span>
                  </Link>
                </nav>
              </div>
            </div>

            <div className='mt-auto'>
              <p className='mb-2 text-xs uppercase tracking-widest text-primary-blue/40'>
                {t.contactLocation} · {t.contactInvoiceInfo}
              </p>
              <p className='text-[10px] uppercase tracking-widest text-primary-blue/30'>
                {t.footerCopyright.replace('{year}', String(CURRENT_YEAR))}
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className='gradient h-1 w-full' />
    </footer>
  );
}
