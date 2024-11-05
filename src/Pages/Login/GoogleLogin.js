/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GoogleLogin.css";
import googleIcon from "../../img/google-icon.png"; // Adjust the path as needed
import { FaCaretDown } from "react-icons/fa";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/");
  };
  return (
    <div className='google-login-container'>
      <header className='login-header'>
        <img src={googleIcon} alt='Google icon' className='google-icon' />
        <span>Đăng nhập bằng Google</span>
      </header>

      <main className='main-content'>
        <img src={googleIcon} alt='Google' className='google-logo' />

        <h1>Đăng nhập vào Shopee</h1>

        <div className='email-selector'>
          <img src={googleIcon} alt='Google' className='selector-google-icon' />
          <span className='email'>manhphan27092003@gmail.com</span>
          <div>
            <FaCaretDown className='dropdown-icon' onClick={handleSignup} />
          </div>
        </div>

        <p className='privacy-notice'>
          Nếu bạn tiếp tục, Google sẽ chia sẻ tên, địa chỉ email, lựa chọn ưu
          tiên về ngôn ngữ và ảnh hồ sơ của bạn với Shopee. Hãy xem{" "}
          <a href='#' className='blue-link'>
            Chính sách quyền riêng tư
          </a>{" "}
          và{" "}
          <a href='#' className='blue-link'>
            Điều khoản dịch vụ
          </a>{" "}
          của Shopee.
        </p>

        <p className='account-manage'>
          Bạn có thể quản lý tính năng Đăng nhập bằng Google trong{" "}
          <a href='#' className='blue-link'>
            Tài khoản Google
          </a>{" "}
          của mình.
        </p>

        <div className='button-group'>
          <button className='btn-cancel'>Hủy</button>
          <button className='btn-continue' onClick={handleSignup}>
            Tiếp tục
          </button>
        </div>
      </main>

      <footer className='footer'>
        <div className='language-select'>
          <select>
            <option>Tiếng Việt</option>
          </select>
        </div>
        <div className='footer-links'>
          <a href='#'>Trợ giúp</a>
          <a href='#'>Quyền riêng tư</a>
          <a href='#'>Điều khoản</a>
        </div>
      </footer>
    </div>
  );
};

export default GoogleLogin;
