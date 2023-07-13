import { motion } from 'framer-motion';
import React from 'react';
import { AiFillGithub, AiOutlineGlobal } from 'react-icons/ai';

import projects from './Partials/projects.json';

export default function Portfolio(): JSX.Element {
  return (
    <section className='font-mont bg-primary-blue relative flex h-auto w-full flex-col items-center justify-center pb-20'>
      <div className='arrow-down white pt-[60px]' />
      <h3 className='font-mont absolute -left-[45px] top-[150px] -rotate-90 text-xl font-[400] leading-3 tracking-[10px] text-white'>
        PORTFOLIO
      </h3>
      <div className='my-20 flex w-[1200px] flex-col gap-20 text-white md:flex-col'>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={`flex drop-shadow-[0_5px_5px_#80183430] ${
              project.id % 2 === 0 ? '' : 'flex-row-reverse'
            }`}
          >
            <img
              src={project.pic}
              alt=''
              className={`perspective-right border-orange w-1/2 cursor-pointer border-2 duration-1000 hover:scale-[101%] hover:brightness-110 hover:saturate-150 ${
                project.id % 2 === 0 ? '' : 'perspective-left'
              }`}
            />
            <div
              className={`w-1/2 flex-col items-start ${
                project.id % 2 === 0 ? 'perspective-left' : 'perspective-right'
              }`}
            >
              <p
                className={`hover:text-primary-blue my-3 w-auto cursor-pointer bg-gradient-to-r p-2 text-3xl font-[400] duration-75 ${
                  project.id % 2 === 0
                    ? 'from-raspberry to-oranger'
                    : 'to-raspberry from-oranger text-end'
                }`}
              >
                {project.title}
              </p>

              <p className={`mx-3 ${project.id % 2 === 0 ? '' : 'text-end'}`}>
                {project.description}
              </p>
              <div
                className={`mx-5 mt-5 flex ${
                  project.id % 2 !== 0 && 'justify-end'
                } gap-5`}
              >
                <div className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
                  <AiFillGithub className='text-2xl' />
                  <a href={project.git}>repo</a>
                </div>
                <div className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'>
                  <AiOutlineGlobal className='text-2xl' />
                  <a href={project.live}>live demo</a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
