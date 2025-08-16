import type { Metadata } from 'next';
import { Layout } from '@/components/Layout';
import { BLOG_NAME, BLOG_URL } from '@/lib/constants';

import '@/styles/globals.css';
import '@/styles/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${BLOG_NAME}`,
    default: BLOG_NAME,
  },
  description: 'A blog about software development, programming, and life.',
  metadataBase: new URL(BLOG_URL),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: BLOG_URL,
    siteName: BLOG_NAME,
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
        { url: '/rss.xml', title: `${BLOG_NAME} RSS Feed` },
      ],
      'application/atom+xml': [
        { url: '/atom.xml', title: `${BLOG_NAME} Atom Feed` },
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
