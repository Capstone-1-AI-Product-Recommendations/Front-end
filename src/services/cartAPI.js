// src/services/cartAPI.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Đảm bảo đây là đúng URL của backend
});

// API để lấy giỏ hàng
export const fetchCart = () => API.get('/cart');

// API để thêm sản phẩm vào giỏ hàng
export const addToCart = (product) => API.post('/cart', { product });

// API để cập nhật số lượng sản phẩm trong giỏ hàng
export const updateQuantity = (productId, quantity) =>
  API.put(`/cart/${productId}`, { quantity });

// API để xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (productId) => API.delete(`/cart/${productId}`);

// API để xóa tất cả sản phẩm khỏi giỏ hàng
export const removeAllItems = () => API.delete('/cart');
