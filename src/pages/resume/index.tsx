import Head from 'next/head';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef } from 'react';

import { generatePdf } from '@/lib/generatePdf';
import {
  CallIcon,
  CarIcon,
  ChipIcon,
  CompassIcon,
  GithubIcon,
  GlobalIcon,
  GuitarIcon,
  LanguageIcon,
  LinkedinIcon,
  MailIcon,
  MusicIcon,
  PdfIcon,
  VercelIcon,
} from '@/lib/shared/Icons';
import { resumeTechList, techIconMap } from '@/lib/shared/techMap';

import BottomBar from '@/components/layout/BottomBar';

import { useLocale } from '@/locale/LocaleContext';

export default function CV(): React.JSX.Element {
  const { locale, t } = useLocale();
  const resumeRef = useRef<HTMLDivElement>(null);
  const handleDownloadPdf = useCallback(async () => {
    const element = resumeRef.current;
    if (!element) return;
    try {
      await generatePdf(element, locale);
    } catch {
      alert('PDF generation failed. Please try again.');
    }
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
        <title>{t.resumePageTitle}</title>
      </Head>
      <section className='font-grotesk -mt-[60px] pt-[60px] flex flex-col items-center justify-between bg-linear-to-b from-[#1A1A28] to-[#3a1323] min-h-[95vh] md:min-h-screen'>
        <div className='flex justify-end h-[90vh] md:h-auto flex-col md:flex-row md:items-stretch md:w-[794px]'>
          <button
            onClick={handleDownloadPdf}
            className='hover:bg-orange bg-raspberry my-6 flex items-center px-2 py-1 text-sm tracking-wider text-white duration-150 cursor-pointer'
          >
            {t.resumeHeaderDownload}
            <PdfIcon className='ml-1 text-lg' />
          </button>
        </div>
        <div className='m-10 mt-0 hidden md:block'>
          <div
            ref={resumeRef}
            className='overflow-hidden flex h-[1123px] w-[794px] justify-center bg-primary-blue flex-row'
          >
            {/* Left side */}
            <div className='bg-transparent h-full w-[220px] border-r-[16px] border-raspberry'>
              <Image
                src='/cv.png'
                alt={t.resumeAltPhoto}
                width={200}
                height={200}
              />
              {/* <div className="bg-raspberry h-[8px] w-full"></div> */}
              <div className='flex flex-col justify-between'>
                {[['creative', 'MACIEJ'], ['fullstack', 'SKORUS'], ['developer']].map((lines, i) => (
                  <div key={i}>
                    {lines.map((text, j) => (
                      <p
                        key={text}
                        className={`text-2xl tracking-wide ${j % 2 === 0 ? 'pr-2 text-right font-unica font-light text-white' : 'pl-2 text-left font-[500] bg-raspberry text-primary-blue'}`}
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
              <div className='mt-4 flex flex-col gap-3 text-[11px]'>
                {/* Contact */}
                <div>
                  <p className='bg-deep-blue pl-2 py-[2px] text-[12px] font-semibold tracking-wider text-white'>{t.resumeHeaderContact}</p>
                  <div className='px-2 pt-1 text-white/80 flex flex-col gap-[2px]'>
                    <a href={`mailto:${t.contactEmail}`} className='flex items-center gap-1 hover:text-white'><MailIcon className='text-[10px] shrink-0' />{t.contactEmail}</a>
                    <a href={`tel:${t.contactPhone.replace(/\s/g, '')}`} className='flex items-center gap-1 hover:text-white'><CallIcon className='text-[10px] shrink-0' />{t.contactPhone}</a>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <p className='bg-deep-blue pl-2 py-[2px] text-[12px] font-semibold tracking-wider text-white'>{t.resumeHeaderEducation}</p>
                  <div className='px-2 pt-1 text-white/80'>
                    <p className='font-semibold text-white'>{t.resumeEducation.university}</p>
                    <p>{t.resumeEducation.field}</p>
                    <p className='text-orange brightness-150'>{t.resumeEducation.degree}</p>
                    <p className='text-orange brightness-150'>{t.resumeEducation.dates}</p>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <p className='bg-deep-blue pl-2 py-[2px] text-[12px] font-semibold tracking-wider text-white'>{t.resumeHeaderLanguagesTitle}</p>
                  <div className='px-2 pt-1 text-white/80'>
                    <p>{t.resumeLanguageEnglish}</p>
                    <p>{t.resumeLanguageRussian}</p>
                    <p>{t.resumeLanguagePolish}</p>
                  </div>
                </div>

                {/* Links */}
                <div>
                  <p className='bg-deep-blue pl-2 py-[2px] text-[12px] font-semibold tracking-wider text-white'>{t.resumeHeaderLinks}</p>
                  <div className='px-2 pt-1 text-white/80 flex flex-col gap-[2px]'>
                    <a href='https://github.com/SkorczanFFF' target='_blank' rel='noreferrer' className='flex items-center gap-1 hover:text-white'><GithubIcon className='text-[10px] shrink-0' />github.com/SkorczanFFF</a>
                    <a href='https://www.linkedin.com/in/mskorus/' target='_blank' rel='noreferrer' className='flex items-center gap-1 hover:text-white'><LinkedinIcon className='text-[10px] shrink-0' />linkedin.com/in/mskorus</a>
                    <a href={process.env.NEXT_PUBLIC_SITE_URL || 'https://mskorus.vercel.app/'} target='_blank' rel='noreferrer' className='flex items-center gap-1 hover:text-white'><VercelIcon className='text-[10px] shrink-0' />{(process.env.NEXT_PUBLIC_SITE_URL || 'https://mskorus.vercel.app').replace(/^https?:\/\//, '')}</a>
                  </div>
                </div>

                {/* Hobbies */}
                <div>
                  <p className='bg-deep-blue pl-2 py-[2px] text-[12px] font-semibold tracking-wider text-white'>{t.resumeHeaderHobbies}</p>
                  <div className='px-2 pt-2 flex gap-2'>
                    {([GuitarIcon, CarIcon, MusicIcon, CompassIcon, ChipIcon, LanguageIcon] as const).map((Icon, i) => (
                      <div key={i} className='flex flex-col items-center'>
                        <Icon className='text-[24px] text-white/90' />
                        <span className='mt-1 font-[500] text-[10px] text-white/70' style={{ writingMode: 'vertical-rl' }}>{t.resumeHobbies[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Main content */}
            <div className='bg-white h-full w-[594px] flex flex-col justify-between'>
              <div className='px-4 pt-4'>
                {/* About */}
                <h3 className='text-[13px] font-bold uppercase tracking-[3px] text-primary-blue border-b border-primary-blue/20 pb-1 mb-2'>
                  {t.resumeHeaderAbout}
                </h3>
                <p className='text-[9px] leading-[12px] text-primary-blue/80 mb-4'>
                  {t.resumeAboutMe}
                </p>

                {/* Experience */}
                <h3 className='text-[13px] font-bold uppercase tracking-[3px] text-primary-blue border-b border-primary-blue/20 pb-1 mb-3'>
                  {t.resumeHeaderExperience}
                </h3>
                <div className='flex flex-col gap-4'>
                  {t.experiences.map((exp) => (
                    <div key={exp.company}>
                      <div className='flex items-baseline justify-between'>
                        <p className='text-[12px] font-bold text-primary-blue'>{exp.company}</p>
                        <p className='text-[9px] text-primary-blue/60'>{exp.resumeDate}</p>
                      </div>
                      <p className='text-[10px] italic text-raspberry'>{exp.position}</p>
                      <p className='text-[9px] text-primary-blue/50 mt-[2px]'>{exp.stack.join(' • ')}</p>
                      <ul className='mt-1 flex flex-col gap-[2px]'>
                        {exp.duties.map((duty, i) => (
                          <li key={i} className='text-[9px] leading-[11px] text-primary-blue/80 pl-2 relative before:content-["•"] before:absolute before:left-0 before:text-raspberry'>
                            {duty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Selected Projects */}
                <h3 className='text-[13px] font-bold uppercase tracking-[3px] text-primary-blue border-b border-primary-blue/20 pb-1 mb-3 mt-5'>
                  {t.resumeHeaderSelectedProjects}
                </h3>
                <div className='flex flex-col gap-3'>
                  {t.projects.filter((p) => p.resumeDescription).map((project) => (
                    <div key={project.id}>
                      <div className='flex items-baseline justify-between'>
                        <p className='text-[11px] font-bold text-primary-blue'>{project.title}</p>
                        <p className='text-[9px] text-primary-blue/50'>{project.resumeTechnologies || project.technos}</p>
                      </div>
                      <p className='text-[9px] leading-[11px] text-primary-blue/80 mt-[2px]'>
                        {project.resumeDescription}
                      </p>
                      {(project.git || project.live) && (
                        <div className='mt-[2px] flex gap-3 text-[8px] text-raspberry'>
                          {project.git && (
                            <a href={project.git} target='_blank' rel='noreferrer' className='flex items-center gap-[2px] hover:text-primary-blue'>
                              <GithubIcon className='text-[8px]' />{t.resumeRepo}
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target='_blank' rel='noreferrer' className='flex items-center gap-[2px] hover:text-primary-blue'>
                              <GlobalIcon className='text-[8px]' />{t.resumeDemo}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <h3 className='text-[13px] font-bold uppercase tracking-[3px] text-primary-blue border-b border-primary-blue/20 pb-1 mb-3 mt-5'>
                  {t.resumeHeaderSkills}
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {resumeTechList.map((tech) => {
                    const Icon = techIconMap[tech];
                    return (
                      <div key={tech} className='flex items-center gap-[3px] text-[9px] text-primary-blue/70'>
                        {Icon && <Icon className='text-[12px] text-primary-blue' />}
                        <span>{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className='px-2 pb-[5px] text-[8.8px] leading-[8px] text-primary-blue/40 text-justify'>
                {t.resumeRodo}
              </p>
            </div>
          </div>
        </div>
        <BottomBar />
      </section>
    </>
  );
}
