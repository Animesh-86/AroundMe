import { useState } from 'react';
import { ThumbsUp, Car, Calendar, AlertTriangle, Cloud, MapPin, ChevronDown, Flame, AlertCircle, Info } from 'lucide-react';
import type { Alert, AlertCategory, EventsScope, EventInterest } from '../App';

interface AlertFeedProps {
  activeFilters: AlertCategory[];
  onAlertClick: (alertId: string) => void;
  eventsScope: EventsScope;
  eventInterests: EventInterest[];
}

// Sample alerts for Vadodara
const sampleAlerts: Alert[] = [
  {
    id: '1',
    category: 'Traffic',
    title: 'Heavy traffic on RC Dutt Road',
    summary: 'Accident near Alkapuri Circle causing 20-minute delays. Police on site directing traffic.',
    timestamp: '15 mins ago',
    source: 'Community',
    upvotes: 24,
    location: { lat: 22.3072, lng: 73.1812 },
  },
  {
    id: '2',
    category: 'Events',
    title: 'Navratri Festival at United Way',
    summary: 'Traditional Garba event starts at 8 PM. Limited parking available.',
    timestamp: '1 hour ago',
    source: 'AI',
    upvotes: 67,
    location: { lat: 22.3195, lng: 73.1925 },
  },
  {
    id: '3',
    category: 'Safety',
    title: 'Power outage in Manjalpur area',
    summary: 'Scheduled maintenance affecting areas near ONGC Circle. Expected to resume by 6 PM.',
    timestamp: '2 hours ago',
    source: 'AI',
    upvotes: 18,
    location: { lat: 22.2877, lng: 73.1947 },
  },
  {
    id: '4',
    category: 'Weather',
    title: 'Heavy rain expected this evening',
    summary: 'IMD forecasts moderate to heavy rainfall between 6-9 PM. Carry umbrellas.',
    timestamp: '3 hours ago',
    source: 'AI',
    upvotes: 42,
    location: { lat: 22.3072, lng: 73.1812 },
  },
  {
    id: '5',
    category: 'Traffic',
    title: 'Road construction on VIP Road',
    summary: 'Single lane operational near VIP Plaza. Use alternate routes if possible.',
    timestamp: '4 hours ago',
    source: 'Community',
    upvotes: 31,
    location: { lat: 22.2847, lng: 73.1673 },
  },
  {
    id: '6',
    category: 'Events',
    title: 'Food festival at Sayaji Garden',
    summary: 'Weekend food stalls featuring local Gujarati cuisine. Open until 11 PM.',
    timestamp: '5 hours ago',
    source: 'Community',
    upvotes: 89,
    location: { lat: 22.3119, lng: 73.1871 },
  },
  {
    id: '7',
    category: 'Safety',
    title: 'Water pipeline repair on Old Padra Road',
    summary: 'Temporary water supply disruption in surrounding areas. Alternative arrangements made.',
    timestamp: '6 hours ago',
    source: 'AI',
    upvotes: 12,
    location: { lat: 22.2964, lng: 73.1895 },
  },
  // City-wide events (only shown in City-wide mode)
  {
    id: '8',
    category: 'Events',
    title: 'International Kite Festival 2026',
    summary: 'Annual kite festival at Sabarmati Riverfront. Major cultural event with participants from 40+ countries.',
    timestamp: '1 day ago',
    source: 'AI',
    upvotes: 234,
    location: { lat: 22.3039, lng: 73.1812 },
  },
  {
    id: '9',
    category: 'Events',
    title: 'Tech Conference at MS University',
    summary: 'AI & Machine Learning symposium. Open for students and professionals. Registration required.',
    timestamp: '2 days ago',
    source: 'AI',
    upvotes: 156,
    location: { lat: 22.3220, lng: 73.1756 },
  },
];

const categoryIcons = {
  Traffic: Car,
  Events: Calendar,
  Safety: AlertTriangle,
  Weather: Cloud,
};

const categoryColors = {
  Traffic: 'text-orange-500',
  Events: 'text-purple-500',
  Safety: 'text-red-500',
  Weather: 'text-blue-500',
};

