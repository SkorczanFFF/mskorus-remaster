import React from 'react';

import {
  AutodeskIcon,
  BitbucketIcon,
  BlenderIcon,
  CanvaIcon,
  CssIcon,
  FirebaseIcon,
  GithubIcon,
  GitlabIcon,
  HtmlIcon,
  JavaIcon,
  LaravelIcon,
  MongodbIcon,
  MysqlIcon,
  NextjsIcon,
  NodejsIcon,
  NpmIcon,
  PhotoshopIcon,
  PhpIcon,
  PythonIcon,
  ReactIcon,
  ReactNativeIcon,
  ReduxIcon,
  SanityIcon,
  SassIcon,
  TailwindIcon,
  ThreejsIcon,
  TypescriptIcon,
  VsCodeIcon,
  WordpressIcon,
  YarnIcon,
} from '@/lib/shared/Icons';

export default function Technos(): JSX.Element {
  const techCategories = {
    frontend: [
      { icon: <HtmlIcon className='text-5xl' />, label: 'HTML5' },
      { icon: <CssIcon className='text-5xl' />, label: 'CSS3' },
      { icon: <TypescriptIcon className='text-5xl' />, label: 'TypeScript' },
      { icon: <ReactIcon className='text-5xl' />, label: 'React' },
      { icon: <NextjsIcon className='text-5xl' />, label: 'Next.js' },
      { icon: <ReactNativeIcon className='text-5xl' />, label: 'React Native' },
      { icon: <ReduxIcon className='text-5xl' />, label: 'Redux' },
      { icon: <ThreejsIcon className='text-5xl' />, label: 'Three.js' },
      { icon: <TailwindIcon className='text-5xl' />, label: 'TailwindCSS' },
      { icon: <SassIcon className='text-5xl' />, label: 'Sass' },
    ],
    backend: [
      { icon: <NodejsIcon className='text-5xl' />, label: 'Node.js' },
      { icon: <JavaIcon className='text-5xl' />, label: 'Java' },
      { icon: <PhpIcon className='text-5xl' />, label: 'PHP' },
      { icon: <LaravelIcon className='text-5xl' />, label: 'Laravel' },
      { icon: <PythonIcon className='text-5xl' />, label: 'Python' },
      { icon: <WordpressIcon className='text-5xl' />, label: 'Wordpress' },
      { icon: <SanityIcon className='text-5xl' />, label: 'Sanity' },
    ],
    database: [
      { icon: <FirebaseIcon className='text-5xl' />, label: 'Firebase' },
      { icon: <MongodbIcon className='text-5xl' />, label: 'MongoDB' },
      { icon: <MysqlIcon className='text-5xl' />, label: 'MySQL' },
    ],
    design: [
      { icon: <PhotoshopIcon className='text-5xl' />, label: 'Photoshop' },
      { icon: <AutodeskIcon className='text-5xl' />, label: '3Ds Max' },
      { icon: <BlenderIcon className='text-5xl' />, label: 'Blender' },
      { icon: <CanvaIcon className='text-5xl' />, label: 'Canva' },
    ],
    tools: [
      { icon: <GithubIcon className='text-5xl' />, label: 'GitHub' },
      { icon: <BitbucketIcon className='text-5xl' />, label: 'BitBucket' },
      { icon: <GitlabIcon className='text-5xl' />, label: 'GitLab' },
      { icon: <VsCodeIcon className='text-5xl' />, label: 'CursorAI' },
      { icon: <YarnIcon className='text-5xl' />, label: 'Yarn' },
      { icon: <NpmIcon className='text-5xl' />, label: 'npm' },
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
      className='font-mont flex h-[100%] w-[100%] flex-col items-center justify-between border-b bg-white py-20 pb-[120px]'
    >
      <h3 className='font-mont mb-10 font-[400] tracking-wider'>TECH STACK</h3>

      {/* Large screen layout (lg+) */}
      <div className='hidden lg:flex lg:w-full lg:max-w-[1200px] lg:flex-col lg:gap-8'>
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
            <h4 className='mb-2 ml-6 self-start text-lg font-semibold capitalize'>
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
            <h4 className='mb-2 mr-6 self-end text-lg font-semibold capitalize'>
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
            <h4 className='mb-2 ml-6 self-start text-lg font-semibold capitalize'>
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
            <h4 className='mb-2 mr-6 self-end text-lg font-semibold capitalize'>
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
