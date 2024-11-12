import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/homePage/HomePage";
import Cart from "./Components/client/Cart/Cart";
import LoginScreen from "./Components/client/Login/LoginScreen";
import SignUpScreen from "./Components/client/Login/SignUpScreen";
import GoogleLogin from "./Components/client/Login/GoogleLogin";
import Product from "./Components/client/Product/Product";
import ProductList from "./Components/client/Product/ProductList";
import ProductDetail from "./Components/client/ProductDetail/ProductDetail";
import OrderSummary from "./Components/client/Payment/OrderSummary";
import PaymentQRCode from "./Components/client/Payment/PaymentQRCode";
import OrderConfirmation from "./Components/client/Payment/OderConfirmation";
import Checkout from "./Components/client/Payment/Checkout";
import AdminDashboard from "./Components/admin/AdminDashboard/AdminDashboard";
import ADSmartCart from "./Components/client/ADShop/ADSmartCart";
import VendorForm from "./Components/client/VendorForm/VendorForm";
import DashboardLayout from "./Components/client/VendorForm/DashboardLayout";
import Contact from "./Components/client/Contact/Contact";

const RouterCustom = ({ onLoginSuccess, onClose }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/login" element={<LoginScreen onLoginSuccess={onLoginSuccess} onClose={onClose} />} />
      <Route path="/google-login" element={<GoogleLogin />} />
      <Route path="/product" element={<Product />} />
      <Route path="/list" element={<ProductList />} />
      <Route path="/product-detail" element={<ProductDetail />} />
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
    </Routes>
  );
};

export default RouterCustom;
