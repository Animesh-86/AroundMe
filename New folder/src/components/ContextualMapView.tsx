import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Car, Calendar, AlertTriangle, Cloud } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import type { AlertCategory, EventsScope, RadiusOption } from '../App';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ContextualMapViewProps {
  activeFilters: AlertCategory[];
  radius: RadiusOption;
  eventsScope: EventsScope;
}

// Enhanced alerts with more detailed information
const contextualAlerts = [
  {
    id: '1',
    category: 'Traffic' as AlertCategory,
    title: 'Heavy traffic on RC Dutt Road',
    description: 'Expect 15-20 min delays',
    coordinates: { lat: 22.3072, lng: 73.1812 },
    severity: 'high',
    time: '10 mins ago',
    isCityWide: false,
  },
  {
    id: '2',
    category: 'Events' as AlertCategory,
    title: 'Navratri Festival at United Way',
    description: 'Cultural event, 6 PM - 11 PM',
    coordinates: { lat: 22.3196, lng: 73.1839 },
    severity: 'info',
    time: '2 hours ago',
    isCityWide: false,
  },
  {
    id: '3',
    category: 'Safety' as AlertCategory,
    title: 'Power outage in Manjalpur',
    description: 'Affecting 500+ homes',
    coordinates: { lat: 22.2890, lng: 73.1970 },
    severity: 'medium',
    time: '30 mins ago',
    isCityWide: false,
  },
  {
    id: '4',
    category: 'Weather' as AlertCategory,
    title: 'Heavy rain expected',
    description: 'Thunderstorms likely after 6 PM',
    coordinates: { lat: 22.3256, lng: 73.2023 },
    severity: 'high',
    time: '1 hour ago',
    isCityWide: true,
  },
  {
    id: '5',
    category: 'Traffic' as AlertCategory,
    title: 'Road construction on VIP Road',
    description: 'Single lane closure, use alternate route',
    coordinates: { lat: 22.2956, lng: 73.2123 },
    severity: 'medium',
    time: '3 hours ago',
    isCityWide: false,
  },
  {
    id: '6',
    category: 'Events' as AlertCategory,
    title: 'Marathon at Sayajibaug',
    description: 'Morning traffic diverted',
    coordinates: { lat: 22.3089, lng: 73.1897 },
    severity: 'info',
    time: '5 hours ago',
    isCityWide: false,
  },
  {
    id: '7',
    category: 'Safety' as AlertCategory,
    title: 'Water supply disruption',
    description: 'Maintenance work until 4 PM',
    coordinates: { lat: 22.3134, lng: 73.1956 },
    severity: 'medium',
    time: '4 hours ago',
    isCityWide: false,
  },
];

// Category icon mapping
const categoryIcons: Record<AlertCategory, any> = {
  'Traffic': Car,
  'Events': Calendar,
  'Safety': AlertTriangle,
  'Weather': Cloud,
};

const categoryColors: Record<AlertCategory, string> = {
  'Traffic': '#f97316',
  'Events': '#a855f7',
  'Safety': '#ef4444',
  'Weather': '#3b82f6',
};

// Severity color mapping
const severityColors: Record<string, string> = {
  high: '#dc2626',
  medium: '#f59e0b',
  info: '#3b82f6',
};

const ContextualMapView: React.FC<ContextualMapViewProps> = ({
  activeFilters,
  radius,
  eventsScope,
}) => {
  // Default center (Vadodara)
  const center: [number, number] = [22.3072, 73.1812];

  // Filter alerts based on active filters and events scope
  const filteredAlerts = contextualAlerts.filter((alert) => {
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(alert.category);
    const matchesScope = eventsScope === 'City-wide' ? alert.isCityWide : !alert.isCityWide;
    return matchesFilter && (alert.category !== 'Events' || matchesScope);
  });

  // Convert radius to meters
  const radiusInMeters = typeof radius === 'number' ? radius * 1000 : 10000;

  // Create custom icons with severity indication
  const createIcon = (category: AlertCategory, severity: string) => {
    const IconComponent = categoryIcons[category];
    const color = categoryColors[category];
    const severityColor = severityColors[severity] || '#6b7280';
    
    const iconHtml = renderToString(
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: color,
          borderRadius: '50%',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          border: '2px solid white'
        }}>
          <IconComponent size={24} color="white" strokeWidth={2.5} />
        </div>
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-2px',
          width: '14px',
          height: '14px',
          background: severityColor,
          border: '2px solid white',
          borderRadius: '50%'
        }}></div>
      </div>
    );
    
    return L.divIcon({
      html: iconHtml,
      className: 'custom-contextual-marker',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });
  };

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-xl">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* Radius circle with contextual styling */}
        <Circle
          center={center}
          radius={radiusInMeters}
          pathOptions={{
            color: '#0ea5e9',
            fillColor: '#0ea5e9',
            fillOpacity: 0.08,
            weight: 2,
            dashArray: '5, 10',
          }}
        />

        {/* Alert markers with enhanced popups */}
        {filteredAlerts.map((alert) => (
          <Marker
            key={alert.id}
            position={[alert.coordinates.lat, alert.coordinates.lng]}
            icon={createIcon(alert.category, alert.severity)}
          >
            <Popup>
              <div className="text-sm min-w-[200px]">
                <div className="font-bold text-slate-900 mb-1">{alert.title}</div>
                <div className="text-xs text-slate-700 mb-2">{alert.description}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {alert.category}
                  </span>
                  <span className="text-slate-500">{alert.time}</span>
                </div>
                {alert.isCityWide && (
                  <div className="mt-2 text-xs text-blue-600 font-medium">
                    🌆 City-wide alert
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 glass-strong rounded-lg p-3 shadow-lg z-[1000]">
        <div className="text-xs font-semibold text-slate-700 mb-2">Alert Severity</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-xs text-slate-600">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-slate-600">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-slate-600">Info</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ContextualMapView };
