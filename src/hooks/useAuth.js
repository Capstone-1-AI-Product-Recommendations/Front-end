// hooks/useAuth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    // Điều hướng người dùng dựa trên vai trò
    switch (role) {
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

  return { isLoggedIn, userRole, handleLoginSuccess, handleLogout };
};

export default useAuth;
