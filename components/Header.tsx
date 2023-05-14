import type { FC } from 'react';
import Link from 'next/link';
import { Center, Heading, Link as CLink } from '@chakra-ui/react';

export const Header: FC = () => {
  return (
    <Center as="header" h={20} pt={6}>
      <Heading fontSize="2xl">
        <Link href="/" passHref prefetch={false} legacyBehavior>
          <CLink style={{ textDecoration: 'none' }}>thinceller blog</CLink>
        </Link>
      </Heading>
    </Center>
  );
};
