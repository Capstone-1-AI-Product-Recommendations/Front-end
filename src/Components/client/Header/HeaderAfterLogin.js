/** @format */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../Login/Login";
import CartDropdown from "../Cart/CartDropdown";
import { NavLink } from "react-router-dom";
// import cartItems from "../../../data/cartItems";
import menuItems from "../../../data/menuItems";
import "./HeaderAfterLogin.css";
import { CartContext } from '../../../context/CartContext';

const HeaderAfterLogin = ({ onLogout, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const calculateCartCount = useCallback((items) => {
    return items.reduce((sum, shop) => sum + shop.items.length, 0);
  }, []);

  const loadCartData = useCallback(() => {
    try {
      const cartData = JSON.parse(localStorage.getItem('cartData'));
      if (cartData && cartData.items) {
        setCartItems(cartData.items);
        const total = calculateCartCount(cartData.items);
        setCartCount(prevCount => prevCount !== total ? total : prevCount);
      }
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  }, [calculateCartCount]);

  useEffect(() => {
    loadCartData();
    window.addEventListener('cartUpdated', loadCartData);
    return () => window.removeEventListener('cartUpdated', loadCartData);
  }, [loadCartData]);

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [showSearchResults, setShowSearchResults] = useState(false); // State to control search results visibility

  useEffect(() => {
    // Clear search input when navigating away from SearchResults page
    if (location.pathname !== "/search") {
      setSearchTerm("");
      setShowSearchResults(false);
    }
  }, [location]);

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

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
      navigate("/");
    } else {
      console.error("onLogout is not a function");
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setShowSearchResults(true); // Show search results
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
      trackUserBehavior({
        keyword: searchTerm,
        timestamp: Date.now(),
        source: "searched_product"
      });
    }
  };

  const trackUserBehavior = (behavior) => {
    const userBehavior = JSON.parse(localStorage.getItem("userBehavior")) || [];
    userBehavior.push(behavior);
    localStorage.setItem("userBehavior", JSON.stringify(userBehavior));
  };
  

  return (
    <>
      {/* ** Header Container ** */}
      <div className="menu-container">
        <header className="header-user">
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


              {userRole === "seller" ? (
                <NavLink className="nav-link" to="/seller-dashboard">
                  Quản lý cửa hàng
                </NavLink>
              ) : userRole === "user" ? (
                <span
                  className="nav-link"
                  onClick={() => navigate("/register-seller")}
                >
                  Trở thành người bán
                </span>
              ) : userRole === "admin" ? (
                <span
                  className="nav-link"
                  onClick={() => navigate("/admin")}
                >
                  Quản lý hệ thống
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
                onClick={() => navigate('/cart')}
                style={{ cursor: 'pointer' }}
              >
                <BsCart2 className="icon" />

                <span className="badge">{cartCount}</span>
                {showCartDropdown && <CartDropdown />}
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
