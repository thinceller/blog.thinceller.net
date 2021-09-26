import { VFC } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';

export const Footer: VFC = () => {
  return (
    <Box as="footer" borderTop="1px" borderTopColor="gray.200">
      <Stack direction="row" mx="auto" maxW="800px" p={6}>
        <Text>&copy; {new Date().getFullYear()} thinceller</Text>
      </Stack>
    </Box>
  );
};
