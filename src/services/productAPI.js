// src/services/productAPI.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Đảm bảo rằng đây là cổng đúng của backend
});

// API để lấy chi tiết sản phẩm
export const fetchProduct = (productId) => API.get(`/products/${productId}`);

// API để thêm sản phẩm vào giỏ hàng
export const addToCart = (product) => API.post('/cart', { product });
