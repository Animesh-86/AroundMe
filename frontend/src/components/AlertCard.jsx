import React from 'react';
import './AlertCard.css';

const AlertCard = ({ alert }) => {
  const getImpactClass = (impact) => {
    const classes = {
      HIGH: 'impact-high',
      MEDIUM: 'impact-medium',
      LOW: 'impact-low',
      INFO: 'impact-info'
    };
    return classes[impact] || 'impact-info';
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

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    }
    return `${distance.toFixed(1)} km`;
  };

  return (
    <div className={`alert-card ${getImpactClass(alert.impact)}`}>
      <div className="alert-header">
        <div className="alert-category">
          <span className="category-icon">{getCategoryIcon(alert.category)}</span>
          <span className="category-name">{alert.category}</span>
        </div>
        <div className="alert-badges">
          <span className="distance-badge">📍 {formatDistance(alert.distanceFromUser)}</span>
          <span className={`impact-badge ${getImpactClass(alert.impact)}`}>
            {alert.impact}
          </span>
        </div>
      </div>

      <h3 className="alert-title">{alert.title}</h3>
      <p className="alert-description">{alert.description}</p>

      {alert.whyItMatters && (
        <div className="why-matters">
          <div className="why-matters-header">
            <span className="ai-icon">🤖</span>
            <strong>Why this matters to you:</strong>
          </div>
          <p className="why-matters-text">{alert.whyItMatters}</p>
        </div>
      )}

      <div className="alert-footer">
        <span className="alert-location">📍 {alert.location.address}</span>
        <span className="alert-time">
          {new Date(alert.timestamp).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>

      {alert.relevanceScore && (
        <div className="relevance-bar">
          <div 
            className="relevance-fill" 
            style={{ width: `${alert.relevanceScore}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default AlertCard;
