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

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set initial state for all icons - visible by default
    gsap.set('.tech-icon', { opacity: 1, scale: 1 });

    // Only run animations if screen width is less than 1280px
    if (window.innerWidth > 1280) {
      // Frontend row animation (fade in)
      const frontendIcons = frontendRef.current?.querySelectorAll('.tech-icon');
      if (frontendIcons) {
        gsap.to(frontendIcons, {
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
      }

      // Backend and Database row animation
      const backendIcons = backendRef.current?.querySelectorAll('.tech-icon');
      const databaseIcons = databaseRef.current?.querySelectorAll('.tech-icon');
      if (backendIcons && databaseIcons) {
        gsap.fromTo(
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
      }

      // Design and Tools row animation
      const designIcons = designRef.current?.querySelectorAll('.tech-icon');
      const toolsIcons = toolsRef.current?.querySelectorAll('.tech-icon');
      if (designIcons && toolsIcons) {
        gsap.fromTo(
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
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
      { icon: <GsapIcon className='text-5xl' />, label: 'GSAP' },
    ],
    backend: [
      { icon: <PhpIcon className='text-5xl' />, label: 'PHP' },
      { icon: <NodejsIcon className='text-5xl' />, label: 'Node.js' },
      { icon: <PythonIcon className='text-5xl' />, label: 'Python' },
      { icon: <JavaIcon className='text-5xl' />, label: 'Java' },
      { icon: <LaravelIcon className='text-5xl' />, label: 'Laravel' },
      { icon: <WordpressIcon className='text-5xl' />, label: 'Wordpress' },
      { icon: <SanityIcon className='text-5xl' />, label: 'Sanity' },
    ],
    database: [
      { icon: <MysqlIcon className='text-5xl' />, label: 'MySQL' },
      { icon: <MongodbIcon className='text-5xl' />, label: 'MongoDB' },
      { icon: <FirebaseIcon className='text-5xl' />, label: 'Firebase' },
      { icon: <PostgresqlIcon className='text-5xl' />, label: 'PostgreSQL' },
    ],
    design: [
      { icon: <PhotoshopIcon className='text-5xl' />, label: 'Photoshop' },
      { icon: <AutodeskIcon className='text-5xl' />, label: '3Ds Max' },
      { icon: <BlenderIcon className='text-5xl' />, label: 'Blender' },
      { icon: <FigmaIcon className='text-5xl' />, label: 'Figma' },
      { icon: <CanvaIcon className='text-5xl' />, label: 'Canva' },
    ],
    tools: [
      { icon: <DockerIcon className='text-5xl' />, label: 'Docker' },
      { icon: <GithubIcon className='text-5xl' />, label: 'GitHub' },
      { icon: <CursorIcon className='text-5xl' />, label: 'CursorAI' },
      { icon: <YarnIcon className='text-5xl' />, label: 'Yarn' },
      { icon: <NpmIcon className='text-5xl' />, label: 'npm' },
    ],
  };

  // Modify TechIcon component to ensure proper color visibility
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

      {/* Large screen layout (xl+) */}
      <div className='hidden xl:flex xl:w-full xl:max-w-[1200px] xl:flex-col xl:gap-8'>
        {/* Row 1: Frontend */}
        <div className='flex w-full flex-col' ref={frontendRef}>
          <div className='flex w-full justify-between'>
            {techCategories.frontend.map((tech, idx) => (
              <TechIcon key={idx} tech={tech} />
            ))}
          </div>
        </div>

        {/* Row 2: Backend and Database */}
        <div className='flex w-full gap-6 xl:flex-row'>
          {/* Backend */}
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

          {/* Database */}
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

        {/* Row 3: Design and Tools */}
        <div className='flex w-full gap-10 xl:flex-row'>
          {/* Design */}
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

          {/* Tools */}
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

      {/* Small/medium/large screen layout (under xl) */}
      <div className='px-4 md:px-0 my-10 flex w-full flex-col gap-10 md:max-w-[740px] lg:max-w-[900px] xl:hidden'>
        {Object.entries(techCategories).map(([category, techs], index) => (
          <div key={category} className='flex w-full flex-col  items-center'>
            <h4 className='mb-6 text-lg font-semibold capitalize'>
              {category}
            </h4>
            <div className='flex flex-wrap gap-4 md:gap-2  justify-center'>
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
