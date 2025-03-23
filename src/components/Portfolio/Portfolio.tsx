import React from 'react';
import { AiFillGithub, AiOutlineGlobal } from 'react-icons/ai';

import projects from './Partials/projects.json';

export default function Portfolio(): JSX.Element {
  return (
    <section
      id='portfolio'
      className='font-mont bg-primary-blue relative flex h-auto w-full flex-col items-center justify-center overflow-hidden pb-20'
    >
      <div className='arrow-down white pt-[60px]' />
      <h3 className='font-mont -left-[45px] top-[190px] text-xl font-[400] leading-3 tracking-[10px] text-white md:absolute md:rotate-90'>
        PORTFOLIO
      </h3>
      <div className='xxl:w-[1200px] my-[60px] flex w-full flex-col gap-20 px-5 text-white md:mx-0 md:my-20 md:w-[550px] md:flex-col lg:w-[750px] xl:w-[1050px]'>
        {projects.map((project) => (
          <div
            key={project.id}
            className={`flex flex-col drop-shadow-[0_5px_5px_#80183430] xl:flex-row ${
              project.id % 2 === 0 ? '' : 'xl:flex-row-reverse'
            }`}
          >
            <a rel='noopener noreferrer' target='blank' className='xl:w-1/2'>
              <img
                src={project.pic}
                alt=''
                className={` perspective-right border-orange w-full cursor-pointer border-2 duration-1000 hover:scale-[101%] hover:brightness-110 hover:saturate-150 ${
                  project.id % 2 === 0 ? '' : 'perspective-left'
                }`}
              />
            </a>
            <div
              className={`w-full flex-col items-start xl:w-1/2 ${
                project.id % 2 === 0 ? 'perspective-left' : ' perspective-right'
              }`}
            >
              <p
                className={`hover:text-primary-blue my-3 w-auto cursor-pointer bg-gradient-to-r p-2 text-xl font-[400] duration-75 md:text-2xl lg:text-3xl ${
                  project.id % 2 === 0
                    ? 'from-raspberry to-oranger'
                    : 'to-raspberry from-oranger text-end'
                }`}
              >
                {project.title}
              </p>
              <p
                className={`mx-3 mb-2 text-gray-400 ${
                  project.id % 2 === 0 ? '' : 'text-end'
                }`}
              >
                {project.technos}
              </p>
              <p className={`mx-3 ${project.id % 2 === 0 ? '' : 'text-end'}`}>
                {project.description}
              </p>
              {project.git !== '' && project.live !== '' && (
                <div
                  className={`mx-5 mt-5 flex ${
                    project.id % 2 !== 0 && 'justify-end'
                  } gap-5`}
                >
                  <div className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
                    <AiFillGithub className='text-2xl' />
                    <a
                      href={project.git}
                      target='blank'
                      rel='noopener noreferrer'
                    >
                      repo
                    </a>
                  </div>
                  <div className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
                    <AiOutlineGlobal className='text-2xl' />
                    <a
                      href={project.live}
                      target='blank'
                      rel='noopener noreferrer'
                    >
                      live demo
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className='mt-4 tracking-widest text-white'>STAY TUNED</p>
    </section>
  );
}
