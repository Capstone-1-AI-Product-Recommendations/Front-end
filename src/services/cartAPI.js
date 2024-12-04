import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// API lấy toàn bộ giỏ hàng
export const getCart = () => API.get('/cart/');

// API thêm sản phẩm vào giỏ hàng
export const addToCart = (productData) => API.post('/cart/', productData);

// API cập nhật số lượng sản phẩm
export const updateQuantity = (productId, quantity) => API.put(`/cart/${productId}/`, { quantity });

// API xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (productId) => API.delete(`/cart/${productId}/`);

// API xóa toàn bộ giỏ hàng
export const clearCart = () => API.delete('/cart/');