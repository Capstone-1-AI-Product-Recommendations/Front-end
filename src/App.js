import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [userRole, setUserRole] = useState(""); // State for user role
  const location = useLocation();
  const navigate = useNavigate();

  // Handle login success
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Set user role (user/admin/seller)
    if (role === "admin") {
      navigate("/admin"); // Redirect to admin dashboard
    } else if (role === "seller") {
      navigate("/register-seller"); // Redirect to seller registration
    } else {
      navigate("/"); // Redirect to homepage for regular user
    }
  };

  // Close modal
  const handleClose = () => {
    console.log("Modal closed");
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
