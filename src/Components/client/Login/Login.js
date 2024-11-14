/** @format */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Use jwtDecode correctly
import "./Login.css";

const Login = ({ onClose, onLoginSuccess, onRegisterClick }) => {
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
    // Định nghĩa các tài khoản giả lập cho từng vai trò
    const admin = {
      email: "admin@gmail.com",
      password: "123456",
    };

    const seller = {
      email: "seller@gmail.com",
      password: "123456",
    };

    const user = {
      email: "user@gmail.com",
      password: "123456",
    };

    if (formData.email === admin.email && formData.password === admin.password) {
      console.log("Logged in as admin");
      onLoginSuccess("admin");
      setErrorMessage("");
      onClose();
      navigate("/admin"); // Điều hướng tới trang admin
    } else if (
      formData.email === seller.email &&
      formData.password === seller.password
    ) {
      console.log("Logged in as seller");
      onLoginSuccess("seller");
      setErrorMessage("");
      onClose();
      navigate("/"); // Điều hướng tới trang seller
    } else if (
      formData.email === user.email &&
      formData.password === user.password
    ) {
      console.log("Logged in as user");
      onLoginSuccess("user");
      setErrorMessage("");
      onClose();
      navigate("/"); // Điều hướng tới trang user
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

  // Thêm hàm để mở modal đăng ký khi người dùng nhấn vào "Chưa có tài khoản?"
  const handleShowRegister = () => {
    if (onRegisterClick) {
      onRegisterClick(); // Gọi hàm từ component cha để mở modal đăng ký
    }
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
            <a href="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </a>
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
          <span className="link-register" onClick={handleShowRegister}>
            Đăng ký
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
