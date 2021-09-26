import Head from 'next/head';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { Box, Divider, Heading, Link as CLink, Text } from '@chakra-ui/react';

import { getAllPosts } from '../lib/post';
import { Layout } from '../components/Layout';
import { BLOG_NAME } from '../lib/constants';
import { DateFormatter } from '../components/DateFormatter';

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
      {allPosts.map((post, i) => (
        <>
          <Box key={post.slug} as="article">
            <Heading size="lg" sx={{ my: 2 }}>
              <Link href={`/posts/${post.slug}`} passHref>
                <CLink color="blue.500">{post.title}</CLink>
              </Link>
            </Heading>
            <Box>
              <DateFormatter date={post.date} />
            </Box>
            <Text noOfLines={2}>{post.description}</Text>
          </Box>
          {i !== allPosts.length - 1 && <Divider my={6} />}
        </>
      ))}
    </Layout>
  );
};

export default Index;
