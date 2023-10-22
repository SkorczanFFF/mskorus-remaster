import Head from 'next/head';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import {
  AiFillCar,
  AiFillCompass,
  AiFillFilePdf,
  AiFillGithub,
  AiFillHtml5,
  AiFillMail,
} from 'react-icons/ai';
import { BiLogoJava } from 'react-icons/bi';
import { BsDot, BsGithub, BsGlobe2, BsLinkedin } from 'react-icons/bs';
import { GiGuitarBassHead } from 'react-icons/gi';
import { GrMysql } from 'react-icons/gr';
import { HiChip, HiMusicNote } from 'react-icons/hi';
import { HiMiniLanguage } from 'react-icons/hi2';
import {
  IoCallSharp,
  IoLogoCss3,
  IoLogoReact,
  IoLogoWordpress,
} from 'react-icons/io5';
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

import english from './Languages/english.json';
import polish from './Languages/polish.json';

const technos = [
  { icon: <AiFillHtml5 className='text-5xl' />, label: 'HTML5' },
  { icon: <SiTypescript className='text-5xl' />, label: 'TypeScript' },
  { icon: <SiNextdotjs className='text-5xl' />, label: 'Next.js' },
  { icon: <IoLogoReact className='text-5xl' />, label: 'React' },
  { icon: <SiRedux className='text-5xl' />, label: 'Redux' },
  { icon: <SiThreedotjs className='text-5xl' />, label: 'Three.js' },
  { icon: <IoLogoCss3 className='text-5xl' />, label: 'CSS3' },
  { icon: <SiTailwindcss className='text-5xl' />, label: 'Tailwind' },
  { icon: <SiSass className='text-5xl' />, label: 'Sass' },
  { icon: <SiFirebase className='text-5xl' />, label: 'Firebase' },
  { icon: <SiMongodb className='text-5xl' />, label: 'MongoDB' },
  { icon: <GrMysql className='text-5xl' />, label: 'MySQL' },
  { icon: <SiNodedotjs className='text-5xl' />, label: 'Node.js' },
  { icon: <BiLogoJava className='text-5xl' />, label: 'Java' },
  { icon: <IoLogoWordpress className='text-5xl' />, label: 'Wordpress' },
  { icon: <SiAdobephotoshop className='text-5xl' />, label: 'Photoshop' },
  { icon: <SiAutodesk className='text-5xl' />, label: '3Ds Max' },
  { icon: <SiBlender className='text-5xl' />, label: 'Blender' },
  { icon: <AiFillGithub className='text-5xl' />, label: 'GitHub' },
  { icon: <SiBitbucket className='text-5xl' />, label: 'BitBucket' },
  { icon: <SiGitlab className='text-5xl' />, label: 'GitLab' },
  { icon: <SiVisualstudiocode className='text-5xl' />, label: 'VS Code' },
  { icon: <SiYarn className='text-5xl' />, label: 'Yarn' },
  { icon: <SiNpm className='text-5xl' />, label: 'npm' },
];

