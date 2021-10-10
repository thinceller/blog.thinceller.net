import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next//router';
import { NextSeo } from 'next-seo';

import { getAllPosts, getPostBySlug } from '../../lib/post';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { Layout } from '../../components/Layout';
import { PostBody } from '../../components/PostBody';
import { BLOG_AUTHOR, BLOG_URL, OG_IMAGE_URL } from '../../lib/constants';
import { PostTitle } from '../../components/PostTitle';

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const slug = ctx.params.slug as string;
  const post = getPostBySlug(slug, [
    'title',
    'description',
    'slug',
    'content',
    'publishedTime',
  ]);
  const content = markdownToHtml(post.content);

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

type PostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        openGraph={{
          type: 'article',
          url: `${BLOG_URL}/posts/${post.slug}`,
          title: post.title,
          images: [
            {
              url: `${OG_IMAGE_URL}/${encodeURIComponent(
                post.title
              )}.png?md=1&fontSize=75px`,
            },
          ],
          article: {
            publishedTime: post.publishedTime,
            modifiedTime: post.publishedTime,
            authors: [BLOG_AUTHOR],
            // tags: post.tags ?? [],
          },
        }}
      />
      <Layout>
        <PostTitle title={post.title} date={post.publishedTime} />
        <PostBody content={post.content} />
      </Layout>
    </>
  );
};

export default PostPage;
