/** @format */
import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoginScreen from "../../../Components/client/Login/LoginScreen";
import CartDropdown from "../Cart/CartDropdown" // Import CartDropdown
import { NavLink } from "react-router-dom";
import product from "../../../img/newProduct.png";
import "./HeaderNoLogin.css";
import cartItems from "../../../data/cartItems";
const HeaderNoLogin = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false); // State để hiển thị CartDropdown

  const navigate = useNavigate();

  const handleAccountClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleVendorClick = () => {
    navigate("/vendor");
  };

  const handleCartIconHover = () => {
    setShowCartDropdown(true);
  };

  const handleCartIconLeave = () => {
    setShowCartDropdown(false);
  };

  return (
    <>
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
              <input type='text' placeholder='Tìm kiếm sản phẩm...' />
              <button>🔍</button>
            </div>
            <div className='account-section'>
              <div className='user-account' onClick={handleAccountClick}>
                <FaUser className='icon' />
                <div className='account-text'>
                  <span>Đăng xuất</span>
                  {/* <span>Tài khoản</span> */}
                </div>
              </div>
              <div className='notification'>
                <IoMdNotificationsOutline className='icon' />
              </div>
              <div
                className='cart'
                onMouseEnter={handleCartIconHover}
                onMouseLeave={handleCartIconLeave}
              >
                <BsCart2 className='icon' />
                <span className='badge'>{cartItems.length}</span>
                {showCartDropdown && <CartDropdown items={cartItems} />}
              </div>
            </div>
          </div>
          <nav className='nav-menu'>
            <NavLink className='nav-link' to='/'>
              Trang chủ
            </NavLink>
            <NavLink className='nav-link' to='/store'>
              Cửa hàng
            </NavLink>
            <NavLink className='nav-link' to='/fashion'>
              Thời trang
            </NavLink>
            <NavLink className='nav-link' to='/electronics'>
              Đồ điện tử
            </NavLink>
            <NavLink className='nav-link' to='/discounts'>
              Mã giảm giá
            </NavLink>
            <NavLink className='nav-link' to='/contact'>
              Liên hệ
            </NavLink>
          </nav>
        </header>
      </div>
      {showLogin && (
        <LoginScreen
          onClose={handleCloseLogin}
          onLoginSuccess={onLoginSuccess}
        />
      )}
    </>
  );
};

export default HeaderNoLogin;
