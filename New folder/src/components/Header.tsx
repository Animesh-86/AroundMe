import { MapPin, ChevronDown, User, Bell, FileText } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  location: string;
  onLocationChange: (location: string) => void;
  activeSection?: 'Context' | 'Alerts' | 'Report';
  onSectionChange?: (section: 'Context' | 'Alerts' | 'Report') => void;
  onBackToHome?: () => void;
}

export function Header({ location, onLocationChange, activeSection = 'Context', onSectionChange, onBackToHome }: HeaderProps) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const cities = ['Vadodara', 'Ahmedabad', 'Surat', 'Rajkot'];

  return (
    <header className="glass-strong border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: AroundMe Logo */}
          <div className="flex items-center gap-4">
            {/* AroundMe Logo - Clickable */}
            <button 
              onClick={onBackToHome}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl text-slate-900 tracking-tight">AroundMe</h1>
            </button>
          </div>

          {/* Center: Navigation Items */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onSectionChange?.('Context')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all group ${
                activeSection === 'Context' 
                  ? 'bg-sky-50 border border-sky-200' 
                  : 'hover:bg-slate-100'
              }`}
            >
              <MapPin className={`w-4 h-4 ${
                activeSection === 'Context' ? 'text-sky-600' : 'text-slate-600 group-hover:text-sky-600'
              }`} />
              <span className={`${
                activeSection === 'Context' ? 'text-sky-600' : 'text-slate-700 group-hover:text-slate-900'
              }`}>Context</span>
            </button>
            <button 
              onClick={() => onSectionChange?.('Alerts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all group ${
                activeSection === 'Alerts' 
                  ? 'bg-sky-50 border border-sky-200' 
                  : 'hover:bg-slate-100'
              }`}
            >
              <Bell className={`w-4 h-4 ${
                activeSection === 'Alerts' ? 'text-sky-600' : 'text-slate-600 group-hover:text-sky-600'
              }`} />
              <span className={`${
                activeSection === 'Alerts' ? 'text-sky-600' : 'text-slate-700 group-hover:text-slate-900'
              }`}>Alerts</span>
            </button>
            <button 
              onClick={() => onSectionChange?.('Report')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all group ${
                activeSection === 'Report' 
                  ? 'bg-sky-50 border border-sky-200' 
                  : 'hover:bg-slate-100'
              }`}
            >
              <FileText className={`w-4 h-4 ${
                activeSection === 'Report' ? 'text-sky-600' : 'text-slate-600 group-hover:text-sky-600'
              }`} />
              <span className={`${
                activeSection === 'Report' ? 'text-sky-600' : 'text-slate-700 group-hover:text-slate-900'
              }`}>Report</span>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Location selector */}
            <div className="relative">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-2 px-4 py-2 glass-strong border border-white/20 rounded-xl hover:bg-white/10 transition-colors shadow-lg"
              >
                <MapPin className="w-4 h-4 text-sky-600" />
                <span className="text-slate-900">{location}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              
              {showLocationDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 glass-strong rounded-2xl shadow-2xl border border-white/20 py-2 z-50 overflow-hidden">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onLocationChange(city);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
                        city === location ? 'text-sky-700 bg-white/10' : 'text-slate-800'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Icon */}
            <button className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors">
              <User className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}