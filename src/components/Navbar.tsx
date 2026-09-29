import React from 'react';
import { BiTool } from '../types/dashboard';
import { Download, FileSpreadsheet, LayoutDashboard, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'casestudy' | 'schema' | 'recipes' | 'insights' | 'fiverr';
  setActiveTab: (tab: 'dashboard' | 'casestudy' | 'schema' | 'recipes' | 'insights' | 'fiverr') => void;
  biTool: BiTool;
  setBiTool: (tool: BiTool) => void;
  onExportCsv: () => void;
  filteredCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  biTool,
  setBiTool,
  onExportCsv,
  filteredCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#dashboard"
            onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
            className="text-lg font-bold tracking-tight text-white hover:text-indigo-300 transition-colors flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm font-black text-sm">
              SP
            </span>
            <span>SalesPulse BI</span>
          </a>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`transition-colors hover:text-white py-1 ${activeTab === 'dashboard' ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold' : ''}`}
          >
            Live Dashboard
          </button>
          <button
            onClick={() => setActiveTab('casestudy')}
            className={`transition-colors hover:text-white py-1 ${activeTab === 'casestudy' ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold' : ''}`}
          >
            Case Study
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`transition-colors hover:text-white py-1 ${activeTab === 'schema' ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold' : ''}`}
          >
            Dataset & Schema
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`transition-colors hover:text-white py-1 ${activeTab === 'recipes' ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold' : ''}`}
          >
            BI Formulas (DAX/LOD)
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`transition-colors hover:text-white py-1 ${activeTab === 'insights' ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold' : ''}`}
          >
            Key Insights
          </button>
          <button
            onClick={() => setActiveTab('fiverr')}
            className={`transition-colors hover:text-white py-1 ${activeTab === 'fiverr' ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold' : ''}`}
          >
            Fiverr & LinkedIn Kit
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* BI Tool Theme Switcher */}
          <div className="hidden sm:flex items-center p-1 bg-slate-800 rounded-lg border border-slate-700/60 text-xs">
            <button
              onClick={() => setBiTool('powerbi')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                biTool === 'powerbi'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Power BI Theme & Styling"
            >
              Power BI
            </button>
            <button
              onClick={() => setBiTool('tableau')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                biTool === 'tableau'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tableau Theme & Styling"
            >
              Tableau
            </button>
            <button
              onClick={() => setBiTool('looker')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                biTool === 'looker'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Looker Theme & Styling"
            >
              Looker
            </button>
          </div>

          {/* Export CSV action */}
          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            title="Download active filtered dataset as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>

      </div>

      {/* Mobile Nav strip */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-800 text-xs scrollbar-none">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('casestudy')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'casestudy' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Case Study
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'schema' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Schema
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'recipes' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          BI Formulas
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'insights' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Insights
        </button>
        <button
          onClick={() => setActiveTab('fiverr')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'fiverr' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Fiverr & LinkedIn
        </button>
      </div>
    </header>
  );
};
