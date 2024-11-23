import React, { useState } from "react"; // Import useState
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate

// <<<<<<< HEAD
// // src/Router.js

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import HomePage from "./Pages/homePage/HomePage";
// import Cart from "./Components/Cart/Cart";
// import LoginScreen from "./Pages/Login/LoginScreen";
// import SignUpScreen from "./Pages/Login/SignUpScreen";
// import GoogleLogin from "./Pages/Login/GoogleLogin";
// import OrderSummary from "./Pages/Payment/OrderSummary";
// import PaymentQRCode from "./Pages/Payment/PaymentQRCode";
// import OrderConfirmation from "./Pages/Payment/OderConfirmation";
// import Checkout from "./Pages/Payment/Checkout";
// import AdminDashboard from "./Pages/masterLayout/AdminDashboard/AdminDashboard";
// import ADSmartCart from "./Pages/ADShop/ADSmartCart";
// import VendorForm from "./Pages/masterLayout/VendorForm/VendorForm";
// import DashboardLayout from "./Pages/masterLayout/VendorForm/DashboardLayout";
// import Product from "./Components/Product/Product";
// import ProductList from "./Components/Product/ProductList";
// import ProductDetail from "./Components/ProductDetail/ProductDetail";
// import Contact from "./Components/Body/Contact";
// =======
// Các trang cơ bản
import HomePage from "./Pages/homePage/HomePage";
import Cart from "./Components/client/Cart/Cart";
import Product from "./Components/client/Product/Product"
// import Product from "./Components/client/Product/Product";
import ProductList from "./Components/client/Product/ProductList";
import ProductDetail from "./Components/client/ProductDetail/ProductDetail";
import OrderSummary from "./Components/client/Payment/OrderSummary";
import PaymentQRCode from "./Components/client/Payment/PaymentQRCode";
import OrderConfirmation from "./Components/client/Payment/OderConfirmation";
import Checkout from "./Components/client/Payment/Checkout";

import ADSmartCart from "./Components/client/ADShop/ADSmartCart";
// import VendorForm from "./Components/client/VendorForm/VendorForm";
import DashboardLayout from "./Components/client/VendorForm/DashboardLayout";
import Contact from "./Components/client/Contact/Contact";

// Trang dành cho seller
import Register from "./Components/client/Register/Register";
import Login from "./Components/client/Login/Login";
import RegisterSeller from "./Pages/RegisterSeller/RegisterSeller";
import ShippingSetting from "./Components/seller/ShippingSetting/ShippingSetting";
import TaxInformation from "./Components/seller/TaxInformation/TaxInformation";
import IdentityInformation from "./Components/seller/IdentityInformation/IdentityInformation";
import SuccessRegistration from "./Components/seller/SuccessRegistration/SuccessRegistration";
import ProductForm from "./Components/seller/ProductForm/ProductForm";
import ProductManagement from "./Components/seller/ProductManagement/ProductManagement";
import RegisterSellerStep from "./Pages/RegisterSeller/RegisterSeller";



//Trang dành cho admin
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import OrderManagement from "./Components/admin/orders/OrderManagement";
import PublicLayout from "./Components/admin/dashboard/Overview/PublicLayout";

// import SellerPage from "./Pages/SellerPage/SellerPage";


const RouterCustom = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // State cho vai trò người dùng

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Thiết lập vai trò người dùng (user/admin/seller)
    console.log("Đã đăng nhập với vai trò:", role); // Kiểm tra vai trò trong console
  };
  // >>>>>>> manh

  return (
    <Routes>
      {/* <<<<<<< HEAD
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/google-login" element={<GoogleLogin />} />
      <Route path="/list" element={<ProductList />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/QRCode" element={<PaymentQRCode />} />
      <Route path="/confirmation" element={<OrderConfirmation />} />
      <Route path="/payment" element={<PaymentQRCode />} />
      <Route path="/ADSmartCart" element={<ADSmartCart />} />
      <Route path="/vendor" element={<VendorForm />} />
      <Route path="/dashboard" element={<DashboardLayout />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/contact" element={<Contact />} />
======= */}
      {/* Các route chung cho tất cả người dùng */}
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/productMa" element={<SellerPage/>} /> */}

      <Route path="/cart" element={<Cart />} />
      <Route path="/register-seller" element={<RegisterSeller />} />
      <Route path="/shipping-setting" element={<ShippingSetting />} />
      <Route path="/tax-information" element={<TaxInformation />} />
      <Route path="/identity-information" element={<IdentityInformation />} />
      <Route path="/check-registration" element={<SuccessRegistration />} />
      <Route path="/product-form" element={<ProductForm />} />
      <Route path="/product-management" element={<ProductManagement />} />
      <Route path="/registerseller" element={<RegisterSellerStep />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />





      {/* Test link route  */}
      <Route path="/product" element={<Product />} />
      <Route path="/list" element={<ProductList />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<PublicLayout />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        {/* Thêm các routes admin khác */}
      </Route>




      {/* Nếu đã đăng nhập */}
      {isLoggedIn ? (
        <>
          {userRole === "user" ? (
            <>
              <Route path="/product" element={<Product />} />
              <Route path="/list" element={<ProductList />} />
              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/QRCode" element={<PaymentQRCode />} />
              <Route path="/confirmation" element={<OrderConfirmation />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/register-seller" element={<RegisterSeller />} />
              <Route
                path="/shipping-setting"
                element={<ShippingSetting />}
              />{" "}
              {/* Thêm route này */}
            </>
          ) : (
            <Navigate to="/admin" replace />
          )}

          {userRole === "admin" ? (
            <Route path="/admin" element={<AdminDashboard />} />
          ) : null}

          {userRole === "seller" ? (
            <>
              <Route path="/register-seller" element={<RegisterSeller />} />
              <Route path="/shipping-setting" element={<ShippingSetting />} />
              {/* <Route path="/tax-information" element={<TaxInformation />} /> */}
            </>
          ) : null}
        </>
      ) : (
        <>
          {/* Các route cho người dùng chưa đăng nhập */}
          <Route path="/signup" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login onLoginSuccess={handleLoginSuccess} onClose={onClose} />
            }
          />
        </>
      )}

      {/* Các route khác */}
      <Route path="/ADSmartCart" element={<ADSmartCart />} />
      <Route path="/contact" element={<Contact />} />

      {/* Điều hướng đến trang chủ cho các route không xác định */}
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* >>>>>>> manh */}
    </Routes>
  );
};

export default RouterCustom;
