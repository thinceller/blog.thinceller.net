import NextLink from 'next/link';
import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="h-20 pt-6 flex items-center justify-center">
      <span className="text-2xl font-bold">
        <NextLink href="/" prefetch={false}>
          thinceller blog
        </NextLink>
      </span>
    </header>
  );
};
