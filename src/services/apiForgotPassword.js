import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Gửi yêu cầu reset password
export const requestPasswordReset = async (email) => {
  try {
    const response = await API.post('/forgot_password/', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Có lỗi xảy ra khi gửi yêu cầu' };
  }
};

// Xác thực mã code
export const verifyResetCode = async (email, code) => {
  try {
    const response = await API.post('/verify_reset_code/', { 
      email: email,
      verification_code: code
    });
    return response.data;
  } catch (error) {
    console.log('Error response:', error.response?.data);
    throw error.response?.data || { message: 'Mã xác thực không hợp lệ' };
  }
};

// Reset password mới
export const resetPassword = async (email, newPassword, confirmPassword) => {
  try {
    const response = await API.post('/new_password/', {
      email,
      new_password: newPassword,
      confirm_password: confirmPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Không thể đặt lại mật khẩu' };
  }
}; 