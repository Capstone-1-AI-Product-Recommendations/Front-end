import React, { useState } from "react"; // Import useState
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate

// Các trang cơ bản
import HomePage from "./Pages/homePage/HomePage";
import Cart from "./Components/client/Cart/Cart";
// import Product from "./Components/client/Product/Product"
import ProductList from "./Components/client/Product/ProductList";
import ProductDetail from "./Components/client/ProductDetail/ProductDetail";
import OrderSummary from "./Components/client/Payment/OrderSummary";
import PaymentQRCode from "./Components/client/Payment/PaymentQRCode";
import OrderConfirmation from "./Components/client/Payment/OderConfirmation";
import Checkout from "./Components/client/Payment/Checkout";
import ADSmartCart from "./Components/client/ADShop/ADSmartCart";
// import VendorForm from "./Components/client/VendorForm/VendorForm";
// import SellerDashboard from "./Components/client/VendorForm/SellerDashboard";
import Contact from "./Components/client/Contact/Contact";

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
import RegisterSellerStep from "./Pages/RegisterSeller/RegisterSeller";
import SellerLayout from "./layouts/Seller/SellerLayout";
import SellerProducts from "./Components/seller/SellerDashboard/SellerProduct/SellerProducts";

//Trang dành cho admin
import AdminLayout from "./layouts/Admin/AdminLayout";
// import OrderManagement from "./Components/admin/orders/OrderManagement";
import PublicLayout from "./Components/admin/Dashboard/Overview/PublicLayout";
import UserManagement from "./Components/admin/Dashboard/UserManagement/UserManagement"; // Import component UserManagement
import AdminProductManagement from "./Components/admin/Dashboard/AdminProductManagement/AdminProductManagement";
import Permission from "./Components/admin/Permission/Permission";

const RouterCustom = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // State cho vai trò người dùng

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Thiết lập vai trò người dùng (user/admin/seller)
    console.log("Đã đăng nhập với vai trò:", role); // Kiểm tra vai trò trong console
  };

  return (
    <Routes>
      {/* Các route chung cho tất cả người dùng */}
      <Route path="/" element={<HomePage userRole={userRole} />} />
      <Route path="/contact" element={<Contact />} />
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<ProductList />} />
      {/* <Route path="/product/:id" element={<Product />} /> */}
      <Route path="/ProductDetail" element={<ProductDetail />} />
      <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      {/* Payment Routes */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/payment" element={<PaymentQRCode />} />
      <Route path="/confirmation" element={<OrderConfirmation />} />
      

      {/* Test link route  */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/ADSmartCart" element={<ADSmartCart />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register-seller" element={<RegisterSeller />} />
      <Route path="/shipping-setting" element={<ShippingSetting />} />
      <Route path="/tax-information" element={<TaxInformation />} />
      <Route path="/identity-information" element={<IdentityInformation />} />
      <Route path="/check-registration" element={<SuccessRegistration />} />
      <Route path="/product-form" element={<ProductForm />} />
      <Route
        path="/product-seller-management"
        element={<SellerProductManagement />}
      />
      <Route path="/sellerRegisterstep" element={<RegisterSellerStep />} />{" "}
      {/* <Route path="/product" element={<Product/>} /> */}
      <Route path="/list" element={<ProductList />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<PublicLayout />} />
        <Route path="dashboard" element={<PublicLayout />} />
        <Route path="permissions" element={<Permission />} />
        <Route path="products" element={<AdminProductManagement />} />
        <Route path="users" element={<UserManagement />} />
        {/* Thêm các routes admin khác */}
      </Route>
      <Route path="seller-dashboard" element={<SellerLayout />}>
        <Route path="users" element={<UserManagement />} />
        <Route path="products" element={<SellerProducts />} />
      </Route>
      {/* Nếu đã đăng nhập */}
      {isLoggedIn ? (
        <>
          {userRole === "user" ? (
            <>
              {/* <Route path="/product" element={<Product />} /> */}
              <Route path="/list" element={<ProductList />} />
              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/QRCode" element={<PaymentQRCode />} />
              <Route path="/confirmation" element={<OrderConfirmation />} />
              <Route path="/register-seller" element={<RegisterSeller />} />
              <Route
                path="/shipping-setting"
                element={<ShippingSetting />}
              />{" "}
              <Route
                path="/sellerRegisterstep"
                element={<RegisterSellerStep />}
              />{" "}
              {/* Thêm route này */}
            </>
          ) : (
            <Navigate to="/admin" replace />
          )}

          {userRole === "admin" ? (
            <Route path="/admin" element={<AdminLayout />} />
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
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
        </>
      )}
      {/* Điều hướng đến trang chủ cho các route không xác định */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouterCustom;
