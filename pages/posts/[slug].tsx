import { Box } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { CustomMDXComponents } from '../../components/MDXComponent';
import { PostFooter } from '../../components/PostFooter';
import { PostTitle } from '../../components/PostTitle';
import { BLOG_AUTHOR, BLOG_URL, OG_IMAGE_URL } from '../../lib/constants';
import { getPostBySlug } from '../../lib/mdx';
import { getAllPosts } from '../../lib/post';
import { prismStyle } from '../../styles/prism';

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
  const slug = ctx.params?.slug;
  if (!(typeof slug === 'string')) {
    throw new Error('slug is not string');
  }
  const post = await getPostBySlug(slug);

  return {
    props: {
      slug,
      mdxSource: post.mdxSource,
      frontMatter: {
        ...post.frontMatter,
      },
    },
  };
};

type PostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<PostPageProps> = (props) => {
  const router = useRouter();

  if (!router.isFallback && !props.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <NextSeo
        title={props.frontMatter.title}
        description={props.frontMatter.description}
        openGraph={{
          type: 'article',
          url: `${BLOG_URL}/posts/${props.slug}`,
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
            tags: props.frontMatter.tags ?? undefined,
          },
        }}
      />
      <Global styles={prismStyle} />
      <Box my={10}>
        <PostTitle
          title={props.frontMatter.title}
          date={props.frontMatter.publishedTime}
        />
      </Box>
      <Box lineHeight="tall">
        <MDXRemote {...props.mdxSource} components={CustomMDXComponents} />
      </Box>
      <Box mt={10} mb={10}>
        <PostFooter />
      </Box>
    </>
  );
};

export default PostPage;
