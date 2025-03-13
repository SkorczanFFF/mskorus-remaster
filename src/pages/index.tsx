import AOS from 'aos';
import dynamic from 'next/dynamic';
import * as React from 'react';

import 'aos/dist/aos.css';

import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import Experience from '@/components/Experience/Experience';
import Footer from '@/components/layout/Footer/Footer';
import Layout from '@/components/layout/Layout';
import Portfolio from '@/components/Portfolio/Portfolio';
import Seo from '@/components/Seo';
import Technos from '@/components/Technos/Technos';

const HeroNoSSR = dynamic(() => import('@/components/Hero/Hero'), {
  ssr: true,
});

export default function HomePage() {
  React.useEffect(() => {
    AOS.init({ duration: 750 });
  }, []);

  return (
    <Layout>
      <Seo />
      <main>
        <HeroNoSSR />
        <About />
        <Experience />
        <Technos />
        <Portfolio />
        <Contact />
        <Footer />
      </main>
    </Layout>
  );
}
