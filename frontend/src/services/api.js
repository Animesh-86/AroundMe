import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const alertService = {
  // Get AI-curated alerts
  getCuratedAlerts: async (userContext) => {
    const response = await api.post('/alerts/curated', userContext);
    return response.data;
  },

  // Submit new alert
  submitAlert: async (alertData) => {
    const response = await api.post('/alerts/submit', alertData);
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    const response = await api.get('/alerts/categories');
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/alerts/health');
    return response.data;
  }
};

export default api;
