import type { FC, PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-(--breakpoint-md) mx-auto px-6 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
