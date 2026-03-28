import React from 'react';

import {
  CallIcon,
  CarIcon,
  ChipIcon,
  CompassIcon,
  GithubIcon,
  GuitarIcon,
  LanguageIcon,
  LinkedinIcon,
  MailIcon,
  MusicIcon,
  VercelIcon,
} from '@/lib/shared/Icons';

import type { Dictionary } from '@/locale/types';

export default function ResumeSidebar({ t }: { t: Dictionary }) {
  return (
    <div className='from-primary-blue via-primary-blue flex h-[2015px] w-[380px] flex-col bg-linear-to-b from-0% via-60% to-[#172933] to-100%'>
      <div className='arrow-top-left white' />
      <div className='flex flex-col items-center justify-center'>
        <p className='ml-[35px] mt-[23px] text-[3rem] font-extralight tracking-[32px] text-white'>
          MACIEJ
        </p>
        <p className='z-10 ml-[30px] mt-[27px] text-[3.25rem] tracking-[26px] text-white'>
          SKORUS
        </p>
        <div className='to-raspberry via-raspberry -mt-[14px] h-[4px] w-full bg-linear-to-r from-transparent' />
      </div>
      <div className='mt-[65px] h-full'>
        <div className='h-[4px] w-[95%] bg-linear-to-r from-white from-10% to-transparent to-100%' />
        <img
          src='/cvphoto.png'
          alt='Me'
          className='mx-auto mt-[60px] w-[70%]'
        />
        <div className='to-raspberry via-raspberry mt-[60px] h-[4px] w-full bg-linear-to-r from-transparent' />
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
            <p className='font-medium '>{t.resumeEducation.university}</p>
            <p className='text-white/80'>{t.resumeEducation.field}</p>
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
            <p className=''>{t.resumeLanguageEnglish}</p>
            <p className=''>{t.resumeLanguageRussian}</p>
            <p className=''>{t.resumeLanguagePolish}</p>
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
        <div className='mt-5 flex h-[35.5%] max-h-full flex-col items-end justify-between'>
          <div className='flex items-center justify-end gap-3'>
            <p className='text-raspberry text-2xl font-semibold tracking-[3px]'>
              {t.resumeHeaderHobbies}
            </p>
            <div className='cv-arrow -mr-1 -rotate-180 scale-75' />
          </div>
          <div className=' flex h-full flex-col justify-between'>
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
  );
}
