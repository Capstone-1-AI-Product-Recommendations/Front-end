import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import logo from "../../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../../client/Register/Register";
import "./HeaderNoLogin.css";
import menuItems from "../../../data/menuItems";

const HeaderNoLogin = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    // if (role === 'user') {
    //   navigate('/register-seller');
    // }
  };
  
  const handleMouseEnter = (categoryName) => {
    setHoveredCategory(categoryName);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <div className="menu-container">
        <header className="header-user">
          <div className="top-bar">
            <div className="top-links">
              <NavLink
                className="nav-link"
                to="/about-us"
                activeClassName="active"
              >
                Về chúng tôi
              </NavLink>
              <NavLink
                className="nav-link"
                to="/my-account"
                activeClassName="active"
              >
                Tài khoản của tôi
              </NavLink>
              <NavLink
                className="nav-link"
                to="/wishlist"
                activeClassName="active"
              >
                Danh sách mong muốn
              </NavLink>
              <span className="nav-link" onClick={handleRegisterClick}>
                Trở thành người bán
              </span>
              <NavLink
                className="nav-link"
                to="/contact"
                activeClassName="active"
              >
                Hỗ trợ
              </NavLink>
            </div>
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
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch}>🔍</button>
            </div>
            <div className="account-section">
              <div className="user-account">
                <FaUser className="icon" />
                <div className="account-text">
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
          <nav className="category-menu">
            <div className="category-grid">
              {menuItems.categories.map((item, index) => (
                <div
                  key={index}
                  className="category-item"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="category-icon">{item.icon}</div>
                  <div className="category-name">{item.name}</div>
                  {hoveredCategory === item.name && (
                    <div className="dropdown-menu">
                      {item.subItems.map((subItem, subIndex) => (
                        <div key={subIndex} className="dropdown-item">
                          {subItem}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </header>
      </div>
      {showLogin && (
        <Login
          show={showLogin}
          onClose={handleCloseModals}
          onRegisterClick={handleRegisterClick}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showRegister && (
        <Register show={showRegister} onClose={handleCloseModals} />
      )}
    </>
  );
};

export default HeaderNoLogin;
