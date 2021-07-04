import Head from 'next/head';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { Box, Link as CLink } from '@chakra-ui/react';

import { getAllPosts } from '../lib/post';
import { Layout } from '../components/Layout';
import { BLOG_NAME } from '../lib/constants';

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'description', 'date', 'slug']);

  return {
    props: {
      allPosts,
    },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<IndexPageProps> = ({ allPosts }) => {
  return (
    <Layout>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      {allPosts.map((post) => (
        <Box key={post.slug}>
          <Link href={`/posts/${post.slug}`} passHref>
            <CLink>{post.title}</CLink>
          </Link>
        </Box>
      ))}
    </Layout>
  );
};

export default Index;
