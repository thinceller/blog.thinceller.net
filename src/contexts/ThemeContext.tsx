'use client';

import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // クライアント側でのみ実行 - localStorageから設定を読み込み、初期テーマを適用
  useEffect(() => {
    const applyTheme = (t: 'light' | 'dark') => {
      setResolvedTheme(t);
      document.documentElement.setAttribute('data-theme', t);
      document.documentElement.style.colorScheme = t;
    };

    try {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setThemeState(stored);
        // 初期テーマを即座に適用（ちらつき防止）
        if (stored === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light';
          applyTheme(systemTheme);
        } else {
          applyTheme(stored);
        }
      } else {
        // デフォルトのsystemテーマを適用
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        applyTheme(systemTheme);
      }
    } catch (e) {
      // localStorageアクセスエラー時は無視（プライベートブラウジングなど）
      console.warn('localStorage access failed:', e);
    }
    setMounted(true);
  }, []);

  // テーマ変更時の適用（システム設定の監視を含む）
  useEffect(() => {
    if (!mounted) return;

    const applyTheme = (t: 'light' | 'dark') => {
      setResolvedTheme(t);
      document.documentElement.setAttribute('data-theme', t);
      document.documentElement.style.colorScheme = t;
    };

    if (theme === 'system') {
      // システム設定を使用
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      applyTheme(systemTheme);

      // システム設定変更の検知
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // light または dark を直接適用
    applyTheme(theme);
  }, [theme, mounted]);

  // localStorageへの保存
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        console.warn('localStorage save failed:', e);
      }
    }
  }, [theme, mounted]);

  // テーマ設定関数のメモ化
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // コンテキスト値のメモ化（不要な再レンダリングを防止）
  const contextValue = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
