import { PresetPaper, PaperAnalysis } from '../types/paper';

export const PRESET_PAPERS: PresetPaper[] = [
  {
    id: 'attention-is-all-you-need',
    title: 'Attention Is All You Need',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, et al. (Google Brain & Research)',
    year: '2017',
    badge: 'Landmark / Foundation',
    description: 'The foundation of modern LLMs: replacing recurrence and convolutions entirely with Scaled Dot-Product and Multi-Head Self-Attention.',
    sampleText: `Title: Attention Is All You Need
Authors: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin

Abstract:
The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing with large and limited training data.

Methodology highlights:
- Multi-Head Self-Attention (MHSA): Projects queries, keys, and values h times with learned linear projections, computing Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V.
- Positional Encoding: Uses sinusoidal functions of varying frequencies PE(pos, 2i) = sin(pos/10000^(2i/d_model)) to inject order information.
- Encoder-Decoder Stacks: 6 identical layers each with MHSA and position-wise fully connected feed-forward networks (FFN) with residual connections and layer normalization.
- Training: Adam optimizer with warm-up learning rate schedule, trained on 8 NVIDIA P100 GPUs.`
  },
  {
    id: 'deepseek-r1',
    title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
    authors: 'DeepSeek-AI Research Team',
    year: '2025',
    badge: 'Reasoning / RL',
    description: 'Pioneering pure reinforcement learning (RL) without supervised fine-tuning (DeepSeek-R1-Zero) and multi-stage distillation for high-level reasoning.',
    sampleText: `Title: DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning
Authors: DeepSeek-AI (Daya Guo, Dejian Yang, Haowei Zhang, et al.)

Abstract:
We introduce our first-generation reasoning models, DeepSeek-R1-Zero and DeepSeek-R1. DeepSeek-R1-Zero, a model trained via large-scale reinforcement learning (RL) without prior supervised fine-tuning (SFT) as a preliminary step, demonstrates remarkable reasoning capabilities. Through RL, DeepSeek-R1-Zero naturally emerges with numerous powerful and intriguing reasoning behaviors. However, it encounters challenges such as poor readability, and language mixing. To address these issues and further enhance reasoning performance, we introduce DeepSeek-R1, which incorporates multi-stage training and cold-start data before RL. DeepSeek-R1 achieves performance comparable to OpenAI-o1-1217 on reasoning tasks. To support the research community, we open-source DeepSeek-R1-Zero, DeepSeek-R1, and six dense models (1.5B, 7B, 8B, 14B, 32B, 70B) distilled from DeepSeek-R1 based on Qwen and Llama.

Methodology highlights:
- Group Relative Policy Optimization (GRPO): Eliminates the critic model to reduce memory overhead, estimating advantage from group scores: A_i = (R_i - mean(R)) / std(R).
- Dual Reward Modeling: Accuracy rewards (rule-based evaluation for math and programming problems) and Format rewards (enforcing thinking traces enclosed between <think> and </think> tags).
- Multi-Stage Training Pipeline: Cold-start data generation -> Reasoning-oriented RL -> Rejection sampling & SFT -> RL across all scenarios.
- Distillation: Dense models distilled directly from DeepSeek-R1 reasoning trajectories outperforming raw RL on smaller models.`
  },
  {
    id: 'lora',
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    authors: 'Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, et al. (Microsoft)',
    year: '2021',
    badge: 'Efficient Tuning',
    description: 'Freezing pretrained weights and injecting low-rank trainable decomposition matrices A and B, cutting VRAM by 3x and trainable parameters by 10,000x.',
    sampleText: `Title: LoRA: Low-Rank Adaptation of Large Language Models
Authors: Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen (Microsoft Corporation)

Abstract:
An important paradigm of natural language processing consists of large-scale pre-training on general domain data and adaptation to specific tasks or domains. As we pre-train larger models, full fine-tuning, which retrains all model parameters, becomes less feasible. Using GPT-3 175B as an example, deploying independent instances of fine-tuned models, each with 175B parameters, is prohibitive. We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing the number of trainable parameters for downstream tasks. Compared to fine-tuning GPT-3 175B with Adam, LoRA can reduce the number of trainable parameters by 10,000 times and the GPU memory requirement by 3 times. LoRA performs on-par or better than fine-tuning in model quality on RoBERTa, DeBERTa, GPT-2, and GPT-3, despite having fewer trainable parameters, a higher training throughput, and, unlike adapters, no additional inference latency.

Methodology highlights:
- Weight Decomposition Formulation: h = W_0 x + Delta W x = W_0 x + (B * A) x * (alpha / r), where W_0 is d x k (frozen), B is d x r, A is r x k, and rank r << min(d, k).
- Zero Inference Latency Overhead: At inference time, W = W_0 + (alpha/r) * B * A can be explicitly folded into the original weights, incurring 0 runtime delay.
- Applied primarily to self-attention projection weights (W_q, W_k, W_v, W_o).
- Massive storage savings: storing only MBs of adapter weights per task instead of 350GB checkpoint files.`
  },
  {
    id: 'resnet',
    title: 'Deep Residual Learning for Image Recognition',
    authors: 'Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun (Microsoft Research)',
    year: '2015',
    badge: 'Computer Vision',
    description: 'Solved the degradation problem in extremely deep networks using identity shortcut connections: F(x) + x.',
    sampleText: `Title: Deep Residual Learning for Image Recognition
Authors: Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun (Microsoft Research)

Abstract:
Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those previously used. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions. We provide comprehensive empirical evidence showing that these residual networks are easier to optimize, and can gain accuracy from considerably increased depth. On the ImageNet dataset we evaluate residual nets with a depth of up to 152 layers---8x deeper than VGG nets but still having lower complexity. An ensemble of these residual nets achieves 3.57% error on the ImageNet test set. This result won the 1st place on the ILSVRC 2015 classification task. We also present analysis on CIFAR-10 with 100 and 1000 layers.

Methodology highlights:
- Residual Mapping: Instead of fitting H(x), layers fit F(x) = H(x) - x, giving output y = F(x, {W_i}) + x. Identity shortcuts require neither extra parameters nor computation complexity.
- Bottleneck Architecture: 1x1, 3x3, and 1x1 convolutions for deep 50/101/152-layer networks to reduce parameter count before expensive spatial convolutions.
- Batch Normalization directly after convolutions and before activation to address internal covariate shift.`
  }
];

