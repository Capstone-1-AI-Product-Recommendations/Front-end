import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const productService = {
  searchProducts: async (searchTerm) => {
    try {
      const response = await api.get('/search_products/', {
        params: { search_term: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
  
  getProductDetails: async (productId) => {
    try {
      const response = await api.get(`/products/detail/${productId}/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with error
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        // Request made but no response
        console.error('Network error:', error.request);
      } else {
        // Other errors
        console.error('Error:', error.message);
      }
      throw error;
    }
  }
};

export default productService;