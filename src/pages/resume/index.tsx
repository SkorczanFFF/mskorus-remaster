import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef } from 'react';

import { generatePdf } from '@/lib/generatePdf';
import { PdfIcon } from '@/lib/shared/Icons';

import ResumeContent from '@/components/Resume/ResumeContent';
import ResumeSidebar from '@/components/Resume/ResumeSidebar';

import { useLocale } from '@/locale/LocaleContext';

export default function CV(): React.JSX.Element {
  const currentYear = new Date().getFullYear();
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
        <title>Maciej Skorus - Resume - Frontend Developer</title>
      </Head>
      <section className='font-grotesk -mt-[60px] pt-[60px] flex flex-col items-center justify-between bg-linear-to-b from-[#1A1A28] to-[#3a1323] min-h-[95vh] md:min-h-screen'>
        <div className='xxl:justify-end flex justify-center h-[90vh] md:h-auto flex-col md:flex-row items-center md:items-stretch md:w-[1421px]'>
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
            className='overflow-hidden flex h-[2015px] w-[1421px] justify-center bg-white'
          >
            <div className='flex w-full bg-primary-blue'>
              <ResumeSidebar t={t} />
              <ResumeContent t={t} locale={locale} />
            </div>
          </div>
        </div>
        <div className='border-primary-blue gradient w-full border-t-2 text-center'>
          <p className='text-primary-blue p-2 text-xs tracking-wider'>
            &copy; {currentYear} Maciej Skorus
          </p>
        </div>
      </section>
    </>
  );
}
