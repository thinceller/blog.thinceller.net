import { BLOG_URL } from '@/lib/constants';
import { getAllTags } from '@/lib/post';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const allTags = getAllTags();

  const sitemapEntries: MetadataRoute.Sitemap = [
    // タグ一覧ページ
    {
      url: `${BLOG_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  // 各タグページ
  for (const [tag] of Array.from(allTags.entries())) {
    sitemapEntries.push({
      url: `${BLOG_URL}/tags/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return sitemapEntries;
}
