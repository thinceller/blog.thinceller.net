import type { Metadata } from 'next';
import { BLOG_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    template: `%s | ${BLOG_NAME}`,
    default: BLOG_NAME,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
