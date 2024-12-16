//apiLogin.js

import axios from 'axios';
// import {handleLoginSuccess} from "../Router";
import cartService from './cartService'; // Change import to default
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

// Function to get user behavior from local storage
const getUserBehavior = () => {
  return localStorage.getItem('userBehavior');
};

// API for user login
export const loginUser = async (userData) => {
  try {
    const userBehavior = getUserBehavior();
    const requestData = userBehavior ? { ...userData, userBehavior } : userData;
    const response = await API.post('/login/', requestData);
    
    // Save token and user data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    // Initialize cart after successful login using user.user_id
    const userId = response.data.user.user_id;    
    
    if (userId) {
      await cartService.getCart(userId);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// API for user registration
export const registerUser = async (userData, onSuccess) => {
  try {
    const userBehavior = getUserBehavior();
    const requestData = userBehavior ? { ...userData, userBehavior } : userData;
    console.log('Request data:', requestData);
    const response = await API.post('/register/', requestData);
    console.log(response.data);
    
    // Call success callback if provided
    if (onSuccess) {
      onSuccess();
    }
    
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error.response?.data || { message: 'Đăng ký thất bại' };
  }
};