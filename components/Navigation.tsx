import NextLink from 'next/link';
import { FC } from 'react';
import { Box, HStack, Link } from '@chakra-ui/react';

export const Navigation: FC = () => {
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
          <Link as={NextLink} href="/" prefetch={false} color="blue.600">
            Home
          </Link>
        </Box>
        <Box>
          <Link as={NextLink} href="/about" prefetch={false} color="blue.600">
            About
          </Link>
        </Box>
      </HStack>
    </Box>
  );
};
