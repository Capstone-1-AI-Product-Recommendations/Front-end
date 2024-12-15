//Login.js

/** @format */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { loginUser } from '../../../services/apiLogin';

const Login = ({ onClose, onLoginSuccess, onRegisterClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMessage('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      console.log('Login response:', data); // Giữ lại để debug

      // Kiểm tra response có token không
      if (data?.token) {
        // Lưu token vào localStorage (đã được xử lý trong apiLogin.js)
        
        // Thực hiện các bước sau khi login thành công
        if (data.role) {
          onLoginSuccess(data.role);
        }
        
        // Đóng modal
        onClose();
        console.log("đăng nhập thành công");
        // Chuyển hướng về trang home
        navigate('/');

        // Chuyển hướng về trang home
      } else {
        setErrorMessage('Đăng nhập thất bại: Không nhận được token');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    onLoginSuccess("user");
    onClose();
    navigate("/");
  };

  const handleGoogleLoginFailure = () => {
    setErrorMessage("Đăng nhập bằng Google thất bại.");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* Close button */}
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close login modal"
          role="button"
        >
          ×
        </button>

        <h1>Xin chào bạn mới</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nhập tên đăng nhập của bạn"
              value={formData.username}
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
            <span 
              onClick={() => setShowForgotPassword(true)} 
              className="forgot-password"
              style={{ cursor: 'pointer' }}
            >
              Quên mật khẩu?
            </span>
          </div>

          <button type="submit" className="primary-button">
            Đăng nhập
          </button>
        </form>

        <div className="divider">Hoặc</div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />

        <p className="switch-auth">
          Chưa có tài khoản?{" "}
          <span className="link-register" onClick={onRegisterClick}>
            Đăng ký
          </span>
        </p>
      </div>

      {/* Hiển thị modal quên mật khẩu */}
      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;