/** @format */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const Login = ({ onClose, onLoginSuccess, onRegisterClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
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
    setErrorMessage("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const accounts = {
      admin: { email: "admin@gmail.com", password: "123456" },
      seller: { email: "seller@gmail.com", password: "123456" },
      user: { email: "user@gmail.com", password: "123456" },
    };

    if (
      formData.email === accounts.admin.email &&
      formData.password === accounts.admin.password
    ) {
      onLoginSuccess("admin");
      onClose();
    } else if (
      formData.email === accounts.seller.email &&
      formData.password === accounts.seller.password
    ) {
      onLoginSuccess("seller");
      onClose();
    } else if (
      formData.email === accounts.user.email &&
      formData.password === accounts.user.password
    ) {
      onLoginSuccess("user");
      onClose();
    } else {
      setErrorMessage("Email hoặc mật khẩu không chính xác.");
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    onLoginSuccess('user');
    onClose();
    navigate('/register-seller');
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
