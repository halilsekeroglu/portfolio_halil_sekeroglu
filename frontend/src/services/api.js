import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Health check
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Backend service unavailable');
    }
  },

  // Contact endpoints
  async submitContactForm(formData) {
    try {
      const response = await apiClient.post('/contact/', formData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 422) {
        throw new Error('Please check your form data and try again');
      } else if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later');
      }
      throw new Error('Failed to send message. Please try again');
    }
  },

  async getContactMessages() {
    try {
      const response = await apiClient.get('/contact/');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch contact messages');
    }
  },

  // Portfolio endpoints
  async getProjects(category = null) {
    try {
      const params = category ? { category } : {};
      const response = await apiClient.get('/portfolio/projects', { params });
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch projects from API, using mock data');
      // Return empty array instead of throwing to allow fallback to mock data
      return [];
    }
  },

  async getProject(projectId) {
    try {
      const response = await apiClient.get(`/portfolio/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch project details');
    }
  },

  async getExperience() {
    try {
      const response = await apiClient.get('/portfolio/experience');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch experience from API, using mock data');
      return [];
    }
  },

  async getTechnicalExpertise(category = null) {
    try {
      const params = category ? { category } : {};
      const response = await apiClient.get('/portfolio/expertise', { params });
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch expertise from API, using mock data');
      return [];
    }
  },

  async getPortfolioStats() {
    try {
      const response = await apiClient.get('/portfolio/stats');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch portfolio stats from API');
      return {
        total_projects: 6,
        years_experience: 4,
        google_projects: "10+",
        specialization: "CCAI & Dialogflow CX"
      };
    }
  }
};

// Utility function to check if backend is available
export const checkBackendAvailability = async () => {
  try {
    await apiService.healthCheck();
    return true;
  } catch (error) {
    console.warn('Backend is not available, using mock data');
    return false;
  }
};

export default apiService;