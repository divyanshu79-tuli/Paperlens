import React, { useState } from 'react';
import {
  FileText,
  Search,
  Sparkles,
  Upload,
  ArrowRight,
  Sliders,
  Cpu,
  Globe2,
  Trash2,
  Lightbulb,
} from 'lucide-react';

interface PaperInputPageProps {
  onAnalyze: (payload: {
    paperText: string;
    paperQuery: string;
    searchGrounding: boolean;
    depth: string;
    targetAudience: string;
  }) => void;
  isLoading: boolean;
}

export const PaperInputPage: React.FC<PaperInputPageProps> = ({
  onAnalyze,
  isLoading,
}) => {
  const [inputMode, setInputMode] = useState<'text' | 'search'>('text');
  const [paperText, setPaperText] = useState<string>('');
  const [paperQuery, setPaperQuery] = useState<string>('');
  const [searchGrounding, setSearchGrounding] = useState<boolean>(true);
  const [depth, setDepth] = useState<string>('comprehensive');
  const [targetAudience, setTargetAudience] = useState<string>('researcher');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setPaperText(content);
        setInputMode('text');
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperText.trim() && !paperQuery.trim()) return;

    onAnalyze({
      paperText: paperText.trim(),
      paperQuery: paperQuery.trim(),
      searchGrounding,
      depth,
      targetAudience,
    });
  };

  const wordCount = paperText.trim() ? paperText.trim().split(/\s+/).length : 0;
  const charCount = paperText.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Title Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini 3.8 Flash &bull; Academic Intelligence &amp; Architecture Extraction</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Technical Document Analyzer &amp; Summarizer
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Ingest complex manuscripts, preprints, or abstracts to deconstruct technical methodology,
          tooling stacks, sequential workflows, Mermaid pipeline diagrams, and real-world implications.
        </p>
      </div>

      {/* Main Analyzer Ingestion Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl">
        {/* Ingestion Mode Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setInputMode('text')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                inputMode === 'text'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Manuscript / Abstract Text
            </button>
            <button
              type="button"
              onClick={() => setInputMode('search')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                inputMode === 'search'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Search Grounding (Title / DOI / arXiv)
            </button>
          </div>

          {inputMode === 'text' && (
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-indigo-400" />
                <span>Upload .txt / .md</span>
                <input
                  type="file"
                  accept=".txt,.md,.text"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {paperText && (
                <button
                  type="button"
                  onClick={() => setPaperText('')}
                  className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Clear text"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        {inputMode === 'text' ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label htmlFor="paperText" className="font-medium text-slate-300">
                Paste Paper Text, Abstract, or Sections:
              </label>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span>{wordCount.toLocaleString()} words</span>
                <span>&bull;</span>
                <span>{charCount.toLocaleString()} chars</span>
              </div>
            </div>

            <textarea
              id="paperText"
              rows={11}
              value={paperText}
              onChange={(e) => setPaperText(e.target.value)}
              placeholder="Paste paper abstract, introduction, methodology, or full text here... (e.g. 'Attention Is All You Need', 'DeepSeek-R1', or your own research preprint)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
              required={inputMode === 'text' && !paperQuery.trim()}
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Tip: You can include title, abstract, methodology sections, or formulas.
              </span>
              <span>Input accepts arbitrary academic formats</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="paperQuery" className="text-xs font-medium text-slate-300 block">
                Paper Title, DOI, or arXiv Query:
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="paperQuery"
                  type="text"
                  value={paperQuery}
                  onChange={(e) => setPaperQuery(e.target.value)}
                  placeholder="e.g. 'Attention Is All You Need', 'arXiv:1706.03762', or 'DeepSeek-R1 Reasoning Paper'"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  required={inputMode === 'search'}
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-950/30 border border-indigo-900/40 rounded-xl text-xs text-indigo-300 flex items-start gap-2.5">
              <Globe2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Gemini 3.8 Flash will invoke <strong>Google Search Grounding</strong> to inspect
                real-time web publications, author preprints, benchmark scores, and conference
                proceedings to compile the complete technical breakdown.
              </p>
            </div>
          </div>
        )}

        {/* Configuration Options */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Depth */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                Analysis Depth
              </label>
              <select
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="comprehensive">Comprehensive (Full Rigor &amp; Formulas)</option>
                <option value="concise">Concise Architecture Brief</option>
                <option value="mathematical">Mathematical &amp; Algorithmic Focus</option>
              </select>
            </div>

            {/* Target Audience */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="researcher">AI / CS Researcher</option>
                <option value="engineer">Machine Learning Engineer / Practitioner</option>
                <option value="student">Graduate Student / Academic</option>
              </select>
            </div>

            {/* Grounding Toggle */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={searchGrounding}
                  onChange={(e) => setSearchGrounding(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-900 border-slate-700"
                />
                <div className="text-xs">
                  <span className="font-medium text-slate-200 block">Google Search Grounding</span>
                  <span className="text-[10px] text-slate-400">Verify citations &amp; baselines</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button & Loading Progress */}
        <div className="pt-2">
          {isLoading ? (
            <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-5 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 animate-pulse">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Deconstructing Document...
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Extracting Executive Summary, Mathematical Methodology, Technology Stack,
                  Sequential Workflow, and Mermaid Pipeline Diagram.
                </p>
              </div>
              <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
                <div className="w-full h-full bg-indigo-500 rounded-full animate-indeterminate" />
              </div>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!paperText.trim() && !paperQuery.trim()}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Deconstruct &amp; Analyze Document</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
