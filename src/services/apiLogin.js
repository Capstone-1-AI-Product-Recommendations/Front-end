//apiLogin.js

import axios from 'axios';
// import {handleLoginSuccess} from "../Router";
import cartService from './cartService'; // Change import to default
const API = axios.create({
  withCredentials: true, // Allow sending cookies
  baseURL: 'http://127.0.0.1:8000/api',
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
    console.log('Login response:', response.headers.cookie);
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

export const logoutUser = async (userId) => {
  try {
    const response = await API.post(`/logout/${userId}/`);
    console.log('Logout response:', response);
    // Clear token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // localStorage.removeItem('cartData');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
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

// API to fetch user notifications
export const fetchUserNotifications = async (userId) => {
  try {
    const response = await API.get(`/user/${userId}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// API to update notification status
export const updateNotificationStatus = async (userId, notificationId) => {
  try {
    console.log('Notification status updated:', notificationId);
    const response = await API.put(`/user/${userId}/notifications/update/`, { notification_id: notificationId });
    return response.data;
  } catch (error) {
    console.error('Error updating notification status:', error);
    throw error;
  }
};

// API to fetch user information
export const fetchUserInfo = async (userId) => {
  try {
    console.log('Fetching user info:', userId);
    const response = await API.get(`/user/${userId}/info/`);
    console.log('User info:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// API to update user information
export const updateUserInfo = async (userId, userData) => {
  try {
    const response = await API.put(`/user/${userId}/info/update/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

// API to fetch user orders
export const fetchUserOrders = async (userId) => {
  try {
    const response = await API.get(`/user/${userId}/orders/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};