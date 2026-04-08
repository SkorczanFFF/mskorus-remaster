import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

function Document({ locale }: { locale: string }) {
  return (
    <Html lang={locale || 'en'} className='scroll-smooth'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  const cookie = ctx.req?.headers?.cookie ?? '';
  const match = cookie.match(/(?:^|;\s*)locale=(en|pl)/);
  return { ...initialProps, locale: match?.[1] ?? 'en' };
};

export default Document;
