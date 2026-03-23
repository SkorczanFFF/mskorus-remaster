import React, { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { GithubIcon, LinkedinIcon, MailIcon } from '@/lib/shared/Icons';
import { useScrollTriggers } from '@/hooks/useScrollTriggers';

const contactLinks = [
  {
    label: 'LINKEDIN',
    href: 'https://www.linkedin.com/in/mskorus/',
    icon: LinkedinIcon,
  },
  { label: 'EMAIL', href: 'mailto:skorusmaciej94@gmail.com', icon: MailIcon },
  { label: 'GITHUB', href: 'https://github.com/SkorczanFFF', icon: GithubIcon },
] as const;

const WORD_DURATION = 1.2;
const WORD_SCALE = 1.2;
const FULL_TEXT_SCALE_END = 1.2;

export default function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  const getInTouchWrapRef = useRef<HTMLParagraphElement>(null);
  const getRef = useRef<HTMLSpanElement>(null);
  const inRef = useRef<HTMLSpanElement>(null);
  const touchRef = useRef<HTMLSpanElement>(null);
  const fullTextRef = useRef<HTMLSpanElement>(null);

  useScrollTriggers(() => {
    const wrap = getInTouchWrapRef.current;
    const getEl = getRef.current;
    const inEl = inRef.current;
    const touchEl = touchRef.current;
    const fullEl = fullTextRef.current;
    if (!wrap || !getEl || !inEl || !touchEl || !fullEl) return [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top 85%',
        once: true,
        toggleActions: 'play none none none',
      },
    });

    tl.set([getEl, inEl, touchEl], { opacity: 0, scale: 1 })
      .set(fullEl, { opacity: 0, scale: 1.5 })
      .to(getEl, { opacity: 1, duration: 0.01 })
      .to(getEl, { scale: WORD_SCALE, duration: WORD_DURATION, ease: 'none' })
      .set(getEl, { opacity: 0 })
      .to(inEl, { opacity: 1, duration: 0.01 })
      .to(inEl, { scale: WORD_SCALE, duration: WORD_DURATION, ease: 'none' })
      .set(inEl, { opacity: 0 })
      .to(touchEl, { opacity: 1, duration: 0.01 })
      .to(touchEl, { scale: WORD_SCALE, duration: WORD_DURATION, ease: 'none' })
      .set(touchEl, { opacity: 0 })
      .to(fullEl, { opacity: 1, scale: FULL_TEXT_SCALE_END, duration: 0.3 });

    return tl.scrollTrigger ? [tl.scrollTrigger] : [];
  }, []);

  return (
    <footer
      id='contact'
      className='font-grotesk bg-primary-blue flex min-h-[20vh] w-full flex-col items-center overflow-hidden'
    >
      <div className='absolute -mt-[32px] flex w-full flex-col items-center'>
        <p className='font-grotesk relative pl-3 w-full min-w-[250px] text-start text-2xl font-normal text-white xl:w-[1200px] xl:px-0 xl:pl-0'>
          <span className='text-raspberry'>M</span>
          <span className='absolute left-[30px] xl:left-[18px] tracking-wider text-white'>
            SKORUS
          </span>
        </p>
        <div className='gradient h-[8px] w-full' />
        <div className='arrow-down orange' />
        <div className='arrow-down blue absolute top-[30px]' />
      </div>
      <div className='flex flex-col w-full items-center justify-center bg-white'>
        <div className='mx-5 flex w-full max-w-[1000px] flex-col gap-5 md:py-10 pb-20 sm:gap-0'>
          <div className='flex items-center justify-center'>
            <p
              ref={getInTouchWrapRef}
              className='relative text-primary-blue text-3xl font-medium tracking-wider my-[60px] mt-[100px] md:mb-10 md:mt-[70px] min-h-[3rem] w-full'
            >
              <span
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                aria-hidden
              >
                <span
                  ref={getRef}
                  className='inline-block origin-center whitespace-nowrap opacity-0'
                >
                  GET
                </span>
              </span>
              <span
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                aria-hidden
              >
                <span
                  ref={inRef}
                  className='inline-block origin-center whitespace-nowrap opacity-0'
                >
                  IN
                </span>
              </span>
              <span
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                aria-hidden
              >
                <span
                  ref={touchRef}
                  className='inline-block origin-center whitespace-nowrap opacity-0'
                >
                  TOUCH
                </span>
              </span>
              <span
                ref={fullTextRef}
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center whitespace-nowrap opacity-0'
                aria-hidden
              >
                GET IN TOUCH
              </span>
            </p>
          </div>
          <div className='flex items-center justify-center gap-0 md:flex-row flex-col md:gap-[60px] space-y-[60px] md:space-y-0 md:py-10'>
            {contactLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='group relative text-primary-blue text-xl rounded-[2px] font-medium tracking-wider w-[200px] text-center py-4 flex items-center justify-center h-[64px] duration-300 hover:border-transparent hover:bg-transparent hover:rounded-[2px] hover:py-0'
              >
                <span className='block transition-opacity duration-300 group-hover:opacity-0'>
                  {label}
                </span>
                <span className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none'>
                  <Icon className='size-12 shrink-0 text-raspberry' />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className='bg-white w-full text-center border-b-4 border-raspberry'>
        <p className='p-1 text-xs tracking-widest text-primary-blue pb-2 '>
          &copy; {currentYear} Maciej Skorus
        </p>
      </div>
    </footer>
  );
}
