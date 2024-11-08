import React, { useState, useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import CartDropdown from "../../Pages/ADShop/CartDropdown";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext); // Lấy dữ liệu từ CartContext

  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Hàm điều khiển mở/đóng modal đăng nhập
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCartClick = () => {
    navigate("/ADSmartCart");
  };

  const handleVendorClick = () => {
    navigate("/vendor");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCartIconHover = () => {
    setShowCartDropdown(true);
  };

  const handleCartIconLeave = () => {
    setShowCartDropdown(false);
  };

  return (
    <div className="menu-container">
      <header className="header">
        <div className="top-bar">
          <ul className="top-links">
            <li onClick={handleHomeClick}>Về chúng tôi</li>
            <li>Tài khoản của tôi</li>
            <li>Danh sách mong muốn</li>
            <li onClick={handleVendorClick}>Trở thành người bán</li>
            <li>Hỗ trợ</li>
          </ul>
        </div>
        <div className="main-header">
          <div className="logo" onClick={handleHomeClick}>
            <img src={logo} alt="ADSmart Logo" />
            <span>ADSmart</span>
          </div>
          <div className="location-wrapper">
            <span>Giao hàng đến</span>
            <div className="location">
              tất cả <FaCaretDown />
            </div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, danh mục hoặc thương hiệu..."
            />
            <button>🔍</button>
          </div>
          <div className="account-section">
            <div className="user-account" onClick={handleOpenLoginModal}>
              <FaUser className="icon" />
              <div className="account-text">
                <span>Đăng nhập</span>
                <span>Tài khoản</span>
              </div>
            </div>
            <div className="notification">
              <IoMdNotificationsOutline className="icon" />
              <span className="badge">10</span>
            </div>
            <div
              className="cart"
              onMouseEnter={handleCartIconHover}
              onMouseLeave={handleCartIconLeave}
            >
              <BsCart2 className="icon" onClick={handleCartClick} />
              <span className="badge">{cartItems.length}</span>{" "}
              {showCartDropdown && <CartDropdown cartItems={cartItems} />}
            </div>
          </div>
        </div>
        <nav className="nav-menu">
        <button
          className="nav-link active"
          onClick={handleHomeClick}
        >
          Trang chủ <FaCaretDown />
        </button>

          <a className="nav-link" href="/store">
            Cửa hàng <FaCaretDown />
          </a>
          <a className="nav-link" href="/fashion">
            Thời trang
          </a>
          <a className="nav-link" href="/electronics">
            Đồ điện tử
          </a>
          <a className="nav-link" href="/discounts">
            Mã giảm giá
          </a>
          <a className="nav-link" href="/contact">
            Liên hệ
          </a>
        </nav>
      </header>
      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
    </div>
  );
};

// Component LoginModal hiển thị modal đăng nhập
const LoginModal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-button" onClick={onClose}>
        ✕
      </button>
      <h2>Đăng nhập</h2>
      <form>
        <input type="text" placeholder="Tên đăng nhập" />
        <input type="password" placeholder="Mật khẩu" />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  </div>
);

export default Header;
