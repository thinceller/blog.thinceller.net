import { PostCard } from '@/components/PostCard';
import { getAllPosts } from '@/lib/post';

export default function Page() {
  const allPosts = getAllPosts();

  return (
    <>
      <h1 className="sr-only">最新の記事一覧</h1>
      <section aria-label="記事一覧" className="grid gap-3">
        {allPosts.map((post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            publishedTime={post.publishedTime}
            description={post.description}
          />
        ))}
      </section>
    </>
  );
}
