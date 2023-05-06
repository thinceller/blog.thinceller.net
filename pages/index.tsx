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
              href={`/posts/${post.slug}`}
              passHref
              prefetch={false}
              legacyBehavior
            >
              <CLink color="blue.600">{post.title}</CLink>
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
