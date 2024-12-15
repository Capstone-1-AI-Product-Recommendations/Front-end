//Router.js

import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
import AccountManagement from "./Components/client/AccountManagement/AccountManagement";



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
import Inventory from "./Components/seller/SellerDashboard/Inventory/Inventory";
import Chatbox from "./Components/seller/SellerDashboard/Chatbox/Chatbox";
import Statistics from "./Components/seller/SellerDashboard/Statistics/Statistics";
import Order from "./Components/seller/SellerDashboard/Order/Order";

// Trang dành cho admin
import AdminLayout from "./layouts/Admin/AdminLayout";
import PublicLayout from "./Components/admin/Dashboard/Overview/PublicLayout";
import UserManagement from "./Components/admin/Dashboard/UserManagement/UserManagement";
import AdminProductManagement from "./Components/admin/Dashboard/AdminProductManagement/AdminProductManagement";
import Permission from "./Components/admin/Permission/Permission";

const RouterCustom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // State cho vai trò người dùng
  const navigate = useNavigate(); // Sử dụng navigate để điều hướng

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Thiết lập vai trò người dùng (user/admin/seller)
    console.log("Đã đăng nhập với vai trò:", role);
    // Lưu vai trò người dùng vào localStorage
    localStorage.setItem("userRole", role);
    console.log("đã phân quyền với: ", role);
    localStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái đăng nhập
    localStorage.setItem("user", JSON.stringify({ role })); // 
    navigate("/"); // Đi đến trang chủ sau khi đăng nhập
  };

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const userRoleStorage = localStorage.getItem("user");
    console.log("Đăng nhập với user: ", userRoleStorage);

    // Check if userRoleStorage is not null before parsing
    if (userRoleStorage) {
      const parsedUser = JSON.parse(userRoleStorage); // Parse chuỗi JSON thành đối tượng

      // Check if parsedUser is not null and has a role property
      if (parsedUser && parsedUser.role) {
        console.log("Đã đăng nhập với quyền: ", parsedUser.role);
        setIsLoggedIn(true);
        setUserRole(parsedUser.role);
      } else {
        console.log("Parsed user is null or does not have a role property");
      }
    } else {
      console.log("No user found in localStorage");
    }
  }, []);

  console.log("User role: ", userRole);
  console.log("Is login: ", isLoggedIn);

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
      <Route path="/profile" element={<AccountManagement />} />

      {/* Nếu người dùng đã đăng nhập */}
      {isLoggedIn ? (
        <>
          {/* Điều hướng người dùng theo vai trò */}
          {userRole === "user" ? (
            <>
              <Route path="/product-list" element={<ProductList />} />
      <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      <Route path="/profile" element={<AccountManagement />} />

              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/QRCode" element={<PaymentQRCode />} />
              <Route path="/confirmation" element={<OrderConfirmation />} />
              <Route path="/register-seller" element={<RegisterSeller />} />
              <Route path="/shipping-setting" element={<ShippingSetting />} />
              <Route path="/tax-information" element={<TaxInformation />} />
              <Route
                path="/identity-information"
                element={<IdentityInformation />}
              />
              <Route
                path="/check-registration"
                element={<SuccessRegistration />}
              />
              <Route path="/product-form" element={<ProductForm />} />
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
            <Route path="/seller-dashboard" element={<SellerLayout />}>
              <Route path="users" element={<UserManagement />} />
              <Route path="products" element={<SellerProducts />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="chatbox" element={<Chatbox />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="order" element={<Order />} />
            </Route>
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
