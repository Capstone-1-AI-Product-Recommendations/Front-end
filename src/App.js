import React, { useState } from "react";
import { CartProvider } from "./Components/Cart/CartContext";
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

  const handleClose = () => {
    console.log("Modal đóng lại");
  };

  const HeaderComponent = () => {
    if (["/dashboard", "/manageCus", "/manageOwner"].includes(location.pathname)) {
      return null;
    }
    return isLoggedIn ? (
      <HeaderAfterLogin onLogout={() => setIsLoggedIn(false)} />
    ) : (
      <HeaderNoLogin onLoginSuccess={handleLoginSuccess} />
    );
  };

  return (
    <CartProvider>
      <HeaderComponent />
      <RouterCustom onLoginSuccess={handleLoginSuccess} onClose={handleClose} />
      <Footer />
    </CartProvider>
  );
}

export default App;