export function AlertFeed({ activeFilters, onAlertClick, eventsScope, eventInterests }: AlertFeedProps) {
  const [upvotedAlerts, setUpvotedAlerts] = useState<Set<string>>(new Set());
  const [expandedExplanations, setExpandedExplanations] = useState<Set<string>>(new Set());

  const filteredAlerts = sampleAlerts.filter((alert) => {
    // Check if alert category is active
    if (!activeFilters.includes(alert.category)) return false;
    
    // For Events, filter based on scope
    if (alert.category === 'Events') {
      if (eventsScope === 'Nearby') {
        // Only show nearby events (ids 2 and 6)
        return ['2', '6'].includes(alert.id);
      } else {
        // City-wide: show all events
        return true;
      }
    }
    
    return true;
  });

  const handleUpvote = (alertId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvotedAlerts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(alertId)) {
        newSet.delete(alertId);
      } else {
        newSet.add(alertId);
      }
      return newSet;
    });
  };

  const toggleExplanation = (alertId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedExplanations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(alertId)) {
        newSet.delete(alertId);
      } else {
        newSet.add(alertId);
      }
      return newSet;
    });
  };

  // Calculate distance for context badge (mock calculation)
  const getDistanceText = (alertId: string, isCityWide: boolean) => {
    if (isCityWide) return 'City-wide';
    
    // Mock distances based on alert ID
    const distances: Record<string, string> = {
      '1': '1.2 km',
      '2': '3.4 km',
      '3': '4.7 km',
      '4': '2.1 km',
      '5': '5.8 km',
      '6': '3.9 km',
      '7': '2.6 km',
    };
    return distances[alertId] || '2.5 km';
  };

  // Calculate AI impact level
  const getImpactLevel = (alert: Alert) => {
    // High impact: Traffic delays, urgent safety issues
    if (alert.category === 'Traffic' && alert.summary.includes('delay')) {
      return { level: 'High Impact', icon: Flame, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' };
    }
    // Medium impact: Weather, scheduled maintenance
    if (alert.category === 'Weather' || alert.summary.includes('Scheduled')) {
      return { level: 'Medium Impact', icon: AlertCircle, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20' };
    }
    // Low impact: Events, informational
    return { level: 'Low Impact', icon: Info, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
  };

  if (filteredAlerts.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-12 border border-slate-200 dark:border-slate-700 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          No alerts match your selected filters. Try enabling more categories.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAlerts.map((alert) => {
        const Icon = categoryIcons[alert.category];
        const colorClass = categoryColors[alert.category];
        const isUpvoted = upvotedAlerts.has(alert.id);
        const displayUpvotes = alert.upvotes + (isUpvoted ? 1 : 0);
        const isCityWideEvent = alert.category === 'Events' && parseInt(alert.id) >= 8;
        const distanceText = getDistanceText(alert.id, isCityWideEvent);
        const isExplanationExpanded = expandedExplanations.has(alert.id);
        const impactLevel = getImpactLevel(alert);

        return (
          <div
            key={alert.id}
            onClick={() => onAlertClick(alert.id)}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              {/* Category Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${colorClass}`} />
                </div>
              </div>

              {/* Alert Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {alert.title}
                  </h4>
                  <span className="text-slate-500 dark:text-slate-400 text-sm text-nowrap">
                    {alert.timestamp}
                  </span>
                </div>

                {/* Context badges */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                    <MapPin className="w-3.5 h-3.5" />
                    {distanceText} away
                  </span>
                  {/* Impact Label */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm ${impactLevel.bg} ${impactLevel.color}`}>
                    <impactLevel.icon className="w-3.5 h-3.5" />
                    {impactLevel.level}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  {alert.summary}
                </p>
                
                {/* Why am I seeing this? expandable */}
                {!isExplanationExpanded ? (
                  <button
                    onClick={(e) => toggleExplanation(alert.id, e)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-3 flex items-center gap-1"
                  >
                    Why am I seeing this?
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="mb-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                    <h5 className="text-sm text-slate-900 dark:text-white mb-2">Why you're seeing this alert:</h5>
                    <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-3">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span><strong>Matched category:</strong> {alert.category}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span><strong>Distance/Scope:</strong> {isCityWideEvent ? 'City-wide discovery mode enabled' : `Within ${distanceText} of your location`}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span><strong>Recency:</strong> {alert.timestamp}</span>
                      </li>
                      {alert.upvotes > 20 && (
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span><strong>Community confirmation:</strong> {alert.upvotes} upvotes</span>
                        </li>
                      )}
                    </ul>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-3">
                      Distance is user-controllable and adapts to intent — hyperlocal for urgent alerts, city-wide for discovery.
                    </p>
                    <button
                      onClick={(e) => toggleExplanation(alert.id, e)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Close
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4 flex-wrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-white ${
                      alert.source === 'AI'
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600'
                        : 'bg-green-500'
                    }`}
                  >
                    {alert.source}
                  </span>
                  <button
                    onClick={(e) => handleUpvote(alert.id, e)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                      isUpvoted
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{displayUpvotes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}