export const ATTENTION_ANALYSIS: PaperAnalysis = {
  paperMetadata: {
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, et al. (Google Brain & Research)",
    year: "2017",
    venue: "NeurIPS 2017 (31st Conference on Neural Information Processing Systems)",
    domain: "Natural Language Processing / Deep Learning Architecture",
    coreContribution: "Replaced recurrent (RNN/LSTM) and convolutional sequence architectures entirely with self-attention mechanisms."
  },
  executiveSummary: {
    overview: "This seminal paper introduces the **Transformer**, a revolutionary neural network architecture that relies exclusively on attention mechanisms to draw global dependencies between input and output sequences, dispensing entirely with recurrence and convolutions.",
    coreProblem: "Recurrent models (LSTMs, GRUs) inherently compute sequentially along token positions, which precludes **parallelization within training examples** and struggles to capture long-range dependencies across distant sequence tokens due to vanishing gradients.",
    significance: "It serves as the structural foundation for nearly every frontier AI system today, including **GPT-4**, **Gemini**, **BERT**, **Claude**, **Llama**, and modern multimodal vision models like **ViT**.",
    keyTakeaway: "Self-attention eliminates sequential recurrence barriers, enabling extreme computational parallelization on modern GPU clusters and superior modeling of complex token relationships."
  },
  methodology: {
    coreApproach: "The authors discarded sequential hidden state recurrence in favor of **Scaled Dot-Product Attention** calculated across the entire sequence simultaneously in matrix form, augmented by multi-head projection spaces and sinusoidal positional encodings.",
    algorithmsAndFormulas: [
      "**Scaled Dot-Product Attention**: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$, where queries and keys are scaled by $\\frac{1}{\\sqrt{d_k}}$ to prevent vanishing softmax gradients in large dimensional spaces.",
      "**Multi-Head Attention (MHA)**: Projects $Q, K, V$ into $h=8$ distinct representation subspaces: $\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)W^O$.",
      "**Sinusoidal Positional Encoding**: Since the architecture contains no recurrence, order information is injected via periodic functions: $PE_{(pos, 2i)} = \\sin(pos/10000^{2i/d_{\\text{model}}})$ and $PE_{(pos, 2i+1)} = \\cos(pos/10000^{2i/d_{\\text{model}}})$.",
      "**Position-Wise Feed-Forward Networks**: Applied independently to each position: $\\text{FFN}(x) = \\max(0, xW_1 + b_1)W_2 + b_2$."
    ],
    modelsAndArchitectures: [
      "**Encoder Stack**: 6 identical layers, each comprising two sub-layers: Multi-Head Self-Attention and Position-Wise Feed-Forward Network with Layer Normalization and residual connections ($x + \\text{Sublayer}(x)$).",
      "**Decoder Stack**: 6 identical layers containing Masked Multi-Head Self-Attention (preventing attention to future positions) and Encoder-Decoder Cross-Attention.",
      "**Parameter Dimensions**: Base model $d_{\\text{model}} = 512$, $d_{ff} = 2048$, $h = 8$ heads ($d_k = d_v = 64$)."
    ],
    datasetsAndBenchmarks: [
      "**WMT 2014 English-to-German (En-De)**: 4.5 million sentence pairs, Byte-Pair Encoding (BPE) vocabulary of 37,000 tokens.",
      "**WMT 2014 English-to-French (En-Fr)**: 36 million sentence pairs, word-piece vocabulary of 32,000 tokens.",
      "**Penn Treebank (WSJ)**: Evaluated for English constituency parsing to prove generalization beyond machine translation."
    ],
    experimentalSetup: "Trained on 8 NVIDIA P100 GPUs using the Adam optimizer ($\\beta_1 = 0.9, \\beta_2 = 0.98, \\epsilon = 10^{-9}$) with a custom warmup learning rate schedule: $lrate = d_{\\text{model}}^{-0.5} \\cdot \\min(step^{-0.5}, step \\cdot warmup\\_steps^{-1.5})$ with 4,000 warmup steps."
  },
  technologiesAndTools: {
    aiModelsAndArchitectures: [
      "Transformer Base (65M params)",
      "Transformer Big (213M params)",
      "Byte-Pair Encoding (BPE)",
      "WordPiece Tokenizer"
    ],
    frameworksAndLibraries: [
      "Tensor2Tensor Library",
      "TensorFlow",
      "NumPy",
      "BLEU Scorer (multi-bleu.perl)"
    ],
    programmingLanguages: [
      "Python",
      "C++",
      "Perl"
    ],
    hardwareArchitecture: [
      "8 × NVIDIA Tesla P100 GPUs (16GB memory each)",
      "Single-machine multi-GPU InfiniBand interconnected node",
      "3.5 days training duration for Big model"
    ],
    benchmarksAndMetrics: [
      "BLEU (Bilingual Evaluation Understudy)",
      "WMT 2014 Translation Benchmark",
      "Training FLOPs / GPU-Days"
    ]
  },
  workflow: [
    {
      stepNumber: 1,
      title: "Input Tokenization & Embedding",
      description: "Raw source sentence tokens are mapped into continuous vector space using learned embeddings and multiplied by $\\sqrt{d_{\\text{model}}}$.",
      inputs: "Raw sequence strings (e.g. English source text)",
      outputs: "Token vectors of dimension $d_{\\text{model}} = 512$"
    },
    {
      stepNumber: 2,
      title: "Positional Encoding Injection",
      description: "Fixed sinusoidal positional wave vectors are element-wise added to token embeddings to preserve sequential order and relative distance.",
      inputs: "Token embeddings + positional indices",
      outputs: "Position-augmented sequence tensor $[B, S, d_{\\text{model}}]$"
    },
    {
      stepNumber: 3,
      title: "Encoder Self-Attention & Feed-Forward Stack",
      description: "Tensor passes through 6 stacked encoder layers. In each layer, Multi-Head Attention enables every token to attend to all other tokens, followed by LayerNorm and FFN.",
      inputs: "Position-augmented sequence",
      outputs: "Contextualized memory key-value representations $[B, S, d_{\\text{model}}]$"
    },
    {
      stepNumber: 4,
      title: "Decoder Masked Attention & Cross-Attention",
      description: "Target sequence shifts right. Masked attention prevents looking ahead at future target tokens. Cross-attention queries the encoder's contextual keys/values.",
      inputs: "Shifted target tokens + Encoder memory tensor",
      outputs: "Decoder contextual hidden states"
    },
    {
      stepNumber: 5,
      title: "Linear Projection & Softmax Generation",
      description: "Decoder output hidden state is projected through a linear classifier to vocabulary dimension and converted to probability distribution via Softmax.",
      inputs: "Decoder hidden states",
      outputs: "Next token probability distribution over 37k tokens"
    }
  ],
  flowchart: {
    mermaid: `graph TD
  A[Input Text Tokens] --> B[Input Embedding + Positional Encoding]
  B --> C[Encoder Stack: 6x Layers]
  subgraph EncoderLayer [Encoder Layer i]
    C1[Multi-Head Self-Attention] --> C2[Add and LayerNorm]
    C2 --> C3[Feed Forward Network]
    C3 --> C4[Add and LayerNorm]
  end
  C --> D[Encoder Contextual Keys/Values]

  E[Target Output Tokens shifted right] --> F[Output Embedding + Positional Encoding]
  F --> G[Decoder Stack: 6x Layers]
  subgraph DecoderLayer [Decoder Layer i]
    G1[Masked Multi-Head Attention] --> G2[Add and LayerNorm]
    G2 --> G3[Multi-Head Cross-Attention with Encoder]
    G3 --> G4[Add and LayerNorm]
    G4 --> G5[Feed Forward Network]
    G5 --> G6[Add and LayerNorm]
  end
  D --> G3
  G --> H[Linear Projection Layer]
  H --> I[Softmax Classification]
  I --> J[Predicted Output Sequence Tokens]`,
    ascii: `[Input Sequence] ────────> [Embeddings + Positional Encodings]
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  ENCODER STACK  │ (6 Layers)
                         │  - Multi-Head   │
                         │    Self-Attention
                         │  - Add & Norm   │
                         │  - Feed-Forward │
                         └────────┬────────┘
                                  │ Keys & Values
                                  ▼
[Target Tokens] ─> [Embed + PE] ─> ┌─────────────────┐
                                   │  DECODER STACK  │ (6 Layers)
                                   │  - Masked Attn  │
                                   │  - Cross Attn   │
                                   │  - Feed-Forward │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   [Linear + Softmax]
                                            │
                                            ▼
                                  [Predicted Translation]`
  },
  insightsAndImplications: {
    realWorldApplications: [
      "Foundational architecture for all modern Large Language Models (LLMs) including GPT-4o, Gemini, Claude, and Llama.",
      "High-speed machine translation systems deployed across Google Translate, DeepL, and enterprise localization pipelines.",
      "Multimodal adaptation across Vision Transformers (ViT), audio models (Whisper), and protein structure prediction (AlphaFold)."
    ],
    limitations: [
      "**Quadratic Computational Complexity**: Standard self-attention scales as $\\mathcal{O}(N^2)$ in compute and memory with respect to sequence length $N$, constraining extremely long context windows.",
      "**Permutation Invariance without PE**: Lacks inherent temporal sequence inductive bias, making it entirely reliant on artificial positional encodings.",
      "**High Training Resource Demand**: Demands vast compute clusters and high-bandwidth interconnects (NVLink/InfiniBand) to saturate GPU memory bandwidth."
    ],
    futureDirections: [
      "Sub-quadratic linear attention mechanisms (e.g. State Space Models, Mamba, FlashAttention kernels, RingAttention).",
      "Rotary Positional Embeddings (RoPE) and length extrapolation to million-token context horizons."
    ]
  }
};

