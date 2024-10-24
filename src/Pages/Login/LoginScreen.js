/** @format */

import React, { useState } from "react";
import "./LoginScreen.css";
import { Eye } from "lucide-react";
import googleIcon from "../../img/google-icon.png";
import facebookIcon from "../../img/facebook-icon.png";
// Xóa dòng import LoginScreen vì không cần thiết và gây lỗi

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h1 className='welcome-text'>
          Hi, Welcome Back! <span className='wave-emoji'>👋</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='example@gmail.com'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Mật khẩu</label>
            <div className='password-input'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                name='password'
                placeholder='Enter Your Password'
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type='button'
                className='toggle-password'
                onClick={() => setShowPassword(!showPassword)}
              >
                <Eye size={20} />
              </button>
            </div>
          </div>

          <div className='form-options'>
            <label className='remember-me'>
              <input
                type='checkbox'
                name='rememberMe'
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              Ghi nhớ đăng nhập
            </label>
            <a href='#' className='forgot-password'>
              Quên mật khẩu?
            </a>
          </div>

          <button type='submit' className='login-button'>
            Đăng nhập
          </button>
        </form>

        <div className='divider'>
          <span>Hoặc với</span>
        </div>

        <button className='social-login facebook'>
        <img
            src={ facebookIcon}
            alt='Facebook'
            className='facebook-icon' 
          />
          Đăng nhập với Facebook
        </button>

        <button className='social-login google'>
          <img
            src={ googleIcon}
            alt='Google'
            className='google-icon' 
          />
          Đăng nhập với Google
        </button>

        <p className='signup-prompt'>
          Bạn chưa có tài khoản? <a href='#'>Đăng ký </a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
