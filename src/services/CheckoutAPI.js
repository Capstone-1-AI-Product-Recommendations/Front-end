// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
// });

// // API lấy thông tin checkout
// export const getCheckoutInfo = () => API.get('/checkout/');

// // API tạo đơn hàng mới
// export const createOrder = (orderData) => API.post('/orders/', orderData);

// // API cập nhật địa chỉ giao hàng
// export const updateShippingAddress = (addressData) => API.put('/checkout/address/', addressData);

// // API cập nhật phương thức vận chuyển
// export const updateShippingMethod = (shippingData) => API.put('/checkout/shipping/', shippingData);

// // API lấy danh sách địa chỉ của user
// export const getUserAddresses = () => API.get('/user/addresses/');

// // API lấy danh sách phương thức vận chuyển có sẵn
// export const getShippingMethods = () => API.get('/shipping-methods/'); 