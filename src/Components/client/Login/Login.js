import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginUser } from '../../../services/apiLogin';
import "./Login.css";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const Login = ({ onClose, onLoginSuccess, onRegisterClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      if (data?.token) {
        if (data.role) {
          onLoginSuccess(data.role);
        }
        onClose();
        navigate('/');
      } else {
        setErrorMessage('Đăng nhập thất bại: Không nhận được token');
      }
    } catch (error) {
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
        <button className="close-btn" onClick={onClose}>×</button>
        <h1>Xin chào bạn mới</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              name="username"
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
            >
              Quên mật khẩu?
            </span>
          </div>
          <button type="submit" className="primary-button">Đăng nhập</button>
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
      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;
