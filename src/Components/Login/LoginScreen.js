import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây
    console.log('Login data:', formData);
  };

  const handleFacebookLogin = () => {
    // Xử lý đăng nhập bằng Facebook
    console.log('Facebook login');
  };

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập bằng Google
    console.log('Google login');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Xin chào, mừng trở lại! 👋</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
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

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Ghi nhớ đăng nhập
            </label>
            <a href="#" className="forgot-password">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="primary-button">Đăng nhập</button>
        </form>

        <div className="divider">Hoặc</div>

        <button className="social-button facebook" onClick={handleFacebookLogin}>
          <i className="fab fa-facebook"></i>
          Đăng nhập với Facebook
        </button>

        <button className="social-button google" onClick={handleGoogleLogin}>
          <i className="fab fa-google"></i>
          Đăng nhập với Google
        </button>

        <p className="switch-auth">
          Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;