import { useState } from 'react';
import { AlertCategory } from '../App';
import { Car, Calendar, AlertTriangle, Cloud, MapPin, Image as ImageIcon, Send, X, CheckCircle } from 'lucide-react';
import { MapView } from './MapView';

interface ReportViewProps {
  location: string;
}

const categoryIcons = {
  Traffic: Car,
  Events: Calendar,
  Safety: AlertTriangle,
  Weather: Cloud,
};

const categoryColors = {
  Traffic: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    hover: 'hover:bg-orange-100',
  },
  Events: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-100',
  },
  Safety: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    hover: 'hover:bg-red-100',
  },
  Weather: {
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-600',
    hover: 'hover:bg-cyan-100',
  },
};

export function ReportView({ location }: ReportViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<AlertCategory | null>(null);
  const [description, setDescription] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mapLocation, setMapLocation] = useState({ lat: 22.3072, lng: 73.1812 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{category?: boolean; description?: boolean}>({});

  const categories: AlertCategory[] = ['Traffic', 'Events', 'Safety', 'Weather'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = () => {
    const newErrors: {category?: boolean; description?: boolean} = {};
    
    if (!selectedCategory) newErrors.category = true;
    if (!description.trim()) newErrors.description = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Report submitted:', {
      category: selectedCategory,
      description,
      location: reportLocation || location,
      image: selectedImage?.name,
      coordinates: mapLocation,
    });

    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSelectedCategory(null);
      setDescription('');
      setReportLocation('');
      setSelectedImage(null);
      setImagePreview(null);
      setIsSubmitted(false);
      setErrors({});
    }, 3000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-green-900 font-semibold">Report submitted successfully!</p>
            <p className="text-green-700 text-sm">Thank you for helping your community stay informed.</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Report Form */}
        <div className="space-y-6">
          <div className="glass-strong rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Report an Alert</h2>
              <p className="text-slate-600">
                Help keep your community safe and informed by reporting incidents
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-3 mb-6">
              <label className="text-slate-900 font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-slate-600" />
                Category <span className="text-red-500">*</span>
              </label>
              {errors.category && (
                <p className="text-sm text-red-600">Please select a category</p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const Icon = categoryIcons[category];
                  const colors = categoryColors[category];
                  const isSelected = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setErrors(prev => ({...prev, category: false}));
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border-2 font-medium ${
                        isSelected
                          ? `${colors.bg} ${colors.border} ${colors.text}`
                          : `bg-white border-slate-200 text-slate-600 ${colors.hover}`
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-3 mb-6">
              <label className="text-slate-900 font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-slate-600" />
                Location
              </label>
              <input
                type="text"
                value={reportLocation}
                onChange={(e) => setReportLocation(e.target.value)}
                placeholder={`e.g., SG Highway, ${location}`}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <p className="text-xs text-slate-500">
                Or click on the map to set precise location →
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-slate-900 font-semibold">
                  Description <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-500">{description.length}/500</span>
              </div>
              {errors.description && (
                <p className="text-sm text-red-600">Please provide a description</p>
              )}
              <textarea
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setDescription(e.target.value);
                    setErrors(prev => ({...prev, description: false}));
                  }
                }}
                placeholder="Describe what's happening in detail..."
                rows={4}
                maxLength={500}
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none ${
                  errors.description ? 'border-red-300' : 'border-slate-200'
                }`}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-3 mb-6">
              <label className="text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-600" />
                Upload Image <span className="text-slate-500">(optional)</span>
              </label>

              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl border border-slate-200"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setDescription('');
                  setReportLocation('');
                  setSelectedImage(null);
                  setImagePreview(null);
                  setErrors({});
                }}
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all shadow-sm hover:shadow-md font-medium"
              >
                Clear Form
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedCategory || !description}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <Send className="w-5 h-5" />
                <span>Submit Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Map for Location Selection */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="glass-strong rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="mb-4">
              <h3 className="text-slate-900 font-semibold text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sky-600" />
                Select Location
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Click to pinpoint the incident location
              </p>
            </div>
            <div className="h-[400px] rounded-xl overflow-hidden border-2 border-slate-200">
              <MapView
                mode="picker"
                center={mapLocation}
                selectedLocation={mapLocation}
                onMapClick={(lat, lng) => setMapLocation({ lat, lng })}
                activeFilters={[]}
                selectedAlertId={null}
                onPinClick={() => {}}
                radius={2}
                eventsScope="Nearby"
              />
            </div>
            <div className="mt-4 p-4 bg-sky-50 rounded-xl border-2 border-sky-200">
              <p className="text-sm font-semibold text-sky-900 mb-1">
                Selected Coordinates
              </p>
              <p className="text-sm text-sky-700 font-mono">
                {mapLocation.lat.toFixed(4)}, {mapLocation.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
