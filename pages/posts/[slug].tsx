import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { useRouter } from 'next//router';

import { getAllPosts, getPostBySlug } from '../../lib/post';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { Layout } from '../../components/Layout';
import { PostBody } from '../../components/PostBody';
import { BLOG_NAME } from '../../lib/constants';
import { PostTitle } from '../../components/PostTitle';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params.slug as string;
  const post = getPostBySlug(slug, [
    'title',
    'description',
    'slug',
    'content',
    'date',
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
    <Layout>
      <Head>
        <title>
          {post.title} | {BLOG_NAME}
        </title>
      </Head>
      <PostTitle title={post.title} date={post.date} />
      <PostBody content={post.content} />
    </Layout>
  );
};

export default PostPage;
