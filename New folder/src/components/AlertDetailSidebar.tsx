import { AlertCategory } from '../App';
import { X, MapPin, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface AlertDetail {
  id: string;
  category: AlertCategory;
  insight: string;
  impact: 'High' | 'Medium' | 'Low';
  distance: string;
  timeAgo: string;
  explanation: string;
  relatedAlerts: string[];
}

interface AlertDetailSidebarProps {
  alert: AlertDetail;
  onClose: () => void;
}

const categoryConfig = {
  Traffic: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  Events: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  Safety: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  Weather: { color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
};

const impactConfig = {
  High: { color: 'text-red-600', bg: 'bg-red-50', label: 'High Impact' },
  Medium: { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Medium Impact' },
  Low: { color: 'text-green-600', bg: 'bg-green-50', label: 'Low Impact' },
};

export function AlertDetailSidebar({ alert, onClose }: AlertDetailSidebarProps) {
  const categoryStyle = categoryConfig[alert.category];
  const impactStyle = impactConfig[alert.impact];

  return (
    <div className="h-full flex flex-col bg-white border-l border-slate-200 shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-slate-200">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm ${categoryStyle.bg} ${categoryStyle.color} border ${categoryStyle.border}`}>
              {alert.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${impactStyle.bg} ${impactStyle.color}`}>
              {impactStyle.label}
            </span>
          </div>
          <h2 className="text-slate-900 text-2xl pr-8">
            {alert.insight}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Meta Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{alert.distance}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{alert.timeAgo}</span>
          </div>
        </div>

        {/* AI Explanation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sky-600" />
            <h3 className="text-slate-900">AI Analysis</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {alert.explanation}
          </p>
        </div>

        {/* Related Alerts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-slate-600" />
            <h3 className="text-slate-900">Related Information</h3>
          </div>
          <ul className="space-y-2">
            {alert.relatedAlerts.map((related, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-sky-500 mt-1">•</span>
                <span>{related}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <button className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors">
            View on Map
          </button>
          <button className="w-full py-3 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors">
            Share Alert
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <p className="text-xs text-slate-500 text-center">
          This briefing is AI-generated based on your context
        </p>
      </div>
    </div>
  );
}
