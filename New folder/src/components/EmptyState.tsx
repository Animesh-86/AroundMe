import { Brain, Sparkles } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-6">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center mb-6 shadow-lg">
        <Brain className="w-10 h-10 text-white" />
      </div>
      
      <h2 className="text-3xl text-white mb-3">
        Ready to discover what matters
      </h2>
      
      <p className="text-slate-400 text-lg max-w-md mb-8">
        Provide context and let AI reason through all city signals
      </p>

      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <Sparkles className="w-4 h-4" />
        <span>AI reviews all city signals so you don't have to</span>
      </div>
    </div>
  );
}
