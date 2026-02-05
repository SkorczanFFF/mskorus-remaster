import React, { useRef } from 'react';

import { useScrollTriggers } from '@/hooks/useScrollTriggers';
import { gsap } from '@/lib/gsap';
import { GithubIcon, GlobalIcon } from '@/lib/shared/Icons';

import projects from './Partials/projects.json';

export default function Portfolio(): JSX.Element {
  const projectRefs = useRef<(HTMLImageElement | null)[]>([]);

  useScrollTriggers(() => {
    return projectRefs.current.map((img, index) => {
      if (!img) return undefined;

      const isEven = index % 2 === 0;
      const xOffset = isEven ? -100 : 100;

      const tween = gsap.fromTo(
        img,
        {
          opacity: 0,
          x: xOffset,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
        },
      );

      return tween.scrollTrigger;
    });
  }, []);

  return (
    <section
      id='portfolio'
      className='font-mont bg-primary-blue relative flex h-auto w-full flex-col items-center justify-center overflow-hidden pb-20'
    >
      <div className='arrow-down white pt-[60px]' />
      <h3 className='font-mont -left-[45px] top-[190px] text-xl font-[400] leading-3 tracking-[10px] text-white md:absolute md:rotate-90'>
        PORTFOLIO
      </h3>
      <div className='xxl:w-[1200px] my-[60px] flex w-full flex-col gap-20 px-5 text-white md:mx-0 md:my-20 md:w-[620px] md:flex-col lg:w-[750px] xl:w-[1050px]'>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex flex-col drop-shadow-[0_5px_5px_#80183430] xl:flex-row ${
              project.id % 2 === 0 ? '' : 'xl:flex-row-reverse'
            }`}
          >
            <a
              href={project.live}
              rel='noopener noreferrer'
              target='blank'
              className='xl:w-1/2'
            >
              <img
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                src={project.pic}
                alt=''
                className={`border-orange w-full cursor-pointer border-2 duration-1000 hover:scale-[101%] hover:brightness-110 hover:saturate-150 ${
                  project.id % 2 === 0
                    ? 'perspective-right'
                    : 'perspective-left'
                }`}
              />
            </a>
            <div
              className={`w-full flex-col items-start xl:w-1/2 ${
                project.id % 2 === 0 ? 'perspective-left' : ' perspective-right'
              }`}
            >
              {' '}
              <a href={project.git} target='_blank' rel='noopener noreferrer'>
                <p
                  className={`hover:text-primary-blue my-3 w-auto cursor-pointer bg-gradient-to-r p-2 text-xl font-[400] duration-75 md:text-2xl lg:text-3xl ${
                    project.id % 2 === 0
                      ? 'from-raspberry to-oranger'
                      : 'to-raspberry from-oranger text-end'
                  }`}
                >
                  {project.title}
                </p>
              </a>
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
                    <GithubIcon className='text-2xl' />
                    <a
                      href={project.git}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      repo
                    </a>
                  </div>
                  <div className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
                    <GlobalIcon className='text-2xl' />
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
      <div className='mt-20 flex w-full flex-col items-center justify-center px-5 md:px-10 lg:px-20'>
        <div className='flex w-full md:max-w-[580px] lg:max-w-[1160px] flex-col gap-5 lg:flex-row max-w-[600px]'>
          <div className='border-1 text-primary-blue border-raspberry mt-10 flex max-h-[140px] min-w-[300px] max-w-[300px] flex-col justify-center gap-2 border-r-2 border-[gradient] bg-[#0c2835] p-5 shadow-xl md:p-10'>
            <div className='font-[300] leading-5'>
              <h1 className='text-2xl md:text-3xl lg:text-4xl'>
                <div className='nonweb-text text-end'>NON WEB</div>
                <div className='related-text text-center'>RELATED</div>
                <div className='corner-text text-end'>CORNER</div>
              </h1>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row gap-5'>
            <div className='border-1 lg:mt-20 flex w-full max-w-[1500px] flex-col items-center justify-center gap-2 border-[gradient] p-6 md:p-10 text-white shadow-xl'>
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
                    <GithubIcon className='text-2xl' />
                    <span>repo</span>
                  </a>
                </div>
              </div>
              <div className='text-justify font-[300] leading-5'>
                <p>
                  A lightweight Python-based automation tool for Tibia (MMORPG),
                  developed for personal use to assist with magic skill training
                  on Open Tibia Servers. It supports up to eight key-delay pairs
                  with customizable delays from 0 to 10 seconds, along with
                  individual reset and delete options. The tool automatically
                  detects the Tibia game window, provides dynamic UI feedback,
                  and offers simple Start/Stop controls. Designed for efficiency
                  and minimal resource usage, it runs perfectly in the
                  background, without interrupting other activities and games.
                </p>
              </div>
            </div>

            <div className='border-1 mb-10 flex h-auto w-full max-w-[1500px] flex-col items-center justify-center gap-2 border-[gradient] p-6 md:p-10 text-white shadow-xl'>
              <div className='flex w-full items-center justify-between'>
                <div className='flex flex-col'>
                  <h4 className='text-xl font-[500] uppercase'>
                    Package Delivery SA:MP Server
                  </h4>
                  <p className='text-[14px] text-[#b6b6b6]'>PawnC, SA:MP</p>
                </div>
              </div>
              <div className='text-justify font-[300] leading-5'>
                <p>
                  A package delivery system for a San Andreas Multiplayer
                  server, created for fun and educational purposes with a
                  friend. The system includes features for picking up and
                  delivering packages, a map divided into package delivery
                  regions, and dedicated loading/unloading hubs in each city.
                  <br /> To enhance realism and immersion, the system also
                  includes additional scripts such as random tire punctures and
                  a post-shift vehicle condition report. Future plans include
                  expanding the system with housing, personal vehicles, and more
                  in-game functionalities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className='mb-10 mt-[60px] lg:mt-[160px] tracking-[8px] text-white'>
        STAY TUNED
      </p>
    </section>
  );
}
