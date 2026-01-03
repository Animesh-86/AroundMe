import { X, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import type { AlertCategory, RelevanceMode } from '../App';

interface QuickIntelligenceProps {
  activeFilters: AlertCategory[];
  relevanceMode: RelevanceMode;
  onClose: () => void;
}

export function QuickIntelligence({
  activeFilters,
  relevanceMode,
  onClose,
}: QuickIntelligenceProps) {
  // AI-prioritized insights (mock data)
  const insights = [
    {
      icon: AlertCircle,
      priority: 'High',
      title: 'Heavy traffic on RC Dutt Road',
      summary: 'Accident causing 20-min delays. Consider alternate routes via Old Padra Road.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      icon: Calendar,
      priority: 'Medium',
      title: 'Navratri Festival tonight',
      summary: 'Multiple Garba events starting at 8 PM. Expect increased traffic near event venues.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      icon: TrendingUp,
      priority: 'Low',
      title: 'Weather update',
      summary: 'Moderate rainfall expected between 6-9 PM. Roads may be slippery.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border-2 border-indigo-100 dark:border-indigo-900/50 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white">Quick Intelligence Summary</h3>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs text-indigo-50">
                Auto-generated
              </span>
            </div>
            <p className="text-sm text-indigo-50">
              Top 3 AI-prioritized insights for right now
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Insights */}
      <div className="p-6 space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className={`${insight.bgColor} rounded-lg p-4 border-2 border-slate-200 dark:border-slate-600`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-white dark:bg-slate-800`}>
                  <Icon className={`w-5 h-5 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-slate-900 dark:text-white">
                      {insight.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        insight.priority === 'High'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : insight.priority === 'Medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      {insight.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {insight.summary}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer note */}
        <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-600">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            AI analyzes all alerts to surface what matters most for your current context
          </p>
        </div>
      </div>
    </div>
  );
}