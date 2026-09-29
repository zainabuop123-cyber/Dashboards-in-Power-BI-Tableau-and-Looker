import React, { useState } from 'react';
import {
  FIVERR_PORTFOLIO_PACKAGE,
  LINKEDIN_POST_COPY,
  GITHUB_README_MARKDOWN
} from '../../data/portfolioContent';
import { Copy, Check, Share2, Sparkles, DollarSign, CheckCircle2, Bookmark } from 'lucide-react';

export const FiverrLinkedInKit: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'fiverr' | 'linkedin' | 'github'>('fiverr');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono mb-2">
          <Share2 className="w-4 h-4" />
          <span>CAREER & FREELANCE PORTFOLIO LAUNCHPAD</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Ready-to-Use Portfolio Assets for Fiverr & LinkedIn
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Pre-formatted, client-attracting project descriptions, gig packages, LinkedIn case studies, and GitHub documentation tailored to position you as a top 1% data analyst.
        </p>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('fiverr')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'fiverr'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>Fiverr Gig Package & Description</span>
          </button>

          <button
            onClick={() => setActiveTab('linkedin')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'linkedin'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>LinkedIn Project Showcase Post</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'github'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>GitHub Repository README</span>
          </button>
        </div>
      </div>

      {/* 1. Fiverr Kit View */}
      {activeTab === 'fiverr' && (
        <div className="space-y-6">
          {/* Gig Metadata Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Gig Setup Metadata
              </span>
              <button
                onClick={() => handleCopy(FIVERR_PORTFOLIO_PACKAGE.gigTitle, 'fiverr-title')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                {copiedType === 'fiverr-title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'fiverr-title' ? 'Copied!' : 'Copy Title'}</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Recommended Gig Title:</span>
                <span className="text-white font-medium text-sm block mt-0.5">{FIVERR_PORTFOLIO_PACKAGE.gigTitle}</span>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Fiverr Category:</span>
                <span className="text-slate-300 font-mono">{FIVERR_PORTFOLIO_PACKAGE.category}</span>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Recommended Search Tags:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {FIVERR_PORTFOLIO_PACKAGE.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Tier Packages */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-3">3-Tiered Gig Packages (Client Ready)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FIVERR_PORTFOLIO_PACKAGE.packages.map((pkg, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-slate-300">{pkg.tier.split(':')[0]}</span>
                      <span className="text-emerald-400 font-extrabold text-base">{pkg.price}</span>
                    </div>
                    <div className="text-xs font-semibold text-white mb-2">{pkg.tier.split(':')[1]}</div>
                    <div className="text-[11px] text-slate-400 mb-3 font-mono">Delivery: {pkg.delivery}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{pkg.includes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Gig Description Block */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-semibold text-slate-200">
                Full Gig Description (Formatted for Fiverr Markdown)
              </span>
              <button
                onClick={() => handleCopy(FIVERR_PORTFOLIO_PACKAGE.gigDescription, 'fiverr-desc')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                {copiedType === 'fiverr-desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'fiverr-desc' ? 'Copied Description!' : 'Copy Full Description'}</span>
              </button>
            </div>

            <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto p-2">
              {FIVERR_PORTFOLIO_PACKAGE.gigDescription}
            </pre>
          </div>
        </div>
      )}

      {/* 2. LinkedIn View */}
      {activeTab === 'linkedin' && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Viral-Ready LinkedIn Project Case Study</h3>
              <p className="text-xs text-slate-400 mt-0.5">Written with high-engagement hook, quantified results, and technical keywords</p>
            </div>

            <button
              onClick={() => handleCopy(LINKEDIN_POST_COPY, 'linkedin-post')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-sm"
            >
              {copiedType === 'linkedin-post' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'linkedin-post' ? 'Copied Post!' : 'Copy LinkedIn Post'}</span>
            </button>
          </div>

          <pre className="text-xs font-sans text-slate-200 whitespace-pre-wrap leading-relaxed p-4 bg-slate-900 rounded-lg border border-slate-800/80 max-h-[600px] overflow-y-auto">
            {LINKEDIN_POST_COPY}
          </pre>
        </div>
      )}

      {/* 3. GitHub View */}
      {activeTab === 'github' && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">GitHub Project README.md</h3>
              <p className="text-xs text-slate-400 mt-0.5">Comprehensive repository documentation with badges, Kimball schema details, and DAX/LOD code blocks</p>
            </div>

            <button
              onClick={() => handleCopy(GITHUB_README_MARKDOWN, 'github-readme')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
            >
              {copiedType === 'github-readme' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'github-readme' ? 'Copied README!' : 'Copy Markdown'}</span>
            </button>
          </div>

          <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed p-4 bg-slate-900 rounded-lg border border-slate-800/80 max-h-[600px] overflow-y-auto">
            {GITHUB_README_MARKDOWN}
          </pre>
        </div>
      )}
    </div>
  );
};
