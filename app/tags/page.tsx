import { BLOG_NAME } from '@/lib/constants';
import { getAllTags } from '@/lib/post';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `タグ一覧 - ${BLOG_NAME}`,
  description: 'すべてのタグの一覧',
  openGraph: {
    type: 'website',
    url: '/tags',
    title: `タグ一覧 - ${BLOG_NAME}`,
    description: 'すべてのタグの一覧',
    siteName: BLOG_NAME,
  },
  twitter: {
    title: `タグ一覧 - ${BLOG_NAME}`,
    description: 'すべてのタグの一覧',
  },
};

export default function Page() {
  const allTags = getAllTags();

  // タグを記事数の降順でソート
  const sortedTags = Array.from(allTags.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">タグ一覧</h1>
      <div className="grid gap-3">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg">
              <span className="text-gray-600">#</span>
              {tag}
            </span>
            <span className="text-sm text-gray-500">{count}件の記事</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
