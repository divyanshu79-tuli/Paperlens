import React, { useState } from 'react';
import { WorkflowStep } from '../types/paper';
import { ArrowRight, ChevronLeft, ChevronRight, Layers, ArrowDownRight, Sparkles } from 'lucide-react';

interface WorkflowStepperProps {
  steps: WorkflowStep[];
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'stepper' | 'all'>('all');

  if (!steps || steps.length === 0) {
    return <p className="text-sm text-slate-400">No workflow steps specified.</p>;
  }

  const current = steps[activeStep] || steps[0];

  // Helper to render bold text if contains **word**
  const renderFormattedText = (text: string) => {
    if (!text) return '';
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-indigo-200">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Sequential Pipeline ({steps.length} Stages)
          </span>
        </div>
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Full Pipeline
          </button>
          <button
            onClick={() => setViewMode('stepper')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'stepper'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Step-by-Step
          </button>
        </div>
      </div>

      {viewMode === 'stepper' ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-5">
          {/* Progress bar */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  activeStep === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : idx < activeStep
                    ? 'bg-slate-800 text-indigo-300 hover:bg-slate-750'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-850'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span className="truncate max-w-[120px]">{s.title}</span>
              </button>
            ))}
          </div>

          {/* Active Card */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold text-sm">
                  {current.stepNumber || activeStep + 1}
                </span>
                <div>
                  <h4 className="text-base font-semibold text-slate-100">
                    {current.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Stage {activeStep + 1} of {steps.length}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {renderFormattedText(current.description)}
            </p>

            {/* Inputs & Outputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                  <ArrowRight className="w-3 h-3 text-cyan-400" /> Inputs
                </span>
                <p className="text-xs text-slate-200">
                  {current.inputs || 'Input data / tensor'}
                </p>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                  <ArrowDownRight className="w-3 h-3 text-emerald-400" /> Outputs
                </span>
                <p className="text-xs text-slate-200">
                  {current.outputs || 'Processed intermediate / prediction'}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg border border-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Stage
            </button>
            <span className="text-xs text-slate-400 font-mono">
              {activeStep + 1} / {steps.length}
            </span>
            <button
              onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
              disabled={activeStep === steps.length - 1}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
            >
              Next Stage <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Pipeline Timeline */
        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-indigo-400/40 before:to-slate-800">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Bullet circle */}
              <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center text-[10px] font-bold text-indigo-300 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                {step.stepNumber || idx + 1}
              </div>

              <div className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 rounded-xl p-4 transition-all hover:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                    <span>{step.title}</span>
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-950/60 text-indigo-300 rounded border border-indigo-800/50">
                    Phase {step.stepNumber || idx + 1}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                  {renderFormattedText(step.description)}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/60">
                    <span className="text-[10px] font-semibold text-slate-400 block mb-0.5">
                      Input Flow:
                    </span>
                    <span className="text-slate-300">{step.inputs}</span>
                  </div>
                  <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/60">
                    <span className="text-[10px] font-semibold text-slate-400 block mb-0.5">
                      Output Result:
                    </span>
                    <span className="text-slate-300">{step.outputs}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
