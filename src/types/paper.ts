export interface PaperMetadata {
  title: string;
  authors: string;
  year: string;
  venue: string;
  domain: string;
  coreContribution: string;
}

export interface ExecutiveSummary {
  overview: string;
  coreProblem: string;
  significance: string;
  keyTakeaway: string;
}

export interface Methodology {
  coreApproach: string;
  algorithmsAndFormulas: string[];
  modelsAndArchitectures: string[];
  datasetsAndBenchmarks: string[];
  experimentalSetup: string;
}

export interface TechnologiesAndTools {
  aiModelsAndArchitectures: string[];
  frameworksAndLibraries: string[];
  programmingLanguages: string[];
  hardwareArchitecture: string[];
  benchmarksAndMetrics: string[];
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  inputs: string;
  outputs: string;
}

export interface FlowchartData {
  mermaid: string;
  ascii: string;
}

export interface InsightsAndImplications {
  realWorldApplications: string[];
  limitations: string[];
  futureDirections: string[];
}

export interface PaperAnalysis {
  paperMetadata: PaperMetadata;
  executiveSummary: ExecutiveSummary;
  methodology: Methodology;
  technologiesAndTools: TechnologiesAndTools;
  workflow: WorkflowStep[];
  flowchart: FlowchartData;
  insightsAndImplications: InsightsAndImplications;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AnalysisResponse {
  success: boolean;
  analysis: PaperAnalysis;
  sources: GroundingSource[];
  rawText?: string;
  isFallback?: boolean;
  fallbackNotice?: string;
}

export interface PresetPaper {
  id: string;
  title: string;
  authors: string;
  year: string;
  badge: string;
  description: string;
  sampleText: string;
}
