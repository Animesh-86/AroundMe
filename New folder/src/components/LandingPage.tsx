import { MapPin, Zap, Brain, Target, Shield, Bell, TrendingUp, Sparkles, ChevronRight, Car, Calendar, AlertTriangle, Clock, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Landing Header */}
      <header className="glass-strong border-b border-white/40 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center shadow-xl">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl text-slate-900 tracking-tight">AroundMe</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="max-w-7xl w-full">
          {/* Split Layout: AroundMe on Left, Sample Cards on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            {/* Left Side: AroundMe Branding */}
            <div className="text-center lg:text-left space-y-8">
              {/* Logo/Icon with enhanced animation */}
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-32 h-32 -translate-x-4 -translate-y-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  
                  {/* Main logo */}
                  <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                    <MapPin className="w-12 h-12 text-white drop-shadow-lg" />
                    
                    {/* Sparkle effects */}
                    <div className="absolute -top-1 -left-1">
                      <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      <Sparkles className="w-4 h-4 text-blue-200 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>
                  
                  {/* AI badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 border-4 border-white animate-bounce flex items-center justify-center shadow-lg">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 w-24 h-24 rounded-3xl border-2 border-sky-400/30 animate-ping"></div>
                </div>
              </div>

              {/* Title with gradient */}
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl tracking-tight">
                  <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AroundMe
                  </span>
                </h1>
                <p className="text-slate-600 text-2xl sm:text-3xl leading-tight">
                  AI Intelligence Briefing for your{' '}
                  <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    hyperlocal world
                  </span>
                </p>
              </div>

              {/* Enhanced tagline with icon */}
              <div className="glass-strong px-6 py-4 rounded-2xl border border-white/60 shadow-xl">
                <p className="text-slate-600 flex items-start gap-2">
                  <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                  <span>Not just alerts. AI-powered context analysis that helps you make better decisions about what's happening around you.</span>
                </p>
              </div>

              {/* CTA Button with enhanced effects */}
              <div className="pt-6 flex flex-col items-center lg:items-start gap-4">
                <button
                  onClick={onGetStarted}
                  className="group relative px-12 py-6 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 overflow-hidden"
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <span className="relative flex items-center gap-3 text-xl">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    Start Your Briefing
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
                
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Powered by advanced AI reasoning engine
                </p>
              </div>
            </div>

            {/* Right Side: Sample Alert Cards */}
            <div className="space-y-3 relative">
              {/* Sample Card 1 - Traffic Alert - Floating up and down */}
              <div className="glass rounded-xl p-4 border-2 border-white/60 shadow-lg hover:shadow-2xl transition-all hover:border-orange-300/50 animate-float" style={{ animationDelay: '0s' }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center border-2 border-orange-300/50 flex-shrink-0">
                    <Car className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-slate-900 text-sm leading-relaxed">
                      Heavy traffic near RC Dutt Road may delay evening travel by ~20 minutes.
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 border border-red-200">
                        <span className="text-xs">🔥</span>
                        <span className="text-xs text-red-600">High</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-600">1.2 km</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-600">15 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Card 2 - Event Alert - Floating with delay */}
              <div className="glass rounded-xl p-4 border-2 border-white/60 shadow-lg hover:shadow-2xl transition-all hover:border-blue-300/50 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-2 border-blue-300/50 flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-slate-900 text-sm leading-relaxed">
                      Traditional Navratri Garba at United Way starts at 8 PM — matches your cultural interests.
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-50 border border-yellow-200">
                        <span className="text-xs">⚠️</span>
                        <span className="text-xs text-yellow-600">Medium</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-600">3.4 km</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-600">1 hour</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Card 3 - Safety Alert - Floating with more delay */}
              <div className="glass rounded-xl p-4 border-2 border-white/60 shadow-lg hover:shadow-2xl transition-all hover:border-red-300/50 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center border-2 border-red-300/50 flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-slate-900 text-sm leading-relaxed">
                      Road construction on Alkapuri Circle causing detours — avoid if heading west.
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-50 border border-yellow-200">
                        <span className="text-xs">⚠️</span>
                        <span className="text-xs text-yellow-600">Medium</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-600">2.8 km</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-600">2 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating "Live Demo" badge */}
              <div className="absolute -top-4 -right-4 glass-strong px-3 py-1.5 rounded-full border-2 border-green-400/60 shadow-lg animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                  <span className="text-xs text-slate-700">Live Preview</span>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div 
            className={`mb-20 transition-all duration-1000 ${
              visibleSections.has('how-it-works') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            data-animate 
            id="how-it-works"
          >
            <div className="text-center mb-12 space-y-2">
              <h2 className="text-slate-900 text-4xl">How It Works</h2>
              <p className="text-slate-500">Three simple steps to intelligent hyperlocal awareness</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div 
                className={`relative group transition-all duration-700 ${
                  visibleSections.has('how-it-works')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="glass rounded-2xl p-8 border-2 border-white/60 hover:border-sky-400/50 transition-all h-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 duration-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-xl">
                    <span className="text-xl">1</span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center mb-4 mt-2 shadow-md">
                    <Target className="w-8 h-8 text-sky-600" />
                  </div>
                  <h3 className="text-slate-900 text-xl mb-3">Set Your Context</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Tell AroundMe what matters to you - events, traffic, safety concerns, or weather. Define your radius and preferences.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div 
                className={`relative group transition-all duration-700 ${
                  visibleSections.has('how-it-works')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="glass rounded-2xl p-8 border-2 border-white/60 hover:border-blue-400/50 transition-all h-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 duration-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center shadow-xl">
                    <span className="text-xl">2</span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-4 mt-2 shadow-md">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-slate-900 text-xl mb-3">AI Analysis</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our AI analyzes hundreds of signals and prioritizes what's truly important for your specific context and intent.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div 
                className={`relative group transition-all duration-700 ${
                  visibleSections.has('how-it-works')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="glass rounded-2xl p-8 border-2 border-white/60 hover:border-indigo-400/50 transition-all h-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 duration-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center shadow-xl">
                    <span className="text-xl">3</span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mb-4 mt-2 shadow-md">
                    <Bell className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-slate-900 text-xl mb-3">Get Your Briefing</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Receive a curated intelligence feed with AI reasoning, impact scores, and actionable insights on a live map.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div 
            className={`mb-20 transition-all duration-1000 ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            data-animate 
            id="features"
          >
            <div className="text-center mb-12 space-y-2">
              <h2 className="text-slate-900 text-4xl">Key Features</h2>
              <p className="text-slate-500">Powerful AI capabilities built for your safety and awareness</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div 
                className={`glass rounded-2xl p-6 border-2 border-white/60 hover:border-sky-300/60 transition-all group shadow-md hover:shadow-xl transform hover:-translate-y-1 duration-300 ${
                  visibleSections.has('features')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Brain className="w-7 h-7 text-sky-600" />
                </div>
                <h3 className="text-slate-900 text-lg mb-2">AI Reasoning</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every alert comes with AI-generated reasoning explaining why it matters to you
                </p>
              </div>

              {/* Feature 2 */}
              <div 
                className={`glass rounded-2xl p-6 border-2 border-white/60 hover:border-blue-300/60 transition-all group shadow-md hover:shadow-xl transform hover:-translate-y-1 duration-300 ${
                  visibleSections.has('features')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <TrendingUp className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-slate-900 text-lg mb-2">Impact Scoring</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  AI-calculated impact scores help you focus on what's most critical
                </p>
              </div>

              {/* Feature 3 */}
              <div 
                className={`glass rounded-2xl p-6 border-2 border-white/60 hover:border-indigo-300/60 transition-all group shadow-md hover:shadow-xl transform hover:-translate-y-1 duration-300 ${
                  visibleSections.has('features')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <MapPin className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-slate-900 text-lg mb-2">Contextual Map</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Live map view with alerts plotted by location, severity, and category
                </p>
              </div>

              {/* Feature 4 */}
              <div 
                className={`glass rounded-2xl p-6 border-2 border-white/60 hover:border-green-300/60 transition-all group shadow-md hover:shadow-xl transform hover:-translate-y-1 duration-300 ${
                  visibleSections.has('features')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Target className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-slate-900 text-lg mb-2">Hyperlocal Range</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Customize your monitoring radius from 1km to 20km, or city-wide coverage
                </p>
              </div>

              {/* Feature 5 */}
              <div 
                className={`glass rounded-2xl p-6 border-2 border-white/60 hover:border-amber-300/60 transition-all group shadow-md hover:shadow-xl transform hover:-translate-y-1 duration-300 ${
                  visibleSections.has('features')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Shield className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-slate-900 text-lg mb-2">Smart Filtering</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Filter by Traffic, Events, Safety, Weather with personalized preferences
                </p>
              </div>

              {/* Feature 6 */}
              <div 
                className={`glass rounded-2xl p-6 border-2 border-white/60 hover:border-red-300/60 transition-all group shadow-md hover:shadow-xl transform hover:-translate-y-1 duration-300 ${
                  visibleSections.has('features')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Zap className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-slate-900 text-lg mb-2">Proactive Insights</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Get ahead of issues before they impact you with predictive analysis
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center space-y-4">
            <p className="text-slate-500 text-lg">
              Signal over noise • Context-driven • AI-powered decision support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}