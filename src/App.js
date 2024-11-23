import React, { useState } from "react";
import { CartProvider } from "./Components/Cart/CartContext"; // Đường dẫn tới CartContext
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import RouterCustom from "./Router";
import HeaderNoLogin from "./Components/Header/HeaderNoLogin";
import HeaderAfterLogin from "./Components/Header/HeaderAfterLogin";
import { useLocation } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const HeaderComponent = () => {
    if (
      ["/dashboard", "/manageCus", "/manageOwner"].includes(location.pathname)
    ) {
      return null;
    }
    return isLoggedIn ? (
      <HeaderAfterLogin onLogout={handleLogout} />
    ) : (
      <HeaderNoLogin onLoginSuccess={handleLoginSuccess} />
    );
  };

  return (
    <CartProvider>
      <HeaderComponent />
      <RouterCustom />
      <Footer />
    </CartProvider>
  );
}

export default App;
