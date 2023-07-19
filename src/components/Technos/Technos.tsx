import React from 'react';
import { AiFillGithub, AiFillHtml5 } from 'react-icons/ai';
import { IoLogoReact } from 'react-icons/io5';
import {
  SiAdobephotoshop,
  SiAutodesk,
  SiBitbucket,
  SiBlender,
  SiFirebase,
  SiGitlab,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVisualstudiocode,
  SiYarn,
} from 'react-icons/si';

export default function Technos(): JSX.Element {
  const technos = [
    { icon: <AiFillHtml5 className='text-6xl' />, label: 'HTML5' },
    { icon: <SiTypescript className='text-6xl' />, label: 'TypeScript' },
    { icon: <SiNextdotjs className='text-6xl' />, label: 'Next.js' },
    { icon: <IoLogoReact className='text-6xl' />, label: 'React' },
    { icon: <SiRedux className='text-6xl' />, label: 'Redux' },
    { icon: <SiThreedotjs className='text-6xl' />, label: 'Three.js' },
    { icon: <SiTailwindcss className='text-6xl' />, label: 'Tailwind' },
    { icon: <SiSass className='text-6xl' />, label: 'Sass' },
    { icon: <SiFirebase className='text-6xl' />, label: 'Firebase' },
    { icon: <SiMongodb className='text-6xl' />, label: 'MongoDB' },
    { icon: <SiNodedotjs className='text-6xl' />, label: 'Node.js' },
    { icon: <SiAdobephotoshop className='text-6xl' />, label: 'Photoshop' },
    { icon: <SiAutodesk className='text-6xl' />, label: '3Ds Max' },
    { icon: <SiBlender className='text-6xl' />, label: 'Blender' },
    { icon: <AiFillGithub className='text-6xl' />, label: 'GitHub' },
    { icon: <SiBitbucket className='text-6xl' />, label: 'BitBucket' },
    { icon: <SiGitlab className='text-6xl' />, label: 'GitLab' },
    { icon: <SiVisualstudiocode className='text-6xl' />, label: 'VS Code' },
    { icon: <SiYarn className='text-6xl' />, label: 'Yarn' },
    { icon: <SiNpm className='text-6xl' />, label: 'npm' },
  ];

  return (
    <section
      id='technologies'
      className='font-mont flex h-[100%] w-[100%] flex-col items-center justify-between border-b bg-white py-20'
    >
      <h3 className='font-mont font-[400] tracking-wider'>TECH STACK</h3>
      <div className='mx-4 mb-20 mt-10 flex max-w-[1200px] flex-wrap justify-center gap-10'>
        {technos.map((techno, index) => (
          <div
            key={index}
            className='text-primary-blue hover:text-raspberry flex w-[75px] cursor-pointer flex-col items-center gap-3 duration-150 hover:drop-shadow-[0_-2px_2px_#80183466] md:w-[100px]'
          >
            {techno.icon}
            <span className='text-center text-xs'>{techno.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
