import type { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import {
  Box,
  Heading,
  Link as CLink,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';

import { getAllPosts } from '../lib/post';
import { Layout } from '../components/Layout';
import { DateFormatter } from '../components/DateFormatter';

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
    <Layout>
      <Stack divider={<StackDivider />} spacing={6}>
        {allPosts.map((post) => (
          <Box key={post.slug} as="article">
            <Heading size="md" sx={{ my: 2 }}>
              <Link href={`/posts/${post.slug}`} passHref>
                <CLink color="blue.500">{post.title}</CLink>
              </Link>
            </Heading>
            <Box>
              <DateFormatter date={post.publishedTime} />
            </Box>
            <Text noOfLines={2}>{post.description}</Text>
          </Box>
        ))}
      </Stack>
    </Layout>
  );
};

export default Index;
