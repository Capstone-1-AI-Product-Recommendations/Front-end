// <<<<<<< HEAD
// // src/App.js
// import React from "react";
// import { CartProvider } from "./Components/Cart/CartContext"; // Đường dẫn tới CartContext
// import Header from "./Components/Header/Header";
// import Footer from "./Components/Footer/Footer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartProvider } from "./Components/client/Cart/CartContext";
import Footer from "./Components/client/Footer/Footer";
import RouterCustom from "./Router";
import HeaderNoLogin from "./Components/client/Header/HeaderNoLogin";
import HeaderAfterLogin from "./Components/client/Header/HeaderAfterLogin";
import { useLocation } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    
    switch(role) {
      case "admin":
        navigate("/admin");
        break;
      case "user":
        navigate("/");
        break;
      default:
        navigate("/");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    navigate("/");
  };

  return (
    <CartProvider>
      {!location.pathname.startsWith('/admin') && (
        <>
          {isLoggedIn ? (
            <HeaderAfterLogin onLogout={handleLogout} userRole={userRole} />
          ) : (
            <HeaderNoLogin onLoginSuccess={handleLoginSuccess} />
          )}
        </>
      )}
      <RouterCustom isLoggedIn={isLoggedIn} userRole={userRole} onLoginSuccess={handleLoginSuccess} />
      {!location.pathname.startsWith('/admin') && <Footer />}
    </CartProvider>
  );
}

export default App;