import axios from 'axios';

const API_URL = "http://localhost:8000/api";

// Create axios instance with default config
const api = axios.create({
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
// Gửi yêu cầu tạo task
export const createTask = async (userId) => {
    try {
        console.log("Creating task", userId);
        const response = await api.get(`${API_URL}/recommendations/recommendations/batch/${userId}/`);
        console.log("Lấy task thành công:", response.data.task_id);
        return response.data.task_id;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

// Kiểm tra trạng thái task
export const checkTaskStatus = async (taskId) => {
    try {
        console.log("Checking task status", taskId);
        const response = await api.get(`${API_URL}/recommendations/recommendations/batch-status/${taskId}/`);
        console.log("Task status:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error checking task status:", error);
        throw error;
    }
};
