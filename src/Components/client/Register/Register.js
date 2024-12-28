//Register.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { GoogleLogin } from "@react-oauth/google";
import { registerUser } from "../../../services/apiLogin";

const Register = ({ onClose, onLoginClick }) => { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { username, password } = formData;
    if (!username || !password) {
      setErrorMessage("Tên người dùng và mật khẩu không được để trống.");
      return false;
    }
    if (username.length > 16) {
      setErrorMessage("Tên người dùng không được vượt quá 16 ký tự.");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = await registerUser(formData);
      console.log('User registered successfully:', data);
      
      setSuccessMessage("Chúc mừng bạn đã đăng ký thành công!");
      setErrorMessage("");

      setTimeout(() => {
        if (onLoginClick) {
          onLoginClick();
        } else {
          navigate('/login');
        }
      }, 2000);

    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage(error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
      setSuccessMessage("");
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    navigate('/');
    if (onClose) onClose();
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h1>Tạo tài khoản</h1>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

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
