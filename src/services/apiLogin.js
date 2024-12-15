//apiLogin.js

import axios from 'axios';
// import {handleLoginSuccess} from "../Router";

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true, // Allow sending cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor to handle token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API for user login
export const loginUser = async (userData) => {
  try {
    const response = await API.post('/login/', userData);
    if (response.data.token) {
      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.token);
      
      // Nếu có thông tin user, lưu thêm
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // handleLoginSuccess(userData.role);
      }
      
      console.log('Token saved:', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('API login error:', error);
    throw error.response?.data || { message: 'Đăng nhập thất bại' };
  }
};


// API for user registration
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/register/', userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error.response?.data || { message: 'Đăng ký thất bại' };
  }
};