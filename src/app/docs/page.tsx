'use client';

import React from 'react';
import Header from '@/components/Header';
import { Terminal, Key, FileText, CheckCircle } from 'lucide-react';

export default function DocsPage() {
  const steps = [
    {
      icon: <FileText className="text-violet-500" size={20} />,
      step: '1',
      title: 'Save Workflow Files',
      desc: 'Create a directory named .github/workflows at the root of your project. Copy the generated ci.yml and deploy files into this folder.',
    },
    {
      icon: <Terminal className="text-indigo-500" size={20} />,
      step: '2',
      title: 'Configure Local Environment',
      desc: 'Rename the generated .env.example file to .env on your local server and fill in the values required by your application context.',
    },
    {
      icon: <Key className="text-purple-500" size={20} />,
      step: '3',
      title: 'Register GitHub Secrets',
      desc: 'Navigate to Settings -> Secrets and variables -> Actions in your repository, and add the credentials highlighted by the generator notes.',
    },
    {
      icon: <CheckCircle className="text-emerald-500" size={20} />,
      step: '4',
      title: 'Verify Build Triggers',
      desc: 'Commit these workflow files and push them to your repository. Navigate to the "Actions" tab on GitHub to monitor the pipeline trigger logs.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
        
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-linear-to-br from-indigo-50/50 via-white to-violet-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-violet-950/20 p-8 shadow-sm text-center">
          <div className="dot-grid absolute inset-0 opacity-40"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2 block">
              Getting Started
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Integration Walkthrough
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Follow these simple setup instructions to wire your newly generated configuration templates directly into your GitHub repository pipeline.
            </p>
          </div>
        </section>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <div 
              key={i} 
              className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 shadow-xs flex flex-col gap-3 relative"
            >
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit">
                  {item.icon}
                </div>
                <span className="font-display font-black text-3xl text-slate-200 dark:text-slate-800">
                  {item.step}
                </span>
              </div>
              <h3 className="font-display font-semibold text-base text-slate-950 dark:text-white mt-1">
                {item.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
