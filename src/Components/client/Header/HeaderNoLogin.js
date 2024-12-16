import React, { useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import logo from "../../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../../client/Register/Register";
import "./HeaderNoLogin.css";
import menuItems from "../../../data/menuItems";
import {registerUser} from "../../../services/apiLogin";
import PropTypes from 'prop-types';

const HeaderNoLogin = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [showSearchResults, setShowSearchResults] = useState(false); // State to control search results visibility
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Clear search input when navigating away from SearchResults page
    if (location.pathname !== "/search") {
      setSearchTerm("");
      setShowSearchResults(false);
    }
  }, [location]);

  useEffect(() => {
    // Retrieve search suggestions from localStorage
    const userBehavior = JSON.parse(localStorage.getItem("userBehavior")) || [];
    const searchKeywords = userBehavior
      .filter((behavior) => behavior.source === "searched_product")
      .map((behavior) => behavior.keyword);
    const uniqueKeywords = [...new Set(searchKeywords)]; // Remove duplicates
    setSuggestions(uniqueKeywords);
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLoginSuccess = (userData) => {
    try {
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Close login modal
      setShowLogin(false);
      
      // Call parent callback
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }
    } catch (error) {
      console.error('Error handling login success:', error);
    }
  };
  
  const handleMouseEnter = (categoryName) => {
    setHoveredCategory(categoryName);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleHomeClick = () => {
    navigate("/");
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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter suggestions based on the input value
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleRegisterSubmit = async (userData) => {
    try {
      const response = await registerUser(userData);
      if (response.message.includes('successfully')) {
        setShowRegister(false);
        setShowLogin(true);
        // Optional: Show success message
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
      }
    } catch (error) {
      console.error('Registration error:', error);
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
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch}>🔍</button>
              {searchTerm && (
                <div className="suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        setSearchTerm(suggestion);
                        handleSearch();
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
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
        <Register 
          show={showRegister}
          onClose={() => setShowRegister(false)}
          onRegister={handleRegisterSubmit}
          onLoginClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

HeaderNoLogin.propTypes = {
  onLoginSuccess: PropTypes.func
};

export default HeaderNoLogin;
