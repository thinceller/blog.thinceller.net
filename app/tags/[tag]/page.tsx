import { PostCard } from '@/components/PostCard';
import { BLOG_NAME } from '@/lib/constants';
import { getAllTags, getPostsByTag } from '@/lib/post';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  const allTags = getAllTags();

  return Array.from(allTags.keys()).map((tag) => ({
    tag: tag,
  }));
}

type Props = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);

  return {
    title: `${tag} - ${BLOG_NAME}`,
    description: `${tag}に関する記事一覧`,
    openGraph: {
      type: 'website',
      url: `/tags/${params.tag}`,
      title: `${tag} - ${BLOG_NAME}`,
      description: `${tag}に関する記事一覧`,
      siteName: BLOG_NAME,
    },
    twitter: {
      title: `${tag} - ${BLOG_NAME}`,
      description: `${tag}に関する記事一覧`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        <span className="text-gray-600">#</span>
        {tag}
      </h1>
      <div className="grid gap-3">
        {posts.map((post) => (
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
