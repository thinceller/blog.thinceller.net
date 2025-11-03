import type { Metadata } from 'next';
import { Layout } from '@/components/Layout';
import { BLOG_NAME, BLOG_URL, SITE_NAME } from '@/lib/constants';

import '@/styles/globals.css';
import '@/styles/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: 'ソフトウェアエンジニアthincellerの個人サイトです',
  metadataBase: new URL(BLOG_URL),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: BLOG_URL,
    siteName: SITE_NAME,
    title: BLOG_NAME,
  },
  twitter: {
    site: '@thinceller_dev',
    creator: '@thinceller_dev',
    card: 'summary_large_image',
  },
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/blog/rss.xml', title: `${BLOG_NAME} RSS Feed` },
      ],
      'application/atom+xml': [
        { url: '/blog/atom.xml', title: `${BLOG_NAME} Atom Feed` },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
