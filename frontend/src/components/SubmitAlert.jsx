import React, { useState } from 'react';
import './SubmitAlert.css';

const SubmitAlert = ({ onSubmit, categories }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'TRAFFIC',
    latitude: 22.3072,
    longitude: 73.1812,
    address: '',
    submittedBy: 'Community User'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setFormData({
        title: '',
        description: '',
        category: 'TRAFFIC',
        latitude: 22.3072,
        longitude: 73.1812,
        address: '',
        submittedBy: 'Community User'
      });
    }, 2000);
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

  if (submitted) {
    return (
      <div className="submit-alert success-message">
        <div className="success-icon">✅</div>
        <h3>Alert Submitted Successfully!</h3>
        <p>Thank you for contributing to community awareness.</p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="submit-alert-trigger">
        <button onClick={() => setShowForm(true)} className="trigger-btn">
          ➕ Submit Community Alert
        </button>
      </div>
    );
  }

  return (
    <div className="submit-alert">
      <div className="form-header">
        <h2>📝 Submit New Alert</h2>
        <button onClick={() => setShowForm(false)} className="close-btn">✕</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Alert Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Brief, clear title..."
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide details about what's happening..."
            required
            rows="4"
            className="textarea-field"
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="select-field"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {getCategoryIcon(cat)} {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address or landmark"
            className="input-field"
          />
          <div className="coordinates-input">
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              placeholder="Latitude"
              step="0.0001"
              className="input-small"
            />
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              placeholder="Longitude"
              step="0.0001"
              className="input-small"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Your Name (Optional)</label>
          <input
            type="text"
            name="submittedBy"
            value={formData.submittedBy}
            onChange={handleInputChange}
            placeholder="Anonymous"
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-btn">
          🚀 Submit Alert
        </button>
      </form>
    </div>
  );
};

export default SubmitAlert;
