import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
