import React, { useState } from 'react';
import { PaperInputPage } from './pages/PaperInputPage';
import { AnalysisReportPage } from './pages/AnalysisReportPage';
import { PaperAnalysis, GroundingSource } from './types/paper';
import { SAMPLE_FALLBACK_ANALYSIS } from './data/presets';
import {
  BookOpen,
  FileText,
  Layers,
  AlertCircle,
  Zap,
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'input' | 'report'>('input');
  const [analysis, setAnalysis] = useState<PaperAnalysis>(SAMPLE_FALLBACK_ANALYSIS);
  const [sources, setSources] = useState<GroundingSource[]>([
    {
      title: 'Attention Is All You Need - arXiv:1706.03762',
      uri: 'https://arxiv.org/abs/1706.03762',
    },
    {
      title: 'NeurIPS 2017 Proceedings: Vaswani et al.',
      uri: 'https://papers.nips.cc/paper/7181-attention-is-all-you-need',
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRateLimitError, setIsRateLimitError] = useState<boolean>(false);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);

  const handleAnalyze = async (payload: {
    paperText: string;
    paperQuery: string;
    searchGrounding: boolean;
    depth: string;
    targetAudience: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsRateLimitError(false);
    setFallbackNotice(null);

    try {
      const response = await fetch('/api/analyze-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorMsg = data.error || 'Failed to analyze paper.';
        const rateLimit = data.isRateLimit || response.status === 429 || errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('RESOURCE_EXHAUSTED');
        setIsRateLimitError(rateLimit);
        throw new Error(errorMsg);
      }

      setAnalysis(data.analysis);
      setSources(data.sources || []);
      if (data.fallbackNotice) {
        setFallbackNotice(data.fallbackNotice);
      }
      setCurrentPage('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis error:', err);
      const msg = err.message || 'An unexpected error occurred during paper deconstruction.';
      setErrorMessage(msg);
      if (msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
        setIsRateLimitError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            onClick={() => setCurrentPage('input')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">PaperLens</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  v2.5
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none">
                Technical Analyzer &amp; Summarizer
              </p>
            </div>
          </div>

          {/* Two-Webpage Nav Tabs */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentPage('input')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPage === 'input'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Page 1: Ingestion Studio</span>
            </button>

            <button
              onClick={() => setCurrentPage('report')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPage === 'report'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Page 2: Technical Dossier</span>
              {analysis?.paperMetadata?.title && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Notice Banner (Fallback / Rate Limit alert) */}
      {fallbackNotice && (
        <div className="bg-amber-950/80 border-b border-amber-800/80 px-4 py-2 text-amber-200 text-xs flex items-center justify-between max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{fallbackNotice}</span>
          </div>
          <button
            onClick={() => setFallbackNotice(null)}
            className="text-xs font-bold text-amber-300 hover:text-white px-2 py-0.5 rounded hover:bg-amber-900/50"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Error notification banner if any */}
      {errorMessage && (
        <div className="max-w-5xl mx-auto px-4 mt-4 w-full">
          <div className="bg-rose-950/90 border border-rose-800/90 rounded-2xl p-5 text-rose-200 text-xs sm:text-sm space-y-3 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span className="font-bold text-white text-sm">
                  {isRateLimitError
                    ? 'Gemini API Rate Limit / Quota Exceeded (429 RESOURCE_EXHAUSTED)'
                    : 'Analysis Notice'}
                </span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs font-bold text-rose-300 hover:text-white px-2 py-1 rounded bg-rose-900/50 hover:bg-rose-900 transition-colors"
              >
                Dismiss
              </button>
            </div>

            <p className="text-xs text-rose-200/90 leading-relaxed">
              {isRateLimitError ? (
                <>
                  Your current Gemini API key has exceeded its rate limit or free tier quota.
                  Upgrading to a paid tier in the <strong>Settings &gt; Secrets</strong> panel increases your quota limits, or please wait a minute before sending another analysis request.
                </>
              ) : (
                errorMessage
              )}
            </p>
          </div>
        </div>
      )}

      {/* Main Content View (Only 2 Webpages) */}
      <main className="flex-1">
        {currentPage === 'input' ? (
          <PaperInputPage
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        ) : (
          <AnalysisReportPage
            analysis={analysis}
            sources={sources}
            onBackToInput={() => {
              setCurrentPage('input');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>
          PaperLens Technical Analyzer &amp; Summarizer &bull; Powered by Google Gemini 3.8 Flash &bull; Google Search Grounding &bull; Mermaid.js Flowcharts
        </p>
        <p className="text-[11px] text-slate-600">
          Strict 6-part academic framework: Executive Summary &bull; Methodology &bull; Technologies &bull; Workflow &bull; Flowchart &bull; Insights
        </p>
      </footer>
    </div>
  );
}
