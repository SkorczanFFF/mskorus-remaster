import React from 'react';
import { AiFillGithub, AiFillHtml5 } from 'react-icons/ai';
import { BiLogoJava, BiLogoPhp } from 'react-icons/bi';
import { GrMysql } from 'react-icons/gr';
import { IoLogoCss3, IoLogoReact, IoLogoWordpress } from 'react-icons/io5';
import {
  SiAdobephotoshop,
  SiAutodesk,
  SiBitbucket,
  SiBlender,
  SiCanva,
  SiFirebase,
  SiGitlab,
  SiLaravel,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPython,
  SiReact,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVisualstudiocode,
  SiYarn,
} from 'react-icons/si';

export default function Technos(): JSX.Element {
  const techCategories = {
    frontend: [
      { icon: <AiFillHtml5 className='text-5xl' />, label: 'HTML5' },
      { icon: <IoLogoCss3 className='text-5xl' />, label: 'CSS3' },
      { icon: <SiTypescript className='text-5xl' />, label: 'TypeScript' },
      { icon: <IoLogoReact className='text-5xl' />, label: 'React' },
      { icon: <SiNextdotjs className='text-5xl' />, label: 'Next.js' },
      { icon: <SiReact className='text-5xl' />, label: 'React Native' },
      { icon: <SiRedux className='text-5xl' />, label: 'Redux' },
      { icon: <SiThreedotjs className='text-5xl' />, label: 'Three.js' },
      { icon: <SiTailwindcss className='text-5xl' />, label: 'TailwindCSS' },
      { icon: <SiSass className='text-5xl' />, label: 'Sass' },
    ],
    backend: [
      { icon: <SiNodedotjs className='text-5xl' />, label: 'Node.js' },
      { icon: <BiLogoJava className='text-5xl' />, label: 'Java' },
      { icon: <BiLogoPhp className='text-5xl' />, label: 'PHP' },
      { icon: <SiLaravel className='text-5xl' />, label: 'Laravel' },
      { icon: <SiPython className='text-5xl' />, label: 'Python' },
      { icon: <IoLogoWordpress className='text-5xl' />, label: 'Wordpress' },
    ],
    database: [
      { icon: <SiFirebase className='text-5xl' />, label: 'Firebase' },
      { icon: <SiMongodb className='text-5xl' />, label: 'MongoDB' },
      { icon: <GrMysql className='text-5xl' />, label: 'MySQL' },
    ],
    design: [
      { icon: <SiAdobephotoshop className='text-5xl' />, label: 'Photoshop' },
      { icon: <SiAutodesk className='text-5xl' />, label: '3Ds Max' },
      { icon: <SiBlender className='text-5xl' />, label: 'Blender' },
      { icon: <SiCanva className='text-5xl' />, label: 'Canva' },
    ],
    tools: [
      { icon: <AiFillGithub className='text-5xl' />, label: 'GitHub' },
      { icon: <SiBitbucket className='text-5xl' />, label: 'BitBucket' },
      { icon: <SiGitlab className='text-5xl' />, label: 'GitLab' },
      { icon: <SiVisualstudiocode className='text-5xl' />, label: 'VS Code' },
      { icon: <SiYarn className='text-5xl' />, label: 'Yarn' },
      { icon: <SiNpm className='text-5xl' />, label: 'npm' },
    ],
  };

  // Render a single tech icon component
  const TechIcon = ({
    tech,
  }: {
    tech: { icon: JSX.Element; label: string };
  }) => (
    <div className='text-primary-blue hover:text-raspberry flex w-[75px] cursor-pointer flex-col items-center gap-3 duration-150 hover:drop-shadow-[0_-2px_2px_#80183466] md:w-[100px]'>
      {tech.icon}
      <span className='text-center text-xs'>{tech.label}</span>
    </div>
  );

  return (
    <section
      id='technologies'
      className='font-mont flex h-[100%] w-[100%] flex-col items-center justify-between border-b bg-white py-20'
    >
      <h3 className='font-mont mb-10 font-[400] tracking-wider'>TECH STACK</h3>

      {/* Large screen layout (lg+) */}
      <div className='hidden lg:flex lg:w-full lg:max-w-[1200px] lg:flex-col lg:gap-12'>
        {/* Row 1: Frontend */}
        <div className='flex w-full flex-col'>
          {/* <h4 className='mb-6 self-center text-lg font-semibold capitalize'>
            frontend
          </h4> */}
          <div className='flex w-full justify-between'>
            {techCategories.frontend.map((tech, idx) => (
              <TechIcon key={idx} tech={tech} />
            ))}
          </div>
        </div>

        {/* Row 2: Backend and Database */}
        <div className='flex w-full gap-8'>
          {/* Backend */}
          <div className='max-w-2/3 flex w-full flex-col'>
            <h4 className='mb-6 ml-6 self-start text-lg font-semibold capitalize'>
              backend
            </h4>
            <div className='flex w-full gap-[20px]'>
              {techCategories.backend.map((tech, idx) => (
                <TechIcon key={idx} tech={tech} />
              ))}
            </div>
          </div>

          {/* Database */}
          <div className='flex w-1/3 flex-col'>
            <h4 className='mb-6 mr-6 self-end text-lg font-semibold capitalize'>
              database
            </h4>
            <div className='flex w-full gap-[20px]'>
              {techCategories.database.map((tech, idx) => (
                <TechIcon key={idx} tech={tech} />
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Design and Tools */}
        <div className='flex w-full gap-10'>
          {/* Design */}
          <div className='flex flex-col'>
            <h4 className='mb-6 ml-6 self-start text-lg font-semibold capitalize'>
              design
            </h4>
            <div className='flex w-full gap-[20px]'>
              {techCategories.design.map((tech, idx) => (
                <TechIcon key={idx} tech={tech} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className='flex flex-col'>
            <h4 className='mb-6 mr-6 self-end text-lg font-semibold capitalize'>
              tools
            </h4>
            <div className='flex w-full gap-[20px]'>
              {techCategories.tools.map((tech, idx) => (
                <TechIcon key={idx} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Small/medium screen layout */}
      <div className='my-10 flex w-full flex-col gap-10 md:max-w-[700px] lg:hidden'>
        {Object.entries(techCategories).map(([category, techs], index) => (
          <div
            key={category}
            className={`flex w-full flex-col ${
              index % 2 === 0 ? 'md:items-start' : 'md:items-end'
            } items-center`}
          >
            <h4 className='mb-6 text-lg font-semibold capitalize'>
              {category}
            </h4>
            <div
              className={`flex flex-wrap gap-4 ${
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              } justify-center`}
            >
              {techs.map((tech, idx) => (
                <TechIcon key={idx} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
