'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FileTree from '@/components/FileTree';
import { 
  Settings, 
  Download, 
  Copy, 
  RotateCcw, 
  Check, 
  FileCode, 
  HelpCircle,
  Eye,
  Info,
  ChevronRight,
  Flame
} from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// Secrets mapping
const SECRETS_MAP: Record<string, string[]> = {
  vercel: ['VERCEL_TOKEN', 'VERCEL_ORG_ID', 'VERCEL_PROJECT_ID'],
  render: ['RENDER_DEPLOY_HOOK_URL'],
  aws: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'S3_BUCKET', 'CLOUDFRONT_DISTRIBUTION_ID'],
  digitalocean: ['DIGITALOCEAN_ACCESS_TOKEN', 'DO_APP_NAME'],
  vps: ['SSH_HOST', 'SSH_USERNAME', 'SSH_PRIVATE_KEY'],
};

export default function Home() {
  // Form State
  const [projectType, setProjectType] = useState('nextjs');
  const [packageManager, setPackageManager] = useState('npm');
  const [deployTarget, setDeployTarget] = useState('vercel');
  const [branchFlow, setBranchFlow] = useState('feature-main');
  const [deployEnvironments, setDeployEnvironments] = useState('production');
  const [checks, setChecks] = useState<string[]>(['lint', 'typecheck', 'test', 'build']);

  // UI state
  const [generatedFiles, setGeneratedFiles] = useState<Record<string, string>>({});
  const [activeFile, setActiveFile] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle checks checkboxes
  const handleCheckChange = (value: string) => {
    if (checks.includes(value)) {
      setChecks(checks.filter(c => c !== value));
    } else {
      setChecks([...checks, value]);
    }
  };

  // Reset form
  const handleReset = () => {
    setProjectType('nextjs');
    setPackageManager('npm');
    setDeployTarget('vercel');
    setBranchFlow('feature-main');
    setDeployEnvironments('production');
    setChecks(['lint', 'typecheck', 'test', 'build']);
    setGeneratedFiles({});
    setActiveFile('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Trigger generator API
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const deployEnvValue = deployEnvironments;
    const resolvedDeployEnvs = deployEnvValue === 'both' 
      ? ['staging', 'production', 'both'] 
      : [deployEnvValue];

    const config = {
      projectType,
      packageManager,
      deployTarget,
      branchFlow,
      checks,
      deployEnvironments: resolvedDeployEnvs,
    };

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate workflows');
      }

      setGeneratedFiles(data.files);
      setSuccessMsg('Workflows generated successfully! Click files in the explorer tree to view them.');
      
      // Auto select first file
      const filePaths = Object.keys(data.files);
      if (filePaths.length > 0) {
        setActiveFile(filePaths[0]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during workflow generation.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Download All
  const handleDownloadAll = async () => {
    if (Object.keys(generatedFiles).length === 0) return;
    setZipping(true);
    try {
      const deployEnvValue = deployEnvironments;
      const resolvedDeployEnvs = deployEnvValue === 'both' 
        ? ['staging', 'production', 'both'] 
        : [deployEnvValue];

      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          packageManager,
          deployTarget,
          branchFlow,
          checks,
          deployEnvironments: resolvedDeployEnvs,
        }),
      });

      if (!res.ok) throw new Error('Download failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'github-workflows.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setErrorMsg(err.message || 'Download failed');
    } finally {
      setZipping(false);
    }
  };

  // Handle Copy file
  const handleCopyFile = async () => {
    const content = generatedFiles[activeFile];
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      setErrorMsg('Could not write to clipboard');
    }
  };

  // PM field visibility
  const showPmField = projectType !== 'laravel' && projectType !== 'wordpress';

  // Get current Secrets
  const currentSecrets = SECRETS_MAP[deployTarget] || [];

  // Sidebar list representation helper for tree before generation
  const willGenerateList = ['ci', 'env', 'notes'];
  if (deployEnvironments === 'both' || deployEnvironments === 'staging') {
    willGenerateList.push('staging');
  }
  if (deployEnvironments === 'both' || deployEnvironments === 'production') {
    willGenerateList.push('production');
  }

  // Highlight effect helper
  useEffect(() => {
    if (activeFile && generatedFiles[activeFile]) {
      hljs.highlightAll();
    }
  }, [activeFile, generatedFiles]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-linear-to-br from-indigo-50/50 via-white to-violet-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-violet-950/20 p-6 md:p-8 shadow-sm">
          <div className="dot-grid absolute inset-0 opacity-40"></div>
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-3 bg-violet-100/50 dark:bg-violet-950/30 px-2.5 py-1 rounded-full">
              <Flame size={12} className="fill-current text-violet-500" />
              DevOps Automation
            </span>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              Generate production-ready CI/CD pipelines in seconds.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-4">
              Stop writing manual GitHub Actions scripts. Get workflows tailored for Next.js, React, Laravel, Node.js, Vercel, AWS, and more, complete with branch protections and visual location guides.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Next.js', 'React', 'Node.js', 'Laravel', 'Vercel', 'AWS', 'DigitalOcean', 'VPS'].map((pill) => (
                <span key={pill} className="bg-white/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-300">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Generator form (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                  <Settings size={18} />
                </div>
                <h2 className="font-display font-semibold text-base text-slate-900 dark:text-white">
                  Pipeline Configurator
                </h2>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                {/* Project type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    🗂 Project Type
                  </label>
                  <select 
                    value={projectType} 
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 transition-all cursor-pointer"
                  >
                    <option value="nextjs">Next.js</option>
                    <option value="react">React</option>
                    <option value="nodejs">Node.js</option>
                    <option value="nestjs">NestJS</option>
                    <option value="shopify-theme">Shopify Theme</option>
                    <option value="laravel">Laravel (PHP)</option>
                    <option value="wordpress">WordPress (PHP)</option>
                  </select>
                </div>

                {/* Package manager */}
                {showPmField && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      📦 Package Manager
                    </label>
                    <select 
                      value={packageManager} 
                      onChange={(e) => setPackageManager(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 transition-all cursor-pointer"
                    >
                      <option value="npm">npm</option>
                      <option value="yarn">yarn</option>
                      <option value="pnpm">pnpm</option>
                    </select>
                  </div>
                )}

                {/* Deploy target */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    🚀 Deployment Target
                  </label>
                  <select 
                    value={deployTarget} 
                    onChange={(e) => setDeployTarget(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 transition-all cursor-pointer"
                  >
                    <option value="vercel">Vercel</option>
                    <option value="render">Render</option>
                    <option value="aws">AWS (S3 + CloudFront)</option>
                    <option value="digitalocean">DigitalOcean App Platform</option>
                    <option value="vps">VPS (SSH deploy)</option>
                  </select>
                </div>

                {/* Branch flow */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    🌿 Branch Strategy
                  </label>
                  <select 
                    value={branchFlow} 
                    onChange={(e) => setBranchFlow(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 transition-all cursor-pointer"
                  >
                    <option value="feature-main">feature → main</option>
                    <option value="dev-staging-main">dev → staging → main</option>
                  </select>
                </div>

                {/* Deploy environments */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    🌍 Target Environments
                  </label>
                  <select 
                    value={deployEnvironments} 
                    onChange={(e) => setDeployEnvironments(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 transition-all cursor-pointer"
                  >
                    <option value="production">Production only</option>
                    <option value="both">Staging + Production</option>
                    <option value="staging">Staging only</option>
                  </select>
                </div>

                {/* Checks */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    ✅ Quality Checks
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'lint', label: '🔍 Lint' },
                      { id: 'typecheck', label: '🔷 Type Check' },
                      { id: 'test', label: '🧪 Tests' },
                      { id: 'build', label: '🏗 Build' },
                      { id: 'lighthouse', label: '🔦 Lighthouse' },
                      { id: 'playwright', label: '🎭 Playwright' },
                    ].map((ch) => (
                      <label 
                        key={ch.id} 
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer select-none transition-all ${
                          checks.includes(ch.id)
                            ? 'bg-violet-500/10 dark:bg-violet-500/20 border-violet-500 text-violet-700 dark:text-violet-300 font-medium'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={checks.includes(ch.id)}
                          onChange={() => handleCheckChange(ch.id)}
                          className="hidden"
                        />
                        <span>{ch.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500 hover:opacity-95 text-white py-2 px-3 rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-500/20 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>⚡ Generate Workflows</>
                    )}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleReset}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer"
                    title="Reset configuration"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </form>
            </div>

            {/* Configured secrets panel */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Info size={16} className="text-amber-500" />
                <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-100 font-display">
                  Required Secrets
                </h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                Configure these environment variables in your GitHub Actions settings to enable pipeline authentication.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentSecrets.length === 0 ? (
                  <span className="text-xs text-slate-400">No secrets required for this flow</span>
                ) : (
                  currentSecrets.map(s => (
                    <span key={s} className="font-mono text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                      🔑 {s}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Visual directory tree (3 cols) */}
          <div className="lg:col-span-3">
            <div className="glass-panel rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs sticky top-20 min-h-[400px]">
              <FileTree 
                files={generatedFiles}
                activeFile={activeFile}
                onSelectFile={setActiveFile}
                willGenerateList={willGenerateList}
              />
            </div>
          </div>

          {/* Column 3: Live Preview & Details (5 cols) */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs overflow-hidden flex flex-col min-h-[500px]">
              
              {/* Header tool bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100/50 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCode size={16} className="text-indigo-500" />
                  <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                    {activeFile || 'No file selected'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {activeFile && (
                    <button 
                      onClick={handleCopyFile}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-xs cursor-pointer"
                      title="Copy code"
                    >
                      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                  {Object.keys(generatedFiles).length > 0 && (
                    <button 
                      onClick={handleDownloadAll}
                      disabled={zipping}
                      className="p-1.5 rounded-lg bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-500 dark:hover:bg-emerald-600 text-white flex items-center gap-1 text-xs font-medium cursor-pointer"
                      title="Download ZIP"
                    >
                      {zipping ? (
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        <Download size={14} />
                      )}
                      <span className="hidden sm:inline">{zipping ? 'Zipping' : 'Download All'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Code Preview Pane */}
              <div className="flex-1 bg-slate-950 p-4 overflow-auto max-h-[600px] relative">
                {activeFile && generatedFiles[activeFile] ? (
                  <pre className="text-left font-mono">
                    <code className={`language-${
                      activeFile.endsWith('.yml') || activeFile.endsWith('.yaml') 
                        ? 'yaml' 
                        : activeFile.endsWith('.md') 
                        ? 'markdown' 
                        : 'bash'
                    }`}>
                      {generatedFiles[activeFile]}
                    </code>
                  </pre>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                    <Eye size={36} className="text-slate-700 dark:text-slate-800 mb-2" />
                    <p className="text-sm font-semibold mb-1">Interactive Code Workspace</p>
                    <p className="text-xs text-slate-600 max-w-[260px]">
                      Configure the generator parameters on the left and click "Generate Workflows" to preview files.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback / Notification Toasts */}
        {(errorMsg || successMsg) && (
          <div className="fixed bottom-6 right-6 max-w-sm w-full p-4 rounded-xl shadow-lg border animate-in slide-in-from-bottom-5 duration-300 z-50 glass-panel">
            {errorMsg ? (
              <div className="flex items-start gap-2.5">
                <span className="p-1 rounded-full bg-red-500/10 text-red-500 shrink-0">❌</span>
                <div>
                  <h4 className="text-xs font-bold text-red-800 dark:text-red-300">Generation Failed</h4>
                  <p className="text-[11px] text-red-600 dark:text-red-400 mt-0.5">{errorMsg}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2.5">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0">✅</span>
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Success</h4>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">{successMsg}</p>
                </div>
              </div>
            )}
            <button 
              onClick={() => { setErrorMsg(''); setSuccessMsg(''); }}
              className="absolute top-2.5 right-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
