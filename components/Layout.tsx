import type { ReactNode, VFC } from 'react';
import { Box, Stack } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { Footer } from './Footer';

export type LayoutProps = {
  children: ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ children }) => {
  return (
    <Stack minH="100vh">
      <Header />
      <Box as="main" flex={1}>
        <Box maxW="848px" mx="auto" px={6}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Stack>
  );
};
