import React from 'react';
import {
  AiFillCar,
  AiFillCompass,
  AiFillGithub,
  AiFillHtml5,
  AiFillMail,
} from 'react-icons/ai';
import { BsDot, BsGithub, BsGlobe2, BsLinkedin } from 'react-icons/bs';
import { GiGuitarBassHead } from 'react-icons/gi';
import { HiChip, HiMusicNote } from 'react-icons/hi';
import { HiMiniLanguage } from 'react-icons/hi2';
import { IoCallSharp, IoLogoReact } from 'react-icons/io5';
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
  SiVercel,
  SiVisualstudiocode,
  SiYarn,
} from 'react-icons/si';

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
  { icon: <SiGitlab className='text-6xl' />, label: 'GitLab' },
  { icon: <SiBitbucket className='text-6xl' />, label: 'BitBucket' },
  { icon: <SiVisualstudiocode className='text-6xl' />, label: 'VS Code' },
  { icon: <SiYarn className='text-6xl' />, label: 'Yarn' },
  { icon: <SiNpm className='text-6xl' />, label: 'npm' },
];

const projects = [
  {
    title: 'PORTFOLIO PAGE',
    technologies:
      'Next.js • TailwindCSS • TypeScript • React Three Fiber/Three.js • Blender',
    description:
      'Remaster of my deprecated React portfolio page. Now it is based on Next.js, TailwindCSS and React Three Fiber/Three.js. Also integrated with TypeScript, Framer Motion and now with built-in resume on Web. Some parts of WebGL scene were made with Blender.',
    repositoryLink: 'https://github.com/SkorczanFFF/mskorus-remaster',
    demoLink: 'https://mskorus.vercel.app/',
  },
  {
    title: 'POLONEZ AUTODRIVE',
    technologies: 'HTML • JavaScript • Three.js • 3D Studio Max 2019',
    description:
      'Simple Three.js scene made with 3D Studio Max 2019. Models with animations were exported to .fbx files and baked into Synthwave/80\'s vibe coloring book" like animation with built-in GUI for easy painting. Have fun with coloring!',
    repositoryLink: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    demoLink: 'https://skorczanfff.github.io/Polonez-Autodrive/',
  },
  {
    title: 'YET ANOTHER WEATHER APP',
    technologies: 'React • JavaScript • Vanta.js • Sass • OpenWeather API',
    description:
      'Another "weather application", but in a new edition. The application displays weather information for the selected city or by geolocation of the user, and the interface has been enriched with additional possibilities to interact with weather data and background. Unfortunately, still desktop only.',
    repositoryLink: 'https://github.com/SkorczanFFF/YetAnotherWeatherApp',
    demoLink: 'https://skorczanfff.github.io/YetAnotherWeatherApp/',
  },
];

interface ProjectData {
  title: string;
  technologies: string;
  description: string;
  repositoryLink: string;
  demoLink: string;
}

const Project: React.FC<ProjectData> = ({
  title,
  technologies,
  description,
  repositoryLink,
  demoLink,
}) => (
  <div className='ml-6 mt-6'>
    <p className='text-2xl font-[500] tracking-[5px]'>{title}</p>
    <div className='flex flex-col'>
      <div className='text-raspberry ml-2 mr-8 mt-2 flex items-center text-lg tracking-wide'>
        {technologies}
      </div>
      <p className='ml-2 mr-8 mt-2 flex items-center text-xl'>{description}</p>
      <div className='ml-4 mt-2 flex gap-10 text-xl'>
        <a
          className='hover:text-raspberry flex cursor-pointer items-center gap-2 duration-150'
          href={repositoryLink}
          target='_blank'
          rel='noreferrer'
        >
          <AiFillGithub className='text-3xl' /> repository
        </a>
        <a
          className='hover:text-raspberry flex cursor-pointer items-center gap-2 duration-150'
          href={demoLink}
          target='_blank'
          rel='noreferrer'
        >
          <BsGlobe2 className='text-2xl' /> web demo
        </a>
      </div>
    </div>
  </div>
);

