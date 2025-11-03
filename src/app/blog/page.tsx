import { PostCard } from '@/components/PostCard';
import { getAllPosts } from '@/lib/post';

export default function Page() {
  const allPosts = getAllPosts();

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-custom-3xl font-bold mt-2">Blog</h1>
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
    </div>
  );
}
