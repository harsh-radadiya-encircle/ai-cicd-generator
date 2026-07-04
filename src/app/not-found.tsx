import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <h1 className="font-display text-4xl font-extrabold text-slate-900 dark:text-white mb-2">404</h1>
        <h2 className="font-display text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Page Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="bg-violet-600 hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-md cursor-pointer">
          Go Back Home
        </Link>
      </main>
    </div>
  );
}
