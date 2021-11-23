import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { NextSeo } from 'next-seo';
import { MDXRemote } from 'next-mdx-remote';
import { Box } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { getPostBySlug } from '../../lib/mdx';
import { getAllPosts } from '../../lib/post';
import { BLOG_AUTHOR, BLOG_URL, OG_IMAGE_URL } from '../../lib/constants';
import { PostTitle } from '../../components/PostTitle';
import { Layout } from '../../components/Layout';
import { prismStyle } from '../../styles/style';

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

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const slug = ctx.params.slug as string;
  const post = await getPostBySlug(slug);

  return {
    props: {
      mdxSource: post.mdxSource,
      frontMatter: {
        slug,
        ...post.frontMatter,
      },
    },
  };
};

type PostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<PostPageProps> = (props) => {
  const router = useRouter();

  if (!router.isFallback && !props.frontMatter.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <NextSeo
        title={props.frontMatter.title}
        description={props.frontMatter.description}
        openGraph={{
          type: 'article',
          url: `${BLOG_URL}/posts/${props.frontMatter.slug}`,
          title: props.frontMatter.title,
          images: [
            {
              url: `${OG_IMAGE_URL}/${encodeURIComponent(
                props.frontMatter.title
              )}.png?md=1&fontSize=75px`,
            },
          ],
          article: {
            publishedTime: props.frontMatter.publishedTime,
            modifiedTime: props.frontMatter.modifiedTime,
            authors: [BLOG_AUTHOR],
            // tags: post.tags ?? [],
          },
        }}
      />
      <Layout>
        <Global styles={prismStyle} />
        <PostTitle
          title={props.frontMatter.title}
          date={props.frontMatter.publishedTime}
        />
        <Box lineHeight="tall">
          <MDXRemote {...props.mdxSource} />
        </Box>
      </Layout>
    </>
  );
};

export default PostPage;