export const DEEPSEEK_R1_ANALYSIS: PaperAnalysis = {
  paperMetadata: {
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    authors: "DeepSeek-AI (Daya Guo, Dejian Yang, Haowei Zhang, et al.)",
    year: "2025",
    venue: "arXiv preprint / Research Technical Report",
    domain: "Reinforcement Learning / Large Language Model Reasoning",
    coreContribution: "Demonstrated pure RL reasoning emergence (DeepSeek-R1-Zero) without SFT, followed by multi-stage training and open distillation across dense models."
  },
  executiveSummary: {
    overview: "DeepSeek-R1 details the architectural and training pipeline required to incentivize autonomous self-reflective reasoning behaviors in large language models using pure reinforcement learning without supervised cold starts, followed by multi-stage refinement and distillation into compact models.",
    coreProblem: "Traditional reasoning models rely heavily on massive, human-annotated or synthetic Chain-of-Thought (CoT) supervised fine-tuning (SFT) datasets, which are expensive, introduce human bias, and hit scalability bottlenecks for complex multi-step reasoning.",
    significance: "Demonstrated for the first time in open-source AI that self-evolution through rule-based reward RL achieves reasoning performance on par with proprietary systems like OpenAI-o1 at a tiny fraction of compute costs.",
    keyTakeaway: "Pure reinforcement learning with Group Relative Policy Optimization (GRPO) and rule-based rewards naturally elicits self-verification, reflection, and extended thinking without human demonstrations."
  },
  methodology: {
    coreApproach: "Employs **Group Relative Policy Optimization (GRPO)** which evaluates relative advantages among a sampled group of responses instead of utilizing a memory-intensive critic model, guided by rule-based accuracy and format verification rewards.",
    algorithmsAndFormulas: [
      "**Group Relative Policy Optimization (GRPO)**: For a question $q$, policy $\\pi_\\theta$ samples group $\{o_1, \\dots, o_G\}$. The objective is: $\\mathcal{J}_{\\text{GRPO}}(\\theta) = \\mathbb{E}\\left[\\frac{1}{G}\\sum_{i=1}^G \\min\\left(\\frac{\\pi_\\theta(o_i|q)}{\\pi_{\\text{old}}(o_i|q)}A_i, \\text{clip}\\left(\\frac{\\pi_\\theta(o_i|q)}{\\pi_{\\text{old}}(o_i|q)}, 1-\\epsilon, 1+\\epsilon\\right)A_i\\right) - \\beta D_{\\text{KL}}(\\pi_\\theta || \\pi_{\\text{ref}})\\right]$.",
      "**Advantage Estimation**: Advantage $A_i$ normalized across group rewards: $A_i = \\frac{R_i - \\text{mean}(\\{R_1, \\dots, R_G\\})}{\\text{std}(\\{R_1, \\dots, R_G\\})}$. Eliminates the Value Network.",
      "**Dual Reward Model**: Rule-based accuracy reward (evaluating deterministic mathematical correctness or compiler test pass) + Format reward (enforcing reasoning trace inside `<think>...</think>` tags)."
    ],
    modelsAndArchitectures: [
      "**DeepSeek-V3 Base (671B MoE)**: 37B active parameters per token, Multi-head Latent Attention (MLA), and DeepSeekMoE sparse routing.",
      "**Distilled Dense Models**: 1.5B, 7B, 8B, 14B, 32B, and 70B models distilled directly from DeepSeek-R1 reasoning trajectories on Qwen and Llama architectures."
    ],
    datasetsAndBenchmarks: [
      "**MATH-500 & AIME 2024**: Evaluated for advanced mathematical Olympiad competition problems.",
      "**Codeforces & SWE-bench**: Evaluated for automated algorithm problem-solving and software patch synthesis.",
      "**MMLU, GPQA Diamond, and LiveCodeBench**: Broad scientific and reasoning benchmarks."
    ],
    experimentalSetup: "Trained using custom high-throughput FP8 mixed-precision clusters with DualPipe parallelization and low-overhead InfiniBand communication."
  },
  technologiesAndTools: {
    aiModelsAndArchitectures: [
      "DeepSeek-R1-Zero",
      "DeepSeek-R1 (671B MoE)",
      "Qwen-2.5 & Llama-3.1 Base Models",
      "Multi-head Latent Attention (MLA)"
    ],
    frameworksAndLibraries: [
      "HAI-LLM DeepSeek Framework",
      "PyTorch",
      "vLLM / SGLang inference engines",
      "Triton custom GPU kernels"
    ],
    programmingLanguages: ["Python", "CUDA", "C++"],
    hardwareArchitecture: [
      "NVIDIA H800 / H100 GPU Clusters",
      "NVLink & InfiniBand high-speed interconnects",
      "FP8 mixed-precision distributed training"
    ],
    benchmarksAndMetrics: [
      "AIME 2024 (Pass@1)",
      "MATH-500 Accuracy",
      "Codeforces Percentile Rank",
      "GPQA Diamond Accuracy"
    ]
  },
  workflow: [
    {
      stepNumber: 1,
      title: "Cold-Start Data Curation",
      description: "A small set (thousands) of high-quality long Chain-of-Thought (CoT) examples are collected to initialize the model and prevent early language mixing.",
      inputs: "DeepSeek-V3-Base + Curated seed problems",
      outputs: "Warm-started reasoning checkpoint"
    },
    {
      stepNumber: 2,
      title: "Reasoning-Oriented Reinforcement Learning (GRPO)",
      description: "Large-scale RL is conducted using rule-based math and coding rewards with group advantage normalization, incentivizing self-reflection and exploration.",
      inputs: "Warm-started policy + math/code prompt distribution",
      outputs: "Reasoning-specialized checkpoint"
    },
    {
      stepNumber: 3,
      title: "Rejection Sampling & Broad SFT",
      description: "Generates 800,000 diverse samples (including non-reasoning tasks like writing, translation, and safety), filtered via rule checkers and reward models.",
      inputs: "Checkpoint reasoning rollouts",
      outputs: "Filtered multi-domain 800k SFT dataset"
    },
    {
      stepNumber: 4,
      title: "Secondary Multi-Scenario Reinforcement Learning",
      description: "Second stage RL combining mathematical accuracy rewards with human preference and helpfulness/safety reward models.",
      inputs: "SFT fine-tuned model",
      outputs: "Final DeepSeek-R1 Flagship Model"
    },
    {
      stepNumber: 5,
      title: "Distillation into Smaller Dense Architectures",
      description: "Reasoning trajectories are directly used to fine-tune compact 1.5B, 7B, 14B, and 32B models, yielding exceptional reasoning efficiency.",
      inputs: "800k DeepSeek-R1 reasoning traces",
      outputs: "Distilled open-weights reasoning family"
    }
  ],
  flowchart: {
    mermaid: `graph TD
  A[DeepSeek-V3 Base Model] --> B[Step 1: Cold-Start CoT Data]
  B --> C[Step 2: Large-Scale Reasoning RL via GRPO]
  C --> D[Emergent Self-Reflection & Verification]
  D --> E[Step 3: Rejection Sampling & 800k SFT Dataset]
  E --> F[Step 4: All-Scenario RL Alignment]
  F --> G[Final DeepSeek-R1 Flagship Model]
  G --> H[Distillation Pipeline]
  H --> I[DeepSeek-R1-Distill-Qwen 1.5B - 32B]
  H --> J[DeepSeek-R1-Distill-Llama 8B - 70B]`,
    ascii: `[DeepSeek-V3 Base] ──> [Cold-Start Data] ──> [GRPO Reasoning RL]
                                                       │
                                                       ▼
[Distilled Dense Models] <── [Rejection Sampling SFT] <── [Self-Reflection Emergence]
 (1.5B, 7B, 14B, 32B, 70B)             │
                                       ▼
                            [All-Scenario RL] ──> [DeepSeek-R1]`
  },
  insightsAndImplications: {
    realWorldApplications: [
      "Autonomous automated code generation, repository-level debugging, and verification systems.",
      "Complex mathematical theorem proving, financial modeling, and scientific simulation hypothesis testing.",
      "Edge-deployable reasoning via compact 7B/14B distilled models running locally on consumer hardware."
    ],
    limitations: [
      "**Verbosity and Inference Latency**: Generates thousands of reasoning tokens before final answers, multiplying inference compute and time-to-first-token.",
      "**Language Mixing**: Pure RL models without cold starts occasionally mix English and Chinese within reasoning traces.",
      "**Reward Hacking in Open Domains**: Hard to apply pure rule-based RL to subjective, creative, or qualitative tasks without objective verifiers."
    ],
    futureDirections: [
      "Multi-turn interactive reinforcement learning for real-time human-in-the-loop debugging.",
      "Test-time compute scaling laws and search tree rollouts (Monte Carlo Tree Search with RL policies)."
    ]
  }
};

