import Link from 'next/link';
import { VFC } from 'react';
import { Box, HStack, Link as CLink } from '@chakra-ui/react';

export const Navigation: VFC = () => {
  return (
    <Box>
      <HStack
        as="nav"
        maxW="800px"
        mx="auto"
        px={8}
        justifyContent="flex-end"
        spacing={6}
      >
        <Box>
          <Link href="/" passHref prefetch={false}>
            <CLink color="blue.600">Home</CLink>
          </Link>
        </Box>
        <Box>
          <Link href="/about" passHref prefetch={false}>
            <CLink color="blue.600">About</CLink>
          </Link>
        </Box>
      </HStack>
    </Box>
  );
};