const projects = [
  {
    title: 'PORTFOLIO PAGE',
    technologies:
      'Next.js • TypeScript • TailwindCSS • React Three Fiber/Three.js • Blender',
    description:
      'Remaster of my deprecated React portfolio page. Now it`s based on Next.js with TailwindCSS and TypeScript. Some parts of WebGL scene are GLTF models made in Blender and converted to React Three Fiber JSX components for better operating. Now features built-in web version of resume.',
    repositoryLink: 'https://github.com/SkorczanFFF/mskorus-remaster',
    demoLink: 'https://mskorus.vercel.app/',
  },
  {
    title: 'POLONEZ AUTODRIVE',
    technologies: 'HTML • JavaScript • Three.js • 3D Studio Max 2019',
    description:
      'Simple Three.js scene made with 3D Studio Max 2019. Models with animations were exported to .fbx files and baked into Synthwave/80`s vibe `coloring book` like animation with built-in GUI to play with scene colors and models. Turn on some music and have fun with coloring!',
    repositoryLink: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    demoLink: 'https://skorczanfff.github.io/Polonez-Autodrive/',
  },
  {
    title: 'YET ANOTHER WEATHER APP',
    technologies: 'React • JavaScript • Sass • Vanta.js • OpenWeather API',
    description:
      'Another `weather application`, but with a breath of fresh air. Weather informations are displayed for the selected city or by geolocation of the user, and the interface has been enriched with additional possibilities to interact with displayed weather data and background. Unfortunately, still desktop only.',
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
    <p className='text-2xl font-[500] tracking-widest'>{title}</p>
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
  const currentYear = new Date().getFullYear();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
  const handleLanguageChange = (e: any) => {
    setSelectedLanguage(e.target.value);
  };

  const languageData = selectedLanguage === 'english' ? english : polish;

  return (
    <>
      <Head>
        <title>Maciej Skorus - Resume - Frontend Developer</title>
      </Head>
      <section
        className={`font-mont flex  flex-col items-center justify-between bg-gradient-to-b from-[#1A1A28] to-[#3a1323] ${
          isMobile ? 'min-h-[95vh]' : 'min-h-[100vh]'
        }`}
      >
        <div
          className={`xxl:justify-end flex  justify-center ${
            isMobile
              ? 'h-[90vh] flex-col items-center justify-center'
              : 'w-[1421px]'
          }`}
        >
          {isMobile && (
            <p className='text-white'>Download resume in PDF format</p>
          )}
          <div>
            <label htmlFor='language-select'>Select Language:</label>
            <select
              id='language-select'
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value='english'>English</option>
              <option value='polish'>Polish</option>
            </select>
            <div>{/* Use languageData to render your content */}</div>
          </div>
          <a
            href='/cv.pdf'
            download='Maciej Skorus - CV'
            className='hover:bg-orange bg-raspberry my-6 flex items-center px-2 py-1 text-sm tracking-wider text-white duration-150'
          >
            {languageData.headers.download}
            <AiFillFilePdf className='ml-1 text-lg' />
          </a>
        </div>
        {!isMobile && (
          <div className='xxl:overflow-hidden m-10 mt-0 flex h-[2015px] w-[1421px] overflow-scroll bg-white'>
            <div className='flex w-full'>
              <div className='from-primary-blue via-primary-blue flex h-[2015px] w-[380px] flex-col bg-gradient-to-b from-0% via-60% to-[#172933] to-100%'>
                <div className='arrow-top-left white' />
                <div className='flex flex-col items-center justify-center'>
                  <p className='ml-[35px] mt-[26px] text-[3rem] font-[200] tracking-[32px] text-white'>
                    MACIEJ
                  </p>
                  <p className='z-10 ml-[30px] mt-[27px] text-[3.25rem] tracking-[23px] text-white'>
                    SKORUS
                  </p>
                  <div className='to-raspberry via-raspberry -mt-[18px] h-[4px] w-full bg-gradient-to-r from-transparent' />
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
                      <p className='text-raspberry text-2xl font-[600] tracking-[3px]'>
                        {languageData.headers.about}
                      </p>
                      <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                    </div>
                    <p className='ml-7 mr-9 mt-2 text-end text-lg tracking-[0px] text-white'>
                      I am a motivated developer with a deep enthusiasm for
                      cutting-edge web technologies, with a strong interest in
                      WebGL. With my first experience on the Blockchain in game
                      development industry and curiosity about the possibilities
                      of web development, my goal is to create and deliver
                      exceptional web experiences. I am constantly looking for
                      new challenges in the evolving field of technology and
                      currently looking for a new team to grow with and achieve
                      something special and
                      <br />
                      innovative together.
                    </p>
                  </div>
                  <div className='mt-5 flex flex-col items-end'>
                    <div className='flex items-center justify-end gap-3'>
                      <p className='text-raspberry text-2xl font-[600] tracking-[3px]'>
                        {languageData.headers.contact}
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
                      <p className='text-raspberry text-2xl font-[600] tracking-[3px]'>
                        {languageData.headers.languages.languages}
                      </p>
                      <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                    </div>
                    <div className='mx-4 mr-9 mt-2 flex flex-col text-end text-xl text-white'>
                      <p className=''>
                        {languageData.headers.languages.english}
                      </p>
                      <p className=''>
                        {languageData.headers.languages.russian}
                      </p>
                      <p className=''>
                        {languageData.headers.languages.polish}
                      </p>
                    </div>
                  </div>
                  <div className='mt-5 flex flex-col items-end'>
                    <div className='flex items-center justify-end gap-3'>
                      <p className='text-raspberry text-2xl font-[600] tracking-[3px]'>
                        {languageData.headers.links}
                      </p>
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
                      <p className='text-raspberry text-2xl font-[600] tracking-[3px]'>
                        {languageData.headers.hobbies}
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
                <div className='bg-primary-blue flex h-[90px] w-full items-center text-white'>
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
                          {languageData.headers.experience}
                        </p>
                        <div className='ml-6 mt-3'>
                          <p className='text-2xl font-[500] tracking-[5px]'>
                            {languageData.experience.company}
                          </p>
                          <div className='mb-4 mt-2 flex items-center gap-5 text-2xl tracking-[2px]'>
                            <p>{languageData.experience.position}</p>
                            <p className='text-raspberry text-lg'>
                              {languageData.experience.duration}
                            </p>
                          </div>
                          <div className='ml-1 flex w-full flex-col items-start gap-2 text-xl'>
                            <li className='m-0 p-0'>
                              {languageData.experience.duties[1]}
                            </li>
                            <li>{languageData.experience.duties[2]}</li>
                            <li
                            // className={`flex ${
                            //   selectedLanguage == 'english' ? 'mr-10' : ''
                            // }`}
                            >
                              {languageData.experience.duties[3]}
                            </li>
                            <li>{languageData.experience.duties[4]}</li>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mt-10 flex w-full'>
                      <div className='cv-arrow' />
                      <div className=' flex flex-col text-[#20252f]'>
                        <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                          {languageData.headers.education}
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
                                SKILLS AND TOOLS
                              </p>
                              <div className='ml-[22px] mr-2 mt-6 flex flex-wrap justify-start gap-x-[25px] gap-y-2'>
                                {technos.map((techno, index) => (
                                  <div
                                    key={index}
                                    className='hover:text-raspberry text-primary-blue mb-3 flex w-[70px] cursor-pointer flex-col items-center duration-150 hover:drop-shadow-[0_-2px_2px_#80183466]'
                                  >
                                    {techno.icon}
                                    <p className='mt-2 text-[10px] leading-3'>
                                      {techno.label}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className='bottom-0 -ml-2 mr-2 mt-[90px] text-center text-[14px] leading-4 opacity-75'>
                            I agree to the processing of personal data provided
                            in this document for realising the recruitment
                            process pursuant to the Personal Data Protection Act
                            of 10 May 2018 (Journal of Laws 2018, item 1000) and
                            in agreement with Regulation (EU) 2016/679 of the
                            European Parliament and of the Council of 27 April
                            2016 on the protection of natural persons with
                            regard to the processing of personal data and on the
                            free movement of such data, and repealing Directive
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
        )}
        <div className='border-primary-blue gradient w-full border-t-2 text-center'>
          <p className='text-primary-blue p-2 text-xs tracking-wider'>
            &copy; {currentYear} Maciej Skorus
          </p>
        </div>
      </section>
    </>
  );
}
