import type { VFC } from 'react';
import Link from 'next/link';
import { Box, Heading, HStack, Link as CLink } from '@chakra-ui/react';

export const Header: VFC = () => {
  return (
    <Box as="header" borderBottom="1px" borderBottomColor="gray.200">
      <HStack
        h={20}
        px={6}
        maxW="800px"
        m="auto"
        align="center"
        justifyContent="space-between"
      >
        <Box>
          <Heading>
            <Link href="/" passHref>
              <CLink style={{ textDecoration: 'none' }}>thinceller blog</CLink>
            </Link>
          </Heading>
        </Box>
        <Box>
          <Link href="/about" passHref>
            <CLink color="blue.500">About</CLink>
          </Link>
        </Box>
      </HStack>
    </Box>
  );
};
