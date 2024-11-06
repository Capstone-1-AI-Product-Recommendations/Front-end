/** @format */
import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import product from "../../img/newProduct.png";
import CartDropdown from "../ADShop/CartDropdown";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = [
    {
      id: 1,
      name: "Nước giặt Be Clean CH45 hương cỏ",
      price: 475400,
      image: product,
    },
    {
      id: 2,
      name: "Tẩy mốc siêu sạch Ecogy tẩy sạch",
      price: 69000,
      image: product,
    },
    {
      id: 3,
      name: "Bột Tẩy Quần Áo Màu, Đánh Bay Vết",
      price: 35000,
      image: product,
    },
    {
      id: 4,
      name: "Serum Torriden Dive In Tinh chất d",
      price: 215000,
      image: product,
    },
    {
      id: 5,
      name: "[Chuẩn Thái] Hũ Hit Thông Mũi Thái",
      price: 50000,
      image: product,
    },
  ];

  const [showCartDropdown, setShowCartDropdown] = useState(false);

  // Định nghĩa hàm handleCartClick để điều hướng đến trang giỏ hàng
  const handleCartClick = () => {
    navigate("/ADSmartCart");
  };
  const handleVendorClick = () => {
    navigate("/vendor");
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleAccountClick = () => {
    navigate("/login");
  };
  const handleCartIconHover = () => {
    setShowCartDropdown(true);
  };

  const handleCartIconLeave = () => {
    setShowCartDropdown(false);
  };

  return (
    <div className='menu-container'>
      <header className='header'>
        <div className='top-bar'>
          <ul className='top-links'>
            <li onClick={handleHomeClick}>Về chúng tôi</li>
            <li>Tài khoản của tôi</li>
            <li>Danh sách mong muốn</li>
            <li onClick={handleVendorClick}>Trở thành người bán</li>
            <li>Hỗ trợ</li>
          </ul>
        </div>
        <div className='main-header'>
          <div className='logo' onClick={handleHomeClick}>
            <img src={logo} alt='ADSmart Logo' />
            <span>ADSmart</span>
          </div>
          <div className='location-wrapper'>
            <span>Giao hàng đến</span>
            <div className='location'>
              tất cả <FaCaretDown />
            </div>
          </div>
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Tìm kiếm sản phẩm, danh mục hoặc thương hiệu...'
            />
            <button>🔍</button>
          </div>
          <div className='account-section'>
            <div className='user-account'>
              <FaUser className='icon' />
              <div className='account-text' onClick={handleAccountClick}>
                <span>Đăng nhập</span>
                <span>Tài khoản</span>
              </div>
            </div>
            <div className='notification'>
              <IoMdNotificationsOutline className='icon' />
              <span className='badge'>10</span>
            </div>
            <div
              className='cart'
              onMouseEnter={handleCartIconHover}
              onMouseLeave={handleCartIconLeave}
            >
              <BsCart2 className='icon' onClick={handleCartClick} />
              <span className='badge'>{cartItems.length}</span>{" "}
              {/* Hiển thị số lượng giỏ hàng */}
              {showCartDropdown && <CartDropdown />}
            </div>
          </div>
        </div>
        <nav className='nav-menu'>
          <a className='nav-link active' onClick={handleHomeClick}>
            Trang chủ <FaCaretDown />
          </a>
          <a className='nav-link' href='/store'>
            Cửa hàng <FaCaretDown />
          </a>
          <a className='nav-link' href='/fashion'>
            Thời trang
          </a>
          <a className='nav-link' href='/electronics'>
            Đồ điện tử
          </a>
          <a className='nav-link' href='/discounts'>
            Mã giảm giá
          </a>
          <a className='nav-link' href='/contact'>
            Liên hệ
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
