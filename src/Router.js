import React, { useState } from "react"; // Import useState
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate

// Các trang cơ bản
import HomePage from "./Pages/homePage/HomePage";
import Cart from "./Components/client/Cart/Cart";
import ProductList from "./Components/client/Product/ProductList";
import ProductDetail from "./Components/client/ProductDetail/ProductDetail";
import OrderSummary from "./Components/client/Payment/OrderSummary";
import PaymentQRCode from "./Components/client/Payment/PaymentQRCode";
import OrderConfirmation from "./Components/client/Payment/OderConfirmation";
import Checkout from "./Components/client/Payment/Checkout";
import ADSmartCart from "./Components/client/ADShop/ADSmartCart";
import Contact from "./Components/client/Contact/Contact";
import Filter from "./Components/client/Search/Filter/Filter";
import Search from "./Pages/Search/Search";

// Trang dành cho seller
import Register from "./Components/client/Register/Register";
import Login from "./Components/client/Login/Login";
import RegisterSeller from "./Pages/RegisterSeller/RegisterSeller";
import ShippingSetting from "./Components/seller/Register/ShippingSetting/ShippingSetting";
import TaxInformation from "./Components/seller/Register/TaxInformation/TaxInformation";
import IdentityInformation from "./Components/seller/Register/IdentityInformation/IdentityInformation";
import SuccessRegistration from "./Components/seller/Register/SuccessRegistration/SuccessRegistration";
import ProductForm from "./Components/seller/ProductForm/ProductForm";
import SellerProductManagement from "./Components/seller/SellerDashboard/SellerProductManagement/SellerProductManagement";
import SellerLayout from "./layouts/Seller/SellerLayout";
import SellerProducts from "./Components/seller/SellerDashboard/SellerProduct/SellerProducts";

// Trang dành cho admin
import AdminLayout from "./layouts/Admin/AdminLayout";
import PublicLayout from "./Components/admin/dashboard/Overview/PublicLayout";
import UserManagement from "./Components/admin/dashboard/UserManagement/UserManagement";
import AdminProductManagement from "./Components/admin/dashboard/AdminProductManagement/AdminProductManagement";
import Permission from "./Components/admin/Permission/Permission";

const RouterCustom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // State cho vai trò người dùng

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Thiết lập vai trò người dùng (user/admin/seller)
    console.log("Đã đăng nhập với vai trò:", role);
  };

  return (
    <Routes>
      {/* Các route chung cho tất cả người dùng */}
      <Route path="/" element={<HomePage userRole={userRole} />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/payment" element={<PaymentQRCode />} />
      <Route path="/confirmation" element={<OrderConfirmation />} />
      <Route path="/filter" element={<Filter />} />
      <Route path="/search" element={<Search />} />
      <Route path="/ADSmartCart" element={<ADSmartCart />} />

      {/* Nếu người dùng đã đăng nhập */}
      {isLoggedIn ? (
        <>
          {/* Điều hướng người dùng theo vai trò */}
          {userRole === "user" ? (
            <>
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/QRCode" element={<PaymentQRCode />} />
              <Route path="/confirmation" element={<OrderConfirmation />} />
            </>
          ) : null}

          {userRole === "admin" ? (
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<PublicLayout />} />
              <Route path="dashboard" element={<PublicLayout />} />
              <Route path="permissions" element={<Permission />} />
              <Route path="products" element={<AdminProductManagement />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
          ) : null}

          {userRole === "seller" ? (
            <>
              <Route path="/register-seller" element={<RegisterSeller />} />
              <Route path="/shipping-setting" element={<ShippingSetting />} />
              <Route path="/tax-information" element={<TaxInformation />} />
            </>
          ) : null}
        </>
      ) : (
        <>
          {/* Các route cho người dùng chưa đăng nhập */}
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </>
      )}

      {/* Điều hướng đến trang chủ cho các route không xác định */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouterCustom;
