import React, { useState, useEffect, useCallback } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../../client/Register/Register";
import "./HeaderNoLogin.css";
import productService from '../../../services/productService';

const HeaderNoLogin = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [showSearchResults, setShowSearchResults] = useState(false); // State to control search results visibility
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions
  const [categories, setCategories] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]); // State for recent searches

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getSubCategories();
        const transformedCategories = response.map(category => ({
          name: category.category_name,
          subItems: category.subcategories.map(sub => sub.subcategory_name)
        }));
        setCategories(transformedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Load recent searches from local storage
    const loadRecentSearches = () => {
      const userBehavior = JSON.parse(localStorage.getItem("userBehavior")) || [];
      const searches = userBehavior
        .filter(behavior => behavior.source === "searched_product")
        .map(behavior => behavior.keyword);
      const uniqueSearches = [...new Set(searches)]; // Remove duplicates
      const recentUniqueSearches = uniqueSearches.slice(-5).reverse(); // Get the 5 most recent unique searches
      setRecentSearches(recentUniqueSearches);
    };

    loadRecentSearches();
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

  const handleMouseEnter = (categoryName) => {
    setHoveredCategory(categoryName);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleHomeClick = () => {
    navigate("/", { replace: true }); // Use replace option only when necessary
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setShowSearchResults(false); // Hide suggestions when searching
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

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/search/${encodeURIComponent(subcategory)}`);
  };

  const handleRegisterSubmit = (userData) => {
    // Handle register submit logic here
  };

  return (
    <>
      <div className="menu-container">
        <header className="header-user">
          <div className="top-bar">
            <div className="top-links">
              <NavLink className="nav-link" to="/about-us" activeClassName="active">
                Về chúng tôi
              </NavLink>
              <NavLink className="nav-link" to="/my-account" activeClassName="active">
                Tài khoản của tôi
              </NavLink>
              <NavLink className="nav-link" to="/wishlist" activeClassName="active">
                Danh sách mong muốn
              </NavLink>
              <span className="nav-link" onClick={handleRegisterClick}>
                Trở thành người bán
              </span>
              <NavLink className="nav-link" to="/contact" activeClassName="active">
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
                onFocus={() => setShowSearchResults(true)} // Show recent searches on focus
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)} // Hide recent searches on blur with delay
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch}>🔍</button>
              {showSearchResults && recentSearches.length > 0 && (
                <div className="search-suggestions">
                  {recentSearches.map((term, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        setSearchTerm(term);
                        handleSearch();
                      }}
                    >
                      {term}
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
              {categories.map((item, index) => (
                <div
                  key={index}
                  className="category-item"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="category-name">{item.name}</div>
                  {hoveredCategory === item.name && (
                    <div className="dropdown-menu">
                      {item.subItems.map((subItem, subIndex) => (
                        <div
                          key={subIndex}
                          className="dropdown-item"
                          onClick={() => handleSubcategoryClick(subItem)}
                        >
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
          onLoginSuccess={onLoginSuccess} // Use prop passed from parent
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

export default HeaderNoLogin;
