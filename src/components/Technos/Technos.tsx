import React, { useEffect, useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  AutodeskIcon,
  BlenderIcon,
  CanvaIcon,
  CssIcon,
  CursorIcon,
  DockerIcon,
  FigmaIcon,
  FirebaseIcon,
  GithubIcon,
  GsapIcon,
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
  PostgresqlIcon,
  PythonIcon,
  ReactIcon,
  ReactNativeIcon,
  ReduxIcon,
  SanityIcon,
  SassIcon,
  TailwindIcon,
  ThreejsIcon,
  TypescriptIcon,
  WordpressIcon,
  YarnIcon,
} from '@/lib/shared/Icons';

export default function Technos(): JSX.Element {
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    triggersRef.current = [];

    gsap.set('.tech-icon', { opacity: 1, scale: 1 });

    if (window.innerWidth > 1280) {
      const frontendIcons = frontendRef.current?.querySelectorAll('.tech-icon');
      if (frontendIcons) {
        const tween1 = gsap.to(frontendIcons, {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: frontendRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
        if (tween1.scrollTrigger) {
          triggersRef.current.push(tween1.scrollTrigger);
        }
      }

      const backendIcons = backendRef.current?.querySelectorAll('.tech-icon');
      const databaseIcons = databaseRef.current?.querySelectorAll('.tech-icon');
      if (backendIcons && databaseIcons) {
        const tween2 = gsap.fromTo(
          [...Array.from(backendIcons), ...Array.from(databaseIcons)],
          { opacity: 0, scale: 1.4 },
          {
            opacity: 1,
            scale: 1,
            stagger: {
              each: 0.1,
              from: 'end',
            },
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: backendRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        );
        if (tween2.scrollTrigger) {
          triggersRef.current.push(tween2.scrollTrigger);
        }
      }

      const designIcons = designRef.current?.querySelectorAll('.tech-icon');
      const toolsIcons = toolsRef.current?.querySelectorAll('.tech-icon');
      if (designIcons && toolsIcons) {
        const tween3 = gsap.fromTo(
          [...Array.from(designIcons), ...Array.from(toolsIcons)],
          { opacity: 0, scale: 1.4 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: designRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        );
        if (tween3.scrollTrigger) {
          triggersRef.current.push(tween3.scrollTrigger);
        }
      }
    }

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  const techCategories = {
    frontend: [
      { icon: <HtmlIcon className='sm:text-5xl text-4xl' />, label: 'HTML5' },
      { icon: <CssIcon className='sm:text-5xl text-4xl' />, label: 'CSS3' },
      {
        icon: <TypescriptIcon className='sm:text-5xl text-4xl' />,
        label: 'TypeScript',
      },
      { icon: <ReactIcon className='sm:text-5xl text-4xl' />, label: 'React' },
      {
        icon: <NextjsIcon className='sm:text-5xl text-4xl' />,
        label: 'Next.js',
      },
      {
        icon: <ReactNativeIcon className='sm:text-5xl text-4xl' />,
        label: 'React Native',
      },
      { icon: <ReduxIcon className='sm:text-5xl text-4xl' />, label: 'Redux' },
      {
        icon: <ThreejsIcon className='sm:text-5xl text-4xl' />,
        label: 'Three.js',
      },
      {
        icon: <TailwindIcon className='sm:text-5xl text-4xl' />,
        label: 'TailwindCSS',
      },
      { icon: <SassIcon className='sm:text-5xl text-4xl' />, label: 'Sass' },
      { icon: <GsapIcon className='sm:text-5xl text-4xl' />, label: 'GSAP' },
    ],
    backend: [
      { icon: <PhpIcon className='sm:text-5xl text-4xl' />, label: 'PHP' },
      {
        icon: <NodejsIcon className='sm:text-5xl text-4xl' />,
        label: 'Node.js',
      },
      {
        icon: <PythonIcon className='sm:text-5xl text-4xl' />,
        label: 'Python',
      },
      { icon: <JavaIcon className='sm:text-5xl text-4xl' />, label: 'Java' },
      {
        icon: <LaravelIcon className='sm:text-5xl text-4xl' />,
        label: 'Laravel',
      },
      {
        icon: <WordpressIcon className='sm:text-5xl text-4xl' />,
        label: 'Wordpress',
      },
      {
        icon: <SanityIcon className='sm:text-5xl text-4xl' />,
        label: 'Sanity',
      },
    ],
    database: [
      { icon: <MysqlIcon className='sm:text-5xl text-4xl' />, label: 'MySQL' },
      {
        icon: <MongodbIcon className='sm:text-5xl text-4xl' />,
        label: 'MongoDB',
      },
      {
        icon: <FirebaseIcon className='sm:text-5xl text-4xl' />,
        label: 'Firebase',
      },
      {
        icon: <PostgresqlIcon className='sm:text-5xl text-4xl' />,
        label: 'PostgreSQL',
      },
    ],
    design: [
      {
        icon: <PhotoshopIcon className='sm:text-5xl text-4xl' />,
        label: 'Photoshop',
      },
      {
        icon: <AutodeskIcon className='sm:text-5xl text-4xl' />,
        label: '3Ds Max',
      },
      {
        icon: <BlenderIcon className='sm:text-5xl text-4xl' />,
        label: 'Blender',
      },
      { icon: <FigmaIcon className='sm:text-5xl text-4xl' />, label: 'Figma' },
      { icon: <CanvaIcon className='sm:text-5xl text-4xl' />, label: 'Canva' },
    ],
    tools: [
      {
        icon: <DockerIcon className='sm:text-5xl text-4xl' />,
        label: 'Docker',
      },
      {
        icon: <GithubIcon className='sm:text-5xl text-4xl' />,
        label: 'GitHub',
      },
      {
        icon: <CursorIcon className='sm:text-5xl text-4xl' />,
        label: 'CursorAI',
      },
      { icon: <YarnIcon className='sm:text-5xl text-4xl' />, label: 'Yarn' },
      { icon: <NpmIcon className='sm:text-5xl text-4xl' />, label: 'npm' },
    ],
  };

  const TechIcon = ({
    tech,
  }: {
    tech: { icon: JSX.Element; label: string };
  }) => (
    <div
      className='tech-icon text-primary-blue hover:text-raspberry flex w-[75px] cursor-pointer flex-col items-center gap-3 duration-150 hover:drop-shadow-[0_-2px_2px_#80183466] md:w-[100px]'
      style={{ willChange: 'opacity' }}
    >
      {tech.icon}
      <span className='text-center text-xs'>{tech.label}</span>
    </div>
  );

  return (
    <section
      id='technologies'
      className='font-mont flex h-[100%] w-[100%] flex-col items-center justify-between border-b bg-white py-20 pb-[120px] pt-10 md:pt-20'
    >
      <h3 className='font-mont mb-10 font-[400] tracking-wider'>TECH STACK</h3>

      <div className='hidden xl:flex xl:w-full xl:max-w-[1200px] xl:flex-col xl:gap-8'>
        <div className='flex w-full flex-col' ref={frontendRef}>
          <div className='flex w-full justify-between'>
            {techCategories.frontend.map((tech, idx) => (
              <TechIcon key={idx} tech={tech} />
            ))}
          </div>
        </div>

        <div className='flex w-full gap-6 xl:flex-row'>
          <div className='max-w-2/3 flex w-full flex-col' ref={backendRef}>
            <h4 className='mb-2 ml-6 self-start text-lg font-semibold capitalize'>
              backend
            </h4>
            <div className='flex w-full gap-[12px]'>
              {techCategories.backend.map((tech, idx) => (
                <TechIcon key={idx} tech={tech} />
              ))}
            </div>
          </div>

          <div className='flex w-1/3 flex-col' ref={databaseRef}>
            <h4 className='mb-2 mr-6 self-end text-lg font-semibold capitalize'>
              database
            </h4>
            <div className='flex w-full gap-[10px]'>
              {techCategories.database.map((tech, idx) => (
                <TechIcon key={idx} tech={tech} />
              ))}
            </div>
          </div>
        </div>

        <div className='flex w-full gap-10 xl:flex-row'>
          <div className='flex flex-col' ref={designRef}>
            <h4 className='mb-2 ml-6 self-start text-lg font-semibold capitalize'>
              design
            </h4>
            <div className='flex w-full gap-[20px]'>
              {techCategories.design.map((tech, idx) => (
                <TechIcon key={idx} tech={tech} />
              ))}
            </div>
          </div>

          <div className='flex flex-col' ref={toolsRef}>
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

      <div className='px-4 md:px-0 my-10 flex w-full flex-col gap-10 md:max-w-[740px] lg:max-w-[900px] xl:hidden'>
        {Object.entries(techCategories).map(([category, techs], index) => (
          <div key={category} className='flex w-full flex-col  items-center'>
            <h4 className='mb-6 text-lg font-semibold capitalize'>
              {category}
            </h4>
            <div className='flex flex-wrap gap-4 md:gap-2 md:gap-y-8 justify-center gap-y-8'>
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
