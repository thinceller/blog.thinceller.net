import type { FC } from 'react';
import NextLink from 'next/link';
import { Center, Heading, Link } from '@chakra-ui/react';

export const Header: FC = () => {
  return (
    <Center as="header" h={20} pt={6}>
      <Heading fontSize="2xl">
        <Link
          as={NextLink}
          href="/"
          prefetch={false}
          style={{ textDecoration: 'none' }}
        >
          thinceller blog
        </Link>
      </Heading>
    </Center>
  );
};