export default function CV(): JSX.Element {
  return (
    <>
      <section className='font-mont flex min-h-[100vh] flex-col items-center bg-[#0a0c0e]'>
        <div className='m-10 flex h-[2015px] w-[1421px] bg-white'>
          <div className='flex w-full bg-red-300'>
            <div className='flex h-[2015px] w-[380px] flex-col bg-gradient-to-b from-[#20252f] from-0% via-[#20252f] via-60% to-[#2b3240] to-100%'>
              <div className='arrow-top-left white' />
              <div className='flex flex-col items-center justify-center'>
                <p className='ml-[35px] mt-[23px] text-[3rem] font-[200] tracking-[32px] text-white'>
                  MACIEJ
                </p>
                <p className='z-10 ml-[30px] mt-[28px] text-[3.25rem] tracking-[23px] text-white'>
                  SKORUS
                </p>
                <div className='to-raspberry via-raspberry -mt-[15px] h-[4px] w-full bg-gradient-to-r from-transparent' />
              </div>
              <div className='mt-[65px]'>
                <div className='h-[4px] w-[95%] bg-gradient-to-r from-white from-10% to-transparent to-100%' />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/cvphoto.png'
                  alt='Me'
                  className='mx-auto mt-[60px] w-[70%]'
                />
                <div className='to-raspberry via-raspberry mt-[60px] h-[4px] w-full bg-gradient-to-r from-transparent' />
                <div className='mt-5 flex flex-col items-end'>
                  <div className='mt-[7px] flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>ABOUT</p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <p className='mx-4 mr-9 mt-2 text-end text-lg text-white'>
                    Highly motivated, communicative, creative and passionate
                    with a strong curiosity and ambition for creating
                    exceptional web experiences. Dedicated to staying up-to-date
                    with the latest trends and advancements in the field. Eager
                    to share and expand knowledge and skills, committed to
                    continuous learning in the ever-evolving world of
                    development. Now looking for new team and challenges to grow
                    and achieve something special and innovative together.
                  </p>
                </div>
                <div className='mt-5 flex flex-col items-end'>
                  <div className='flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>
                      CONTACT
                    </p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <div className='mx-4 mr-9 mt-2 flex flex-col gap-1 text-end text-xl text-white'>
                    <a
                      href='mailto:skorusmaciej94@gmail.com'
                      className='hover:text-orange flex items-center gap-2 duration-150'
                      target='_blank'
                      rel='noreferrer'
                    >
                      skorusmaciej94@gmail.com <AiFillMail />
                    </a>
                    <a
                      href='tel:+48668366648'
                      className='hover:text-orange flex items-center justify-end gap-2 duration-150'
                      target='_blank'
                      rel='noreferrer'
                    >
                      +48 668 366 648
                      <IoCallSharp />
                    </a>
                  </div>
                </div>
                <div className='mt-5 flex flex-col items-end'>
                  <div className='flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>
                      LANGUAGES
                    </p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <div className='mx-4 mr-9 mt-2 flex flex-col text-end text-xl text-white'>
                    <p className=''>English - C1</p>
                    <p className=''>Russian - A2</p>
                    <p className=''>Polish - native</p>
                  </div>
                </div>
                <div className='mt-5 flex flex-col items-end'>
                  <div className='flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>LINKS</p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <div className='mx-4 mr-9 mt-2 flex flex-col items-end text-xl text-white'>
                    <a
                      className='hover:text-orange flex items-center gap-2 duration-150'
                      href='https://github.com/SkorczanFFF'
                      target='_blank'
                      rel='noreferrer'
                    >
                      /skorczanFFF <BsGithub className='-mt-[2px]' />
                    </a>
                    <a
                      className='hover:text-orange flex items-center gap-2 duration-150'
                      href='https://linkedin.com/mskorus'
                      target='_blank'
                      rel='noreferrer'
                    >
                      /mskorus <BsLinkedin className='-mt-[2px]' />
                    </a>
                    <a
                      className='hover:text-orange flex items-center gap-2 duration-150'
                      href='https://mskorus.vercel.app/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      mskorus.vercel.app <SiVercel className='-mt-[2px]' />
                    </a>
                  </div>
                </div>
                <div className='mt-5 flex flex-col items-end'>
                  <div className='flex items-center justify-end gap-3'>
                    <p className='text-orange text-2xl tracking-[3px]'>
                      HOBBIES
                    </p>
                    <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                  </div>
                  <div className='mx-4 mr-9 mt-3 flex flex-col items-center gap-5 text-end text-xl text-white'>
                    <div className='flex w-[310px] justify-between'>
                      <GiGuitarBassHead className='text-6xl' />
                      <AiFillCar className='text-6xl' />
                      <HiMusicNote className='text-6xl' />
                    </div>
                    <div className='flex w-[310px] justify-between'>
                      <AiFillCompass className='text-6xl' />
                      <HiChip className='text-6xl' />
                      <HiMiniLanguage className='text-6xl' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex h-[90px] w-full items-center bg-[#20252f] text-white'>
                <p className='right-0 ml-[100px] text-3xl font-[300] tracking-[15px]'>
                  JUNIOR FRONTEND DEVELOPER
                </p>
              </div>
              <div className='flex'>
                <div className='bg-raspberry -mt-[1px] h-[1932px]'>
                  <div className='arrow-top-left cv-blue' />
                </div>
                <div className='flex h-[1931px] w-[1011px] flex-col bg-white'>
                  <div className='mt-[54px]' />
                  <div className='flex w-full'>
                    <div className='cv-arrow' />
                    <div className=' flex flex-col text-[#20252f]'>
                      <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                        EXPERIENCE
                      </p>
                      <div className='ml-6 mt-3'>
                        <p className='text-2xl font-[500] tracking-[5px]'>
                          ANFATA GAMES SP. Z O.O.
                        </p>
                        <div className='mb-4 mt-2 flex items-center gap-5 text-2xl tracking-[2px]'>
                          <p>JUNIOR WEB 3.0 FRONTEND DEVELOPER</p>
                          <p className='text-raspberry text-lg'>
                            [ September 2022 - June 2023 ]
                          </p>
                        </div>
                        <div className='ml-1 flex w-full flex-col items-start gap-2 text-xl'>
                          <div className='flex'>
                            <BsDot className='mt-1' />
                            <p className='mr-4'>
                              DApp and auction system developement and
                              integration with ImmutableX collections and smart
                              contracts
                            </p>
                          </div>
                          <p className='flex'>
                            <BsDot className='mt-1' />
                            Working with Moralis and Firebase cloud functions
                            and databases
                          </p>
                          <p className='flex'>
                            <BsDot className='mt-1' />
                            New Pirates of the Arrland homepage layout
                            implementation and development
                          </p>
                          <p className='flex'>
                            <BsDot className='mt-1' />
                            Handling custom events on company websites, direct
                            cooperation with marketing
                          </p>
                          <p className='flex'>
                            <BsDot className='mt-1' />
                            Cross-team collaboration for consistent user
                            experience with product
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-10 flex w-full'>
                    <div className='cv-arrow' />
                    <div className=' flex flex-col text-[#20252f]'>
                      <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                        EDUCATION
                      </p>
                      <div className='ml-6 mt-3'>
                        <p className='text-2xl font-[500] tracking-[5px]'>
                          UNIVERSITY OF SILESIA
                        </p>
                        <p className='mb-4 mt-2 text-2xl tracking-[1px]'>
                          INFORMATICS - Web Application Programming
                        </p>
                        <div className='ml-1 flex items-center text-[22px]'>
                          <BsDot /> Enigneer degree • October 2017 - June 2021{' '}
                          <BsDot />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-10 flex w-full'>
                    <div className='cv-arrow' />
                    <div className=' flex flex-col text-[#20252f]'>
                      <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                        SELECTED PROJECTS
                      </p>
                      {projects.map((project, index) => (
                        <Project key={index} {...project} />
                      ))}

                      <div className='flex h-full flex-col justify-between'>
                        <div className='mt-10 flex w-full'>
                          <div className='cv-arrow -ml-[22px]' />
                          <div className=' flex flex-col text-[#20252f]'>
                            <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                              SKILLS
                            </p>
                            <div className='ml-[22px] mr-2 mt-6 flex flex-wrap justify-start gap-x-[25px] gap-y-2'>
                              {technos.map((techno, index) => (
                                <div
                                  key={index}
                                  className='hover:text-raspberry mb-3 flex w-[70px] cursor-pointer flex-col items-center text-[#20252ff6] duration-150 hover:drop-shadow-[0_-2px_2px_#80183466]'
                                >
                                  {techno.icon}
                                  <p className='mt-2 text-xs'>{techno.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className='bottom-0 -ml-2 mr-2 mt-[200px] text-center text-[14px] leading-4 opacity-75'>
                          I agree to the processing of personal data provided in
                          this document for realising the recruitment process
                          pursuant to the Personal Data Protection Act of 10 May
                          2018 (Journal of Laws 2018, item 1000) and in
                          agreement with Regulation (EU) 2016/679 of the
                          European Parliament and of the Council of 27 April
                          2016 on the protection of natural persons with regard
                          to the processing of personal data and on the free
                          movement of such data, and repealing Directive
                          95/46/EC (General Data Protection Regulation)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
