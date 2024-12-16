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


const addressService = {
    getUserAddresses: async (userId) => {
        try {
            const response = await API.get(`/api/user/${userId}/addresses/`);
            // Update localStorage with fresh data
            localStorage.setItem('userAddresses', JSON.stringify(response.data.addresses));
            return response.data;
        } catch (error) {
            console.error('Error in getUserAddresses:', error);
            throw error;
        }
    },

    updateUserAddress: async (userId, addressData) => {
        try {
            const response = await API.put(`/api/order/update_shipping/${userId}/`, {
                id: addressData.id,
                recipient_name: addressData.recipient_name,
                recipient_phone: addressData.recipient_phone,
                recipient_address: addressData.recipient_address,
                is_default: addressData.is_default
            });

            // After successful update, fetch fresh addresses
            const updatedAddresses = await addressService.getUserAddresses(userId);
            return updatedAddresses;
        } catch (error) {
            console.error('Error updating address:', error.response?.data || error.message);
            throw error;
        }
    },
    addUserAddress: async (userId, addressData) => {
        try {
            const response = await API.post(`/api/user/${userId}/address/add/`, {
                recipient_name: addressData.recipient_name,
                recipient_phone: addressData.recipient_phone,
                recipient_address: addressData.recipient_address,
                is_default: addressData.is_default
            });

            // After successful add, fetch fresh addresses
            const updatedAddresses = await addressService.getUserAddresses(userId);
            return updatedAddresses;
        } catch (error) {
            console.error('Error adding address:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default addressService;