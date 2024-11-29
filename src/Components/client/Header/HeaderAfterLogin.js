/** @format */
import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import CartDropdown from "../Cart/CartDropdown";
import { NavLink } from "react-router-dom";
import cartItems from "../../../data/cartItems";
import menuItems from "../../../data/menuItems";
import "./HeaderAfterLogin.css";

const HeaderAfterLogin = ({ onLogout, userRole }) => {
  const navigate = useNavigate();

  // ** State Management **
  const [showLogin, setShowLogin] = useState(false); // Control Login Modal visibility
  const [showCartDropdown, setShowCartDropdown] = useState(false); // Control Cart Dropdown visibility
  const [hoveredCategory, setHoveredCategory] = useState(null); // Track hovered category

  // ** Event Handlers **

  // Handle logout and navigate to the home page

  // Handle hover actions on categories
  const handleMouseEnter = (categoryName) => {
    setHoveredCategory(categoryName);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  // Navigate based on user role
  const handleRoleNavigation = () => {
    if (userRole === "user") {
      navigate("/register-seller");
    } else if (userRole === "seller") {
      navigate("/manage-store");
    } else if (userRole === "admin") {
      navigate("/admin");
    }
  };
  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
      navigate("/");
    } else {
      console.error("onLogout is not a function");
    }
  };

  const handleStoreManagement = () => {
    if (userRole === 'seller') {
      navigate('/seller/dashboard');
    } else if (userRole === 'user') {
      navigate('/register-seller');
    }
  };

  return (
    <>
      {/* ** Header Container ** */}
      <div className="menu-container">
        <header className="header">
          {/* ** Top Bar ** */}
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
              <NavLink className="nav-link" to="/wishlist">
              Danh sách mong muốn
            </NavLink>
            {userRole === 'seller' ? (
              <NavLink className="nav-link" onClick={handleStoreManagement}>
                Quản lý cửa hàng
              </NavLink>
            ) : userRole === 'user' ? (
              <span className="nav-link" onClick={() => navigate('/register-seller')}>
                Trở thành người bán
              </span>
            ) : null}
            <NavLink className="nav-link" to="/contact">
              Hỗ trợ
            </NavLink>
            </div>
          </div>

          {/* ** Main Header ** */}
          <div className="main-header">
            {/* Logo Section */}
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="ADSmart Logo" />
              <span>ADSmart</span>
            </div>

            {/* Delivery Location */}
            <div className="location-wrapper">
              <span>Giao hàng đến</span>
              <div className="location">
                tất cả <FaCaretDown />
              </div>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
              <input type="text" placeholder="Tìm kiếm sản phẩm..." />
              <button>🔍</button>
            </div>

            {/* Account, Notifications, and Cart */}
            <div className="account-section">
              {/* User Account Section */}
              <div className="user-account">
                <FaUser className="icon" />
                <div className="account-text">
                  <span onClick={handleLogout}>Đăng xuất</span>
                </div>
              </div>

              {/* Notifications */}
              <div className="notification">
                <IoMdNotificationsOutline className="icon" />
              </div>

              {/* Cart Section */}
              <div
                className="cart"
                onMouseEnter={() => setShowCartDropdown(true)}
                onMouseLeave={() => setShowCartDropdown(false)}
              >
                <BsCart2 className="icon" />
                <span className="badge">{cartItems.length}</span>
                {showCartDropdown && <CartDropdown items={cartItems} />}
              </div>
            </div>
          </div>

          {/* ** Category Menu ** */}
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
    </>
  );
};

export default HeaderAfterLogin;
