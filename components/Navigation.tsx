import NextLink from 'next/link';
import type { FC } from 'react';

export const Navigation: FC = () => {
  return (
    <nav>
      <div className="max-w-screen-md mx-auto px-8 flex flex-row items-center justify-end space-x-6">
        <div>
          <NextLink
            href="/"
            prefetch={false}
            className="text-blue-500 hover:underline"
          >
            Home
          </NextLink>
        </div>
        <div>
          <NextLink
            href="/tags"
            prefetch={false}
            className="text-blue-500 hover:underline"
          >
            Tags
          </NextLink>
        </div>
        <div>
          <NextLink
            href="/about"
            prefetch={false}
            className="text-blue-500 hover:underline"
          >
            About
          </NextLink>
        </div>
      </div>
    </nav>
  );
};
