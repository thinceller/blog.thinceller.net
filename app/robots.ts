import { BLOG_URL } from '@/lib/constants';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      `${BLOG_URL}/sitemap.xml`,
      `${BLOG_URL}/posts/sitemap.xml`,
      `${BLOG_URL}/tags/sitemap.xml`,
    ],
    host: BLOG_URL,
  };
}
