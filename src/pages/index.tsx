import * as React from 'react';

import Services from '@/components/About/About';
import Hero from '@/components/Hero/Hero';
import Industries from '@/components/Industries/Industries';
import Footer from '@/components/layout/Footer/Footer';
import Layout from '@/components/layout/Layout';
import Portfolio from '@/components/Portfolio/Portfolio';
import Seo from '@/components/Seo';
import TechStrip from '@/components/TechStrip/TechStrip';

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main className='overflow-x-clip'>
        <Hero />
        <Services />
        <TechStrip />
        <Industries />
        <Portfolio />
        <Footer />
      </main>
    </Layout>
  );
}
