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
import "./HeaderAfterLogin.css";

const HeaderAfterLogin = ({ onLogout, userRole }) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  // Hàm xử lý khi nhấn vào icon tài khoản
  const handleAccountClick = () => {
    setShowLogin(true); // Mở modal đăng nhập
  };

  // Hàm đóng modal đăng nhập
  const handleCloseLogin = () => {
    setShowLogin(false); // Đóng modal đăng nhập
  };

  // Hàm xử lý điều hướng dựa trên vai trò người dùng
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

  return (
    <>
      <div className="menu-container">
        <header className="header">
          <div className="top-bar">
            <ul className="top-menu">
              <NavLink className="top-link" to="/about us">
                Về chúng tôi
              </NavLink>
              <NavLink className="top-link" to="/my-account">
                Tài khoản của tôi
              </NavLink>
              <NavLink className="top-link" to="/my-account">
                Danh sách mong muốn
              </NavLink>
              <NavLink className="top-link" to="/register-seller">
                Trở thành người bán
              </NavLink>
              <NavLink className="top-link" to="/contact">
                Hỗ trợ
              </NavLink>
            </ul>
          </div>
          <div className="main-header">
            <div className="logo" onClick={() => navigate("/")}>
              {" "}
              {/* Khi nhấn vào logo, chuyển đến trang chủ */}
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
              <div className="user-account" onClick={handleLogout}>
                <FaUser className="icon" />
                <div className="account-text">
                  <span>Đăng xuất</span>
                </div>
              </div>
              <div className="notification">
                <IoMdNotificationsOutline className="icon" />
              </div>
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
      {showLogin && <Login onClose={handleCloseLogin} />}
    </>
  );
};

export default HeaderAfterLogin;
