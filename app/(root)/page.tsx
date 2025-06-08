import { PostCard } from '@/components/PostCard';
import { getAllPosts } from '@/lib/post';

export default function Page() {
  const allPosts = getAllPosts();

  return (
    <div className="grid gap-3">
      {allPosts.map((post) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          publishedTime={post.publishedTime}
        />
      ))}
    </div>
  );
}
