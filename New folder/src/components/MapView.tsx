import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
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

interface MapViewProps {
  activeFilters: AlertCategory[];
  selectedAlertId: string | null;
  onPinClick: (alertId: string) => void;
  radius: RadiusOption;
  eventsScope: EventsScope;
  mode?: 'alerts' | 'picker';
  center?: { lat: number; lng: number };
  selectedLocation?: { lat: number; lng: number } | null;
  onMapClick?: (lat: number, lng: number) => void;
}

function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (event) => {
      onMapClick?.(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

// Sample alerts with coordinates (Vadodara, Gujarat area)
const mapAlerts = [
  {
    id: '1',
    category: 'Traffic' as AlertCategory,
    title: 'Heavy traffic on RC Dutt Road',
    coordinates: { lat: 22.3072, lng: 73.1812 },
    isCityWide: false,
  },
  {
    id: '2',
    category: 'Events' as AlertCategory,
    title: 'Navratri Festival at United Way',
    coordinates: { lat: 22.3196, lng: 73.1839 },
    isCityWide: false,
  },
  {
    id: '3',
    category: 'Safety' as AlertCategory,
    title: 'Power outage in Manjalpur area',
    coordinates: { lat: 22.2890, lng: 73.1970 },
    isCityWide: false,
  },
  {
    id: '4',
    category: 'Weather' as AlertCategory,
    title: 'Heavy rain expected this evening',
    coordinates: { lat: 22.3256, lng: 73.2023 },
    isCityWide: false,
  },
  {
    id: '5',
    category: 'Traffic' as AlertCategory,
    title: 'Road construction on VIP Road',
    coordinates: { lat: 22.2956, lng: 73.2123 },
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

const MapView: React.FC<MapViewProps> = ({
  activeFilters,
  selectedAlertId,
  onPinClick,
  radius,
  eventsScope,
  mode = 'alerts',
  center: centerOverride,
  selectedLocation,
  onMapClick,
}) => {
  // Default center (Vadodara)
  const center: [number, number] = centerOverride
    ? [centerOverride.lat, centerOverride.lng]
    : [22.3072, 73.1812];

  // Filter alerts based on active filters and events scope
  const filteredAlerts = mapAlerts.filter((alert) => {
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(alert.category);
    const matchesScope = eventsScope === 'City-wide' ? alert.isCityWide : !alert.isCityWide;
    return matchesFilter && (alert.category !== 'Events' || matchesScope);
  });

  // Convert radius to meters
  const radiusInMeters = typeof radius === 'number' ? radius * 1000 : 10000;

  // Create custom icons for different categories
  const createIcon = (category: AlertCategory, isSelected: boolean) => {
    const IconComponent = categoryIcons[category];
    const color = categoryColors[category];
    const size = isSelected ? 28 : 20;
    
    const iconHtml = renderToString(
      <div style={{
        backgroundColor: color,
        borderRadius: '50%',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        border: isSelected ? '3px solid white' : '2px solid white',
        transform: isSelected ? 'scale(1.2)' : 'scale(1)',
        transition: 'all 0.2s'
      }}>
        <IconComponent size={size} color="white" strokeWidth={2.5} />
      </div>
    );
    
    return L.divIcon({
      html: iconHtml,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <MapClickHandler onMapClick={mode === 'picker' ? onMapClick : undefined} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* Radius circle (alerts mode only) */}
        {mode === 'alerts' && (
          <Circle
            center={center}
            radius={radiusInMeters}
            pathOptions={{
              color: '#0ea5e9',
              fillColor: '#0ea5e9',
              fillOpacity: 0.1,
              weight: 2,
            }}
          />
        )}

        {/* Selected location marker (picker mode) */}
        {mode === 'picker' && selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold text-slate-900">Selected location</div>
                <div className="text-xs text-slate-600 mt-1">
                  {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Alert markers (alerts mode only) */}
        {mode === 'alerts' &&
          filteredAlerts.map((alert) => (
            <Marker
              key={alert.id}
              position={[alert.coordinates.lat, alert.coordinates.lng]}
              icon={createIcon(alert.category, selectedAlertId === alert.id)}
              eventHandlers={{
                click: () => onPinClick(alert.id),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold text-slate-900">{alert.title}</div>
                  <div className="text-xs text-slate-600 mt-1">{alert.category}</div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export { MapView };
