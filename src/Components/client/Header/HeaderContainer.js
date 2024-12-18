import React, { useEffect } from "react";
import HeaderNoLogin from "./HeaderNoLogin";
import HeaderAfterLogin from "./HeaderAfterLogin";

const HeaderContainer = ({ isLoggedIn, userRole, onLoginSuccess, onLogout }) => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      onLoginSuccess(user);
    }
  }, [onLoginSuccess]);

  return (
    <>
      {isLoggedIn ? (
        <HeaderAfterLogin onLogout={onLogout} userRole={userRole} />
      ) : (
        <HeaderNoLogin onLoginSuccess={onLoginSuccess} />
      )}
    </>
  );
};

export default HeaderContainer;
