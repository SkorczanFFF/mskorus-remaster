import Head from 'next/head';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

import {
  AutodeskIcon,
  BitbucketIcon,
  BlenderIcon,
  CallIcon,
  CanvaIcon,
  CarIcon,
  ChipIcon,
  CompassIcon,
  CssIcon,
  CursorIcon,
  FirebaseIcon,
  GithubIcon,
  GitlabIcon,
  GlobeIcon,
  GuitarIcon,
  HtmlIcon,
  JavaIcon,
  LanguageIcon,
  LaravelIcon,
  LinkedinIcon,
  MailIcon,
  MongodbIcon,
  MusicIcon,
  MysqlIcon,
  NextjsIcon,
  NodejsIcon,
  NpmIcon,
  PdfIcon,
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
  VercelIcon,
  WordpressIcon,
  YarnIcon,
} from '@/lib/shared/Icons';

import english from './Languages/english.json';
import polish from './Languages/polish.json';

const technos = [
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
  { icon: <PhpIcon className='text-5xl' />, label: 'PHP' },
  { icon: <NodejsIcon className='text-5xl' />, label: 'Node.js' },
  { icon: <JavaIcon className='text-5xl' />, label: 'Java' },
  { icon: <PythonIcon className='text-5xl' />, label: 'Python' },
  { icon: <LaravelIcon className='text-5xl' />, label: 'Laravel' },
  { icon: <WordpressIcon className='text-5xl' />, label: 'Wordpress' },
  { icon: <SanityIcon className='text-5xl' />, label: 'Sanity' },
  { icon: <MysqlIcon className='text-5xl' />, label: 'MySQL' },
  { icon: <FirebaseIcon className='text-5xl' />, label: 'Firebase' },
  { icon: <MongodbIcon className='text-5xl' />, label: 'MongoDB' },
  { icon: <PhotoshopIcon className='text-5xl' />, label: 'Photoshop' },
  { icon: <AutodeskIcon className='text-5xl' />, label: '3Ds Max' },
  { icon: <BlenderIcon className='text-5xl' />, label: 'Blender' },
  { icon: <CanvaIcon className='text-5xl' />, label: 'Canva' },
  { icon: <GithubIcon className='text-5xl' />, label: 'GitHub' },
  { icon: <BitbucketIcon className='text-5xl' />, label: 'BitBucket' },
  { icon: <GitlabIcon className='text-5xl' />, label: 'GitLab' },
  { icon: <CursorIcon className='text-5xl' />, label: 'CursorAI' },
  { icon: <YarnIcon className='text-5xl' />, label: 'Yarn' },
  { icon: <NpmIcon className='text-5xl' />, label: 'npm' },
];

interface ProjectData {
  title: string;
  technologies: string;
  description: string;
  repositoryLink: string;
  demoLink: string;
  repo: string;
  demo: string;
}

const Project: React.FC<ProjectData> = ({
  title,
  technologies,
  description,
  repositoryLink,
  demoLink,
  repo,
  demo,
}) => (
  <div className='ml-6 mt-6'>
    <p className='text-2xl font-[500] tracking-widest'>{title}</p>
    <div className='flex flex-col'>
      <div className='text-raspberry ml-2 mr-8 mt-2 flex items-center text-lg tracking-wide'>
        {technologies}
      </div>
      <p className='ml-2 mr-8 mt-2 flex items-center text-xl leading-[20px] text-justify'>
        {description}
      </p>
      <div className='ml-4 mt-2 flex gap-10 text-xl'>
        <a
          className='hover:text-raspberry flex cursor-pointer items-center gap-2 duration-150'
          href={repositoryLink}
          target='_blank'
          rel='noreferrer'
        >
          <GithubIcon className='text-3xl' /> {repo}
        </a>
        <a
          className='hover:text-raspberry flex cursor-pointer items-center gap-2 duration-150'
          href={demoLink}
          target='_blank'
          rel='noreferrer'
        >
          <GlobeIcon className='text-2xl' /> {demo}
        </a>
      </div>
    </div>
  </div>
);

