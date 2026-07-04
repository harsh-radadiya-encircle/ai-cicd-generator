'use client';

import React from 'react';
import Header from '@/components/Header';
import { FileCode, Server, Play, ShieldAlert } from 'lucide-react';

export default function TemplatesPage() {
  const templates = [
    {
      icon: <FileCode className="text-emerald-500" size={24} />,
      title: 'Continuous Integration (CI) Workflow',
      description: 'Automatically triggers on every Pull Request. Compiles code and runs your active quality gate checks (ESLint, Typechecks, Unit Tests, Lighthouse auditor).',
    },
    {
      icon: <Play className="text-blue-500" size={24} />,
      title: 'Staging Auto-Deployments',
      description: 'Triggered when merging into your development/staging branches. Configures platform builds and updates preview URLs automatically.',
    },
    {
      icon: <Server className="text-indigo-500" size={24} />,
      title: 'Production Deployments & Releases',
      description: 'Pushes code to live servers on main branch commits. Auto-creates standard semantic tags, release notes, and deploy hooks on success.',
    },
    {
      icon: <ShieldAlert className="text-amber-500" size={24} />,
      title: 'Custom Local Env Configurations',
      description: 'Generates secure .env.example files mapping environment requirements so team members can copy, configure, and boot immediately.',
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
              Redistributable Designs
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Pre-engineered CI/CD Blueprints
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              We provide templates pre-mapped for production deployments to Vercel, Render, AWS static storage, DigitalOcean, or directly to custom SSH servers.
            </p>
          </div>
        </section>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template, i) => (
            <div 
              key={i} 
              className="glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 shadow-xs flex flex-col gap-3 group hover:border-violet-500/50 dark:hover:border-violet-500/30 transition-all duration-200"
            >
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit group-hover:scale-105 transition-transform duration-200">
                {template.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-950 dark:text-white">
                {template.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {template.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
