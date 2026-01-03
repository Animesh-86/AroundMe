import React, { useState, useEffect } from 'react';
import ContextInput from './components/ContextInput';
import AlertFeed from './components/AlertFeed';
import SubmitAlert from './components/SubmitAlert';
import { alertService } from './services/api';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [totalAnalyzed, setTotalAnalyzed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await alertService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback categories
      setCategories(['TRAFFIC', 'WEATHER', 'EVENTS', 'SAFETY', 'ROAD_WORK', 
                     'PUBLIC_TRANSPORT', 'EMERGENCY', 'COMMUNITY', 'OTHER']);
    }
  };

  const handleSearch = async (userContext) => {
    setLoading(true);
    setError(null);

    try {
      const response = await alertService.getCuratedAlerts(userContext);
      setAlerts(response.alerts);
      setAiSummary(response.aiSummary);
      setTotalAnalyzed(response.totalAlertsAnalyzed);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('Failed to fetch alerts. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAlert = async (alertData) => {
    try {
      await alertService.submitAlert(alertData);
      // Optionally refresh alerts
    } catch (err) {
      console.error('Error submitting alert:', err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="logo-icon">🎯</span>
            AroundMe
          </h1>
          <p className="app-tagline">AI-Curated Hyperlocal Contextual Alerts</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Context Input Section */}
          <ContextInput onSearch={handleSearch} categories={categories} />

          {/* Error Display */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Alert Feed Section */}
          <AlertFeed 
            alerts={alerts}
            aiSummary={aiSummary}
            loading={loading}
            totalAnalyzed={totalAnalyzed}
          />

          {/* Submit Alert Section */}
          <SubmitAlert onSubmit={handleSubmitAlert} categories={categories} />
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Powered by OpenAI • Built for Hackathon 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