export default function CV(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
          {isMobile ? (
            <a
              className='text-white'
              href='/Maciej Skorus - CV [ENG].pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              Download resume in PDF format
            </a>
          ) : (
            <div className='my-auto flex h-[28px] mr-2'>
              <label
                htmlFor='language-select'
                className='mr-2 mt-[3px] text-sm text-white'
              >
                Language/Język
              </label>
              <select
                id='language-select'
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className='hover:bg-orange bg-raspberry focus:bg-orange overflow-visible border-transparent py-0 text-xs tracking-wider text-white ring-gray-300 duration-150 min-w-[100px] cursor-pointer'
              >
                <option value='english'>English</option>
                <option value='polish'>Polish</option>
              </select>
            </div>
          )}

          <a
            className='hover:bg-orange bg-raspberry my-6 flex items-center px-2 py-1 text-sm tracking-wider text-white duration-150 cursor-pointer'
            href='/Maciej Skorus - CV [ENG].pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            {languageData.headers.download}
            <PdfIcon className='ml-1 text-lg' />
          </a>
        </div>
        {!isMobile && (
          <div className='xxl:overflow-hidden m-10 mt-0 flex h-[2015px] w-[1421px] justify-center overflow-scroll bg-white'>
            <div className='flex w-full'>
              <div className='from-primary-blue via-primary-blue flex h-[2015px] w-[380px] flex-col bg-gradient-to-b from-0% via-60% to-[#172933] to-100%'>
                <div className='arrow-top-left white' />
                <div className='flex flex-col items-center justify-center'>
                  <p className='ml-[35px] mt-[23px] text-[3rem] font-[200] tracking-[32px] text-white'>
                    MACIEJ
                  </p>
                  <p className='z-10 ml-[30px] mt-[27px] text-[3.25rem] tracking-[26px] text-white'>
                    SKORUS
                  </p>
                  <div className='to-raspberry via-raspberry -mt-[14px] h-[4px] w-full bg-gradient-to-r from-transparent' />
                </div>
                <div className='mt-[65px] h-[100%]'>
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
                    <p className='ml-6 mr-8 mt-2 text-end text-[20px] tracking-[0px] leading-6 text-white'>
                      {languageData.aboutme}
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
                        skorusmaciej94@gmail.com <MailIcon />
                      </a>
                      <a
                        href='tel:+48668366648'
                        className='hover:text-orange flex items-center justify-end gap-2 duration-150'
                        target='_blank'
                        rel='noreferrer'
                      >
                        +48 668 366 648
                        <CallIcon />
                      </a>
                    </div>
                  </div>
                  <div className='mt-5 flex flex-col items-end'>
                    <div className='flex items-center justify-end gap-3'>
                      <p className='text-raspberry text-2xl font-[600] tracking-[3px]'>
                        {languageData.headers.education}
                      </p>
                      <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                    </div>
                    <div className='mx-4 mr-9 mt-2 flex flex-col text-end text-xl text-white'>
                      <p className='font-[500] '>
                        {languageData.education.university}
                      </p>
                      <p className='text-white/80'>
                        {languageData.education.field}
                      </p>
                      <p className='text-orange/75 text-lg brightness-200'>
                        {languageData.education.degree}
                      </p>
                      <p className='text-orange/75 text-lg brightness-200'>
                        {languageData.education.dates}
                      </p>
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
                        /skorczanFFF <GithubIcon className='-mt-[2px]' />
                      </a>
                      <a
                        className='hover:text-orange flex items-center gap-2 duration-150'
                        href='https://linkedin.com/mskorus'
                        target='_blank'
                        rel='noreferrer'
                      >
                        /mskorus <LinkedinIcon className='-mt-[2px]' />
                      </a>
                      <a
                        className='hover:text-orange flex items-center gap-2 duration-150'
                        href='https://mskorus.vercel.app/'
                        target='_blank'
                        rel='noreferrer'
                      >
                        mskorus.vercel.app <VercelIcon className='-mt-[2px]' />
                      </a>
                    </div>
                  </div>
                  <div className='mt-5 flex h-[35.5%] max-h-[100%] flex-col items-end justify-between'>
                    <div className='flex items-center justify-end gap-3'>
                      <p className='text-raspberry text-2xl font-[600] tracking-[3px]'>
                        {languageData.headers.hobbies}
                      </p>
                      <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                    </div>
                    <div className=' flex h-[100%] flex-col justify-between'>
                      <div className='mx-4 mr-7 mt-3 flex flex-col items-center gap-5 text-end text-xl text-white'>
                        <div className='flex w-[310px] justify-between'>
                          <GuitarIcon className='text-6xl' />
                          <CarIcon className='text-6xl' />
                          <MusicIcon className='text-6xl' />
                        </div>
                        <div className='flex w-[310px] justify-between'>
                          <CompassIcon className='text-6xl' />
                          <ChipIcon className='text-6xl' />
                          <LanguageIcon className='text-6xl' />
                        </div>
                      </div>
                      {/* <div className='mx-4 text-justify text-[12px] leading-4 text-white/40 opacity-75'>
                        {languageData.rodo}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='bg-primary-blue flex h-[90px] w-full items-center text-white'>
                  <p className='right-0 mx-auto text-4xl font-[400] tracking-[15px]'>
                    FRONTEND DEVELOPER
                  </p>
                </div>
                <div className='flex'>
                  <div className='bg-raspberry h-[1932px]'>
                    <div className='arrow-top-left cv-blue' />
                  </div>
                  <div className='flex h-[1931px] w-[1011px] flex-col bg-white'>
                    <div className='mt-[20px]' />
                    <div className='flex w-full'>
                      <div className='cv-arrow' />
                      <div className=' -mt-[4px] flex flex-col text-[#20252f]'>
                        <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                          {languageData.headers.experience}
                        </p>
                        {(Array.isArray(languageData.experience)
                          ? languageData.experience
                          : [languageData.experience]
                        ).map((exp, index) => (
                          <div
                            key={index}
                            className={`mx-5 ${
                              index % 2 === 0 ? 'mt-1' : 'mt-3'
                            }`}
                          >
                            <div className='mb-4 mt-2 flex items-center justify-between gap-5 text-2xl tracking-[2px]'>
                              <p className='text-2xl font-[500] tracking-[5px]'>
                                {exp.company}
                              </p>
                              <div className='flex items-center justify-end'>
                                <p className='text-[20px] '>{exp.position}</p>
                                <p className='text-raspberry ml-2 mt-[2px] text-lg'>
                                  {exp.duration}
                                </p>
                              </div>
                            </div>
                            <div className=' flex w-full flex-col items-start gap-2 text-xl'>
                              {Object.entries(exp.duties).map(([key, duty]) => (
                                <li
                                  key={key}
                                  className='m-0 p-0 leading-[20px] text-justify'
                                >
                                  {duty}
                                </li>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='mt-10 flex w-full'>
                      <div className='cv-arrow' />
                      <div className=' -mt-[5px] flex flex-col text-[#20252f]'>
                        <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                          {languageData.headers['selected-projects']}
                        </p>
                        {languageData.projects.map((project, index) => (
                          <Project
                            repo={
                              selectedLanguage === 'english'
                                ? 'repository'
                                : 'repozytorium'
                            }
                            demo={
                              selectedLanguage === 'english'
                                ? 'web demo'
                                : 'wersja demonstracyjna'
                            }
                            key={index}
                            {...project}
                          />
                        ))}

                        <div className='flex h-full flex-col justify-between'>
                          <div className='mt-10 flex w-full ml-[4px]'>
                            <div className='cv-arrow -ml-[22px]' />
                            <div className=' flex flex-col text-[#20252f] -mt-[5px]'>
                              <p className='text-raspberry ml-4 text-3xl font-[500] tracking-[5px]'>
                                {languageData.headers.skills}
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
                          <div
                            className={`bottom-0 -ml-2 mr-2 ${selectedLanguage === 'english' ? 'mt-[10px]' : 'mt-[2px]'} px-4 text-center text-[14px] leading-4 opacity-75`}
                          >
                            {languageData.rodo}
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
