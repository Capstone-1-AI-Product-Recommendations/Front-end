// <<<<<<< HEAD
// import React, { useState, useEffect } from "react";
// =======
// <<<<<<< HEAD
// // src/App.js
// import React from "react";
// import { CartProvider } from "./Components/Cart/CartContext"; // Đường dẫn tới CartContext
// import Header from "./Components/Header/Header";
// import Footer from "./Components/Footer/Footer";
import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { CartProvider } from "./Components/client/Cart/CartContext";
import Footer from "./Components/client/Footer/Footer";
import RouterCustom from "./Router";
import HeaderNoLogin from "./Components/client/Header/HeaderNoLogin";
import HeaderAfterLogin from "./Components/client/Header/HeaderAfterLogin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const savedUserRole = localStorage.getItem("userRole");
    
    if (loggedInStatus === "true" && savedUserRole) {
      setIsLoggedIn(true);
      setUserRole(savedUserRole);
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    // Lưu trạng thái vào localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    navigate("/");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    // Xóa trạng thái khỏi localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/");
  };


  
  const shouldShowHeader = !location.pathname.startsWith('/admin') && 
                          !location.pathname.startsWith('/seller-dashboard') && 
                          !location.pathname.startsWith('/seller');

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