import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' className='scroll-smooth'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Unica+One&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
