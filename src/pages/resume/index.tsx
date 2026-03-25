import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';

import {
  CallIcon,
  CarIcon,
  ChipIcon,
  CompassIcon,
  GithubIcon,
  GlobeIcon,
  GuitarIcon,
  LanguageIcon,
  LinkedinIcon,
  MailIcon,
  MusicIcon,
  PdfIcon,
  VercelIcon,
} from '@/lib/shared/Icons';
import { resumeTechList,techIconMap } from '@/lib/shared/techMap';

import { useLocale } from '@/locale/LocaleContext';
import type { ProjectEntry } from '@/locale/types';

interface ResumeProjectProps {
  project: ProjectEntry;
  repo: string;
  demo: string;
}

const ResumeProject: React.FC<ResumeProjectProps> = ({
  project,
  repo,
  demo,
}) => (
  <div className='ml-6 mt-6'>
    <p className='text-2xl font-medium tracking-widest'>{project.title}</p>
    <div className='flex flex-col'>
      <div className='text-raspberry ml-2 mr-8 mt-2 flex items-center text-lg tracking-wide'>
        {project.resumeTechnologies ?? project.technos}
      </div>
      <p className='ml-2 mr-8 mt-2 flex items-center text-xl leading-[20px] text-justify'>
        {project.resumeDescription ?? project.description}
      </p>
      <div className='ml-4 mt-2 flex gap-10 text-xl'>
        <a
          className='hover:text-raspberry flex cursor-pointer items-center gap-2 duration-150'
          href={project.git}
          target='_blank'
          rel='noreferrer'
        >
          <GithubIcon className='text-3xl' /> {repo}
        </a>
        <a
          className='hover:text-raspberry flex cursor-pointer items-center gap-2 duration-150'
          href={project.live}
          target='_blank'
          rel='noreferrer'
        >
          <GlobeIcon className='text-2xl' /> {demo}
        </a>
      </div>
    </div>
  </div>
);

