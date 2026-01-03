import { Filter, Heart, Brain, Target, MapPin, Loader2 } from 'lucide-react';
import type { AlertCategory, EventInterest, RelevanceMode, RadiusOption } from '../App';

interface ContextControlProps {
  activeFilters: AlertCategory[];
  onToggleFilter: (filter: AlertCategory) => void;
  selectedInterests: EventInterest[];
  onToggleInterest: (interest: EventInterest) => void;
  onTriggerAI: (intent?: string) => void;
  showEventPreferences: boolean;
  aiTriggered: boolean;
  intentInput: string;
  onIntentChange: (value: string) => void;
  relevanceMode: RelevanceMode;
  onRelevanceModeChange: (mode: RelevanceMode) => void;
  radius: RadiusOption;
  onRadiusChange: (radius: RadiusOption) => void;
  destination: string;
  onDestinationChange: (value: string) => void;
  isCompactMode?: boolean;
  isLoading?: boolean;
}

export function ContextControl({
  activeFilters,
  onToggleFilter,
  selectedInterests,
  onToggleInterest,
  onTriggerAI,
  showEventPreferences,
  aiTriggered,
  intentInput,
  onIntentChange,
  relevanceMode,
  onRelevanceModeChange,
  radius,
  onRadiusChange,
  destination,
  onDestinationChange,
  isCompactMode = false,
  isLoading = false,
}: ContextControlProps) {
  const categoryOptions: AlertCategory[] = ['Traffic', 'Events', 'Safety', 'Weather'];
  const eventInterestOptions: EventInterest[] = [
    'Music & Culture',
    'Food & Social',
    'Arts & Theatre',
    'Sports',
    'Spiritual',
    'Academic / Tech',
    'Local Markets',
  ];
  const radiusOptions: RadiusOption[] = [2, 5, 10];

  return (
    <div className="glass-strong rounded-2xl p-4 border border-slate-200 space-y-6 min-h-[600px]">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-slate-900 flex items-center justify-center gap-2">
          <Brain className="w-6 h-6 text-sky-600" />
          Your Context for Right Now
        </h2>
      </div>

      {/* Relevance Mode & Distance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 justify-center">
          <Target className="w-4 h-4 text-slate-600" />
          <h3 className="text-slate-900">Scope</h3>
        </div>
        
        <div className="flex flex-col gap-3">
          {/* Mode Toggle */}
          <div className="flex items-center justify-center gap-2 bg-slate-100 border border-slate-200 rounded-lg p-1">
            <button
              onClick={() => onRelevanceModeChange('Nearby')}
              className={`px-4 py-2.5 rounded-md transition-all whitespace-nowrap ${
                relevanceMode === 'Nearby'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Nearby
            </button>
            <button
              onClick={() => onRelevanceModeChange('City-wide')}
              className={`px-4 py-2.5 rounded-md transition-all whitespace-nowrap ${
                relevanceMode === 'City-wide'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              City-wide
            </button>
          </div>
          
          {/* Distance Selector (Only visible in Nearby mode) */}
          {relevanceMode === 'Nearby' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-sm text-slate-600">Distance</span>
                <span className="text-sm font-medium text-sky-600">{radius}km</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={radius}
                  onChange={(e) => onRadiusChange(Number(e.target.value) as RadiusOption)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #0284c7 0%, #0284c7 ${((radius - 1) / 19) * 100}%, #e2e8f0 ${((radius - 1) / 19) * 100}%, #e2e8f0 100%)`
                  }}
                />
                {/* Distance markers */}
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-xs text-slate-400">1km</span>
                  <span className="text-xs text-slate-400">5km</span>
                  <span className="text-xs text-slate-400">10km</span>
                  <span className="text-xs text-slate-400">15km</span>
                  <span className="text-xs text-slate-400">20km</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interest Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 justify-center">
          <Filter className="w-4 h-4 text-slate-600" />
          <h3 className="text-slate-900">Interest Filters</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 min-h-[120px]">
          {categoryOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => onToggleFilter(filter)}
              className={`px-4 py-2.5 rounded-lg transition-all border h-fit ${
                activeFilters.includes(filter)
                  ? 'bg-sky-100 border-sky-300 text-sky-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Event Preferences */}
      {showEventPreferences && (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-slate-600" />
            <h3 className="text-slate-900">Event Preferences</h3>
          </div>
          {isCompactMode ? (
            <div className="grid grid-cols-3 gap-2">
              {eventInterestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => onToggleInterest(interest)}
                  className={`px-2 py-2 rounded-lg text-xs transition-all border font-medium ${
                    selectedInterests.includes(interest)
                      ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {eventInterestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => onToggleInterest(interest)}
                className={`px-3 py-2 rounded-lg text-sm transition-all border font-medium ${
                  selectedInterests.includes(interest)
                    ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Destination Input */}
      <div className="space-y-3">
        <label className="text-slate-900 block text-center flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4 text-slate-600" />
          Destination
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => onDestinationChange(e.target.value)}
          placeholder="e.g., ISKCON Vadodara"
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Optional Intent Input */}
      <div className="space-y-3">
        <label className="text-slate-900 block text-center">
          What are you planning?
        </label>
        <input
          type="text"
          value={intentInput}
          onChange={(e) => onIntentChange(e.target.value)}
          placeholder="e.g., going to ISKCON Vadodara"
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Primary CTA */}
      <div className="space-y-2">
        <button
          onClick={() => onTriggerAI(intentInput || undefined)}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          <span className="font-medium">{isLoading ? 'Analyzing...' : (aiTriggered ? 'Update Analysis' : 'What matters now')}</span>
        </button>
        <p className="text-slate-500 text-xs text-center">
          AI reviews all city signals so you don't have to
        </p>
      </div>
    </div>
  );
}