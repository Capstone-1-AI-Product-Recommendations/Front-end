import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// API đăng ký người dùng
export const registerUser = (userData) => API.post('/register/', userData);

// API đăng nhập người dùng
export const loginUser = (userData) => API.post('/login/', userData);

// API đăng xuất người dùng
export const logoutUser = () => API.post('/logout/');

// API đăng nhập với Google
export const loginWithGoogle = (googleData) => API.post('/auth/login/google/', googleData);

// API đăng ký với Google
export const registerWithGoogle = (googleData) => API.post('/auth/registration/google/', googleData);

// API lấy chi tiết sản phẩm
export const fetchProductDetail = (productId) => API.get(`/products/${productId}/`);
