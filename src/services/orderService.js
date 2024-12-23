import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
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

const clearCartItems = (callback) => {
    localStorage.removeItem('cartData');
    if (typeof callback === 'function') {
        callback();
    } else {
        console.error('callback is not a function');
    }
};

const orderService = {
    createOrder: async (userId, cartItemIds) => {
        try {
            const response = await API.post(`/api/order/create_order/${userId}/`, {
                cart_item_ids: cartItemIds
            });
            console.log('Order created:', response.data);
            console.log('Cart item:', cartItemIds);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error.response?.data || error.message);
            throw error;
        }
    },

    processCODPayment: async (userId, orderId, shippingAddressId, amount, updateCartCount) => {
        try {
            const response = await API.post(`/api/payment/cod/${userId}/${orderId}/`, {
                shipping_address_id: shippingAddressId,
                amount: amount
            });
            console.log('COD payment processed:', response.data);
            clearCartItems(updateCartCount); // Clear cart items and update cart count
            return response.data;
        } catch (error) {
            console.error('Error processing COD payment:', error);
            throw error;
        }
    },

    processPayOSPayment: async (userId, orderId, shippingAddressId, amount, updateCartCount) => {
        try {
            const response = await API.post(`/api/payos_payment/${userId}/${orderId}/`, {
                shipping_address_id: shippingAddressId,
                amount: amount
            });
            // console.log('PayOS payment initiated:', response.data);
            clearCartItems(updateCartCount); // Clear cart items and update cart count
            return response.data;
        } catch (error) {
            console.error('Error initiating PayOS payment:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default orderService;