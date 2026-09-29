import React, { useState } from 'react';
import { BI_RECIPES } from '../../data/portfolioContent';
import { BiTool } from '../../types/dashboard';
import { Code2, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export const BiFormulasSection: React.FC = () => {
  const [activeTool, setActiveTool] = useState<BiTool>('powerbi');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentRecipe = BI_RECIPES[activeTool];

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono mb-2">
          <Terminal className="w-4 h-4" />
          <span>PRODUCTION BI CODE IMPLEMENTATION</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Calculations & Data Modeling Recipes
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Production-grade formulas engineered for Power BI (DAX), Tableau (Calculated Fields & LODs), and Google Looker (LookML). Ready to copy into your BI environment.
        </p>

        {/* Platform Selector Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTool('powerbi')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTool === 'powerbi'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Power BI (DAX Measures)</span>
          </button>

          <button
            onClick={() => setActiveTool('tableau')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTool === 'tableau'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            <span>Tableau (Calculations & LODs)</span>
          </button>

          <button
            onClick={() => setActiveTool('looker')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTool === 'looker'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Looker / LookML (Views & Explores)</span>
          </button>
        </div>
      </div>

      {/* Active Tool Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>{currentRecipe.toolName} Formula Specifications</span>
          </h2>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {currentRecipe.badge}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {currentRecipe.description}
        </p>
      </div>

      {/* Code Snippets List */}
      <div className="space-y-4">
        {currentRecipe.snippets.map((snippet, idx) => {
          const isCopied = copiedIndex === idx;

          return (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Snippet Header */}
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 font-mono">
                  {snippet.title}
                </span>

                <button
                  onClick={() => handleCopy(snippet.code, idx)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    isCopied
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Pre Block */}
              <div className="p-4 bg-slate-950 overflow-x-auto">
                <pre className="text-xs font-mono text-slate-200 leading-relaxed selection:bg-indigo-600/40">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
