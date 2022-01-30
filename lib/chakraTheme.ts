import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Noto Sans JP, system-ui, sans-serif',
    body: 'Noto Sans JP, system-ui, sans-serif',
  },
  lineHeights: {
    base: 1.8,
    tall: 1.9,
  },
});

export { theme };
