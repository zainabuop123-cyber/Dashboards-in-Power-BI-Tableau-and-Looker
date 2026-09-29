import React from 'react';
import { KEY_INSIGHTS, COLOR_THEME_SPEC, INTERACTIVITY_SPEC } from '../../data/portfolioContent';
import { Lightbulb, Palette, MousePointerClick, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export const KeyInsightsSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-4">
      {/* 1. Key Business Insights Discovered */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-2">
          <Lightbulb className="w-4 h-4" />
          <span>STRATEGIC BUSINESS FINDINGS</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
          Key Insights Revealed by the Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mb-6">
          Beyond visual presentation, an effective data analyst dashboard must uncover non-obvious patterns, diagnose margin leakage, and direct executive decision-making.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {KEY_INSIGHTS.map((insight) => (
            <div
              key={insight.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[11px] font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                    {insight.tag}
                  </span>
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] border border-emerald-800/40">
                    {insight.stat}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  {insight.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {insight.summary}
                </p>
              </div>

              {/* Actionable recommendation box */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 bg-slate-950/40 -mx-5 -mb-5 p-4 rounded-b-xl">
                <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Analyst Action Plan:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {insight.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Color Theme Architecture (Professional & Clean) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono mb-2">
          <Palette className="w-4 h-4" />
          <span>VISUAL DESIGN SYSTEM</span>
        </div>
        <h2 className="text-lg font-bold text-white mb-2">
          Recommended Color Theme: {COLOR_THEME_SPEC.paletteName}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          Engineered following the 60-30-10 rule and strict WCAG AA contrast standards. Avoids distracting neon cliches, ensuring maximum legibility during high-stakes C-suite presentations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLOR_THEME_SPEC.principles.map((p, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="font-semibold text-xs text-slate-200 mb-1">{p.name}</div>
                <div className="font-mono text-[11px] text-indigo-400 mb-2">{p.hex}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{p.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. How Interactivity Should Work */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-2">
          <MousePointerClick className="w-4 h-4" />
          <span>UX & INTERACTIVITY SPECIFICATION</span>
        </div>
        <h2 className="text-lg font-bold text-white mb-2">
          Interactivity Architecture: Slicers, Drill-Through & Tooltips
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          To ensure high executive adoption, the dashboard implements seamless bi-directional cross-filtering without lag.
        </p>

        <div className="space-y-3">
          {INTERACTIVITY_SPEC.map((spec, idx) => (
            <div key={idx} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-indigo-950 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 border border-indigo-800/50">
                0{idx + 1}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-200 mb-1">{spec.feature}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
