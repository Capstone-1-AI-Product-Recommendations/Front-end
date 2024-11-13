/** @format */
// Register.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const Register = ({ onLoginSuccess, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây
    console.log('Dữ liệu đăng ký:', formData);
  };

  const handleGoogleLoginSuccess = (response) => {
    try {
      const decoded = jwtDecode(response.credential); // Sử dụng jwtDecode để giải mã JWT
      console.log("Đăng nhập Google thành công:", decoded);

      // Gọi hàm xử lý khi đăng nhập thành công
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        console.error("Hàm onLoginSuccess chưa được định nghĩa");
      }

      if (onClose) {
        onClose();
      }

      navigate("/");
    } catch (error) {
      console.error("Lỗi khi giải mã JWT:", error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Đăng nhập Google thất bại:", error);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
      <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h1>Tạo tài khoản</h1>
        <p className="subtitle">Kết nối với bạn bè ngay hôm nay!</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên người dùng</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nhập tên người dùng"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại của bạn"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="primary-button">Đăng ký</button>
        </form>

        <div className="divider">Hoặc</div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />

        <p className="switch-auth">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
