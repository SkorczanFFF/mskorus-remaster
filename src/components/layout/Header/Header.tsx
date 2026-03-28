import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ScrollTrigger } from '@/lib/gsap';

import Desktop from '@/components/layout/Header/Partials/Desktop';
import Logo from '@/components/layout/Header/Partials/Logo';
import Mobile from '@/components/layout/Header/Partials/Mobile';

import { useLocale } from '@/locale/LocaleContext';

function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'pl' : 'en')}
      className={`font-unica flex items-center gap-1 text-xl md:text-md tracking-wider text-white transition-colors ${className ?? ''}`}
    >
      <span
        className={`duration-200 ${locale === 'en' ? 'font-semibold text-white' : 'text-orange'}`}
        style={{
          textShadow: '0 0 2px rgba(0,26,37,0.8), 0 0 10px rgba(0,26,37,0.5)',
        }}
      >
        EN
      </span>
      <span className='text-white/70'>|</span>
      <span
        className={`duration-200 ${locale === 'pl' ? 'font-semibold text-white' : 'text-orange'}`}
        style={{
          textShadow: '0 0 2px rgba(0,26,37,0.8), 0 0 10px rgba(0,26,37,0.5)',
        }}
      >
        PL
      </span>
    </button>
  );
}

const SECTION_IDS = [
  'home',
  'services',
  'experience',
  'technologies',
  'portfolio',
  'contact',
];

function useActiveSection() {
  const router = useRouter();
  const [active, setActive] = useState<string>('home');

  const isResumePage = router.pathname === '/resume';

  useEffect(() => {
    if (isResumePage) {
      setActive('resume');
      return;
    }

    const triggers: ScrollTrigger[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const isContact = id === 'contact';

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          // Contact: activate sooner (when its top hits 80% of viewport)
          // and stay active all the way to page bottom
          start: isContact ? 'top 80%' : 'top center',
          end: isContact ? 'bottom bottom' : 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
        }),
      );
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [isResumePage]);

  return active;
}

export default function Header(): React.JSX.Element {
  const { t } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const activeSection = useActiveSection();

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const links = [
    { href: '/#home', label: t.navHome },
    { href: '/#services', label: t.navServices },
    { href: '/#experience', label: t.navExperience },
    { href: '/#technologies', label: t.navTechnologies },
    { href: '/#portfolio', label: t.navPortfolio },
    { href: '/#contact', label: t.navContact },
    { href: '/resume', label: t.navResume },
  ];

  useEffect(() => {
    document.body.style.overflowY = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isMenuOpen]);

  // Focus management: move focus into menu on open, return to hamburger on close
  useEffect(() => {
    if (isMenuOpen) {
      wasOpen.current = true;
      const timer = setTimeout(() => {
        const firstLink = menuRef.current?.querySelector<HTMLElement>('a');
        firstLink?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else if (wasOpen.current) {
      wasOpen.current = false;
      hamburgerRef.current?.focus();
    }
  }, [isMenuOpen]);

  // Focus trap + Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleClick = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <header
        className={`font-grotesk sticky top-2 z-50 flex h-[46px] items-center justify-between opacity-95 backdrop-blur-[10px] m-2 border-2 border-[#80183433] rounded-[3px] ${
          isMenuOpen ? 'opacity-0' : 'opacity-95'
        }`}
      >
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='ml-3'>
              <Logo />
            </div>
            <LocaleToggle className='hidden lg:flex' />
          </div>
          <div className='flex h-14 items-center justify-between gap-3'>
            <Mobile
              ref={hamburgerRef}
              isMenuOpen={isMenuOpen}
              handleClick={handleClick}
            />
            <Desktop links={links} activeSection={activeSection} />
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        role='dialog'
        aria-modal={isMenuOpen}
        aria-label={t.navMenuLabel}
        inert={!isMenuOpen || undefined}
        className={`bg-[#00000024] fixed inset-0 z-40 flex min-h-screen w-full transform items-center justify-center border-b border-primary-blue backdrop-blur-[10px] transition-transform duration-300 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav
          aria-label={t.navMenuLabel}
          className='flex h-full w-full flex-col items-center justify-center'
        >
          <ul className='flex flex-col items-center space-y-8'>
            {links.map(({ href, label }) => {
              const linkId = href.startsWith('/#')
                ? href.slice(2)
                : href.slice(1);
              const isActive = linkId === activeSection;
              return (
                <li key={`${href}${label}`} className='text-center'>
                  <Link
                    href={href}
                    scroll={false}
                    className={`text-3xl font-light uppercase tracking-widest transition-all duration-300 hover:tracking-[0.2em] hover:drop-shadow-[0_5px_5px_#972b1a] ${isActive ? 'text-real-white drop-shadow-[0_5px_5px_#001A25] tracking-[0.2em]' : 'text-real-white/60 drop-shadow-[0_2px_2px_#001a25]'}`}
                    onClick={handleClick}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className='mt-10'>
            <LocaleToggle className='text-xl' />
          </div>
        </nav>
      </div>
    </>
  );
}
