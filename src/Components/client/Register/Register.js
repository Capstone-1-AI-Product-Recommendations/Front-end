import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { GoogleLogin } from "@react-oauth/google";

const Register = ({ onClose, onLoginClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering:", formData);
    navigate('/register-seller');
    if (onClose) onClose();
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    navigate('/register-seller');
    if (onClose) onClose();
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h1>Tạo tài khoản</h1>
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
          <button type="submit" className="primary-button">
            Đăng ký
          </button>
        </form>
        <div className="divider">Hoặc</div>
        <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
        <p className="switch-auth">
          Đã có tài khoản?{" "}
          <span className="link-login" onClick={onLoginClick}>
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
