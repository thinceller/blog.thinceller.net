import { chakra, ChakraProps } from '@chakra-ui/react';
import NextImage, { ImageProps } from 'next/image';

export type ChakraNextImageProps = ImageProps & ChakraProps;
export const ChakraNextImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      'src',
      'width',
      'height',
      'layout',
      'loader',
      'quality',
      'priority',
      'loading',
      'lazyBoundary',
      'placeholder',
      'blurDataURL',
      'unoptimized',
      'alt',
    ].includes(prop),
});
