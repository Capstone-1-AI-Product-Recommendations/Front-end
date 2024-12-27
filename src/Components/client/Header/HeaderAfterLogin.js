/** @format */
import React, { useState, useEffect, useCallback } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../../assets/logo.png";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import CartDropdown from "../Cart/CartDropdown";
import { NavLink } from "react-router-dom";
import "./HeaderAfterLogin.css";
import productService from '../../../services/productService';
import { fetchUserNotifications, updateNotificationStatus, logoutUser } from '../../../services/apiLogin'; // Import the new function
import orderService from '../../../services/orderService'; // Import orderService
import cartService from '../../../services/cartService'; // Import the cartService

const HeaderAfterLogin = ({ onLogout, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]); // State for recent searches
  const [notifications, setNotifications] = useState([]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // State for unread notifications count
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Hide notification after 3 seconds
  };

  const calculateCartCount = useCallback((items) => {
    return items.reduce((sum, shop) => sum + shop.items.length, 0);
  }, []);

  const loadCartData = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user_id) {
        const cartData = await cartService.getCart(user.user_id);
        if (cartData && cartData.items) {
          setCartItems(cartData.items);
          const total = calculateCartCount(cartData.items);
          setCartCount(prevCount => prevCount !== total ? total : prevCount);
        }
      }
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  }, [calculateCartCount]);

  const updateCartCount = (newCartData) => {
    if (newCartData && newCartData.items) {
      setCartItems(newCartData.items);
      const total = calculateCartCount(newCartData.items);
      setCartCount(total);
    }
  };

  useEffect(() => {
    loadCartData();
    const handleCartUpdated = () => {
      loadCartData();
    };
    window.addEventListener('cartUpdated', handleCartUpdated);
    return () => window.removeEventListener('cartUpdated', handleCartUpdated);
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

  const loadNotifications = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user_id) {
        const data = await fetchUserNotifications(user.user_id);
        setNotifications(data);
        setUnreadCount(data.filter(notification => notification.is_read === 1).length); // Count unread notifications
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Unknown time';

    const parsedTimestamp = Date.parse(timestamp);
    if (isNaN(parsedTimestamp)) return 'Unknown time';

    const now = new Date();
    const timeDiff = Math.floor((now - parsedTimestamp) / 1000); // in seconds

    if (timeDiff < 60) return `${timeDiff} seconds ago`;
    if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)} minutes ago`;
    if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)} hours ago`;
    return `${Math.floor(timeDiff / 86400)} days ago`;
  };

  // ** State Management **
  const [showCartDropdown, setShowCartDropdown] = useState(false); // Control Cart Dropdown visibility
  const [hoveredCategory, setHoveredCategory] = useState(null); // Track hovered category
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getSubCategories();
        console.log('Categories:', response);
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
  }, []); // Add an empty dependency array to run only once

  // ** Event Handlers **

  // Handle hover actions on categories
  const handleMouseEnter = useCallback((categoryName) => {
    setHoveredCategory(categoryName);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user_id) {
        await logoutUser(user.user_id); // Call the logoutUser function
      }
      if (typeof onLogout === "function") {
        onLogout();
      }
      navigate("/", { replace: true }); // Use replace option only when necessary
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [navigate, onLogout]);

  const handleSearch = useCallback(() => {
    if (searchTerm.trim()) {
      setShowSearchResults(false); // Hide suggestions when searching
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
      trackUserBehavior({
        keyword: searchTerm,
        timestamp: Date.now(),
        source: "searched_product"
      });
    }
  }, [navigate, searchTerm]);

  const trackUserBehavior = useCallback((behavior) => {
    const userBehavior = JSON.parse(localStorage.getItem("userBehavior")) || [];
    userBehavior.push(behavior);
    localStorage.setItem("userBehavior", JSON.stringify(userBehavior));
  }, []);

  const handleSubcategoryClick = useCallback((subcategory) => {
    navigate(`/search/${encodeURIComponent(subcategory)}`);
  }, [navigate]);

  const handleNotificationClick = async (notificationId, isRead) => {
    if (isRead === 0) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.user_id && notificationId) {
          await updateNotificationStatus(user.user_id, notificationId);
          // Update the local state to reflect the change
          setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
              notification.notification_id === notificationId ? { ...notification, is_read: 0 } : notification
            )
          );
          setUnreadCount(prevCount => prevCount - 1); // Decrease unread count
        }
      } catch (error) {
        console.error('Error updating notification status:', error);
      }
    }
  };

  const handleNotificationsDropdownClose = () => {
    setShowNotificationsDropdown(false);
    loadNotifications(); // Refresh notifications when the dropdown is closed
  };

  const handlePaymentSuccess = useCallback(async (userId, orderId, shippingAddressId, amount, paymentMethod) => {
    try {
      if (paymentMethod === 'COD') {
        await orderService.processCODPayment(userId, orderId, shippingAddressId, amount, loadCartData);
      } else if (paymentMethod === 'PayOS') {
        await orderService.processPayOSPayment(userId, orderId, shippingAddressId, amount, loadCartData);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  }, [loadCartData]);

  return (
    <>
      {notification && <div className="notification">{notification}</div>}
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
              <div className="notification"
                onMouseEnter={() => setShowNotificationsDropdown(true)}
                onMouseLeave={handleNotificationsDropdownClose}>
                <IoMdNotificationsOutline className="icon" />
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                {showNotificationsDropdown && (
                  <div className="notifications-dropdown">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.notification_id}
                          className={`notification-item ${notification.is_read ? 'unread' : 'read'}`}
                          onClick={() => handleNotificationClick(notification.notification_id, notification.is_read)}
                        >
                          {notification.message}
                        </div>
                      ))
                    ) : (
                      <div className="notification-item">No notifications</div>
                    )}
                  </div>
                )}
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
              {categories.map((item, index) => (
                <div
                  key={index}
                  className="category-item"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <>
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
                  </>
                </div>
              ))}
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default React.memo(HeaderAfterLogin);
