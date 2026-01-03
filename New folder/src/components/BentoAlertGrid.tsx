import { useState } from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, Car, Calendar, AlertTriangle, Cloud, MapPin, ChevronDown } from 'lucide-react';
import type { Alert, AlertCategory, EventsScope, EventInterest } from '../App';

interface BentoAlertGridProps {
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
];

const categoryIcons = {
  Traffic: Car,
  Events: Calendar,
  Safety: AlertTriangle,
  Weather: Cloud,
};

const categoryColors = {
  Traffic: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  Events: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  Safety: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  Weather: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
};

export function BentoAlertGrid({ activeFilters, onAlertClick, eventsScope }: BentoAlertGridProps) {
  const [upvotedAlerts, setUpvotedAlerts] = useState<Set<string>>(new Set());

  const filteredAlerts = sampleAlerts.filter((alert) => {
    if (!activeFilters.includes(alert.category)) return false;
    
    if (alert.category === 'Events') {
      if (eventsScope === 'Nearby') {
        return ['2', '6'].includes(alert.id);
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

  // Determine card size based on priority
  const getCardSize = (alert: Alert) => {
    // Critical: Traffic delays, Safety issues
    if (
      (alert.category === 'Traffic' && alert.summary.includes('delay')) ||
      (alert.category === 'Safety' && alert.id === '3')
    ) {
      return 'lg:col-span-2 lg:row-span-2'; // 2x2
    }
    return 'lg:col-span-1 lg:row-span-1'; // 1x1
  };

  const getDistance = (alertId: string) => {
    const distances: Record<string, string> = {
      '1': '1.2',
      '2': '3.4',
      '3': '4.7',
      '4': '2.1',
      '5': '5.8',
      '6': '3.9',
      '8': 'City-wide',
    };
    return distances[alertId] || '2.5';
  };

  const getAIConfidence = (alert: Alert) => {
    if (alert.source === 'Community') return null;
    // Mock AI confidence based on upvotes and category
    if (alert.upvotes > 100) return 95;
    if (alert.upvotes > 50) return 88;
    if (alert.upvotes > 20) return 82;
    return 76;
  };

  if (filteredAlerts.length === 0) {
    return (
      <div className="glass rounded-3xl p-12 border border-white/10 text-center">
        <p className="text-slate-400">
          No alerts match your selected filters. Try enabling more categories.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-fr">
      {filteredAlerts.map((alert, index) => {
        const Icon = categoryIcons[alert.category];
        const colors = categoryColors[alert.category];
        const isUpvoted = upvotedAlerts.has(alert.id);
        const displayUpvotes = alert.upvotes + (isUpvoted ? 1 : 0);
        const cardSize = getCardSize(alert);
        const distance = getDistance(alert.id);
        const aiConfidence = getAIConfidence(alert);
        const isCritical = cardSize.includes('col-span-2');

        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => onAlertClick(alert.id)}
            className={`${cardSize} group relative glass-strong rounded-3xl p-6 border border-slate-200 hover:border-sky-300 transition-all cursor-pointer overflow-hidden shadow-sm ${
              isCritical ? 'border-red-300' : ''
            }`}
          >
            {/* AI Prioritized Badge */}
            {alert.source === 'AI' && aiConfidence && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-10">
                AI {aiConfidence}%
              </div>
            )}

            {/* Category Icon */}
            <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 border ${colors.border}`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>

            {/* Content */}
            <h3 className="text-slate-900 text-lg mb-2 group-hover:text-sky-700 transition-colors">
              {alert.title}
            </h3>
            
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              {alert.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-xs border ${colors.border}`}>
                {alert.category}
              </span>
              {distance !== 'City-wide' ? (
                <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs border border-slate-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {distance} km
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs border border-blue-200">
                  City-wide
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs border border-slate-200">
                {alert.timestamp}
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => handleUpvote(alert.id, e)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors text-sm ${
                  isUpvoted
                    ? 'bg-blue-100 text-blue-600 border border-blue-300'
                    : 'glass text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{displayUpvotes}</span>
              </button>

              <span className={`text-xs px-3 py-1 rounded-full ${
                alert.source === 'AI'
                  ? 'bg-sky-50 text-sky-600 border border-sky-200'
                  : 'bg-green-50 text-green-600 border border-green-200'
              }`}>
                {alert.source}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}