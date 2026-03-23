import React, { useRef } from 'react';

import { useScrollTriggers } from '@/hooks/useScrollTriggers';
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

type TechEntry = { Icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string };

const techCategories: Record<string, TechEntry[]> = {
  frontend: [
    { Icon: HtmlIcon, label: 'HTML5' },
    { Icon: CssIcon, label: 'CSS3' },
    { Icon: TypescriptIcon, label: 'TypeScript' },
    { Icon: ReactIcon, label: 'React' },
    { Icon: NextjsIcon, label: 'Next.js' },
    { Icon: ReactNativeIcon, label: 'React Native' },
    { Icon: ReduxIcon, label: 'Redux' },
    { Icon: ThreejsIcon, label: 'Three.js' },
    { Icon: TailwindIcon, label: 'TailwindCSS' },
    { Icon: SassIcon, label: 'Sass' },
    { Icon: GsapIcon, label: 'GSAP' },
  ],
  backend: [
    { Icon: PythonIcon, label: 'Python' },
    { Icon: PhpIcon, label: 'PHP' },
    { Icon: NodejsIcon, label: 'Node.js' },
    { Icon: JavaIcon, label: 'Java' },
    { Icon: LaravelIcon, label: 'Laravel' },
    { Icon: WordpressIcon, label: 'Wordpress' },
    { Icon: SanityIcon, label: 'Sanity' },
  ],
  database: [
    { Icon: MysqlIcon, label: 'MySQL' },
    { Icon: MongodbIcon, label: 'MongoDB' },
    { Icon: FirebaseIcon, label: 'Firebase' },
    { Icon: PostgresqlIcon, label: 'PostgreSQL' },
  ],
  design: [
    { Icon: PhotoshopIcon, label: 'Photoshop' },
    { Icon: AutodeskIcon, label: '3Ds Max' },
    { Icon: BlenderIcon, label: 'Blender' },
    { Icon: FigmaIcon, label: 'Figma' },
    { Icon: CanvaIcon, label: 'Canva' },
  ],
  tools: [
    { Icon: DockerIcon, label: 'Docker' },
    { Icon: GithubIcon, label: 'GitHub' },
    { Icon: CursorIcon, label: 'CursorAI' },
    { Icon: YarnIcon, label: 'Yarn' },
    { Icon: NpmIcon, label: 'npm' },
  ],
};

function TechIcon({ tech }: { tech: TechEntry }) {
  return (
    <div
      className='tech-icon text-primary-blue hover:text-raspberry flex w-[75px] cursor-pointer flex-col items-center gap-3 duration-150 hover:drop-shadow-[0_-2px_2px_#80183466] md:w-[100px]'
      style={{ willChange: 'opacity' }}
    >
      <tech.Icon className='text-4xl sm:text-5xl' />
      <span className='text-center text-xs'>{tech.label}</span>
    </div>
  );
}

function animateCategory(
  refs: (React.RefObject<HTMLDivElement | null>)[],
  triggerRef: React.RefObject<HTMLDivElement | null>,
  options?: { useFromTo?: boolean; staggerFrom?: 'start' | 'end' },
) {
  const allIcons = refs.flatMap(
    (r) => (r.current ? gsap.utils.toArray<Element>('.tech-icon', r.current) : []),
  );
  if (!allIcons.length || !triggerRef.current) return undefined;

  const anim = options?.useFromTo
    ? gsap.fromTo(
      allIcons,
      { opacity: 0, scale: 1.4 },
      {
        opacity: 1,
        scale: 1,
        stagger: { each: 0.1, from: options.staggerFrom ?? 'start' },
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    )
    : gsap.to(allIcons, {
      opacity: 1,
      scale: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

  return anim.scrollTrigger ?? undefined;
}

export default function Technos(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useScrollTriggers(() => {
    if (sectionRef.current) {
      gsap.set(gsap.utils.toArray('.tech-icon', sectionRef.current), { opacity: 1, scale: 1 });
    }

    if (window.innerWidth <= 1280) {
      return [];
    }

    const triggers = [
      animateCategory([frontendRef], frontendRef),
      animateCategory([backendRef, databaseRef], backendRef, { useFromTo: true, staggerFrom: 'end' }),
      animateCategory([designRef, toolsRef], designRef, { useFromTo: true }),
    ];

    return triggers.filter((t): t is ScrollTrigger => t != null);
  }, []);

  return (
    <section
      ref={sectionRef}
      id='technologies'
      className='font-grotesk flex h-[100%] w-[100%] flex-col items-center justify-between border-b bg-white pb-[200px] -mt-[160px]'
    >
      <h3 className='font-grotesk mb-10 font-normal tracking-wider'>TECH STACK</h3>

      <div className='hidden xl:flex xl:w-full xl:max-w-[1200px] xl:flex-col xl:gap-8'>
        <div className='flex w-full flex-col' ref={frontendRef}>
          <div className='flex w-full justify-between'>
            {techCategories.frontend.map((tech) => (
              <TechIcon key={tech.label} tech={tech} />
            ))}
          </div>
        </div>

        <div className='flex w-full gap-6 xl:flex-row'>
          <div className='max-w-2/3 flex w-full flex-col' ref={backendRef}>
            <h4 className='mb-2 ml-6 self-start text-lg font-semibold capitalize'>
              backend
            </h4>
            <div className='flex w-full gap-[12px]'>
              {techCategories.backend.map((tech) => (
                <TechIcon key={tech.label} tech={tech} />
              ))}
            </div>
          </div>

          <div className='flex w-1/3 flex-col' ref={databaseRef}>
            <h4 className='mb-2 mr-6 self-end text-lg font-semibold capitalize'>
              database
            </h4>
            <div className='flex w-full gap-[10px]'>
              {techCategories.database.map((tech) => (
                <TechIcon key={tech.label} tech={tech} />
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
              {techCategories.design.map((tech) => (
                <TechIcon key={tech.label} tech={tech} />
              ))}
            </div>
          </div>

          <div className='flex flex-col' ref={toolsRef}>
            <h4 className='mb-2 mr-6 self-end text-lg font-semibold capitalize'>
              tools
            </h4>
            <div className='flex w-full gap-[20px]'>
              {techCategories.tools.map((tech) => (
                <TechIcon key={tech.label} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='px-4 md:px-0 my-10 flex w-full flex-col gap-10 md:max-w-[740px] lg:max-w-[900px] xl:hidden'>
        {Object.entries(techCategories).map(([category, techs]) => (
          <div key={category} className='flex w-full flex-col  items-center'>
            <h4 className='mb-6 text-lg font-semibold capitalize'>
              {category}
            </h4>
            <div className='flex flex-wrap gap-4 md:gap-2 md:gap-y-8 justify-center gap-y-8'>
              {techs.map((tech) => (
                <TechIcon key={tech.label} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
