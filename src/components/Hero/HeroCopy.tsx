import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import { scrambleReveal } from '@/lib/scrambleReveal';

import { useLocale } from '@/locale/LocaleContext';

/**
 * The offer layer. Rendered on the server so the headline and calls to action
 * are in the first byte of HTML — crawlers and slow connections must never
 * depend on the WebGL scene loading.
 */
export default function HeroCopy(): React.JSX.Element {
  const { t } = useLocale();
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  // The scramble is a post-hydration flourish on the brand mark only. The
  // headline is never scrambled — it would put garbage text in the DOM.
  useEffect(() => {
    const el = eyebrowRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tween = scrambleReveal(el, t.heroEyebrow, 1.2);
    return () => {
      tween.kill();
      el.textContent = t.heroEyebrow;
    };
  }, [t.heroEyebrow]);

  return (
    <div className='pointer-events-none relative z-20 flex flex-1 items-center'>
      {/* Deliberately left-aligned, not centered like the rest of the site: the
          hero is a split layout (copy left, portrait right), so a centered
          container would strand the copy in a wide dead gap on large screens. */}
      {/* min-[2000px] tier scales the block up on 1440p+ monitors only; the
          1920px (1080p) layout stays exactly as-is (2xl caps at 1536px). */}
      <div className='w-full px-6 md:px-10 lg:px-16 xl:pl-20 2xl:pl-28 min-[2000px]:pl-40'>
        <div className='max-w-[680px] min-[2000px]:max-w-[900px]'>
          <span
            ref={eyebrowRef}
            className='gradient bg-linear-to-r from-raspberry to-orange-dark inline-block px-4 py-1 text-xs font-medium tracking-[0.35em] text-white sm:text-sm min-[2000px]:text-base'
          >
            {t.heroEyebrow}
          </span>

          <h1 className='font-unica mt-6 text-4xl font-extrabold leading-[0.95] tracking-tighter drop-shadow-[0_2px_10px_#000000a0] sm:text-5xl lg:text-6xl xl:text-7xl min-[2000px]:text-8xl'>
            <span className='block text-white/70'>{t.heroH1Line1}</span>
            <span className='block text-white'>{t.heroH1Line2}</span>
          </h1>

          <p className='mt-6 max-w-[560px] text-[15px] font-light leading-relaxed text-white/80 drop-shadow-[0_1px_6px_#000000a0] md:text-[17px] min-[2000px]:max-w-[660px] min-[2000px]:text-[20px]'>
            {t.heroSubtitle}
          </p>

          <div className='pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Link
              href='/#contact'
              scroll={false}
              className='bg-raspberry hover:bg-orange focus-visible:outline-orange rounded-[2px] px-6 py-3 text-center text-sm font-medium uppercase tracking-widest min-[2000px]:text-base text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2'
            >
              {t.heroCtaPrimary}
            </Link>
            <Link
              href='/#portfolio'
              scroll={false}
              className='focus-visible:outline-orange rounded-[2px] border border-white/30 px-6 py-3 text-center text-sm font-medium uppercase tracking-widest min-[2000px]:text-base text-white/90 backdrop-blur-[6px] transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2'
            >
              {t.heroCtaSecondary}
            </Link>
          </div>

          {/* TODO(G4): prepend a verified project count once confirmed. */}
          <ul className='mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-[11px] min-[2000px]:text-[13px]'>
            {t.heroTrust.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && (
                  <li aria-hidden='true' className='text-white/25'>
                    ·
                  </li>
                )}
                <li>{item}</li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
