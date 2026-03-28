import React from 'react';

import { GithubIcon, GlobeIcon } from '@/lib/shared/Icons';
import { resumeTechList, techIconMap } from '@/lib/shared/techMap';

import type { Dictionary, ProjectEntry } from '@/locale/types';

interface ResumeProjectProps {
  project: ProjectEntry;
  repo: string;
  demo: string;
}

const ResumeProject: React.FC<ResumeProjectProps> = ({
  project,
  repo,
  demo,
}) => (
  <div className='ml-6 mt-6'>
    <p className='text-2xl font-medium tracking-widest'>{project.title}</p>
    <div className='flex flex-col'>
      <div className='text-raspberry ml-2 mr-8 mt-2 flex items-center text-lg tracking-wide'>
        {project.resumeTechnologies ?? project.technos}
      </div>
      <p className='ml-2 mr-8 mt-2 flex items-center text-xl leading-[20px] text-justify'>
        {project.resumeDescription ?? project.description}
      </p>
      <div className='ml-4 mt-2 flex gap-10 text-xl'>
        <a
          className='hover:text-raspberry flex cursor-pointer items-center gap-2 duration-150'
          href={project.git}
          target='_blank'
          rel='noreferrer'
        >
          <GithubIcon className='text-3xl' /> {repo}
        </a>
        <a
          className='hover:text-raspberry flex cursor-pointer items-center gap-2 duration-150'
          href={project.live}
          target='_blank'
          rel='noreferrer'
        >
          <GlobeIcon className='text-2xl' /> {demo}
        </a>
      </div>
    </div>
  </div>
);

export default function ResumeContent({
  t,
  locale,
}: {
  t: Dictionary;
  locale: string;
}) {
  return (
    <div className='flex flex-col'>
      <div className='bg-primary-blue flex h-[90px] w-full items-center text-white'>
        <p className='right-0 mx-auto text-4xl font-normal tracking-[15px]'>
          FRONTEND DEVELOPER
        </p>
      </div>
      <div className='flex'>
        <div className='bg-raspberry h-[1932px]'>
          <div className='arrow-top-left blue' />
        </div>
        <div className='flex h-[1931px] w-[1011px] flex-col bg-white'>
          <div className='mt-[20px]' />
          <div className='flex w-full'>
            <div className='cv-arrow -ml-px' />
            <div className=' -mt-[4px] flex flex-col text-[#20252f]'>
              <p className='text-raspberry ml-4 text-3xl font-medium tracking-[5px]'>
                {t.resumeHeaderExperience}
              </p>
              {t.experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`mx-5 ${index % 2 === 0 ? 'mt-1' : 'mt-3'}`}
                >
                  <div className='mb-4 mt-2 flex items-center justify-between gap-5 text-2xl tracking-[2px]'>
                    <p className='text-2xl font-medium tracking-[5px]'>
                      {exp.company}
                    </p>
                    <div className='flex items-center justify-end'>
                      <p className='text-[20px] '>{exp.position}</p>
                      <p className='text-raspberry ml-2 mt-[2px] text-lg'>
                        {exp.resumeDate}
                      </p>
                    </div>
                  </div>
                  <div className=' flex w-full flex-col items-start gap-2 text-xl'>
                    {exp.duties.map((duty, i) => (
                      <li
                        key={i}
                        className='m-0 p-0 leading-[20px] text-justify'
                      >
                        {duty}
                      </li>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-10 flex w-full'>
            <div className='cv-arrow -ml-px' />
            <div className=' -mt-[5px] flex flex-col text-[#20252f]'>
              <p className='text-raspberry ml-4 text-3xl font-medium tracking-[5px]'>
                {t.resumeHeaderSelectedProjects}
              </p>
              {t.projects
                .filter((p) => p.resumeDescription)
                .map((project, index) => (
                  <ResumeProject
                    repo={t.resumeRepo}
                    demo={t.resumeDemo}
                    key={index}
                    project={project}
                  />
                ))}

              <div className='flex h-full flex-col justify-between'>
                <div className='mt-10 flex w-full ml-[4px]'>
                  <div className='cv-arrow -ml-[23px]' />
                  <div className=' flex flex-col text-[#20252f] -mt-[5px]'>
                    <p className='text-raspberry ml-4 text-3xl font-medium tracking-[5px]'>
                      {t.resumeHeaderSkills}
                    </p>
                    <div className='ml-[22px] mr-2 mt-6 flex flex-wrap justify-start gap-x-[25px] gap-y-2'>
                      {resumeTechList.map((label) => {
                        const Icon = techIconMap[label];
                        return Icon ? (
                          <div
                            key={label}
                            className='hover:text-raspberry text-primary-blue mb-3 flex w-[70px] cursor-pointer flex-col items-center duration-150 hover:drop-shadow-[0_-2px_2px_#80183466]'
                          >
                            <Icon className='text-5xl' />
                            <p className='mt-2 text-[10px] leading-3'>
                              {label}
                            </p>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
                <div
                  className={`bottom-0 -ml-2 mr-2 ${locale === 'en' ? 'mt-[10px]' : 'mt-[2px]'} px-4 text-center text-[14px] leading-4 opacity-75`}
                >
                  {t.resumeRodo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
