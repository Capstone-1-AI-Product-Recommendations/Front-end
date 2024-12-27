//App.js

import React, { useState, useEffect, useRef, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import Footer from "./Components/client/Footer/Footer";
import HeaderContainer from "./Components/client/Header/HeaderContainer";
const RouterCustom = React.lazy(() => import("./Router")); // Lazy load RouterCustom

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const hasReloaded = useRef(false);

  // Kiểm tra trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const currentPath = location.pathname;

    if (token && user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
      // Don't navigate if already on a valid path
      if (currentPath === '/') {
        navigate(currentPath);
      }
    }
  }, [location, navigate]);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUserRole(userData.role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // localStorage.removeItem("cartData");
    navigate("/");
  };

  const shouldShowHeader = !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/seller-dashboard') &&
    !location.pathname.startsWith('/seller') &&
    !location.pathname.startsWith('/register-seller') &&
    !location.pathname.startsWith('/shipping-setting') &&
    !location.pathname.startsWith('/tax-information') &&
    !location.pathname.startsWith('/identity-information') &&
    !location.pathname.startsWith('/check-registration') &&
    !location.pathname.startsWith('/product-form');

  return (
    <CartProvider>
      <div className="App">
        {shouldShowHeader && (
          <HeaderContainer
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <RouterCustom
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            onLoginSuccess={handleLoginSuccess}
          />
        </Suspense>
        {shouldShowHeader && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;