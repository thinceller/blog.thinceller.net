import type { FC, PropsWithChildren } from 'react';

import { Header } from '../components/Header';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-1">
        <div className="max-w-(--breakpoint-md) mx-auto px-6 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
