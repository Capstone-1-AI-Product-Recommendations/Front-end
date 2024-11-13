/** @format */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode"; // Use jwtDecode correctly
import "./Login.css";

const Login = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "123@gmail.com" && formData.password === "123") {
      if (onLoginSuccess) onLoginSuccess();
      if (onClose) onClose();
      navigate("/");
    } else {
      setErrorMessage("Email hoặc mật khẩu không chính xác.");
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("Google login success:", decoded);
    if (onLoginSuccess) onLoginSuccess();
    if (onClose) onClose();
    navigate("/");
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed:", error);
    setErrorMessage("Đăng nhập bằng Google thất bại.");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <button className="close-btn" onClick={onClose}>
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
            <Link to="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </Link>
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
          Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
