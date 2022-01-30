import type { ReactNode, VFC } from 'react';
import { Box, Stack } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

export type LayoutProps = {
  children: ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ children }) => {
  return (
    <Stack minH="100vh" w="100vw" spacing={0}>
      <Header />
      <Navigation />
      <Box as="main" flex={1}>
        <Box maxW="848px" mx="auto" px={6}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Stack>
  );
};
