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
    },
    getOrders: async () => {
        try {
            const response = await API.get('/admin_dashboard/orders/');
            console.log('Fetched orders:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },
    createUser: async (userData) => {
        try {
            const response = await API.post('/admin_dashboard/users/create/', userData);
            console.log('User created:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },
    deleteUser: async (userId) => {
        try {
            const response = await API.delete(`/admin_dashboard/users/${userId}/delete/`);
            console.log('User deleted:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },
    getProducts: async () => {
        try {
            const response = await API.get('/admin_dashboard/admin/products/');
            console.log('Fetched products:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    getStatistics: async () => {
        try {
            const response = await API.get('/admin_dashboard/admin/statistics/');
            console.log('Fetched statistics:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching statistics:', error);
            throw error;
        }
    },
    exportProducts: async () => {
        try {
            const response = await API.get('/admin_dashboard/admin/products/export/', {
                responseType: 'blob',
            });
            console.log("Exported products:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error exporting products:", error);
            throw error;
        }
    },
    exportUsers: async () => {
        try {
            const response = await API.get('/admin_dashboard/admin/users/export/', {
                responseType: 'blob',
            });
            console.log("Exported users:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error exporting users:", error);
            throw error;
        }
    },
    exportOrders: async () => {
        try {
            const response = await API.get('/admin_dashboard/admin/orders/export/', {
                responseType: 'blob',
            });
            console.log("Exported orders:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error exporting orders:", error);
            throw error;
        }
    }
};

export default adminService;