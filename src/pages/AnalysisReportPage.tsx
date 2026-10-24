import React, { useState } from 'react';
import {
  PaperAnalysis,
  GroundingSource,
} from '../types/paper';
import { MermaidRenderer } from '../components/MermaidRenderer';
import { WorkflowStepper } from '../components/WorkflowStepper';
import { ResearchQA } from '../components/ResearchQA';
import {
  BookOpen,
  Calendar,
  Users,
  Tag,
  ExternalLink,
  Copy,
  Check,
  Printer,
  FileCode2,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Layers,
  Cpu,
  Boxes,
  Activity,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Share2,
  MessageSquare,
} from 'lucide-react';

interface AnalysisReportPageProps {
  analysis: PaperAnalysis;
  sources: GroundingSource[];
  onBackToInput: () => void;
}

export const AnalysisReportPage: React.FC<AnalysisReportPageProps> = ({
  analysis,
  sources,
  onBackToInput,
}) => {
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [showBibtexModal, setShowBibtexModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'all' | 'summary' | 'methodology' | 'tools' | 'workflow' | 'flowchart' | 'insights' | 'qa'
  >('all');

  const paperMetadata = analysis?.paperMetadata || {
    title: 'Technical Analysis',
    authors: '',
    year: '',
    venue: '',
    domain: '',
    coreContribution: '',
  };
  const executiveSummary = analysis?.executiveSummary || {
    overview: '',
    coreProblem: '',
    significance: '',
    keyTakeaway: '',
  };
  const methodology = analysis?.methodology || {
    coreApproach: '',
    algorithmsAndFormulas: [],
    modelsAndArchitectures: [],
    datasetsAndBenchmarks: [],
    experimentalSetup: '',
  };
  const technologiesAndTools = analysis?.technologiesAndTools || {
    aiModelsAndArchitectures: [],
    frameworksAndLibraries: [],
    programmingLanguages: [],
    hardwareArchitecture: [],
    benchmarksAndMetrics: [],
  };
  const workflow = analysis?.workflow || [];
  const flowchart = analysis?.flowchart || {
    mermaid: 'graph TD\n  A[Input] --> B[Processing] --> C[Output]',
    ascii: '[Input] --> [Processing] --> [Output]',
  };
  const insightsAndImplications = analysis?.insightsAndImplications || {
    realWorldApplications: [],
    limitations: [],
    futureDirections: [],
  };

  const algorithms = methodology.algorithmsAndFormulas || [];
  const models = methodology.modelsAndArchitectures || [];
  const datasets = methodology.datasetsAndBenchmarks || [];
  const aiModels = technologiesAndTools.aiModelsAndArchitectures || [];
  const frameworks = technologiesAndTools.frameworksAndLibraries || [];
  const languages = technologiesAndTools.programmingLanguages || [];
  const hardware = technologiesAndTools.hardwareArchitecture || [];
  const metrics = technologiesAndTools.benchmarksAndMetrics || [];
  const realWorldApps = insightsAndImplications.realWorldApplications || [];
  const limitationsList = insightsAndImplications.limitations || [];
  const futureDirs = insightsAndImplications.futureDirections || [];

  // Helper to render bold markdown (**term**)
  const renderFormatted = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-indigo-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Generate clean Academic Markdown representation
  const generateMarkdown = () => {
    return `# ${paperMetadata.title || 'Research Paper Analysis'}
**Authors:** ${paperMetadata.authors || 'N/A'}  
**Year:** ${paperMetadata.year || 'N/A'} | **Venue:** ${paperMetadata.venue || 'N/A'}  
**Domain:** ${paperMetadata.domain || 'N/A'}  
**Core Contribution:** ${paperMetadata.coreContribution || 'N/A'}

---

## 1. 📌 Executive Summary
**Overview:** ${executiveSummary.overview || 'N/A'}  
**Core Problem Solved:** ${executiveSummary.coreProblem || 'N/A'}  
**Significance:** ${executiveSummary.significance || 'N/A'}  
**Key Takeaway:** ${executiveSummary.keyTakeaway || 'N/A'}

---

## 2. 🔬 Methodology
**Core Approach:** ${methodology.coreApproach || 'N/A'}

### Key Algorithms & Mathematical Formulations
${algorithms.map((a) => `- ${a}`).join('\n')}

### Models & Architectural Components
${models.map((m) => `- ${m}`).join('\n')}

### Datasets & Benchmarks
${datasets.map((d) => `- ${d}`).join('\n')}

**Experimental Setup:**  
${methodology.experimentalSetup || 'N/A'}

---

## 3. 🛠️ Technologies & Tools Used
- **AI Models & Architectures:** ${aiModels.join(', ')}
- **Frameworks & Libraries:** ${frameworks.join(', ')}
- **Programming Languages:** ${languages.join(', ')}
- **Hardware Architecture:** ${hardware.join(', ')}
- **Evaluation Benchmarks & Metrics:** ${metrics.join(', ')}

---

## 4. 🔄 Workflow
${workflow.map((w) => `### Stage ${w.stepNumber}: ${w.title}\n- **Description:** ${w.description}\n- **Inputs:** ${w.inputs}\n- **Outputs:** ${w.outputs}\n`).join('\n')}

---

## 5. 📊 Flowchart (Mermaid.js)
\`\`\`mermaid
${flowchart.mermaid || ''}
\`\`\`

### Flowchart (ASCII Art)
\`\`\`
${flowchart.ascii || ''}
\`\`\`

---

## 6. 💡 Insights and Implications
### Real-World Applications
${realWorldApps.map((a) => `- ${a}`).join('\n')}

### Limitations & Computational Constraints
${limitationsList.map((l) => `- ${l}`).join('\n')}

### Future Research Directions
${futureDirs.map((f) => `- ${f}`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const generateBibTeX = () => {
    const firstAuthor = paperMetadata.authors ? paperMetadata.authors.split(' ')[0].replace(/[^a-zA-Z]/g, '').toLowerCase() : 'author';
    const year = paperMetadata.year || '2025';
    const key = `${firstAuthor}${year}`;
    return `@article{${key},
  title={${paperMetadata.title || 'Untitled'}},
  author={${paperMetadata.authors || 'Unknown'}},
  journal={${paperMetadata.venue || 'arXiv preprint'}},
  year={${paperMetadata.year || '2025'}}
}`;
  };

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(generateBibTeX());
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Navigation & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <button
          onClick={onBackToInput}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-400" />
          <span>&larr; Analyze Another Paper</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowBibtexModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>BibTeX</span>
          </button>
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            {copiedMd ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied MD!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-indigo-400" />
                <span>Export Markdown</span>
              </>
            )}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-400" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Paper Header Dossier Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {paperMetadata.domain && (
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-medium">
              {paperMetadata.domain}
            </span>
          )}
          {paperMetadata.venue && (
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {paperMetadata.venue}
            </span>
          )}
          {paperMetadata.year && (
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              {paperMetadata.year}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Technical Dossier Verified
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
          {paperMetadata.title || 'Technical Analysis'}
        </h1>

        {paperMetadata.authors && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
            <Users className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{paperMetadata.authors}</span>
          </div>
        )}

        {paperMetadata.coreContribution && (
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Core Breakthrough: </span>
              {renderFormatted(paperMetadata.coreContribution)}
            </div>
          </div>
        )}

        {/* Google Search Grounding Sources */}
        {sources && sources.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
              Search Grounding Verified Sources:
            </span>
            {sources.map((src, idx) => (
              <a
                key={idx}
                href={src.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950 hover:bg-slate-850 text-indigo-300 border border-slate-800 text-[11px] transition-colors"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                <span className="truncate max-w-[200px]">{src.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Section Quick Jump Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
        {[
          { id: 'all', label: 'Complete Dossier' },
          { id: 'summary', label: '1. 📌 Executive Summary' },
          { id: 'methodology', label: '2. 🔬 Methodology' },
          { id: 'tools', label: '3. 🛠️ Tech & Tools' },
          { id: 'workflow', label: '4. 🔄 Workflow' },
          { id: 'flowchart', label: '5. 📊 Flowchart' },
          { id: 'insights', label: '6. 💡 Insights' },
          { id: 'qa', label: '💬 Technical Q&A' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: 📌 Executive Summary */}
      {(activeTab === 'all' || activeTab === 'summary') && (
        <section id="section-summary" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-xl">📌</span>
              <span>1. Executive Summary (Main Overview &amp; Gist)</span>
            </h2>
            <span className="text-xs font-mono text-indigo-400">High-Level Distillation</span>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1.5">
                Overview &amp; Core Purpose
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {renderFormatted(executiveSummary.overview)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                  Core Problem It Solves
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {renderFormatted(executiveSummary.coreProblem)}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                  Scientific &amp; Practical Significance
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {renderFormatted(executiveSummary.significance)}
                </p>
              </div>
            </div>

            {executiveSummary.keyTakeaway && (
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/50 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-0.5">
                    Key Technical Takeaway
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    {renderFormatted(executiveSummary.keyTakeaway)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 2: 🔬 Methodology */}
      {(activeTab === 'all' || activeTab === 'methodology') && (
        <section id="section-methodology" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-xl">🔬</span>
              <span>2. Scientific &amp; Technical Methodology</span>
            </h2>
            <span className="text-xs font-mono text-indigo-400">Algorithmic Formulation</span>
          </div>

          <div className="space-y-5">
            {/* Core Approach */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Core Scientific Approach &amp; Foundations
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {renderFormatted(methodology.coreApproach)}
              </p>
            </div>

            {/* Algorithms & Formulas */}
            {algorithms.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Key Algorithms, Mechanisms &amp; Formulations
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {algorithms.map((formula, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 border border-slate-800/90 rounded-xl p-4 text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      {renderFormatted(formula)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Models and Datasets 2-column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Models & Architectures */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5" />
                  Models &amp; Architectural Components
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {models.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">&bull;</span>
                      <span>{renderFormatted(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Datasets & Benchmarks */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Datasets, Preprocessing &amp; Baselines
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {datasets.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">&bull;</span>
                      <span>{renderFormatted(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Experimental Setup */}
            {methodology.experimentalSetup && (
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Training Configuration &amp; Experimental Hyperparameters
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  {renderFormatted(methodology.experimentalSetup)}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 3: 🛠️ Technologies & Tools Used */}
      {(activeTab === 'all' || activeTab === 'tools') && (
        <section id="section-tools" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-xl">🛠️</span>
              <span>3. Technologies &amp; Tools Used</span>
            </h2>
            <span className="text-xs font-mono text-indigo-400">Software &amp; Hardware Audit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* AI Models */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5" />
                AI/ML Models &amp; Architectures
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aiModels.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-950/70 text-indigo-200 border border-indigo-800/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Frameworks &amp; Libraries
              </span>
              <div className="flex flex-wrap gap-1.5">
                {frameworks.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-cyan-950/70 text-cyan-200 border border-cyan-800/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Programming Languages */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5" />
                Languages &amp; Runtimes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-950/70 text-amber-200 border border-amber-800/60 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Hardware Architecture */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Hardware &amp; Compute Cluster
              </span>
              <div className="flex flex-wrap gap-1.5">
                {hardware.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-950/70 text-emerald-200 border border-emerald-800/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Benchmarks & Metrics */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                Evaluation Benchmarks &amp; Performance Metrics
              </span>
              <div className="flex flex-wrap gap-1.5">
                {metrics.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-950/70 text-rose-200 border border-rose-800/60 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: 🔄 Workflow */}
      {(activeTab === 'all' || activeTab === 'workflow') && (
        <section id="section-workflow" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-xl">🔄</span>
              <span>4. Step-by-Step Sequential Workflow</span>
            </h2>
            <span className="text-xs font-mono text-indigo-400">Input &rarr; Output Execution Flow</span>
          </div>

          <WorkflowStepper steps={workflow} />
        </section>
      )}

      {/* SECTION 5: 📊 Flowchart (Visual Pipeline Diagram) */}
      {(activeTab === 'all' || activeTab === 'flowchart') && (
        <section id="section-flowchart" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-xl">📊</span>
              <span>5. Architecture &amp; Pipeline Diagram</span>
            </h2>
            <span className="text-xs font-mono text-indigo-400">Interactive Visual / ASCII</span>
          </div>

          <MermaidRenderer
            chart={flowchart.mermaid}
            asciiFallback={flowchart.ascii}
          />
        </section>
      )}

      {/* SECTION 6: 💡 Insights and Implications */}
      {(activeTab === 'all' || activeTab === 'insights') && (
        <section id="section-insights" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span>6. Insights, Applications &amp; Limitations</span>
            </h2>
            <span className="text-xs font-mono text-indigo-400">Impact Analysis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Real World Applications */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Lightbulb className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Real-World Applications
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {realWorldApps.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&check;</span>
                    <span>{renderFormatted(app)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations & Constraints */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Critical Limitations &amp; Risks
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {limitationsList.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">&excl;</span>
                    <span>{renderFormatted(lim)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Future Directions */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Future Research Horizons
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {futureDirs.map((dir, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">&rarr;</span>
                    <span>{renderFormatted(dir)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: 💬 Interactive Technical Q&A */}
      {(activeTab === 'all' || activeTab === 'qa') && (
        <section id="section-qa" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <span>Grounded Academic Inquiries &amp; Mathematical Clarifications</span>
            </h2>
            <span className="text-xs font-mono text-indigo-400">Interactive Gemini Session</span>
          </div>

          <ResearchQA
            paperTitle={paperMetadata.title}
            paperSummary={executiveSummary.overview}
          />
        </section>
      )}

      {/* BibTeX Modal */}
      {showBibtexModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-indigo-400" />
                <span>BibTeX Citation</span>
              </h3>
              <button
                onClick={() => setShowBibtexModal(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                Close &times;
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-indigo-200 border border-slate-800 overflow-x-auto whitespace-pre">
              {generateBibTeX()}
            </pre>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCopyBibtex}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedBibtex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBibtex ? 'Copied BibTeX!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
