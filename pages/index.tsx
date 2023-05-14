import type { InferGetStaticPropsType, NextPage } from 'next';
import NextLink from 'next/link';
import {
  Box,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';

import { getAllPosts } from '../lib/post';
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
    <Stack divider={<StackDivider />}>
      {allPosts.map((post) => (
        <Box key={post.slug} as="article" my={6}>
          <Heading size="md" sx={{ my: 2 }}>
            <Link
              as={NextLink}
              href={`/posts/${post.slug}`}
              prefetch={false}
              color="blue.600"
            >
              {post.title}
            </Link>
          </Heading>
          <Box>
            <DateFormatter date={post.publishedTime} />
          </Box>
          <Text noOfLines={2}>{post.description}</Text>
        </Box>
      ))}
    </Stack>
  );
};

export default Index;
