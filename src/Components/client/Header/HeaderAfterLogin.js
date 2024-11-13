import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoginScreen from "../Login/Login";
import CartDropdown from "../Cart/CartDropdown"; // Import CartDropdown
import { NavLink } from "react-router-dom";
import cartItems from "../../../data/cartItems";
import "./HeaderNoLogin.css";

const HeaderNoLogin = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false); // State để hiển thị CartDropdown
  const [userRole, setUserRole] = useState(""); // State cho vai trò người dùng

  const navigate = useNavigate();

  const handleAccountClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleUserRole = (role) => {
    setUserRole(role);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleBecomeSeller = () => {
    if (userRole === "user") {
      navigate("/register-seller"); // Chuyển đến trang đăng ký nếu là user
    } else if (userRole === "seller") {
      navigate("/"); // Chuyển đến trang quản lý seller
    } else if (userRole === "admin") {
      navigate("/admin"); // Chuyển đến trang admin
    }
  };

  return (
    <>
      <div className="menu-container">
        <header className="header">
          <div className="top-bar">
            <ul className="top-links">
              <li onClick={handleHomeClick}>Về chúng tôi</li>
              <li>Tài khoản của tôi</li>
              <li>Danh sách mong muốn</li>
              <li onClick={handleBecomeSeller}>Trở thành người bán</li>
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
              <div className="user-account" onClick={handleAccountClick}>
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
      {showLogin && (
        <LoginScreen onClose={handleCloseLogin} onLoginSuccess={onLoginSuccess} />
      )}
    </>
  );
};

export default HeaderNoLogin;
