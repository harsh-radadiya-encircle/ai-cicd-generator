'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Zap } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/50 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 dark:from-violet-500 dark:to-indigo-400 flex items-center justify-center text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
              <Zap size={18} className="fill-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-200">
              CI/CD Pipeline Generator
            </span>
          </Link>
          <span className="hidden sm:inline-flex text-[10px] font-semibold tracking-wider uppercase bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900 px-2 py-0.5 rounded-full">
            GitHub Actions
          </span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { label: 'Home', href: '/' },
              { label: 'Features', href: '/features' },
              { label: 'Templates', href: '/templates' },
              { label: 'Docs', href: '/docs' },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-200 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/50 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={18} className="animate-pulse" />
            ) : (
              <Sun size={18} className="text-amber-400 animate-spin-slow" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
