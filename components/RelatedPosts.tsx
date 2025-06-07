import { PostCard } from '@/components/PostCard';

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
          <PostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            publishedTime={post.publishedTime}
            titleLevel="h3"
          />
        ))}
      </div>
    </section>
  );
}
