/** @format */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpScreen.css"; // Import CSS từ file riêng
import { FaEye, FaFacebookF, FaGoogle } from "react-icons/fa";
import iconGoogle from "../../img/google-icon.png";
import iconFacebook from "../../img/facebook-icon.png";
const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='signup-container'>
      <h2 className='signup-title'>Tạo tài khoản mới</h2>
      <p className='signup-subtitle'>
        Kết nối với bạn bè của bạn ngay hôm nay!
      </p>
      <form className='signup-form'>
        <input type='text' placeholder='Nhập tên đăng nhập' />
        <input type='email' placeholder='Nhập email' />
        <input type='tel' placeholder='Nhập số điện thoại' />
        <input type='password' placeholder='Nhập mật khẩu' />

        <button type='submit'>Đăng ký</button>

        <div className='signup-or'>Hoặc đăng ký bằng</div>

        <button className='facebook-button '>
          <img src={iconFacebook} alt='Description' />
          <span>Đăng ký bằng Facebook</span>
        </button>
        <button className='google-button'>
          <img src={iconGoogle} alt='Description' />{" "}
          <span> Đăng ký bằng Google</span>
        </button>

        <div className='login-link'>
          Đã có tài khoản? <Link to='/login'>Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpScreen;
