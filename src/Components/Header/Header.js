/** @format */

import React from "react";
import "./Header.css";
import logo from "../../assets/logo.png"; // Đảm bảo bạn có một logo để sử dụng
import { FaUser, FaBell, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import hook useNavigate
import { FaCaretDown } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header className='header'>
      <div className='top-bar'>
        <ul className='top-links'>
          <li onClick={handleHomeClick}>Về chúng tôi</li>{" "}
          {/* Assuming you want to navigate home on clicking this */}
          <li>Tài khoản của tôi</li>
          <li>Danh sách mong muốn</li>
          <li>Trở thành người bán</li>
          <li>Hỗ trợ</li>
        </ul>
      </div>
      <div className='main-header'>
        <div className='logo'>
          <img src={logo} alt='ADSmart Logo' />
          <span>ADSmart</span>
        </div>
        <div className='location'>
          <span>Giao hàng đến</span>
          <select>
            <option value='all'>Tất cả</option>
          </select>
        </div>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Tìm kiếm sản phẩm, danh mục hoặc thương hiệu...'
          />
          <button>🔍</button>
        </div>
        <div className='account-icons'>
          <FaUser className='icon' />
          <span>Tài khoản</span>
          <FaBell className='icon' />
          <span className='notification-count'>0</span>
          <FaShoppingCart className='icon' />
          <span className='cart-count'>0</span>
        </div>
      </div>
      <nav className='nav-links d-flex align-items-center'>
        <a className='home-link' onClick={handleHomeClick}>
          Trang chủ <FaCaretDown />
        </a>
        <a href='/store'>
          Cửa hàng <FaCaretDown />
        </a>
        <a href='/fashion'>Thời trang</a>
        <a href='/electronics'>Đồ điện tử</a>
        <a href='/discounts'>Mã giảm giá</a>
        <a href='/contact'>Liên hệ</a>
      </nav>
    </header>
  );
};

export default Header;
