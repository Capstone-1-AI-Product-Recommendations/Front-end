/** @format */
// Login.js


// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const SignUpScreen = () => {
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
    console.log('Signup data:', formData);
  };

  const handleFacebookSignup = () => {
    // Xử lý đăng ký bằng Facebook
    console.log('Facebook signup');
  };

  const handleGoogleSignup = () => {
    // Xử lý đăng ký bằng Google
    console.log('Google signup');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
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

        <button className="social-button facebook" onClick={handleFacebookSignup}>
          <i className="fab fa-facebook"></i>
          Đăng ký với Facebook
        </button>

        <button className="social-button google" onClick={handleGoogleSignup}>
          <i className="fab fa-google"></i>
          Đăng ký với Google
        </button>

        <p className="switch-auth">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpScreen;