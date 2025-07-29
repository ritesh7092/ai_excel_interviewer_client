import api from './api';

export const interviewService = {
  // Start a new interview
  startInterview: async (candidateData) => {
    try {
      const response = await api.post('/api/v1/interview/start', candidateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to start interview');
    }
  },

  // Submit an answer
  submitAnswer: async (answerData) => {
    try {
      const response = await api.post('/api/v1/interview/submit-answer', answerData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to submit answer');
    }
  },

  // Get interview status
  getInterviewStatus: async (interviewId) => {
    try {
      const response = await api.get(`/api/v1/interview/${interviewId}/status`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get interview status');
    }
  },

  // Get interview report
  getInterviewReport: async (interviewId) => {
    try {
      const response = await api.get(`/api/v1/interview/${interviewId}/report`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get interview report');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/api/v1/health/');
      return response.data;
    } catch (error) {
      throw new Error('Service unavailable');
    }
  },

  // Get detailed health check
  detailedHealthCheck: async () => {
    try {
      const response = await api.get('/api/v1/health/detailed');
      return response.data;
    } catch (error) {
      throw new Error('Service unavailable');
    }
  }
};