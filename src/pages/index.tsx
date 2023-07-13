import dynamic from 'next/dynamic';
import * as React from 'react';

import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import Layout from '@/components/layout/Layout';
import Portfolio from '@/components/Portfolio/Portfolio';
import Seo from '@/components/Seo';
import Technos from '@/components/Technos/Technos';

const HeroNoSSR = dynamic(() => import('@/components/Hero/Hero'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main>
        <Header />
        <HeroNoSSR />
        <About />
        <Technos />
        <Portfolio />
        <Contact />
        <Footer />
      </main>
    </Layout>
  );
}
