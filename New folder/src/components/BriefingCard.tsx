import { useState } from 'react';
import { Car, Calendar, AlertTriangle, Cloud, ChevronDown, MapPin, Clock } from 'lucide-react';
import { AlertCategory } from '../App';

interface BriefingCardProps {
  id: string;
  category: AlertCategory;
  insight: string;
  impact: 'High' | 'Medium' | 'Low';
  distance: string;
  timeAgo: string;
  explanation: string;
  relatedAlerts: string[];
}

const categoryIcons = {
  Traffic: Car,
  Events: Calendar,
  Safety: AlertTriangle,
  Weather: Cloud,
};

const categoryColors = {
  Traffic: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    icon: 'text-orange-600',
  },
  Events: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    icon: 'text-blue-600',
  },
  Safety: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    icon: 'text-red-600',
  },
  Weather: {
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-600',
    icon: 'text-cyan-600',
  },
};

const impactConfig = {
  High: { icon: '🔥', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' },
  Medium: { icon: '⚠️', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600' },
  Low: { icon: 'ℹ️', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' },
};

export function BriefingCard({
  category,
  insight,
  impact,
  distance,
  timeAgo,
  explanation,
  relatedAlerts,
}: BriefingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = categoryIcons[category];
  const colors = categoryColors[category];
  const impactStyle = impactConfig[impact];

  return (
    <div className="glass rounded-2xl p-6 border-2 border-white/60 hover:border-sky-300/60 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 duration-300">
      <div className="flex items-start gap-4">
        {/* Category Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg.replace('bg-', 'from-')} ${colors.bg.replace('50', '200').replace('bg-', 'to-')} flex items-center justify-center border-2 ${colors.border} flex-shrink-0 shadow-sm`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Insight Text */}
          <p className="text-slate-900 text-lg leading-relaxed">
            {insight}
          </p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Impact Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${impactStyle.bg} border ${impactStyle.border}`}>
              <span className="text-sm">{impactStyle.icon}</span>
              <span className={`text-sm ${impactStyle.text}`}>{impact} Impact</span>
            </div>

            {/* Distance Chip */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-strong border border-white/40">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-sm text-slate-600">{distance}</span>
            </div>

            {/* Time Chip */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-strong border border-white/40">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-sm text-slate-600">{timeAgo}</span>
            </div>
          </div>

          {/* Expandable Section */}
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors text-sm group"
            >
              <span>Why am I seeing this?</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {isExpanded && (
              <div className="mt-4 p-4 rounded-xl glass-strong border border-white/40 space-y-3 shadow-inner">
                {/* Explanation */}
                <div>
                  <h4 className="text-slate-900 text-sm mb-2">AI Reasoning</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {explanation}
                  </p>
                </div>

                {/* Match Criteria */}
                <div className="space-y-1.5">
                  <h4 className="text-slate-900 text-sm">Matched criteria:</h4>
                  <ul className="space-y-1">
                    <li className="text-slate-600 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                      Interest filter selected
                    </li>
                    <li className="text-slate-600 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                      Within your relevance mode
                    </li>
                    <li className="text-slate-600 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                      Recent update ({timeAgo})
                    </li>
                  </ul>
                </div>

                {/* Related Alerts */}
                {relatedAlerts.length > 0 && (
                  <div>
                    <h4 className="text-slate-900 text-sm mb-2">Related signals ({relatedAlerts.length})</h4>
                    <ul className="space-y-1.5">
                      {relatedAlerts.map((alert, idx) => (
                        <li key={idx} className="text-slate-600 text-sm flex items-start gap-2">
                          <span className="text-sky-600 mt-1">•</span>
                          <span>{alert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}