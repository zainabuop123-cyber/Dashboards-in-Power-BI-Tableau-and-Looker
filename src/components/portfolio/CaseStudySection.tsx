import React from 'react';
import { PORTFOLIO_METADATA } from '../../data/portfolioContent';
import { Briefcase, Target, Database, BarChart2, CheckCircle2, TrendingUp, Cpu, Award } from 'lucide-react';

export const CaseStudySection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Hero Banner Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-400 font-mono mb-3">
          <span className="px-2.5 py-1 rounded bg-indigo-950/80 border border-indigo-800/60 font-semibold">
            EXECUTIVE PORTFOLIO CASE STUDY
          </span>
          <span>·</span>
          <span>{PORTFOLIO_METADATA.industry}</span>
          <span>·</span>
          <span>{PORTFOLIO_METADATA.timeframe}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {PORTFOLIO_METADATA.projectTitle}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-3xl">
          An end-to-end business intelligence implementation empowering retail executives to track multi-territory revenue velocity, protect gross margins against discount dilution, and optimize inventory allocation across four global distribution hubs.
        </p>

        {/* Project Meta grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-800/80 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[11px]">ANALYST ROLE</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">{PORTFOLIO_METADATA.role}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">TOOLS & ENGINES</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">Power BI · Tableau · Looker</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">SEMANTIC MODEL</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">Kimball Star Schema</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">RECORDS ANALYZED</span>
            <span className="font-semibold text-emerald-400 mt-0.5 block">12,480 Orders ($1.84M)</span>
          </div>
        </div>
      </div>

      {/* 1. Business Context & Strategic Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-rose-400">
            <Target className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-100">The Business Problem</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The e-commerce enterprise experienced rapid top-line sales expansion (+14.2% YoY), yet senior leadership observed that bottom-line operating margins were stagnating at 28.4%. The executive committee lacked unified visibility into:
          </p>
          <ul className="space-y-2 mt-4 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold shrink-0">✕</span>
              <span><strong>Promotional Discount Blind Spots:</strong> Sitewide markdowns were eroding product margins on hardware categories without stimulating proportional order volume.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold shrink-0">✕</span>
              <span><strong>Disjointed Territorial Reporting:</strong> Regional heads in North America, Europe, APAC, and LATAM relied on isolated spreadsheets with conflicting KPI definitions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold shrink-0">✕</span>
              <span><strong>Stockout Friction in Peak Seasons:</strong> High-velocity SKUs were running out of inventory during Q4 holiday spikes due to lack of predictive replenishment triggers.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-100">Project Objectives & Deliverables</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The mandate was to build a standardized, publication-grade analytics command center compatible with Microsoft Power BI, Tableau Desktop, and Google Cloud Looker:
          </p>
          <ul className="space-y-2 mt-4 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold shrink-0">✓</span>
              <span><strong>Unified KPI Framework:</strong> Engineer centralized measures for Recognized Sales, Order Counts, Average Order Value (AOV), and Gross Margin %.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold shrink-0">✓</span>
              <span><strong>Interactive Dimensional Drill-Down:</strong> Enable instant cross-filtering across Date Ranges, Continents, Product Categories, and Customer Cohorts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold shrink-0">✓</span>
              <span><strong>Kimball Star Schema Data Warehouse:</strong> Model transactional fact tables and conformed dimensions for sub-second visual query rendering.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. Analytical Architecture & Methodology */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span>Four-Stage Analytical Implementation Lifecycle</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <div className="text-indigo-400 font-mono font-bold text-xs mb-1">STAGE 01</div>
            <div className="font-semibold text-slate-200 text-xs mb-1.5">ETL & Data Hygiene</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Extracted raw transactional streams, cleaned null discount codes, sanitized country ISO mappings, and standardized fiscal calendar boundaries.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <div className="text-sky-400 font-mono font-bold text-xs mb-1">STAGE 02</div>
            <div className="font-semibold text-slate-200 text-xs mb-1.5">Star Schema Modeling</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Architected Fact_Sales with surrounding dimensions (Dim_Product, Dim_Customer, Dim_Geography, Dim_Date) with integer surrogate keys.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <div className="text-amber-400 font-mono font-bold text-xs mb-1">STAGE 03</div>
            <div className="font-semibold text-slate-200 text-xs mb-1.5">DAX & LOD Calculations</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Authored time-intelligence expressions (SAMEPERIODLASTYEAR, FIXED LODs, LookML measures) with divide-by-zero safeguards.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <div className="text-emerald-400 font-mono font-bold text-xs mb-1">STAGE 04</div>
            <div className="font-semibold text-slate-200 text-xs mb-1.5">Executive UX & Theming</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Applied 60-30-10 color discipline, custom tooltip pages, drill-through dossiers, and cross-filtering interactions for boardroom presentations.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Quantified Business Impact & ROI */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Measurable Commercial Impact Delivered</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">+$240,000</div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Gross Margin Unlocked</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Reallocated promotional ad spend towards high-margin Home & Living lines, increasing blended company gross margin from 26.0% to 28.4%.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
            <div className="text-2xl font-bold font-mono text-sky-400 tabular-nums">+19.4% YoY</div>
            <div className="text-xs font-semibold text-slate-200 mt-1">European Revenue Expansion</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Surfaced accelerating B2B corporate ergonomic demand in Europe, justifying local inventory pre-positioning in Frankfurt.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
            <div className="text-2xl font-bold font-mono text-indigo-400 tabular-nums">85% Faster</div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Decision Velocity</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Replaced 4-hour weekly manual spreadsheet compilation with sub-second live self-service filtering for the C-suite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
