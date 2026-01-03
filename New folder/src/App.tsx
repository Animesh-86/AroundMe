import { useState } from 'react';
import { Header } from './components/Header';
import { BriefingView } from './components/BriefingView';
import { ContextControl } from './components/ContextControl';
import { ContextualMapView } from './components/ContextualMapView';
import { LandingPage } from './components/LandingPage';
import { AlertDetailSidebar } from './components/AlertDetailSidebar';
import { ChevronDown, Edit3, Map } from 'lucide-react';
import { BentoAlertGrid } from './components/BentoAlertGrid';
import { ReportView } from './components/ReportView';

export type AlertCategory = 'Traffic' | 'Events' | 'Safety' | 'Weather';
export type EventsScope = 'Nearby' | 'City-wide';
export type RadiusOption = 2 | 5 | 10 | 'city-wide';
export type RelevanceMode = 'Nearby' | 'City-wide';
export type EventInterest = 
  | 'Music & Culture' 
  | 'Food & Social' 
  | 'Arts & Theatre' 
  | 'Sports' 
  | 'Spiritual' 
  | 'Academic / Tech' 
  | 'Local Markets';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [location, setLocation] = useState('Vadodara');
  const [relevanceMode, setRelevanceMode] = useState<RelevanceMode>('Nearby');
  const [radius, setRadius] = useState<RadiusOption>(5);
  const [activeFilters, setActiveFilters] = useState<AlertCategory[]>([
    'Traffic',
    'Events',
    'Safety',
    'Weather',
  ]);
  const [eventInterests, setEventInterests] = useState<EventInterest[]>([
    'Music & Culture',
    'Food & Social',
    'Spiritual',
  ]);
  const [intentInput, setIntentInput] = useState('');
  const [aiTriggered, setAiTriggered] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<'Context' | 'Alerts' | 'Report'>('Context');
  const [destination, setDestination] = useState('');
  const [showMap, setShowMap] = useState(true);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Derive events scope from relevance mode
  const eventsScope: EventsScope = relevanceMode === 'City-wide' ? 'City-wide' : 'Nearby';

  const toggleFilter = (filter: AlertCategory) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleEventInterest = (interest: EventInterest) => {
    setEventInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleTriggerAI = (intent?: string) => {
    console.log('AI Triggered with context:', {
      filters: activeFilters,
      interests: eventInterests,
      intent,
      location,
      relevanceMode,
      radius,
    });
    setIsLoadingAI(true);
    // Simulate AI processing
    setTimeout(() => {
      setAiTriggered(true);
      setActiveSection('Alerts'); // Switch to Alerts view when AI is triggered
      setSidebarCollapsed(true); // Collapse sidebar by default
      setIsLoadingAI(false);
    }, 1500);
    // In production, this would trigger actual AI analysis
  };

  // When relevance mode changes, update radius accordingly
  const handleRelevanceModeChange = (mode: RelevanceMode) => {
    setRelevanceMode(mode);
    if (mode === 'City-wide') {
      setRadius('city-wide');
    } else if (radius === 'city-wide') {
      setRadius(5);
    }
  };

  // Mock data for map
  const mockMapAlerts = [
    { id: '1', category: 'Traffic' as AlertCategory, title: 'Heavy traffic on SG Highway', lat: 22.3072, lng: 73.1812 },
    { id: '2', category: 'Events' as AlertCategory, title: 'Festival at Laxmi Vilas Palace', lat: 22.3039, lng: 73.1910 },
    { id: '3', category: 'Safety' as AlertCategory, title: 'Road closure near Sayajigunj', lat: 22.3000, lng: 73.2000 },
  ];

  const handleMapAlertClick = (alertId: string) => {
    console.log('Map alert clicked:', alertId);
    // Could scroll to corresponding card in feed
  };

  const handleAlertClick = (alert: any) => {
    setSelectedAlert(alert);
  };

  const handleCloseSidebar = () => {
    setSelectedAlert(null);
  };

  const handleBackToHome = () => {
    setShowLanding(true);
    setAiTriggered(false);
    setSelectedAlert(null);
    setSidebarCollapsed(false);
    setActiveSection('Context');
  };

  // Handle section change and set sidebar state
  const handleSectionChange = (section: 'Context' | 'Alerts' | 'Report') => {
    setActiveSection(section);
    // Collapse sidebar by default when switching to Alerts
    if (section === 'Alerts') {
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient">
      {showLanding ? (
        <LandingPage onGetStarted={() => setShowLanding(false)} />
      ) : (
        <div className="relative z-10">
          <Header 
            location={location} 
            onLocationChange={setLocation} 
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onBackToHome={handleBackToHome}
          />

          <main className="px-8 py-8">
            {activeSection === 'Report' ? (
              // Report View
              <ReportView location={location} />
            ) : activeSection === 'Context' || !aiTriggered ? (
              // Context Input View - Center Stage
              <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                <ContextControl
                  activeFilters={activeFilters}
                  onToggleFilter={toggleFilter}
                  selectedInterests={eventInterests}
                  onToggleInterest={toggleEventInterest}
                  onTriggerAI={handleTriggerAI}
                  showEventPreferences={activeFilters.includes('Events')}
                  aiTriggered={aiTriggered}
                  intentInput={intentInput}
                  onIntentChange={setIntentInput}
                  relevanceMode={relevanceMode}
                  onRelevanceModeChange={handleRelevanceModeChange}
                  radius={radius}
                  onRadiusChange={setRadius}
                  destination={destination}
                  onDestinationChange={setDestination}
                  isLoading={isLoadingAI}
                />
              </div>
            ) : activeSection === 'Alerts' ? (
              // Feed + Map with Collapsible Left Sidebar - Constrained Width
              <div className="max-w-[1600px] mx-auto">
                <div className="flex gap-6 relative">
                  {/* Left: Full Height Context Control Sidebar */}
                  <div
                    className={`flex-shrink-0 transition-all duration-300 ${
                      sidebarCollapsed ? 'w-16' : 'w-[400px] xl:w-[500px]'
                    }`}
                  >
                    {sidebarCollapsed ? (
                      // Collapsed state - just show expand button
                      <div className="sticky top-24 flex flex-col items-center gap-2">
                        <button
                          onClick={() => setSidebarCollapsed(false)}
                          className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-600 rounded-xl transition-all shadow-lg hover:shadow-xl"
                          aria-label="Expand sidebar"
                        >
                          <Edit3 className="w-5 h-5" />
                          <span className="font-semibold">
                            Customize
                          </span>
                        </button>
                        <p className="text-xs text-slate-500 text-center px-4">Edit your preferences</p>
                      </div>
                    ) : (
                      // Expanded state - show full control panel (sticky)
                      <div className="sticky top-24 h-fit relative">
                        {/* Collapse button - positioned on the right edge */}
                        <button
                          onClick={() => setSidebarCollapsed(true)}
                          className="absolute -right-4 top-6 z-20 p-2 bg-white hover:bg-slate-50 rounded-full border-2 border-slate-300 hover:border-sky-500 transition-all shadow-lg hover:shadow-xl"
                          aria-label="Collapse sidebar"
                        >
                          <ChevronDown className="w-5 h-5 text-slate-600 hover:text-sky-600 -rotate-90" />
                        </button>
                        
                        <ContextControl
                          activeFilters={activeFilters}
                          onToggleFilter={toggleFilter}
                          selectedInterests={eventInterests}
                          onToggleInterest={toggleEventInterest}
                          onTriggerAI={handleTriggerAI}
                          showEventPreferences={activeFilters.includes('Events')}
                          aiTriggered={aiTriggered}
                          intentInput={intentInput}
                          onIntentChange={setIntentInput}
                          relevanceMode={relevanceMode}
                          onRelevanceModeChange={handleRelevanceModeChange}
                          radius={radius}
                          onRadiusChange={setRadius}
                          destination={destination}
                          onDestinationChange={setDestination}
                          isCompactMode={true}
                          isLoading={isLoadingAI}
                        />
                      </div>
                    )}
                  </div>

                  {/* Right: Feed + Map - Takes Full Available Space */}
                  <div className="flex-1 min-w-0">
                    <div className={`grid gap-6 ${showMap ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                      {/* Left: AI-Curated Alert Feed */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setShowMap(!showMap)}
                            className="flex items-center gap-2 px-4 py-2 glass-strong rounded-lg border border-slate-200 hover:border-sky-300 transition-all shadow-sm group ml-auto"
                          >
                            <Map className="w-4 h-4 text-slate-600 group-hover:text-sky-600" />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">
                              {showMap ? 'Hide Map' : 'Show Map'}
                            </span>
                          </button>
                        </div>
                        <BriefingView
                          location={location}
                          activeFilters={activeFilters}
                          eventInterests={eventInterests}
                          onAlertClick={handleAlertClick}
                        />
                      </div>

                      {/* Right: Contextual Map View */}
                      {showMap && (
                        <div className="lg:sticky lg:top-24 h-[600px]">
                          <ContextualMapView
                            activeFilters={activeFilters}
                            radius={radius === 'city-wide' ? 10 : radius}
                            eventsScope={relevanceMode === 'City-wide' ? 'City-wide' : 'Nearby'}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </main>
        </div>
      )}
    </div>
  );
}