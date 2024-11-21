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
      case "seller":
        navigate("/");
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

  // Kiểm tra nếu đang ở trang admin hoặc user có role admin
  const shouldHideHeader = location.pathname.startsWith('/admin') || userRole === 'admin';

  // Nếu là admin route hoặc user có role admin, chỉ render Router
  if (shouldHideHeader) {
    return <RouterCustom onLoginSuccess={handleLoginSuccess} />;
  }

  // Các trường hợp khác render đầy đủ header và footer
  return (
    <CartProvider>
      {isLoggedIn ? (
        <HeaderAfterLogin onLogout={handleLogout} userRole={userRole} />
      ) : (
        <HeaderNoLogin onLoginSuccess={handleLoginSuccess} />
      )}
      <RouterCustom onLoginSuccess={handleLoginSuccess} />
      {!location.pathname.startsWith('/admin') && <Footer />}
    </CartProvider>
  );
}

export default App;