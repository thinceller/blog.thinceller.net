import { extendTheme } from '@chakra-ui/react';
import { Noto_Sans_JP } from 'next/font/google';

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  fallback: ['system-ui', 'sans-serif'],
});

const theme = extendTheme({
  fonts: {
    heading: notoSansJp.style.fontFamily,
    body: notoSansJp.style.fontFamily,
  },
  lineHeights: {
    base: 1.8,
    tall: 1.9,
  },
});

export { theme };
