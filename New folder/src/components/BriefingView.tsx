import { BriefingCard } from './BriefingCard';
import { AlertCategory, EventInterest } from '../App';

interface BriefingViewProps {
  location: string;
  activeFilters: AlertCategory[];
  eventInterests: EventInterest[];
  onAlertClick?: (alert: any) => void;
}

// Mock AI briefing data
const generateBriefings = (filters: AlertCategory[], interests: EventInterest[]) => {
  const allBriefings = [
    {
      id: '1',
      category: 'Traffic' as AlertCategory,
      insight: 'Heavy traffic near RC Dutt Road may delay evening travel by ~20 minutes.',
      impact: 'High' as const,
      distance: '1.2 km away',
      timeAgo: '15 min ago',
      explanation: 'Based on your typical evening routes and current location, this traffic jam is directly in your path. Three community reports confirm slow movement, and AI predicts clearance by 7:30 PM.',
      relatedAlerts: [
        'Accident reported at RC Dutt & Sayajigunj intersection',
        '2 users reported slow traffic on alternate route',
        'Police on scene directing traffic',
      ],
    },
    {
      id: '2',
      category: 'Events' as AlertCategory,
      insight: 'Traditional Navratri Garba at United Way starts at 8 PM — matches your cultural interests.',
      impact: 'Medium' as const,
      distance: '3.4 km away',
      timeAgo: '1 hour ago',
      explanation: 'You\'ve indicated interest in Music & Culture and Spiritual events. This is one of the largest Navratri celebrations in Vadodara, with traditional music and authentic Gujarati atmosphere.',
      relatedAlerts: [
        'Parking expected to fill by 7:30 PM',
        'Entry fee: ₹150 per person',
        'Traditional dress recommended',
      ],
    },
    {
      id: '3',
      category: 'Safety' as AlertCategory,
      insight: 'Road construction on Alkapuri Circle causing detours — avoid if heading west.',
      impact: 'Medium' as const,
      distance: '2.8 km away',
      timeAgo: '2 hours ago',
      explanation: 'Your safety preferences are active, and this construction zone has reduced visibility during evening hours. AI suggests using Fatehgunj route instead.',
      relatedAlerts: [
        'Construction active until Feb 15',
        'Poor lighting reported by 4 users',
        'Alternative route adds 5 minutes',
      ],
    },
    {
      id: '4',
      category: 'Weather' as AlertCategory,
      insight: 'Light rain expected around 6 PM — plan indoor activities or carry umbrella.',
      impact: 'Low' as const,
      distance: 'City-wide',
      timeAgo: '30 min ago',
      explanation: 'Weather patterns show brief showers likely between 6-7 PM. Not severe, but relevant if you have outdoor plans this evening.',
      relatedAlerts: [
        'Temperature dropping to 18°C',
        'Rain duration: 30-45 minutes',
        'No storm warnings',
      ],
    },
    {
      id: '5',
      category: 'Events' as AlertCategory,
      insight: 'Food festival at Inorbit Mall features local Gujarati cuisine — ends today.',
      impact: 'Low' as const,
      distance: '5.6 km away',
      timeAgo: '3 hours ago',
      explanation: 'You\'ve shown interest in Food & Social events. This is the last day of a week-long festival featuring traditional Vadodara street food vendors.',
      relatedAlerts: [
        'Open until 10 PM tonight',
        'Free entry, pay per dish',
        'Peak crowd expected 7-9 PM',
      ],
    },
  ];

  // Filter based on active categories
  return allBriefings.filter(b => filters.includes(b.category));
};

export function BriefingView({ location, activeFilters, eventInterests, onAlertClick }: BriefingViewProps) {
  const briefings = generateBriefings(activeFilters, eventInterests);
  const topBriefings = briefings.slice(0, 5); // Show max 5 briefings

  return (
    <div className="space-y-6">
      {/* Main Briefing Header */}
      <div className="space-y-3">
        <h2 className="text-4xl text-slate-900">
          Here's what matters in {location} right now
        </h2>
      </div>

      {/* Briefing Cards */}
      {topBriefings.length > 0 ? (
        <div className="space-y-4">
          {topBriefings.map((briefing) => (
            <div key={briefing.id} onClick={() => onAlertClick?.(briefing)} className="cursor-pointer">
              <BriefingCard {...briefing} />
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-strong rounded-2xl p-12 border border-white/10 text-center">
          <p className="text-slate-400 text-lg">
            No signals match your current filters. Adjust your context to see relevant briefings.
          </p>
        </div>
      )}

      {/* Updated timestamp */}
      <div className="text-center">
        <p className="text-sm text-slate-500">
          Last updated: {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}