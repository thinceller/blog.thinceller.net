'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

const isActive = (href: string, pathname: string): boolean => {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(href);
};

const NavLink: FC<{
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}> = ({ href, label, isActive: active, onClick }) => {
  const baseClasses =
    'px-3 py-2 rounded-md font-semibold transition-colors duration-200';
  const activeClasses = 'bg-blue-100 text-blue-700';
  const inactiveClasses = 'text-blue-500 hover:bg-blue-50 hover:text-blue-700';

  return (
    <NextLink
      href={href}
      prefetch={false}
      onClick={onClick}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </NextLink>
  );
};

export const Navigation: FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center gap-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            isActive={isActive(item.href, pathname)}
          />
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-label="Menu icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isActive(item.href, pathname)}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
