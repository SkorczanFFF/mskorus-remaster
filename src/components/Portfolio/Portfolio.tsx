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
              <p
                className={`mx-3 font-[200] leading-[22px] ${
                  project.id % 2 === 0 ? '' : 'text-end'
                }`}
              >
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
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      repo
                    </a>
                  </div>
                  <div className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
                    <AiOutlineGlobal className='text-2xl' />
                    <a
                      href={project.live}
                      target='_blank'
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
      <div className='flex flex-col items-center justify-center'>
        <p className='text-center tracking-[4px] text-white'>
          NON WEB RELATED CORNER
        </p>
        <div className='border-1 mt-10 flex w-[80%] max-w-[1500px] flex-col items-center justify-center gap-2 border-[gradient] p-10 text-white shadow-xl'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex flex-col'>
              <h4 className='text-xl font-[500] uppercase'>
                Tibia Key Presser
              </h4>
              <p className='text-[14px] text-[#b6b6b6]'>
                Python, Tkinter, pywinauto
              </p>
            </div>
            <div className='flex gap-5'>
              <a
                href='https://github.com/SkorczanFFF/tibia-key-presser'
                target='_blank'
                rel='noopener noreferrer'
                className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'
              >
                <AiFillGithub className='text-2xl' />
                <span>repo</span>
              </a>
            </div>
          </div>
          <div className='text-justify font-[300] leading-5'>
            <p>
              A Python automation tool for Tibia game that allows configuring up
              to 8 key-delay pairs with customizable delays (0-10s). Features
              include individual reset/delete functions, automatic game window
              detection with character name display, dynamic UI feedback, and
              simple Start/Stop controls for managing the automation process.
            </p>
          </div>
        </div>
      </div>
      <p className='mb-4 mt-20 tracking-[8px] text-white'>STAY TUNED</p>
    </section>
  );
}
