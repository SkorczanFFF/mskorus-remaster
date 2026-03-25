import React from 'react';

import { GithubIcon, GlobalIcon } from '@/lib/shared/Icons';

import { useLocale } from '@/locale/LocaleContext';
import type { ProjectEntry } from '@/locale/types';

interface PortfolioProjectItemProps {
  project: ProjectEntry;
  index: number;
  imageRef: (el: HTMLImageElement | null) => void;
}

export default function PortfolioProjectItem({
  project,
  index,
  imageRef,
}: PortfolioProjectItemProps): React.JSX.Element {
  const { t } = useLocale();
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col drop-shadow-[0_5px_5px_#80183430] xl:flex-row ${isEven ? '' : 'xl:flex-row-reverse'}`}
    >
      <a
        href={project.live}
        rel='noopener noreferrer'
        target='_blank'
        className='xl:w-1/2'
      >
        <img
          ref={imageRef}
          src={project.pic}
          alt={project.title}
          className={`border-orange w-full cursor-pointer border-2 duration-1000 hover:scale-[101%] hover:brightness-110 hover:saturate-150 ${isEven ? 'perspective-right' : 'perspective-left'}`}
        />
      </a>
      <div
        className={`w-full flex-col items-start xl:w-1/2 ${isEven ? 'perspective-left' : 'perspective-right'}`}
      >
        <a href={project.git} target='_blank' rel='noopener noreferrer'>
          <p
            className={`font-unica hover:text-primary-blue my-3 w-auto cursor-pointer bg-gradient-to-r p-2 py-1 text-2xl font-normal duration-75 md:text-3xl lg:text-4xl ${isEven ? 'from-raspberry to-orange-dark' : 'to-raspberry from-orange-dark text-end'}`}
          >
            {project.title}
          </p>
        </a>
        <p className={`mx-3 mb-2 text-gray-400 ${isEven ? '' : 'text-end'}`}>
          {project.technos}
        </p>
        <p
          className={`mx-3 font-extralight leading-[22px] ${isEven ? '' : 'text-end'}`}
        >
          {project.description}
        </p>
        {project.git !== '' && project.live !== '' && (
          <div
            className={`mx-5 mt-5 flex ${!isEven ? 'justify-end' : ''} gap-5`}
          >
            <div className='text-orange-dark flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
              <GithubIcon className='text-2xl' />
              <a href={project.git} target='_blank' rel='noopener noreferrer'>
                {t.portfolioRepo}
              </a>
            </div>
            <div className='text-orange-dark flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
              <GlobalIcon className='text-2xl' />
              <a href={project.live} target='_blank' rel='noopener noreferrer'>
                {project.liveLabel ?? t.portfolioLiveDemo}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
