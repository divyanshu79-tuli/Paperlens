import React, { useState } from 'react';
import { Send, Sparkles, ExternalLink, HelpCircle, Bot, User, Loader2 } from 'lucide-react';
import { GroundingSource } from '../types/paper';

interface ResearchQAProps {
  paperTitle: string;
  paperSummary: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: GroundingSource[];
}

export const ResearchQA: React.FC<ResearchQAProps> = ({ paperTitle, paperSummary }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `I'm your academic assistant for **${paperTitle || 'this paper'}**. Ask me to explain specific mathematical equations, compare with other baselines, clarify the training setup, or evaluate trade-offs!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    'How does this approach compare with previous baselines?',
    'Explain the core loss function and objective in depth',
    'What are the primary computational bottlenecks during training?',
    'What hardware and compute budget were required?'
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input.trim();
    if (!textToSend || loading) return;

    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/ask-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          paperTitle,
          paperSummary,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: data.answer,
            sources: data.sources || [],
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: `Error: ${data.error || 'Failed to process inquiry.'}`,
          },
        ]);
      }
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: `Network error: ${err.message || 'Could not reach server.'}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (text: string) => {
    // Simple markdown helper for bold & bullet points
    return text.split('\n').map((line, idx) => {
      let trimmed = line.trim();
      const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
      if (isBullet) {
        trimmed = trimmed.substring(2);
      }
      
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-indigo-300">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-300 text-xs sm:text-sm my-1">
            {renderedParts}
          </li>
        );
      }
      return (
        <p key={idx} className="text-slate-300 text-xs sm:text-sm my-1 leading-relaxed">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-200">
            Interactive Technical Q&amp;A (Grounded Gemini 3.8 Flash)
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          Contextual to this paper
        </span>
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider shrink-0 pl-1">
          Suggestions:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-[11px] text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-2.5 py-1 rounded-md border border-slate-700 shrink-0 transition-colors disabled:opacity-50 text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-xl p-3.5 ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 border border-slate-800'
              }`}
            >
              {m.role === 'user' ? (
                <p className="text-xs sm:text-sm">{m.content}</p>
              ) : (
                <div className="space-y-1">
                  {renderContent(m.content)}

                  {m.sources && m.sources.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                        Web Citations &amp; Grounding:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.sources.map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-indigo-300 hover:text-indigo-200 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 hover:border-slate-700"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            <span className="truncate max-w-[200px]">{src.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {m.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-slate-400 text-xs py-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
            </div>
            <span>Evaluating technical details with Gemini 3.8 Flash...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a technical follow-up question about this paper..."
          className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Send inquiry"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
