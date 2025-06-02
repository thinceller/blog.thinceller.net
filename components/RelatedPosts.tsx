import { DateFormatter } from '@/components/DateFormatter';
import Link from 'next/link';

type RelatedPost = {
  slug: string;
  title: string;
  publishedTime: string;
};

type Props = {
  posts: RelatedPost[];
};

export function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="my-16 bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <span>関連記事</span>
      </h2>
      <div className="grid gap-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white border border-gray-100 rounded-md p-4 hover:shadow-md transition-shadow"
          >
            <Link href={`/posts/${post.slug}`} className="block">
              <h3 className="text-base font-semibold mb-1 text-gray-900 hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <DateFormatter date={post.publishedTime} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
