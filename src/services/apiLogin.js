// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
// });

// // API đăng ký người dùng
// export const registerUser = (userData) => API.post('/register/', userData);

// // API đăng nhập người dùng
// export const loginUser = (userData) => API.post('/login/', userData);

// // API đăng xuất người dùng
// export const logoutUser = () => API.post('/logout/');

// // API đăng nhập với Google
// export const loginWithGoogle = (googleData) => API.post('/auth/login/google/', googleData);

// // API đăng ký với Google
// export const registerWithGoogle = (googleData) => API.post('/auth/registration/google/', googleData);

// // API lấy chi tiết sản phẩm
// export const fetchProductDetail = (productId) => API.get(`/products/${productId}/`);







import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true, // Cho phép gửi cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor để xử lý token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API đăng nhập thông thường
export const loginUser = async (userData) => {
  try {
    const response = await API.post('/login/', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Đăng nhập thất bại' };
  }
};

// API đăng ký thông thường
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/register/', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Đăng ký thất bại' };
  }
};

// API đăng nhập với Google
export const loginWithGoogle = async (googleData) => {
  try {
    const response = await API.post('/auth/google/login/', {
      token: googleData.credential
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Đăng nhập Google thất bại' };
  }
};

// API đăng ký với Google
export const registerWithGoogle = async (googleData) => {
  try {
    const response = await API.post('/auth/google/register/', {
      token: googleData.credential
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Đăng ký Google thất bại' };
  }
};

// API đăng xuất
export const logoutUser = async () => {
  try {
    const response = await API.post('/logout/');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Đăng xuất thất bại' };
  }
};