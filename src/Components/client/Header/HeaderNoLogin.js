import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../../Register/Register";
import { NavLink } from "react-router-dom";
import "./HeaderNoLogin.css";

const HeaderNoLogin = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLoginSuccess = (role) => {
    onLoginSuccess(role);
    handleCloseModals();
  };

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="menu-container">
        <header className="header">
          <div className="top-bar">
            <ul className="top-links">
              <li>Về chúng tôi</li>
              <li>Tài khoản của tôi</li>
              <li>Danh sách mong muốn</li>
              <li>Trở thành người bán</li>
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
              <input type="text" placeholder="Tìm kiếm sản phẩm..." />
              <button>🔍</button>
            </div>
            <div className="account-section">
              <div className="user-account">
                <FaUser className="icon" />
                <div className="account-text">
                  {/* Tách riêng sự kiện onClick cho từng span để tránh bị ảnh hưởng */}
                  <span onClick={handleLoginClick}>Đăng nhập</span>
                  <span onClick={handleRegisterClick}>Đăng ký</span>
                </div>
              </div>
              <div className="notification">
                <IoMdNotificationsOutline className="icon" />
              </div>
              <div className="cart">
                <BsCart2 className="icon" />
              </div>
            </div>
          </div>
          <nav className="nav-menu">
            <NavLink className="nav-link" to="/">
              Trang chủ
            </NavLink>
            <NavLink className="nav-link" to="/store">
              Cửa hàng
            </NavLink>
            <NavLink className="nav-link" to="/fashion">
              Thời trang
            </NavLink>
            <NavLink className="nav-link" to="/electronics">
              Đồ điện tử
            </NavLink>
            <NavLink className="nav-link" to="/discounts">
              Mã giảm giá
            </NavLink>
            <NavLink className="nav-link" to="/contact">
              Liên hệ
            </NavLink>
          </nav>
        </header>
      </div>

      {/* Chỉ hiển thị component đăng nhập/đăng ký tương ứng */}
      {showLogin && (
        <Login
          show={showLogin}
          onClose={handleCloseModals}
          onRegisterClick={handleRegisterClick}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showRegister && (
        <Register
          show={showRegister}
          onClose={handleCloseModals}
        />
      )}
    </>
  );
};

export default HeaderNoLogin;
