import { BLOG_URL } from '@/lib/constants';
import { getAllPosts } from '@/lib/post';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts(['slug', 'modifiedTime']);

  return posts.map((post) => ({
    url: `${BLOG_URL}/posts/${post.slug}`,
    lastModified: post.modifiedTime,
    changeFrequency: 'daily',
    priority: 0.8,
  }));
}
