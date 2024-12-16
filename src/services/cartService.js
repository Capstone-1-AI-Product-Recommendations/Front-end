import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Tạo instance axios với cấu hình chung
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để xử lý token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const cartService = {
  // Lấy thông tin giỏ hàng của user và lưu vào local storage
  getCart: async (userId) => {
    try {
      const response = await api.get(`/cart/${userId}/`);
      // Lưu dữ liệu giỏ hàng vào local storage
      localStorage.setItem('cartData', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Thêm sản phẩm vào giỏ hàng
  addItemToCart: async (userId, item) => {
    try {
      const response = await axios.post(`${API_URL}/cart/${userId}/`, item);
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (userId, productData) => {
    try {
      const response = await api.post(`/cart/add/${userId}/`, productData);
      localStorage.setItem('cartData', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update cart item quantity
  updateItemInCart: async (userId, cartItemData) => {
    try {
      const response = await api.put(`/cart/update/${userId}/`, {
        cart_item_id: cartItemData.cart_item_id,
        quantity: cartItemData.quantity
      });
      console.log("Update cart", response.data);
      // Update localStorage with new cart data
      if (response.data) {
        localStorage.setItem('cartData', JSON.stringify(response.data));
        // Trigger cart update event
        window.dispatchEvent(new Event('cartUpdated'));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  // Xóa một sản phẩm khỏi giỏ hàng
  removeItemFromCart: async (userId, cartItemId) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/remove/${userId}/${cartItemId}/`);
      return response.data;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async (userId) => {
    try {
      const response = await api.delete(`/cart/clear/${userId}/`);
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Initialize cart after login
  initializeCart: async (userId) => {
    try {
      const response = await api.get(`/cart/${userId}/`);
      localStorage.setItem('cartData', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error initializing cart:', error);
      throw error;
    }
  }
};

export default cartService;