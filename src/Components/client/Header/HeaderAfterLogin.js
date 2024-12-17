import React, { useState, useEffect } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaUser, FaCaretDown } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import CartDropdown from '../Cart/CartDropdown';
import NotificationsDropdown from '../NotificationsDropdown/NotificationsDropdown';
import userImage from '../../../img/people.png';
import menuItems from '../../../data/menuItems';
import './HeaderAfterLogin.css';

const HeaderAfterLogin = ({ onLogout, userRole }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [location, setLocation] = useState('Tất cả');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/user-location')
      .then((res) => res.json())
      .then((data) =>
        setLocation(data.address || 'Q. Hải Châu, P. Hải Châu I, Đà Nẵng')
      )
      .catch(() => setLocation('Q. Hải Châu, P. Hải Châu I, Đà Nẵng'));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/');
    }
  };

  const handleMouseEnter = (categoryName) => {
    setHoveredCategory(categoryName);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="menu-container">
      <header className="header-user">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-links">
            <NavLink className="nav-link" to="/about-us">
              Về chúng tôi
            </NavLink>
            <NavLink className="nav-link" to="/my-account">
              Tài khoản của tôi
            </NavLink>
            <NavLink className="nav-link" to="/wishlist">
              Danh sách mong muốn
            </NavLink>
            {userRole === 'seller' && (
              <NavLink className="nav-link" to="/seller-dashboard">
                Quản lý cửa hàng
              </NavLink>
            )}
            {userRole === 'user' && (
              <span
                className="nav-link"
                onClick={() => navigate('/register-seller')}
              >
                Trở thành người bán
              </span>
            )}
            {userRole === 'admin' && (
              <span className="nav-link" onClick={() => navigate('/admin')}>
                Quản lý hệ thống
              </span>
            )}
            <NavLink className="nav-link" to="/contact">
              Hỗ trợ
            </NavLink>
          </div>
        </div>

        {/* Main Header */}
        <div className="main-header">
          <div className="logo" onClick={() => navigate('/')}>
            <img src={logo} alt="ADSmart Logo" />
            <span>ADSmart</span>
          </div>

          <div className="location-wrapper">
            <span>Giao đến:</span>
            <div className="location">
              <FiMapPin className="icon" />
              <span className="address">{location}</span>
              <FaCaretDown />
            </div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>

          <div className="account-section">
            <div className="user-account" onClick={handleLogout}>
              <img src={userImage} alt="User Avatar" className="user-avatar" />
              <span>Đăng xuất</span>
            </div>

            {/* Notification Dropdown */}
            <div
              className="notification"
              onMouseEnter={() => setShowNotificationsDropdown(true)}
              onMouseLeave={() => setShowNotificationsDropdown(false)}
            >
              <IoMdNotificationsOutline className="icon" />
              <span className="badge-warning">5</span>
              {showNotificationsDropdown && <NotificationsDropdown />}
            </div>

            {/* Cart Dropdown */}
            <div
              className="cart"
              onMouseEnter={() => setShowCartDropdown(true)}
              onMouseLeave={() => setShowCartDropdown(false)}
            >
              <BsCart2 className="icon" />
              <span className="badge">3</span>
              {showCartDropdown && <CartDropdown />}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderAfterLogin;
