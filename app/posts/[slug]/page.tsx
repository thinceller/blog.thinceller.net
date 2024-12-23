import { PostFooter } from '@/components/PostFooter';
import { PostTitle } from '@/components/PostTitle';
import { BLOG_AUTHOR, BLOG_NAME } from '@/lib/constants';
import { getPostBySlug } from '@/lib/mdx';
import { getAllPosts } from '@/lib/post';
import { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts(['slug']);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontmatter } = await getPostBySlug(params.slug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      type: 'article',
      url: `/posts/${params.slug}`,
      title: frontmatter.title,
      description: frontmatter.description,
      siteName: BLOG_NAME,
      images: [
        {
          url: `/posts/${params.slug}/opengraph-image.png`,
          alt: 'thinceller blog',
          width: 1200,
          height: 630,
        },
      ],
      publishedTime: frontmatter.publishedTime,
      modifiedTime: frontmatter.modifiedTime,
      authors: [BLOG_AUTHOR],
      tags: frontmatter.tags ?? undefined,
    },
    twitter: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: [
        {
          url: `/posts/${params.slug}/opengraph-image.png`,
          alt: 'thinceller blog',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { content, frontmatter } = await getPostBySlug(params.slug);

  return (
    <>
      <div className="my-10">
        <PostTitle title={frontmatter.title} date={frontmatter.publishedTime} />
      </div>

      {content}

      <div className="my-10">
        <PostFooter />
      </div>
    </>
  );
}
