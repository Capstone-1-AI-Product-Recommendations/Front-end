import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000',  // Remove /api from baseURL
    withCredentials: true, // Allow sending cookies
    headers: {
        'Content-Type': 'application/json',
    }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const adminService = {
    getUsers: async () => {
        try {
            const response = await API.get('/admin_dashboard/users/'); // URL now matches backend
            console.log('Fetched users:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
};

export default adminService;