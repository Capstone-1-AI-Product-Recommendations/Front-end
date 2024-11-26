import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Các trang cơ bản
import HomePage from "./Pages/homePage/HomePage";
import Cart from "./Components/client/Cart/Cart";
import Product from "./Components/client/Product/Product";
import ProductList from "./Components/client/Product/ProductList";
import ProductDetail from "./Components/client/ProductDetail/ProductDetail";
import OrderSummary from "./Components/client/Payment/OrderSummary";
import PaymentQRCode from "./Components/client/Payment/PaymentQRCode";
import OrderConfirmation from "./Components/client/Payment/OderConfirmation";
import Checkout from "./Components/client/Payment/Checkout";
import ADSmartCart from "./Components/client/ADShop/ADSmartCart";
import DashboardLayout from "./Components/client/VendorForm/DashboardLayout";
import Contact from "./Components/client/Contact/Contact";

// Trang đăng ký/đăng nhập
import Register from "./Components/client/Register/Register";
import Login from "./Components/client/Login/Login";

// Trang seller
import RegisterSeller from "./Pages/RegisterSeller/RegisterSeller";
import ShippingSetting from "./Components/seller/ShippingSetting/ShippingSetting";
import TaxInformation from "./Components/seller/TaxInformation/TaxInformation";
import IdentityInformation from "./Components/seller/IdentityInformation/IdentityInformation";
import SuccessRegistration from "./Components/seller/SuccessRegistration/SuccessRegistration";
import ProductForm from "./Components/seller/ProductForm/ProductForm";
import ProductManagement from "./Components/seller/ProductManagement/ProductManagement";

// Admin pages
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./Components/admin/dashboard/Overview/PublicLayout";
import OrderManagement from "./Components/admin/orders/OrderManagement";

import ForgotPassword from "./Components/client/ForgotPassword/ForgotPassword";

const RouterCustom = ({ onClose }) => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/ProductDetail" element={<ProductDetail />} />
      <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      
      {/* Payment Routes */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/payment" element={<PaymentQRCode />} />
      <Route path="/confirmation" element={<OrderConfirmation />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login onClose={onClose} />} />
      <Route path="/register" element={<Register />} />
      
      {/* Seller Routes */}
      <Route path="/seller" element={<DashboardLayout />}>
        <Route path="register" element={<RegisterSeller />} />
        <Route path="shipping" element={<ShippingSetting />} />
        <Route path="tax" element={<TaxInformation />} />
        <Route path="identity" element={<IdentityInformation />} />
        <Route path="success" element={<SuccessRegistration />} />
        <Route path="product/add" element={<ProductForm />} />
        <Route path="products" element={<ProductManagement />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<PublicLayout />} />
        <Route path="orders" element={<OrderManagement />} />
      </Route>
      
      {/* Other Routes */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/smart-cart" element={<ADSmartCart />} />
      
      {/* Thêm route mới cho forgot password */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouterCustom;
