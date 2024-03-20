import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { theme } from '../lib/chakraTheme';
import { BLOG_NAME, BLOG_URL, OG_IMAGE_URL } from '../lib/constants';
import { GoogleAnalytics } from '../lib/gtag';
import { globalStyles } from '../styles/global';

import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${BLOG_NAME}`}
        defaultTitle={BLOG_NAME}
        description="A blog about software development, programming, and life."
        twitter={{
          handle: '@thinceller_dev',
          site: '@thinceller_dev',
          cardType: 'summary_large_image',
        }}
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          url: BLOG_URL,
          site_name: BLOG_NAME,
          title: BLOG_NAME,
          images: [
            {
              url: `${OG_IMAGE_URL}/.png?md=1&fontSize=100px`,
            },
          ],
        }}
      />
      <ChakraProvider resetCSS theme={theme}>
        <Layout>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
      <GoogleAnalytics />
      <Analytics />
    </>
  );
}

export default MyApp;