export const LORA_ANALYSIS: PaperAnalysis = {
  paperMetadata: {
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, et al. (Microsoft)",
    year: "2021",
    venue: "ICLR 2022 (International Conference on Learning Representations)",
    domain: "Parameter-Efficient Fine-Tuning (PEFT) / Machine Learning Systems",
    coreContribution: "Froze pretrained model weights and injected low-rank trainable decomposition matrices (A and B), cutting trainable parameters by 10,000x and VRAM by 3x with zero added inference latency."
  },
  executiveSummary: {
    overview: "LoRA introduces Low-Rank Adaptation, a parameter-efficient fine-tuning methodology that freezes all pre-trained model weights and injects low-rank trainable decomposition matrices into Transformer attention layers.",
    coreProblem: "Full fine-tuning of massive LLMs (e.g. GPT-3 175B) requires checkpointing hundreds of gigabytes per task, saturates GPU memory during gradient backpropagation, and makes multi-tenant serving prohibitively expensive.",
    significance: "Standardized modern parameter-efficient tuning (PEFT) across the entire open-source AI community, enabling personal laptops and consumer GPUs to customize trillion-parameter foundation models.",
    keyTakeaway: "Weight updates in over-parameterized neural networks occupy an intrinsic low rank, allowing effective task adaptation by training compact low-rank projection matrices $B \\times A$."
  },
  methodology: {
    coreApproach: "Decomposes weight update matrix $\\Delta W$ into the product of two low-rank matrices $B \\in \\mathbb{R}^{d \\times r}$ and $A \\in \\mathbb{R}^{r \\times k}$ where $r \\ll \\min(d, k)$.",
    algorithmsAndFormulas: [
      "**Forward Pass Formulation**: $h = W_0 x + \\Delta W x = W_0 x + \\frac{\\alpha}{r} B A x$, where $W_0$ is frozen, $A \\sim \\mathcal{N}(0, \\sigma^2)$, and $B = 0$ at initialization.",
      "**Scaling Factor**: $\\frac{\\alpha}{r}$ constant multiplier eases hyperparameter tuning when varying intrinsic rank $r$.",
      "**Zero-Inference Latency Weight Folding**: During deployment, the adapter can be permanently folded: $W = W_0 + \\frac{\\alpha}{r} B A$, incurring zero additional FLOPs or runtime latency."
    ],
    modelsAndArchitectures: [
      "Evaluated on GPT-2, GPT-3 175B, RoBERTa, and DeBERTa architectures.",
      "Targeted primarily at self-attention projection weights: $W_q, W_k, W_v, W_o$."
    ],
    datasetsAndBenchmarks: [
      "**GLUE Benchmark**: Evaluated for natural language understanding.",
      "**E2E NLG, DART, and WebNLG**: Evaluated for natural language generation.",
      "**WikiSQL & MultiNLI**: Evaluated for structured reasoning."
    ],
    experimentalSetup: "Trained using AdamW with FP16 precision across standard NVIDIA V100/A100 GPU nodes."
  },
  technologiesAndTools: {
    aiModelsAndArchitectures: ["GPT-3 175B", "RoBERTa", "DeBERTa", "LoRA PEFT Adapters"],
    frameworksAndLibraries: ["PyTorch", "Hugging Face PEFT / Transformers", "DeepSpeed"],
    programmingLanguages: ["Python", "CUDA"],
    hardwareArchitecture: ["NVIDIA V100 (32GB) & A100 GPUs", "3x reduction in training VRAM"],
    benchmarksAndMetrics: ["GLUE Score", "BLEU / ROUGE", "Trainable Parameter Count", "VRAM Footprint"]
  },
  workflow: [
    {
      stepNumber: 1,
      title: "Pretrained Model Freezing",
      description: "All parameters of the foundation model $W_0$ are frozen; no gradients are computed or stored for these parameters.",
      inputs: "Pretrained Foundation Model weights $[d \\times k]$",
      outputs: "Frozen base weights with autograd disabled"
    },
    {
      stepNumber: 2,
      title: "Low-Rank Adapter Injection",
      description: "Trainable matrices $A$ (Gaussian init) and $B$ (zero init) with small rank $r \\in \\{4, 8, 16\\}$ are attached in parallel to projection layers.",
      inputs: "Attention weight projections",
      outputs: "Rank-r bypass matrix pair $(B, A)$"
    },
    {
      stepNumber: 3,
      title: "Task-Specific Gradient Backpropagation",
      description: "Gradients are computed solely through $B$ and $A$, requiring only optimizer states for the low-rank parameters (saving up to 3x VRAM).",
      inputs: "Task training tokens & cross-entropy loss",
      outputs: "Trained low-rank matrices $B$ and $A$"
    },
    {
      stepNumber: 4,
      title: "Weight Folding / Multi-Task Switching",
      description: "For single-task deployment, weights are folded into $W_0$. For multi-tenant hosting, adapters are swapped dynamically in GPU VRAM.",
      inputs: "Base weights $W_0$ and trained adapter $(B, A)$",
      outputs: "Zero-latency fine-tuned model or modular adapter bank"
    }
  ],
  flowchart: {
    mermaid: `graph LR
  X[Input Vector x] --> W0[Frozen Pretrained Weights W_0]
  X --> A[Trainable Matrix A: r x k]
  A --> B[Trainable Matrix B: d x r]
  B --> S[Scale alpha / r]
  W0 --> Add((Sum))
  S --> Add
  Add --> H[Output Hidden State h]`,
    ascii: `                  ┌───────────────────────────────┐
                  │   Frozen Weights W_0 (d x k)  │
                  └───────────────┬───────────────┘
                                  │
[Input Vector x] ────────┬────────┼──────────────────────> (+) ──> [Output h]
                         │        │                         ▲
                         ▼        │                         │
                  ┌───────────────┴───────────────┐         │
                  │   Trainable A [r x k]         │         │
                  │              ▼                │         │
                  │   Trainable B [d x r] * (α/r) ├─────────┘
                  └───────────────────────────────┘`
  },
  insightsAndImplications: {
    realWorldApplications: [
      "Customized enterprise LLM deployments serving thousands of specialized fine-tuned tasks from a single base model instance.",
      "On-device personalization for smartphones and laptops where storing 100GB models per user is impossible.",
      "Rapid experimentation in academic labs without multi-million-dollar compute budgets."
    ],
    limitations: [
      "**Batching Complexity for Diverse Adapters**: Serving multiple requests with different adapters in the same GPU batch requires custom kernel routing (e.g. Punica/S-LoRA).",
      "**Non-Linear Layers Excluded**: Does not adapt layer normalization or non-linear MLP activations without performance degradation.",
      "**Potential Capacity Ceiling**: For radical domain shifts (e.g. learning an entirely new language), low-rank adaptation may underperform full fine-tuning."
    ],
    futureDirections: [
      "Dynamic rank selection (AdaLoRA) and quantized low-rank adaptation (QLoRA) using 4-bit NormalFloat precision.",
      "Mixture-of-LoRA experts for multi-task consolidation."
    ]
  }
};

