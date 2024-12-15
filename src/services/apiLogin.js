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
    // Log để debug
    console.log('API sending data:', userData);
    
    const response = await API.post('/login/', userData);
    console.log('API response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('API login error:', error.response?.data || error);
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