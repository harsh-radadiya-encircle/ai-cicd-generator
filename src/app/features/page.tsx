'use client';

import React from 'react';
import Header from '@/components/Header';
import { Shield, Sparkles, FolderOpen, Zap } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <Sparkles className="text-violet-500" size={24} />,
      title: 'Guided Workflow Creation',
      description: 'Select your framework, package manager, and target platform, and receive perfectly formatted, valid GitHub Actions configuration instantly.',
    },
    {
      icon: <FolderOpen className="text-purple-500" size={24} />,
      title: 'Visual Directory Tree',
      description: 'See exactly where each generated file needs to go in your repository with our interactive tree view and contextual file guides.',
    },
    {
      icon: <Shield className="text-indigo-500" size={24} />,
      title: 'Secrets & Environment Audits',
      description: 'Understand exactly which tokens and secrets you need to register on GitHub, and where to find them, to configure CI/CD safely.',
    },
    {
      icon: <Zap className="text-amber-500" size={24} />,
      title: 'Fast Deployment Pipelines',
      description: 'Download staging rollout, production triggers, and environment configuration scripts packaged inside a single ZIP file.',
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
              Product Capabilities
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Redefining CI/CD Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              We design software that eliminates complex YAML syntax mistakes, enabling dev teams to configure workflow checks and deployments effortlessly.
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 shadow-xs flex flex-col gap-3 group hover:border-violet-500/50 dark:hover:border-violet-500/30 transition-all duration-200"
            >
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit group-hover:scale-105 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-950 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
