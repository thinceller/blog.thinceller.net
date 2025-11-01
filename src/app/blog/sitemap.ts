import type { MetadataRoute } from 'next';
import { BLOG_URL } from '@/lib/constants';
import { getAllPosts } from '@/lib/post';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return posts.map((post) => ({
    url: `${BLOG_URL}/blog/${post.slug}`,
    lastModified: post.modifiedTime,
    changeFrequency: 'daily',
    priority: 0.8,
  }));
}
