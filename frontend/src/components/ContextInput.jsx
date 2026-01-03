import React, { useState, useEffect } from 'react';
import './ContextInput.css';

const ContextInput = ({ onSearch, categories }) => {
  const [formData, setFormData] = useState({
    latitude: 22.3072,
    longitude: 73.1812,
    address: 'Akota, Vadodara',
    radiusKm: 5,
    interestedCategories: ['TRAFFIC', 'WEATHER', 'EVENTS', 'SAFETY'],
    intent: '',
    destination: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      const categories = prev.interestedCategories.includes(category)
        ? prev.interestedCategories.filter(c => c !== category)
        : [...prev.interestedCategories, category];
      
      return { ...prev, interestedCategories: categories };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const presetLocations = [
    { name: 'Akota, Vadodara', lat: 22.3120, lng: 73.1820 },
    { name: 'Alkapuri, Vadodara', lat: 22.3019, lng: 73.1896 },
    { name: 'Sayajigunj, Vadodara', lat: 22.3072, lng: 73.1812 },
    { name: 'ISKCON Temple, Vadodara', lat: 22.3150, lng: 73.1700 }
  ];

  const handlePresetLocation = (preset) => {
    setFormData(prev => ({
      ...prev,
      latitude: preset.lat,
      longitude: preset.lng,
      address: preset.name
    }));
  };

  return (
    <div className="context-input">
      <h2>🎯 What's Happening Around You?</h2>
      <p className="subtitle">AI-powered contextual alerts for your location</p>

      <form onSubmit={handleSubmit}>
        {/* Location Section */}
        <div className="form-section">
          <label>📍 Location</label>
          <div className="preset-locations">
            {presetLocations.map(preset => (
              <button
                key={preset.name}
                type="button"
                className="preset-btn"
                onClick={() => handlePresetLocation(preset)}
              >
                {preset.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your location"
            className="input-field"
          />
          <div className="coordinates">
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              placeholder="Latitude"
              step="0.0001"
              className="input-field-small"
            />
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              placeholder="Longitude"
              step="0.0001"
              className="input-field-small"
            />
          </div>
        </div>

        {/* Radius Selection */}
        <div className="form-section">
          <label>🔍 Search Radius</label>
          <div className="radius-selector">
            {[2, 5, 10].map(radius => (
              <button
                key={radius}
                type="button"
                className={`radius-btn ${formData.radiusKm === radius ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, radiusKm: radius }))}
              >
                {radius} km
              </button>
            ))}
          </div>
        </div>

        {/* Category Selection */}
        <div className="form-section">
          <label>🏷️ Alert Categories</label>
          <div className="category-grid">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                className={`category-btn ${formData.interestedCategories.includes(category) ? 'active' : ''}`}
                onClick={() => handleCategoryToggle(category)}
              >
                {getCategoryIcon(category)} {category}
              </button>
            ))}
          </div>
        </div>

        {/* Intent & Destination */}
        <div className="form-section">
          <label>💭 What are you planning? (Optional)</label>
          <input
            type="text"
            name="intent"
            value={formData.intent}
            onChange={handleInputChange}
            placeholder="e.g., Heading to ISKCON temple, Going to work..."
            className="input-field"
          />
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Destination (optional)"
            className="input-field"
          />
        </div>

        <button type="submit" className="search-btn">
          🤖 Get AI-Curated Alerts
        </button>
      </form>
    </div>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    TRAFFIC: '🚗',
    WEATHER: '🌤️',
    EVENTS: '🎉',
    SAFETY: '⚠️',
    ROAD_WORK: '🚧',
    PUBLIC_TRANSPORT: '🚌',
    EMERGENCY: '🚨',
    COMMUNITY: '👥',
    OTHER: '📌'
  };
  return icons[category] || '📌';
};

export default ContextInput;
