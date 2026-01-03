import React from 'react';
import AlertCard from './AlertCard';
import './AlertFeed.css';

const AlertFeed = ({ alerts, aiSummary, loading, totalAnalyzed }) => {
  if (loading) {
    return (
      <div className="alert-feed">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h3>🤖 AI is analyzing city signals...</h3>
          <p>Correlating traffic, weather, events, and safety data</p>
        </div>
      </div>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <div className="alert-feed">
        <div className="empty-state">
          <div className="empty-icon">🎯</div>
          <h3>No alerts yet</h3>
          <p>Enter your location and preferences to get AI-curated alerts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="alert-feed">
      {/* AI Summary Section */}
      {aiSummary && (
        <div className="ai-summary">
          <div className="summary-header">
            <span className="summary-icon">🤖</span>
            <h3>AI Situational Summary</h3>
          </div>
          <p className="summary-text">{aiSummary}</p>
          <div className="summary-stats">
            <span>📊 Analyzed {totalAnalyzed} signals</span>
            <span>✨ Found {alerts.length} relevant alerts</span>
          </div>
        </div>
      )}

      {/* Alert Statistics */}
      <div className="alert-stats">
        <h2>📍 Alerts Around You</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{alerts.length}</span>
            <span className="stat-label">Curated Alerts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {alerts.filter(a => a.impact === 'HIGH').length}
            </span>
            <span className="stat-label">High Priority</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {alerts.filter(a => a.impact === 'MEDIUM').length}
            </span>
            <span className="stat-label">Medium Priority</span>
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="alerts-container">
        {alerts.map((alert, index) => (
          <AlertCard key={alert.id || index} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertFeed;
