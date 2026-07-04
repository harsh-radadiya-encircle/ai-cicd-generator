'use client';

import React from 'react';
import { Folder, FolderOpen, FileText, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';

interface FileTreeProps {
  files: Record<string, string>;
  activeFile: string;
  onSelectFile: (path: string) => void;
  willGenerateList: string[]; // ['ci', 'staging', 'production', 'env', 'notes']
}

export default function FileTree({
  files,
  activeFile,
  onSelectFile,
  willGenerateList,
}: FileTreeProps) {
  // Check which keys are generated
  const hasStaging = '.github/workflows/deploy-staging.yml' in files;
  const hasProduction = '.github/workflows/deploy-production.yml' in files;
  const hasCi = '.github/workflows/ci.yml' in files;
  const hasEnv = '.env.example' in files;
  const hasNotes = 'DEPLOYMENT_NOTES.md' in files;

  const isStagingPending = willGenerateList.includes('staging');
  const isProductionPending = willGenerateList.includes('production');

  return (
    <div className="font-mono text-xs sm:text-sm select-none">
      <div className="flex items-center gap-1.5 py-1 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200/50 dark:border-slate-800/50 pb-2 mb-3">
        Project Repository Structure
      </div>

      {/* Root Node */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 py-1 text-slate-800 dark:text-slate-200">
          <FolderOpen size={16} className="text-indigo-500" />
          <span className="font-semibold">my-repository/</span>
        </div>

        {/* Level 1: .github */}
        <div className="pl-4 border-l border-slate-200 dark:border-slate-800/80 ml-2 space-y-1">
          <div className="flex items-center gap-1.5 py-1 text-slate-700 dark:text-slate-300">
            <FolderOpen size={16} className="text-violet-400" />
            <span>.github/</span>
          </div>

          {/* Level 2: workflows */}
          <div className="pl-4 border-l border-slate-200 dark:border-slate-800/80 ml-2 space-y-1">
            <div className="flex items-center gap-1.5 py-1 text-slate-600 dark:text-slate-400">
              <FolderOpen size={16} className="text-purple-400" />
              <span>workflows/</span>
            </div>

            {/* Level 3: ci.yml */}
            <div className="pl-4 border-l border-slate-200 dark:border-slate-800/80 ml-2 space-y-1">
              <button
                onClick={() => hasCi && onSelectFile('.github/workflows/ci.yml')}
                disabled={!hasCi}
                className={`w-full flex items-center justify-between text-left px-2 py-1 rounded-md transition-all cursor-pointer ${
                  !hasCi
                    ? 'opacity-40 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    : activeFile === '.github/workflows/ci.yml'
                    ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileText size={14} className="text-slate-400 dark:text-slate-500" />
                  <span className="truncate">ci.yml</span>
                </div>
                {hasCi && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
              </button>

              {/* Level 3: deploy-staging.yml */}
              {(hasStaging || isStagingPending) && (
                <button
                  onClick={() => hasStaging && onSelectFile('.github/workflows/deploy-staging.yml')}
                  disabled={!hasStaging}
                  className={`w-full flex items-center justify-between text-left px-2 py-1 rounded-md transition-all ${
                    !hasStaging
                      ? 'opacity-40 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      : activeFile === '.github/workflows/deploy-staging.yml'
                      ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText size={14} className="text-slate-400 dark:text-slate-500" />
                    <span className="truncate">deploy-staging.yml</span>
                  </div>
                  {hasStaging && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
                </button>
              )}

              {/* Level 3: deploy-production.yml */}
              {(hasProduction || isProductionPending) && (
                <button
                  onClick={() => hasProduction && onSelectFile('.github/workflows/deploy-production.yml')}
                  disabled={!hasProduction}
                  className={`w-full flex items-center justify-between text-left px-2 py-1 rounded-md transition-all ${
                    !hasProduction
                      ? 'opacity-40 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      : activeFile === '.github/workflows/deploy-production.yml'
                      ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText size={14} className="text-slate-400 dark:text-slate-500" />
                    <span className="truncate">deploy-production.yml</span>
                  </div>
                  {hasProduction && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Level 1: Other files */}
        <div className="pl-4 border-l border-slate-200 dark:border-slate-800/80 ml-2 space-y-1">
          {/* .env.example */}
          <button
            onClick={() => hasEnv && onSelectFile('.env.example')}
            disabled={!hasEnv}
            className={`w-full flex items-center justify-between text-left px-2 py-1 rounded-md transition-all ${
              !hasEnv
                ? 'opacity-40 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : activeFile === '.env.example'
                ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-medium'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <FileText size={14} className="text-slate-400 dark:text-slate-500" />
              <span className="truncate">.env.example</span>
            </div>
            {hasEnv && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
          </button>

          {/* DEPLOYMENT_NOTES.md */}
          <button
            onClick={() => hasNotes && onSelectFile('DEPLOYMENT_NOTES.md')}
            disabled={!hasNotes}
            className={`w-full flex items-center justify-between text-left px-2 py-1 rounded-md transition-all ${
              !hasNotes
                ? 'opacity-40 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : activeFile === 'DEPLOYMENT_NOTES.md'
                ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-medium'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <FileText size={14} className="text-slate-400 dark:text-slate-500" />
              <span className="truncate">DEPLOYMENT_NOTES.md</span>
            </div>
            {hasNotes && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
          </button>
        </div>
      </div>

      {activeFile && (
        <div className="mt-6 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Placement Guide:</p>
          {activeFile === '.github/workflows/ci.yml' && (
            <span>Create a folder named <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">.github/workflows</code> at the root of your project, and place <code className="text-indigo-500 dark:text-indigo-400">ci.yml</code> inside it.</span>
          )}
          {activeFile === '.github/workflows/deploy-staging.yml' && (
            <span>Place <code className="text-indigo-500 dark:text-indigo-400">deploy-staging.yml</code> inside the <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">.github/workflows</code> folder at your project root.</span>
          )}
          {activeFile === '.github/workflows/deploy-production.yml' && (
            <span>Place <code className="text-indigo-500 dark:text-indigo-400">deploy-production.yml</code> inside the <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">.github/workflows</code> folder at your project root.</span>
          )}
          {activeFile === '.env.example' && (
            <span>Place this file directly at the <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">root</code> of your project. Copy it as <code className="text-indigo-500 dark:text-indigo-400">.env</code> to fill in actual secrets locally.</span>
          )}
          {activeFile === 'DEPLOYMENT_NOTES.md' && (
            <span>Save this guide at your project root or read it to copy-paste the secrets details into your GitHub Repository settings.</span>
          )}
        </div>
      )}
    </div>
  );
}
