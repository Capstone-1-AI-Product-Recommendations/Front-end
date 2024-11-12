import React, { useState } from "react";
import { CartProvider } from "./Components/client/Cart/CartContext";
// import Header from "./Components/client/Header/Header";
import Footer from "./Components/client/Footer/Footer";
import RouterCustom from "./Router";
import HeaderNoLogin from "./Components/client/Header/HeaderNoLogin";
import HeaderAfterLogin from "./Components/client/Header/HeaderAfterLogin";
import { useLocation } from "react-router-dom";
import "./styles/style.css";

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
