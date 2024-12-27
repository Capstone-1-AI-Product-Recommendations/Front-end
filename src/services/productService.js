import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

// Create axios instance with default config
const api = axios.create({
  withCredentials: true,
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
      const response = await api.get('api/search_products/', {
        params: { search_term: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  getTopSubCategories: async () => {
    try {
      const response = await api.get('/api/top-subcategories/');
      console.log('Top subcategories:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching top subcategories:', error.response?.data || error.message);
      throw error;
    }
  },

  getProductDetails: async (productId) => {
    try {
      const response = await api.get(`api/products/detail/${productId}/`);
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
  },

  getSubCategories: async () => {
    try {
      const response = await api.get('/products/sub-categories/');
      console.log('Sub-categories:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching sub-categories:', error.response?.data || error.message);
      throw error;
    }
  },

  filterProducts: async (filters) => {
    try {
      const queryParams = new URLSearchParams();
      // Add search term
      if (filters.searchTerm) {
        queryParams.append('search_term', filters.searchTerm);
        console.log('Search term:', filters.searchTerm);
      }

      // Add multiple subcategories
      if (filters.subcategories && filters.subcategories.length) {
        filters.subcategories.forEach(subcategory => {
          queryParams.append('subcategory', subcategory);
          console.log('Subcategory:', subcategory);
        });
      }

      // Add multiple cities
      if (filters.cities && filters.cities.length) {
        filters.cities.forEach(city => {
          queryParams.append('city', city);
        });
      }

      // Add price range
      if (filters.minPrice !== null) {
        queryParams.append('min_price', filters.minPrice);
      }
      if (filters.maxPrice !== null) {
        queryParams.append('max_price', filters.maxPrice);
      }

      // Add rating
      if (filters.rating) {
        queryParams.append('rating', filters.rating);
      }

      const response = await api.get(`/api/search/?${queryParams.toString()}`);
      console.log(`/api/search/?${queryParams.toString()}`);

      return response.data;
    } catch (error) {
      console.error('Error filtering products:', error);
      throw error;
    }
  },

  filterSubcategory: async (subcategory) => {
    try {
      const response = await api.get('/products/filter/subcategory/', {
        params: { subcategory }
      });
      console.log('Filtered subcategory:', response.data);
      return { products: response.data, subcategory }; // Include subcategory in the response
    } catch (error) {
      console.error('Error filtering subcategory:', error);
      throw error;
    }
  },

  getComments: async (productId) => {
    try {
      const response = await api.get(`products/product/${productId}/comments/`);
      console.log('Product comments:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching product comments:', error);
      throw error;
    }
  }
};

export default productService;