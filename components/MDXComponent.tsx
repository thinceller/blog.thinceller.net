/* eslint-disable react/display-name */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  Divider,
  Heading,
  Link,
  OrderedList,
  Text,
  UnorderedList,
  chakra,
} from '@chakra-ui/react';
import { type MDXComponents } from 'mdx/types';
import NextLink from 'next/link';
import { Tweet, TweetProps } from 'react-twitter-widgets';
import { ChakraNextImage, ChakraNextImageProps } from './ChakraNextImage';

type MyAlertProps = AlertProps & {
  title?: string;
  description: string;
};

export const CustomMDXComponents: MDXComponents = {
  a: (p: JSX.IntrinsicElements['a']) => {
    const { href, ...rest } = p;
    const isInternalLink =
      href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
      return (
        <Link
          as={NextLink}
          href={href}
          prefetch={false}
          color="blue.600"
          {...rest}
        />
      );
    }

    return <Link color="blue.600" isExternal {...p} />;
  },
  blockquote: (p: JSX.IntrinsicElements['blockquote']) => (
    <chakra.blockquote
      backgroundColor="gray.100"
      borderLeftColor="gray.300"
      borderLeftWidth="8px"
      borderLeftStyle="solid"
      p={4}
      mb={6}
      sx={{
        '& > p': {
          marginBottom: 0,
        },
      }}
      {...p}
    />
  ),
  hr: () => <Divider mt={10} mb={10} />,
  h1: (p: JSX.IntrinsicElements['h1']) => (
    <Heading as="h1" fontSize="2xl" mt={12} mb={4} position="relative" {...p} />
  ),
  h2: (p: JSX.IntrinsicElements['h2']) => (
    <Heading as="h2" fontSize="xl" mt={12} mb={4} position="relative" {...p} />
  ),
  h3: (p: JSX.IntrinsicElements['h3']) => (
    <Heading as="h3" fontSize="lg" mt={8} mb={4} position="relative" {...p} />
  ),
  h4: (p: JSX.IntrinsicElements['h4']) => (
    <Heading as="h4" fontSize="md" mb={4} position="relative" {...p} />
  ),
  h5: (p: JSX.IntrinsicElements['h5']) => (
    <Heading as="h5" fontSize="sm" mb={4} position="relative" {...p} />
  ),
  h6: (p: JSX.IntrinsicElements['h6']) => (
    <Heading as="h6" fontSize="xs" mb={4} position="relative" {...p} />
  ),
  li: (p: JSX.IntrinsicElements['li']) => <chakra.li {...p} />,
  ol: (p: JSX.IntrinsicElements['ol']) => <OrderedList mb={6} ml={8} {...p} />,
  p: (p: JSX.IntrinsicElements['p']) => (
    <Text as="p" fontSize="md" mb={6} {...p} />
  ),
  ul: (p: JSX.IntrinsicElements['ul']) => (
    <UnorderedList mb={6} ml={8} {...p} />
  ),
  Tweet: (p: TweetProps) => <Tweet {...p} />,
  Image: (p: ChakraNextImageProps) => {
    let href: string;
    if (typeof p.src === 'string') {
      href = p.src;
    } else if ('src' in p.src) {
      href = p.src.src;
    } else if (p.src.default) {
      href = p.src.default.src;
    } else {
      throw new Error('Can not access to href');
    }
    return (
      <chakra.p m={6}>
        <Link href={href} title={p.alt} isExternal>
          <ChakraNextImage {...p} />
        </Link>
      </chakra.p>
    );
  },
  Alert: ({ title, description, ...p }: MyAlertProps) => {
    return (
      <Alert {...p} mb={6}>
        <AlertIcon />
        <Box>
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{description}</AlertDescription>
        </Box>
      </Alert>
    );
  },
};
