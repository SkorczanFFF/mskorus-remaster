import React, { useRef } from 'react';

import { GithubIcon } from '@/lib/shared/Icons';
import { usePortfolioScroll } from '@/hooks/usePortfolioScroll';

import { useLocale } from '@/locale/LocaleContext';

import PortfolioCard from './Partials/PortfolioCard';
import PortfolioProjectItem from './Partials/PortfolioProjectItem';

export default function Portfolio(): React.JSX.Element {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  usePortfolioScroll(sectionRef, trackRef);

  return (
    <section
      ref={sectionRef}
      id='portfolio'
      aria-label='Portfolio projects'
      className='font-grotesk bg-primary-blue relative w-full overflow-hidden md:h-screen'
    >
      {/* Section title — rotated on desktop, matching Services/Experience */}
      <h2 className='font-grotesk z-10 py-2 text-xl font-normal leading-3 tracking-[10px] text-white xl:absolute xl:origin-top-left xl:rotate-90 xl:left-[95px] xl:top-[60px] xl:p-4 w-full backdrop-blur-[10px]'>
        {t.portfolioTitle}
      </h2>

      {/* Horizontal scroll track (desktop) / vertical stack (mobile) */}
      <div
        ref={trackRef}
        role='list'
        className='flex h-auto w-full flex-col text-white will-change-transform md:h-full md:flex-row md:flex-nowrap'
      >
        {/* Project panels */}
        {t.projects.map((project, index) => (
          <div
            key={project.id}
            role='listitem'
            className={`project-panel mobile-fade flex w-full shrink-0 items-center justify-center px-5 py-10 md:w-[1150px] md:px-[125px] md:py-0 ${index === 0 ? 'md:ml-[calc(50vw-575px)]' : ''}`}
          >
            <PortfolioProjectItem project={project} />
          </div>
        ))}

        {/* Non-web outro panel */}
        <div className='project-panel mobile-fade flex w-full shrink-0 flex-col items-center justify-center gap-10 px-8 py-16 md:w-[1150px] md:px-[125px] md:py-0'>
          <div className='flex w-full max-w-[900px] flex-col gap-5 xl:flex-row'>
            <div className='flex min-w-[220px] max-w-[220px] flex-col justify-center gap-2 border-r-2 border-orange-dark bg-deep-blue p-5 shadow-xl md:p-8 h-[140px]'>
              <h4 className='text-3xl font-unica leading-5 md:text-3xl md:leading-8'>
                <div className='text-end text-raspberry'>
                  {t.portfolioNonWeb}
                </div>
                <div className='text-center text-[#b2b2b2]'>
                  {t.portfolioRelated}
                </div>
                <div className='text-end text-[#b2b2b2]'>
                  {t.portfolioCorner}
                </div>
              </h4>
            </div>
            <div className='flex flex-col gap-5 xl:flex-row'>
              {t.nonWebProjects.map((nwp) => (
                <PortfolioCard
                  key={nwp.title}
                  title={nwp.title}
                  tech={nwp.tech}
                  description={
                    nwp.description.includes('\n') ? (
                      <p>
                        {nwp.description.split('\n').map((part, pi) => (
                          <React.Fragment key={pi}>
                            {pi > 0 && <br />}
                            {part}
                          </React.Fragment>
                        ))}
                      </p>
                    ) : (
                      nwp.description
                    )
                  }
                  links={nwp.links.map((link) => ({
                    ...link,
                    icon: <GithubIcon className='text-2xl' />,
                  }))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Spacer — ensures last panel can scroll to center */}
        <div className='hidden shrink-0 md:block md:w-[calc(50vw-575px)]' />
      </div>
    </section>
  );
}
