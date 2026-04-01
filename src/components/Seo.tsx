import Head from 'next/head';
import { useRouter } from 'next/router';

import { useLocale } from '@/locale/LocaleContext';

type SeoProps = {
  date?: string;
  templateTitle?: string;
  title?: string;
  siteName?: string;
  description?: string;
  url?: string;
  type?: string;
  robots?: string;
  image?: string;
};

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const { t } = useLocale();

  const defaultMeta = {
    title: t.seoTitle,
    siteName: t.seoSiteName,
    description: t.seoDescription,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://skoftware.pl/',
    type: 'website',
    robots: 'follow, index',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skoftware.pl'}/favicon/large-og.ico`,
  };

  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      <link
        rel='alternate'
        hrefLang='en'
        href={`${meta.url}${router.asPath}`}
      />
      <link
        rel='alternate'
        hrefLang='pl'
        href={`${meta.url}${router.asPath}`}
      />
      <link
        rel='alternate'
        hrefLang='x-default'
        href={`${meta.url}${router.asPath}`}
      />
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta
            name='author'
            property='article:author'
            content='Maciej Skorus'
          />
        </>
      )}

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Maciej Skorus',
            url: meta.url,
            jobTitle: 'Frontend Developer',
            knowsAbout: [
              'React',
              'Next.js',
              'TypeScript',
              'Three.js',
              'Python',
              'Web Development',
            ],
            sameAs: [
              'https://github.com/SkorczanFFF',
              'https://www.linkedin.com/in/mskorus/',
            ],
          }),
        }}
      />
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#001a25' />
    </Head>
  );
}

const favicons: Array<React.ComponentPropsWithoutRef<'link'>> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/x-icon',
    sizes: '32x32',
    href: '/favicon/favicon32x32.ico',
  },
  {
    rel: 'icon',
    type: 'image/x-icon',
    sizes: '16x16',
    href: '/favicon/favicon16x16.ico',
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  {
    rel: 'mask-icon',
    href: '/favicon/safari-pinned-tab.svg',
    color: '#00e887',
  },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
];