export const RESNET_ANALYSIS: PaperAnalysis = {
  paperMetadata: {
    title: "Deep Residual Learning for Image Recognition",
    authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun (Microsoft Research)",
    year: "2015",
    venue: "CVPR 2016 (IEEE Conference on Computer Vision and Pattern Recognition)",
    domain: "Computer Vision / Convolutional Neural Networks",
    coreContribution: "Introduced identity shortcut skip connections $\\mathcal{F}(x) + x$, solving the degradation problem and enabling training of networks with 100+ layers (ResNet-152)."
  },
  executiveSummary: {
    overview: "ResNet introduces residual skip connections to deep convolutional networks, allowing gradients to flow directly through identity mappings and overcoming the fundamental degradation barrier of deep neural networks.",
    coreProblem: "As deep networks gained depth (beyond 20 layers), training error paradoxically increased—not due to overfitting, but degradation where standard backpropagation failed to optimize identity mappings.",
    significance: "Won 1st place in all tracks of the ILSVRC 2015 classification, localization, and COCO detection challenges; identity shortcuts became standard across all modern deep learning architectures including Transformers.",
    keyTakeaway: "It is dramatically easier for stacked neural layers to fit a residual mapping $\\mathcal{F}(x) = \\mathcal{H}(x) - x$ than to directly approximate an unreferenced target mapping $\\mathcal{H}(x)$."
  },
  methodology: {
    coreApproach: "Reformulates stacked layers as learning residual functions with reference to layer inputs using parameter-free identity shortcuts: $y = \\mathcal{F}(x, \\{W_i\\}) + x$.",
    algorithmsAndFormulas: [
      "**Residual Building Block**: $y = \\sigma(\\mathcal{F}(x, \\{W_i\\}) + x)$, where $\\sigma$ is ReLU activation and $\\mathcal{F} = W_2 \\sigma(W_1 x)$.",
      "**Projection Shortcut for Dimension Changes**: $y = \\mathcal{F}(x, \\{W_i\\}) + W_s x$, where $W_s$ is a $1\\times 1$ convolution to match spatial channels.",
      "**Bottleneck Design**: Stacks $1\\times 1$ conv (dimension reduction) $\\rightarrow 3\\times 3$ conv $\\rightarrow 1\\times 1$ conv (dimension restoration) to preserve low computational complexity in 50/101/152-layer networks."
    ],
    modelsAndArchitectures: [
      "ResNet-18, ResNet-34, ResNet-50, ResNet-101, and ResNet-152 architectures.",
      "Global Average Pooling replacing expensive fully-connected layers, reducing parameters to 25.6M (ResNet-50)."
    ],
    datasetsAndBenchmarks: [
      "**ImageNet 2012**: 1.28 million training images, 50,000 validation images across 1,000 classes.",
      "**CIFAR-10**: Tested ultra-deep networks with over 1,000 layers.",
      "**MS COCO**: Object detection and semantic segmentation."
    ],
    experimentalSetup: "Trained with SGD (momentum 0.9, weight decay 0.0001), mini-batch size 256, Batch Normalization after convolutions."
  },
  technologiesAndTools: {
    aiModelsAndArchitectures: ["ResNet-50", "ResNet-101", "ResNet-152", "Bottleneck Blocks", "Batch Normalization"],
    frameworksAndLibraries: ["Caffe", "CUDA / cuDNN", "OpenCV"],
    programmingLanguages: ["C++", "Python", "MATLAB"],
    hardwareArchitecture: ["8 × NVIDIA Tesla K40 GPUs", "Synchronous SGD distributed training"],
    benchmarksAndMetrics: ["Top-1 & Top-5 ImageNet Error", "mAP (COCO Detection)", "FLOPs"]
  },
  workflow: [
    {
      stepNumber: 1,
      title: "Stem Convolution & Max Pooling",
      description: "Input $224\\times 224\\times 3$ image is passed through a $7\\times 7$ convolution (stride 2) followed by Batch Normalization, ReLU, and $3\\times 3$ max pooling.",
      inputs: "Raw RGB Image $[3, 224, 224]$",
      outputs: "Downsampled feature map $[64, 56, 56]$"
    },
    {
      stepNumber: 2,
      title: "Residual Stage Processing (conv2_x to conv5_x)",
      description: "Feature maps flow through 4 stages of stacked residual bottleneck blocks. In each block, identity shortcuts add the input directly to the convolved features.",
      inputs: "Feature representations",
      outputs: "Deep hierarchical semantic feature map $[2048, 7, 7]$"
    },
    {
      stepNumber: 3,
      title: "Global Average Pooling",
      description: "Collapses spatial dimensions $7\\times 7$ into a single 2048-dimensional feature vector per image without requiring dense flattened weights.",
      inputs: "Tensor $[2048, 7, 7]$",
      outputs: "Vector of size 2048"
    },
    {
      stepNumber: 4,
      title: "Linear Classifier & Softmax Classification",
      description: "Final 1000-way fully connected layer outputs logit probabilities for ImageNet classes.",
      inputs: "Feature vector",
      outputs: "ImageNet class probability distribution"
    }
  ],
  flowchart: {
    mermaid: `graph TD
  A[Input Image: 224x224x3] --> B[7x7 Conv, Stride 2 + BatchNorm + ReLU]
  B --> C[3x3 Max Pool, Stride 2]
  C --> D[Residual Stage 1: conv2_x]
  subgraph ResBlock [Residual Bottleneck Block]
    D1[Input x] --> D2[1x1 Conv: Reduce Dimension]
    D2 --> D3[3x3 Conv]
    D3 --> D4[1x1 Conv: Restore Dimension]
    D1 -->|Identity Shortcut| D5((Sum))
    D4 --> D5
    D5 --> D6[ReLU Activation]
  end
  D --> E[Residual Stage 2: conv3_x]
  E --> F[Residual Stage 3: conv4_x]
  F --> G[Residual Stage 4: conv5_x]
  G --> H[Global Average Pooling]
  H --> I[1000-d Fully Connected Layer + Softmax]
  I --> J[Predicted Class Label]`,
    ascii: `[Input Image] ──> [7x7 Conv + MaxPool]
                          │
                          ▼
                  ┌───────────────┐
             x ──>│ 1x1 Conv (BN) │
             │    │ 3x3 Conv (BN) │
             │    │ 1x1 Conv (BN) │
             │    └───────┬───────┘
             │            │ F(x)
             └──Shortcut─>▼
                         (+) <── Identity Mapping
                          │
                          ▼
                        [ReLU]
                          │
                          ▼
            [Global Avg Pool + Softmax]`
  },
  insightsAndImplications: {
    realWorldApplications: [
      "Standard backbone for visual recognition, medical imaging (MRI/CT scan diagnosis), and autonomous vehicle vision pipelines.",
      "Feature extractor for object detection (Faster R-CNN) and segmentation (Mask R-CNN).",
      "Residual shortcut principles adopted across all modern networks including Transformers and Diffusion models."
    ],
    limitations: [
      "**Diminishing Returns with Extreme Depth**: Networks beyond 1000 layers still suffer from subtle gradient degradation or saturation.",
      "**Redundant Feature Reuse**: Many layers in very deep ResNets contribute only marginally to final representations (addressed by DenseNet).",
      "**Memory Usage during Training**: Storing activations for hundreds of layers during backpropagation demands high GPU memory."
    ],
    futureDirections: [
      "Wide Residual Networks (WideResNet) prioritizing width over depth.",
      "ResNeXt (cardinality scaling) and ConvNeXt modernizing CNN architectures for contemporary benchmarks."
    ]
  }
};

export const SAMPLE_FALLBACK_ANALYSIS = ATTENTION_ANALYSIS;

export function getMatchingPresetAnalysis(textOrQuery: string): PaperAnalysis | null {
  const lower = (textOrQuery || '').toLowerCase();
  if (lower.includes('deepseek') || lower.includes('r1') || lower.includes('grpo')) {
    return DEEPSEEK_R1_ANALYSIS;
  }
  if (lower.includes('lora') || lower.includes('low-rank') || lower.includes('peft') || lower.includes('edward hu')) {
    return LORA_ANALYSIS;
  }
  if (lower.includes('resnet') || lower.includes('residual learning') || lower.includes('kaiming he') || lower.includes('imagenet')) {
    return RESNET_ANALYSIS;
  }
  if (lower.includes('attention') || lower.includes('transformer') || lower.includes('vaswani')) {
    return ATTENTION_ANALYSIS;
  }
  return null;
}
