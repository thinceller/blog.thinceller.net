import Head from 'next/head';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { Box, Link as CLink } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { getAllPosts } from '../lib/post';

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
    <Box height="100vh">
      <Head>
        <title>thinceller blog</title>
      </Head>
      <Header />
      <Box as="main" maxW="1200px" mx="auto" p={6}>
        {allPosts.map((post) => (
          <Box key={post.slug}>
            <Link href={`/posts/${post.slug}`} passHref>
              <CLink>{post.title}</CLink>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Index;
