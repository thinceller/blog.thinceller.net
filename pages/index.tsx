import type { InferGetStaticPropsType, NextPage } from 'next';

import { DateFormatter } from '@/components/DateFormatter';
import Link from 'next/link';
import { getAllPosts } from '../lib/post';

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'description', 'slug']);

  return {
    props: {
      allPosts,
    },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<IndexPageProps> = ({ allPosts }) => {
  return (
    <div className="flex flex-col space-y-8 divide-y">
      {allPosts.map((post) => (
        <article key={post.slug} className="pt-4">
          <h2 className="my-2 font-bold text-custom-xl">
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              {post.title}
            </Link>
          </h2>
          <DateFormatter date={post.publishedTime} />
          <p className="text-custom-base line-clamp-2">{post.description}</p>
        </article>
      ))}
    </div>
  );
};

export default Index;
