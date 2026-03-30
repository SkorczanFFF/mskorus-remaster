import { useLayoutEffect } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';

export function usePortfolioScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>,
) {
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
        const meta = panel.querySelector<HTMLElement>('.project-meta');

        // Set initial hidden states once — gsap.set is the source of truth
        gsap.set(panel, { opacity: 0.2, x: 150 });
        if (title) gsap.set(title, { x: 300 });
        if (overlay) gsap.set(overlay, { opacity: 0, y: 50 });
        if (meta) gsap.set(meta, { opacity: 0, y: -30 });

        // Panel enter/exit
        gsap.fromTo(
          panel,
          { opacity: 0.2, x: 150 },
          {
            opacity: 1,
            x: 0,
            immediateRender: false,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 90%',
              end: 'left 40%',
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          panel,
          { opacity: 1, x: 0 },
          {
            opacity: 0.2,
            x: -150,
            immediateRender: false,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'right 60%',
              end: 'right 10%',
              scrub: true,
            },
          },
        );

        if (title) {
          gsap.fromTo(
            title,
            { x: 300 },
            {
              x: 0,
              immediateRender: false,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left 95%',
                end: 'left 30%',
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            title,
            { x: 0 },
            {
              x: -300,
              immediateRender: false,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'right 60%',
                end: 'right 10%',
                scrub: true,
              },
            },
          );
        }

        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              immediateRender: false,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left 60%',
                end: 'left 30%',
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            overlay,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: 50,
              immediateRender: false,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'right 60%',
                end: 'right 10%',
                scrub: true,
              },
            },
          );
        }

        if (meta) {
          gsap.fromTo(
            meta,
            { opacity: 0, y: -30 },
            {
              opacity: 1,
              y: 0,
              immediateRender: false,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left 55%',
                end: 'left 25%',
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            meta,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -30,
              immediateRender: false,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'right 60%',
                end: 'right 10%',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
