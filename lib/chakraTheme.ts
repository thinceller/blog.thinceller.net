import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading: 'Noto Sans JP, system-ui, sans-serif',
  body: 'Noto Sans JP, system-ui, sans-serif',
};

const theme = extendTheme({
  fonts,
});

export { theme };
