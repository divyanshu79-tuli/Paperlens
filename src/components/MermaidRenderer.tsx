import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { AlertCircle, Check, Copy, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MermaidRendererProps {
  chart: string;
  asciiFallback?: string;
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart, asciiFallback }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'visual' | 'ascii' | 'code'>('visual');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
      themeVariables: {
        primaryColor: '#e0e7ff',
        primaryTextColor: '#1e1b4b',
        primaryBorderColor: '#6366f1',
        lineColor: '#4f46e5',
        secondaryColor: '#f1f5f9',
        tertiaryColor: '#ffffff',
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 50,
        rankSpacing: 50,
      },
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    setError(null);

    const cleanChart = (chart || '').trim();
    if (!cleanChart) return;

    const renderChart = async () => {
      try {
        const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        // Clean markdown backticks and illegal Mermaid tokens
        let sanitized = cleanChart
          .replace(/```mermaid/g, '')
          .replace(/```/g, '')
          .replace(/&/g, 'and')
          .replace(/\(\(\s*\+\s*\)\)/g, '((Sum))')
          .replace(/-\.\s*(.*?)\s*\.->/g, '-->|$1|')
          .trim();
        
        // Ensure standard valid graph start
        if (!sanitized.startsWith('graph') && !sanitized.startsWith('flowchart')) {
          sanitized = `graph TD\n${sanitized}`;
        }

        const { svg } = await mermaid.render(id, sanitized);
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
        }
      } catch (err: any) {
        // Fall back gracefully to ASCII or code view without throwing warning
        if (isMounted) {
          if (asciiFallback) {
            setViewMode('ascii');
          } else {
            setViewMode('code');
          }
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart, asciiFallback]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentContent = viewMode === 'visual' ? chart : viewMode === 'ascii' ? (asciiFallback || chart) : chart;

  return (
    <div className={`relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200 ${isFullScreen ? 'fixed inset-4 z-50 shadow-2xl flex flex-col bg-slate-950' : ''}`}>
      {/* Top Bar Controls */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {asciiFallback && (
            <button
              onClick={() => setViewMode(viewMode === 'ascii' ? 'visual' : 'ascii')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'ascii'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⌨️ ASCII Art
            </button>
          )}
          <button
            onClick={() => setViewMode(viewMode === 'code' ? 'visual' : 'code')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'code'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            &lt;/&gt; Mermaid Syntax
          </button>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'visual' && (
            <div className="flex items-center gap-1 bg-slate-900 rounded-lg border border-slate-800 px-1 py-0.5">
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))}
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-400 px-1">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(2.5, z + 0.15))}
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            onClick={() => handleCopy(currentContent)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            title="Copy diagram source"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Diagram Canvas Body */}
      <div className={`p-6 overflow-auto flex items-center justify-center min-h-[360px] ${isFullScreen ? 'flex-1' : 'max-h-[640px]'}`}>
        {viewMode === 'visual' ? (
          error ? (
            <div className="flex flex-col items-center justify-center text-center p-6 max-w-md bg-amber-950/30 border border-amber-800/50 rounded-xl text-amber-200">
              <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
              <p className="text-sm font-semibold mb-1">Visual Diagram Preview Notice</p>
              <p className="text-xs text-amber-300/80 mb-3">
                {error}
              </p>
              {asciiFallback && (
                <button
                  onClick={() => setViewMode('ascii')}
                  className="text-xs font-medium px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded-lg border border-amber-500/40"
                >
                  Switch to ASCII Art Diagram
                </button>
              )}
            </div>
          ) : svgContent ? (
            <div
              ref={containerRef}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
              className="transition-transform duration-150 inline-block bg-white p-6 rounded-xl shadow-lg max-w-full"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <span>Rendering research pipeline diagram...</span>
            </div>
          )
        ) : viewMode === 'ascii' ? (
          <div className="w-full">
            <pre className="font-mono text-xs sm:text-sm text-emerald-300 bg-slate-950 p-6 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
              {asciiFallback || 'No ASCII diagram provided.'}
            </pre>
          </div>
        ) : (
          <div className="w-full">
            <pre className="font-mono text-xs text-indigo-200 bg-slate-950 p-6 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
              {chart}
            </pre>
          </div>
        )}
      </div>

      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Architecture &amp; Pipeline Dataflow</span>
        <span>Mermaid.js v11 &bull; Academic Flowchart</span>
      </div>
    </div>
  );
};
