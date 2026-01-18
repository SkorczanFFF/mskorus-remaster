import dynamic from 'next/dynamic';
import * as React from 'react';

import About from '@/components/About/About';
import Experience from '@/components/Experience/Experience';
import Footer from '@/components/layout/Footer/Footer';
import Layout from '@/components/layout/Layout';
import UnderConstruction from '@/components/layout/UnderConstruction';
import Portfolio from '@/components/Portfolio/Portfolio';
import Seo from '@/components/Seo';
import Technos from '@/components/Technos/Technos';

const HeroNoSSR = dynamic(() => import('@/components/Hero/Hero'), {
  ssr: true,
});

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main>
        <HeroNoSSR />
        <About />
        <Experience />
        <Technos />
        <Portfolio />
        <Footer />
      </main>
      <UnderConstruction />
    </Layout>
  );
}
