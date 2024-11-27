import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// API kiểm tra email và gửi mã xác thực
export const sendVerificationCode = (email) => 
  API.post('/forgot-password/send-code/', { email });

// API xác thực mã
export const verifyCode = (email, verificationCode) => 
  API.post('/forgot-password/verify-code/', { 
    email, 
    verificationCode 
  });

// API đặt lại mật khẩu mới
export const resetPassword = (email, newPassword) => 
  API.post('/forgot-password/reset-password/', {
    email,
    newPassword
  });

// API gửi lại mã xác thực
export const resendVerificationCode = (email) => 
  API.post('/forgot-password/resend-code/', { email }); 