import { NextPage } from 'next';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { Center, Heading, VStack, Text } from '@chakra-ui/react';
import { BLOG_NAME } from '../lib/constants';
import AvatarImage from '../public/images/avatar.jpg';
import { ChakraNextImage } from '../components/ChakraNextImage';

const About: NextPage = () => {
  return (
    <>
      <NextSeo title="About" />
      <Head>
        <title>{`About | ${BLOG_NAME}`}</title>
      </Head>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" sx={{ mt: 2 }}>
          About
        </Heading>
        <Center>
          <ChakraNextImage
            src={AvatarImage}
            alt="thinceller's avatar"
            width="120px"
            height="120px"
            sx={{ borderRadius: '50%' }}
          />
        </Center>
        <Text>thinceller / Kohei Kawakami</Text>
        <Text>しがないソフトウェアエンジニアです。</Text>
      </VStack>
    </>
  );
};

export default About;
