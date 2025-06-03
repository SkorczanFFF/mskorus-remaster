import Lenis from 'lenis';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

import Header from '@/components/layout/Header/Header';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        draggable
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        toastStyle={{ backgroundColor: 'rgb(0, 26, 37)', color: '#e4e4e4' }}
      />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
