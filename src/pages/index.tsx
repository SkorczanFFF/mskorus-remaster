import dynamic from 'next/dynamic';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Services from '@/components/About/About';
import Experience from '@/components/Experience/Experience';
import Footer from '@/components/layout/Footer/Footer';
import Layout from '@/components/layout/Layout';
import LoaderOverlay from '@/components/LoaderOverlay';
import Portfolio from '@/components/Portfolio/Portfolio';
import Seo from '@/components/Seo';
import Skills from '@/components/Skills/Skills';

const HeroNoSSR = dynamic(() => import('@/components/Hero/Hero'), {
  ssr: false,
  loading: () => (
    <section className='-mt-[60px] h-[99vh] w-full bg-[#001a25]' />
  ),
});

export default function HomePage() {
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const onReady = () => setHeroReady(true);
    window.addEventListener('hero:ready', onReady);
    const timeout = setTimeout(onReady, 5000);
    return () => {
      window.removeEventListener('hero:ready', onReady);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Layout>
      <Seo />
      <LoaderOverlay visible={!heroReady} />
      <main className='overflow-x-clip'>
        <HeroNoSSR />
        <Services />
        <Experience />
        <Skills />
        <Portfolio />
        <Footer />
      </main>
    </Layout>
  );
}
