//App.js

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartProvider } from "./Components/client/Cart/CartContext";
import Footer from "./Components/client/Footer/Footer";
import RouterCustom from "./Router";
import HeaderNoLogin from "./Components/client/Header/HeaderNoLogin";
import HeaderAfterLogin from "./Components/client/Header/HeaderAfterLogin";
import SearchResults from './Components/client/Search/SearchResults/SearchResults';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (token && user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("user", JSON.stringify({ role })); // Lưu thông tin người dùng
    navigate("/"); // Ch
  };

  // Theo dõi sự thay đổi của isLoggedIn
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Điều hướng đến HeaderAfterLogin khi đăng nhập thành công
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
      {shouldShowHeader && (
        isLoggedIn ? (
          <HeaderAfterLogin onLogout={handleLogout} userRole={userRole} />
        ) : (
          <HeaderNoLogin onLoginSuccess={handleLoginSuccess} />
        )
      )}
      <RouterCustom 
        isLoggedIn={isLoggedIn} 
        userRole={userRole} 
        onLoginSuccess={handleLoginSuccess} 
      />
      {shouldShowHeader && <Footer />}
    </CartProvider>
  );
}

export default App;