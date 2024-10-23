/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginScreen.css"; // Import CSS từ file riêng
// import { ReactComponent as EyeIcon } from "./icons/eye-icon.svg"; // Đường dẫn tới icon hình con mắt
import { FaEye, FaFacebookF, FaGoogle } from "react-icons/fa"; // Import các icons cần thiết

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-container'>
      <h3 className='login-title'>Chào mừng bạn trở lại! 👋</h3>
      <form className='login-form'>
        <div className='form-group'>
          <label>Email</label>
          <input type='email' placeholder='Nhập email' />
        </div>

        <div className='form-group password-group'>
          <label>Mật khẩu</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Mật khẩu'
          />
          <FaEye onClick={togglePasswordVisibility} className='password-icon' />
        </div>

        <div className='form-group credentials-group'>
          <div className='checkbox-group'>
            <input type='checkbox' id='rememberMe' />
            <label htmlFor='rememberMe'>Ghi nhớ đăng nhập</label>
          </div>
          <span className='forgot-password'>Quên mật khẩu?</span>
        </div>

        <button type='submit' className='login-button'>
          Đăng nhập
        </button>

        <div className='login-or'>Hoặc đăng nhập bằng</div>

        <button className='mb-3 facebook-button'>
          <FaFacebookF /> <span>Đăng nhập bằng Facebook</span>
        </button>
        <button className='google-button'>
          <FaGoogle /> Đăng nhập bằng Google
        </button>
      </form>

      <div className='signup-link'>
        Chưa có tài khoản? <Link to='/signup'>Đăng ký ngay</Link>
      </div>
    </div>
  );
};

export default LoginScreen;
