import { Layout } from '@/components/Layout';
import { BLOG_NAME, BLOG_URL } from '@/lib/constants';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

import '@/styles/globals.css';
import '@/styles/prisma.css';
import '@/styles/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${BLOG_NAME}`,
    default: BLOG_NAME,
  },
  description: 'A blog about software development, programming, and life.',
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
        <Analytics />
      </body>
    </html>
  );
}
