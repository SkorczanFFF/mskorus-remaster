import dynamic from 'next/dynamic';
import * as React from 'react';

import Services from '@/components/About/About';
import Experience from '@/components/Experience/Experience';
import Footer from '@/components/layout/Footer/Footer';
import Layout from '@/components/layout/Layout';
import Portfolio from '@/components/Portfolio/Portfolio';
import Seo from '@/components/Seo';
import Technos from '@/components/Technos/Technos';

const HeroNoSSR = dynamic(() => import('@/components/Hero/Hero'), {
  ssr: false,
  loading: () => (
    <section className='-mt-[60px] h-[99vh] w-full bg-[#001a25]' />
  ),
});

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main>
        <HeroNoSSR />
        <Services />
        <Experience />
        <Technos />
        <Portfolio />
        <Footer />
      </main>
    </Layout>
  );
}
