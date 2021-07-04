import Head from 'next/head';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';

import { Header } from '../components/Header';

const Index: NextPage = () => {
  return (
    <Box height="100vh">
      <Head>
        <title>thinceller blog</title>
      </Head>
      <Header />
      <Box as="main" maxW="1200px" mx="auto" p={6}>
        thinceller
      </Box>
    </Box>
  );
};

export default Index;
