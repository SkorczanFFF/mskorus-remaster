import React from 'react';

import { GithubIcon, GlobalIcon } from '@/lib/shared/Icons';

import { useLocale } from '@/locale/LocaleContext';
import type { ProjectEntry } from '@/locale/types';

interface PortfolioProjectItemProps {
  project: ProjectEntry;
}

function ProjectLinks({ project }: { project: ProjectEntry }) {
  const { t } = useLocale();
  if (!project.git && !project.live) return null;

  return (
    <div className='flex gap-5'>
      {project.git && (
        <a
          href={project.git}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 text-orange-dark transition-colors duration-150 hover:text-white'
        >
          <GithubIcon className='text-xl' />
          <span className='text-sm'>{t.portfolioRepo}</span>
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 text-orange-dark transition-colors duration-150 hover:text-white'
        >
          <GlobalIcon className='text-xl' />
          <span className='text-sm'>
            {project.liveLabel ?? t.portfolioLiveDemo}
          </span>
        </a>
      )}
    </div>
  );
}

export default function PortfolioProjectItem({
  project,
}: PortfolioProjectItemProps): React.JSX.Element {
  return (
    <div className='w-full max-w-[900px]'>
      {/* === Desktop layout === */}
      <div className='hidden md:block'>
        {/* Title — above image */}
        <a
          href={project.git || undefined}
          target='_blank'
          rel='noopener noreferrer'
          className='project-title inline-block'
        >
          <h4 className='font-unica gradient inline-block bg-gradient-to-r from-raspberry to-orange-dark px-4 py-1 text-3xl font-normal transition-colors duration-150 hover:text-primary-blue lg:text-4xl'>
            {project.title}
          </h4>
        </a>

        {/* Image with description overlay at bottom */}
        <div className='relative overflow-hidden border-2 border-orange'>
          <img
            src={project.pic}
            alt={project.title}
            loading='lazy'
            className='block w-full'
          />

          {/* Description overlay — bottom of image, GSAP controlled */}
          <div className='project-overlay absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-blue/95 via-primary-blue/80 to-transparent px-4 pb-2 pt-4 opacity-0'>
            <p className='text-sm font-extralight leading-relaxed text-white/90'>
              {project.description}
            </p>
          </div>
        </div>

        {/* Under image: technos (left) + links (right) */}
        <div className='project-meta mt-2 flex items-center justify-between opacity-0'>
          <p className='text-sm tracking-wide text-gray-400'>
            {project.technos}
          </p>
          <ProjectLinks project={project} />
        </div>
      </div>

      {/* === Mobile layout === */}
      <div className='md:hidden'>
        <div className='overflow-hidden border-2 border-orange'>
          <img
            src={project.pic}
            alt={project.title}
            loading='lazy'
            className='block w-full'
          />
        </div>
        <div className='mt-4 flex flex-col gap-1 px-1'>
          <a
            href={project.git || undefined}
            target='_blank'
            rel='noopener noreferrer'
          >
            <h4 className='font-unica gradient mb-3 block bg-gradient-to-r from-raspberry to-orange-dark px-4 py-1 text-2xl font-normal transition-colors duration-150 hover:text-primary-blue'>
              {project.title}
            </h4>
          </a>
          <p className='mb-2 text-sm tracking-wide text-gray-400'>
            {project.technos}
          </p>
          <p className='mb-4 text-sm font-extralight leading-relaxed'>
            {project.description}
          </p>
          <ProjectLinks project={project} />
        </div>
      </div>
    </div>
  );
}
