import type { ReactNode, VFC } from 'react';
import { Box } from '@chakra-ui/react';

import { Header } from '../components/Header';

export type LayoutProps = {
  children: ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ children }) => {
  return (
    <Box height="100vh">
      <Header />
      <Box as="main" maxW="1200px" mx="auto" p={6}>
        {children}
      </Box>
    </Box>
  );
};
