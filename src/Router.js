import React, { useState } from "react"; // Import useState
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate

// Các trang cơ bản
import HomePage from "./Pages/homePage/HomePage";
import Cart from "./Components/client/Cart/Cart";
import LoginScreen from "./Components/client/Login/LoginScreen";
import SignUpScreen from "./Components/client/Login/SignUpScreen";
import Product from "./Components/client/Product/Product";
import ProductList from "./Components/client/Product/ProductList";
import ProductDetail from "./Components/client/ProductDetail/ProductDetail";
import OrderSummary from "./Components/client/Payment/OrderSummary";
import PaymentQRCode from "./Components/client/Payment/PaymentQRCode";
import OrderConfirmation from "./Components/client/Payment/OderConfirmation";
import Checkout from "./Components/client/Payment/Checkout";

import ADSmartCart from "./Components/client/ADShop/ADSmartCart";
import VendorForm from "./Components/client/VendorForm/VendorForm";
import DashboardLayout from "./Components/client/VendorForm/DashboardLayout";
import Contact from "./Components/client/Contact/Contact";

// Trang dành cho seller 
import RegisterSeller from "./Components/seller/RegisterSeller/RegisterSeller";
import ShippingSettings from "./Components/seller/ShippingSetting/ShippingSettings";
import AddressForm from "./Components/client/Payment/AddressForm";

//Trang dành cho admin
import AdminDashboard from "./Components/admin/AdminDashboard/AdminDashboard";

const RouterCustom = ({ onLoginSuccess, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // State cho vai trò người dùng

  // Handle login success
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Thiết lập vai trò người dùng (user/admin/seller)
  };

  return (
    <Routes>
      {/* Routes chung cho tất cả người dùng */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />

      {/* Nếu đã đăng nhập */}
      {isLoggedIn ? (
        <>
          {/* Nếu là user, điều hướng đến trang chủ */}
          {userRole === "user" ? (
            <>
              <Route path="/product" element={<Product />} />
              <Route path="/list" element={<ProductList />} />
              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/QRCode" element={<PaymentQRCode />} />
              <Route path="/confirmation" element={<OrderConfirmation />} />
              <Route path="/checkout" element={<Checkout />} />
            </>
          ) : (
            <Navigate to="/admin" replace />
          )}

          {/* Nếu là admin, điều hướng đến trang admin */}
          {userRole === "admin" ? (
            <Route path="/admin" element={<AdminDashboard />} />
          ) : null}

          {/* Nếu là seller, điều hướng đến trang seller */}
          {userRole === "seller" ? (
            <>
              <Route path="/register-seller" element={<RegisterSeller />} />
              <Route path="/shipping-setting" element={<ShippingSettings />} />
              <Route path="/address-form" element={<AddressForm />} />
            </>
          ) : null}

        </>
      ) : (
        <>
          {/* Nếu chưa đăng nhập, chuyển đến trang đăng ký hoặc login */}
          <Route path="/signup" element={<SignUpScreen />} />
          <Route
            path="/login"
            element={
              <LoginScreen
                onLoginSuccess={handleLoginSuccess}
                onClose={onClose}
              />
            }
          />
        </>
      )}

      {/* Các routes khác */}
      <Route path="/ADSmartCart" element={<ADSmartCart />} />
      <Route path="/contact" element={<Contact />} />

      {/* Điều hướng đến trang chủ cho những routes không xác định */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouterCustom;
