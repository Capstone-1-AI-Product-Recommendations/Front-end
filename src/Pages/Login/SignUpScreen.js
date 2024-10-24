/** @format */

import React, { useState } from "react";
import "./SignUpScreen.css";
import { Eye } from "lucide-react";
import googleIcon from "../../img/google-icon.png";
import facebookIcon from "../../img/facebook-icon.png";
const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className='signup-container'>
      <div className='signup-form'>
        <h1 className='title'>
          Tạo tài khoản
        </h1>
        <p className='subtitle'>Kết nối với bạn bè ngay hôm nay!</p>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Nhập tên người dùng'
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Nhập email của bạn'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              placeholder='Nhập số điện thoại'
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className='form-group'>
            <div className='password-input'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                name='password'
                placeholder='Nhập mật khẩu'
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

          <button type='submit' className='signup-button'>
            Đăng ký
          </button>
        </form>

        <div className='divider'>
          <span>Hoặc đăng ký với</span>
        </div>

        <button className='social-signup facebook'>
        <img
            src= {facebookIcon}
            alt='Facabook'
            className='facebook-icon'
          />
          Đăng ký với Facebook
        </button>

        <button className='social-signup google'>
          <img
            src= {googleIcon}
            alt='Google'
            className='google-icon'
          />
          Đăng ký với Google
        </button>

        <p className='login-prompt'>
          Đã có tài khoản? <a href='#'>Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpScreen;