export default function CV(): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  const { locale, t } = useLocale();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = useCallback(async () => {
    const element = resumeRef.current;
    if (!element) return;

    const html2canvas = (await import('html2canvas-pro')).default;
    const { jsPDF } = await import('jspdf');
    const langSuffix = locale === 'pl' ? 'PL' : 'ENG';

    const pxToMm = (px: number) => (px * 25.4) / 96;

    element.style.overflow = 'visible';
    const fullHeight = element.scrollHeight;
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      height: fullHeight,
      windowHeight: fullHeight,
    });
    element.style.overflow = '';
    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    const wMm = pxToMm(canvas.width);
    const hMm = pxToMm(canvas.height);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [wMm, hMm],
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, wMm, hMm);
    pdf.save(`Maciej Skorus - CV [${langSuffix}].pdf`);
  }, [locale]);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('download') === '1') {
      const timer = setTimeout(() => handleDownloadPdf(), 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams, handleDownloadPdf]);

  return (
    <>
      <Head>
        <title>Maciej Skorus - Resume - Frontend Developer</title>
      </Head>
      <section
        className={`font-grotesk flex  flex-col items-center justify-between bg-gradient-to-b from-[#1A1A28] to-[#3a1323] ${isMobile ? 'min-h-[95vh]' : 'min-h-[100vh]'
          }`}
      >
        <div
          className={`xxl:justify-end flex  justify-center ${isMobile
            ? 'h-[90vh] flex-col items-center justify-center'
            : 'w-[1421px]'
            }`}
        >
          <button
            onClick={handleDownloadPdf}
            className='hover:bg-orange bg-raspberry my-6 flex items-center px-2 py-1 text-sm tracking-wider text-white duration-150 cursor-pointer'
          >
            {t.resumeHeaderDownload}
            <PdfIcon className='ml-1 text-lg' />
          </button>
        </div>
        {!isMobile && (
          <div className='m-10 mt-0'>
            <div ref={resumeRef} className='overflow-hidden flex h-[2015px] w-[1421px] justify-center bg-white'>
              <div className='flex w-full bg-primary-blue'>
                <div className='from-primary-blue via-primary-blue flex h-[2015px] w-[380px] flex-col bg-gradient-to-b from-0% via-60% to-[#172933] to-100%'>
                  <div className='arrow-top-left white' />
                  <div className='flex flex-col items-center justify-center'>
                    <p className='ml-[35px] mt-[23px] text-[3rem] font-extralight tracking-[32px] text-white'>
                      MACIEJ
                    </p>
                    <p className='z-10 ml-[30px] mt-[27px] text-[3.25rem] tracking-[26px] text-white'>
                      SKORUS
                    </p>
                    <div className='to-raspberry via-raspberry -mt-[14px] h-[4px] w-full bg-gradient-to-r from-transparent' />
                  </div>
                  <div className='mt-[65px] h-[100%]'>
                    <div className='h-[4px] w-[95%] bg-gradient-to-r from-white from-10% to-transparent to-100%' />
                    <img
                      src='/cvphoto.png'
                      alt='Me'
                      className='mx-auto mt-[60px] w-[70%]'
                    />
                    <div className='to-raspberry via-raspberry mt-[60px] h-[4px] w-full bg-gradient-to-r from-transparent' />
                    <div className='mt-5 flex flex-col items-end'>
                      <div className='mt-[7px] flex items-center justify-end gap-3'>
                        <p className='text-raspberry text-2xl font-semibold tracking-[3px]'>
                          {t.resumeHeaderAbout}
                        </p>
                        <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                      </div>
                      <p className='ml-6 mr-8 mt-2 text-end text-[20px] tracking-[0px] leading-6 text-white'>
                        {t.resumeAboutMe}
                      </p>
                    </div>
                    <div className='mt-5 flex flex-col items-end'>
                      <div className='flex items-center justify-end gap-3'>
                        <p className='text-raspberry text-2xl font-semibold tracking-[3px]'>
                          {t.resumeHeaderContact}
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
                        <p className='text-raspberry text-2xl font-semibold tracking-[3px]'>
                          {t.resumeHeaderEducation}
                        </p>
                        <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                      </div>
                      <div className='mx-4 mr-9 mt-2 flex flex-col text-end text-xl text-white'>
                        <p className='font-medium '>
                          {t.resumeEducation.university}
                        </p>
                        <p className='text-white/80'>
                          {t.resumeEducation.field}
                        </p>
                        <p className='text-orange/75 text-lg brightness-200'>
                          {t.resumeEducation.degree}
                        </p>
                        <p className='text-orange/75 text-lg brightness-200'>
                          {t.resumeEducation.dates}
                        </p>
                      </div>
                    </div>
                    <div className='mt-5 flex flex-col items-end'>
                      <div className='flex items-center justify-end gap-3'>
                        <p className='text-raspberry text-2xl font-semibold tracking-[3px]'>
                          {t.resumeHeaderLanguagesTitle}
                        </p>
                        <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
                      </div>
                      <div className='mx-4 mr-9 mt-2 flex flex-col text-end text-xl text-white'>
                        <p className=''>
                          {t.resumeLanguageEnglish}
                        </p>
                        <p className=''>
                          {t.resumeLanguageRussian}
                        </p>
                        <p className=''>
                          {t.resumeLanguagePolish}
                        </p>
                      </div>
                    </div>

                    <div className='mt-5 flex flex-col items-end'>
                      <div className='flex items-center justify-end gap-3'>
                        <p className='text-raspberry text-2xl font-semibold tracking-[3px]'>
                          {t.resumeHeaderLinks}
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
                        <p className='text-raspberry text-2xl font-semibold tracking-[3px]'>
                          {t.resumeHeaderHobbies}
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='bg-primary-blue flex h-[90px] w-full items-center text-white'>
                    <p className='right-0 mx-auto text-4xl font-normal tracking-[15px]'>
                      FRONTEND DEVELOPER
                    </p>
                  </div>
                  <div className='flex'>
                    <div className='bg-raspberry h-[1932px]'>
                      <div className='arrow-top-left blue' />
                    </div>
                    <div className='flex h-[1931px] w-[1011px] flex-col bg-white'>
                      <div className='mt-[20px]' />
                      <div className='flex w-full'>
                        <div className='cv-arrow -ml-[1px]' />
                        <div className=' -mt-[4px] flex flex-col text-[#20252f]'>
                          <p className='text-raspberry ml-4 text-3xl font-medium tracking-[5px]'>
                            {t.resumeHeaderExperience}
                          </p>
                          {t.experiences.map((exp, index) => (
                            <div
                              key={index}
                              className={`mx-5 ${index % 2 === 0 ? 'mt-1' : 'mt-3'
                                }`}
                            >
                              <div className='mb-4 mt-2 flex items-center justify-between gap-5 text-2xl tracking-[2px]'>
                                <p className='text-2xl font-medium tracking-[5px]'>
                                  {exp.company}
                                </p>
                                <div className='flex items-center justify-end'>
                                  <p className='text-[20px] '>{exp.position}</p>
                                  <p className='text-raspberry ml-2 mt-[2px] text-lg'>
                                    {exp.resumeDate}
                                  </p>
                                </div>
                              </div>
                              <div className=' flex w-full flex-col items-start gap-2 text-xl'>
                                {exp.duties.map((duty, i) => (
                                  <li
                                    key={i}
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
                        <div className='cv-arrow -ml-[1px]' />
                        <div className=' -mt-[5px] flex flex-col text-[#20252f]'>
                          <p className='text-raspberry ml-4 text-3xl font-medium tracking-[5px]'>
                            {t.resumeHeaderSelectedProjects}
                          </p>
                          {t.projects
                            .filter((p) => p.resumeDescription)
                            .map((project, index) => (
                              <ResumeProject
                                repo={t.resumeRepo}
                                demo={t.resumeDemo}
                                key={index}
                                project={project}
                              />
                            ))}

                          <div className='flex h-full flex-col justify-between'>
                            <div className='mt-10 flex w-full ml-[4px]'>
                              <div className='cv-arrow -ml-[23px]' />
                              <div className=' flex flex-col text-[#20252f] -mt-[5px]'>
                                <p className='text-raspberry ml-4 text-3xl font-medium tracking-[5px]'>
                                  {t.resumeHeaderSkills}
                                </p>
                                <div className='ml-[22px] mr-2 mt-6 flex flex-wrap justify-start gap-x-[25px] gap-y-2'>
                                  {resumeTechList.map((label) => {
                                    const Icon = techIconMap[label];
                                    return Icon ? (
                                      <div
                                        key={label}
                                        className='hover:text-raspberry text-primary-blue mb-3 flex w-[70px] cursor-pointer flex-col items-center duration-150 hover:drop-shadow-[0_-2px_2px_#80183466]'
                                      >
                                        <Icon className='text-5xl' />
                                        <p className='mt-2 text-[10px] leading-3'>
                                          {label}
                                        </p>
                                      </div>
                                    ) : null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`bottom-0 -ml-2 mr-2 ${locale === 'en' ? 'mt-[10px]' : 'mt-[2px]'} px-4 text-center text-[14px] leading-4 opacity-75`}
                            >
                              {t.resumeRodo}
                            </div>
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
