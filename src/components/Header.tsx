import NextLink from 'next/link';
import type { FC } from 'react';

import { SITE_NAME } from '@/lib/constants';
import { Navigation } from './Navigation';

export const Header: FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-(--breakpoint-md) mx-auto px-6 py-4 flex items-center justify-between">
        {/* Site Name */}
        <span className="text-2xl font-bold flex-shrink-0">
          <NextLink href="/" prefetch={false}>
            {SITE_NAME}
          </NextLink>
        </span>

        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  );
};
