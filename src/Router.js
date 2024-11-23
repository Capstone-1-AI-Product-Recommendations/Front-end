/** @format */

// src/Router.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/homePage/HomePage";
import Cart from "./Components/Cart/Cart";
import LoginScreen from "./Pages/Login/LoginScreen";
import SignUpScreen from "./Pages/Login/SignUpScreen";
import GoogleLogin from "./Pages/Login/GoogleLogin";
import Product from "./Components/Product/Product";
import ProductList from "./Components/Product/ProductList";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import OrderSummary from "./Pages/Payment/OrderSummary";
import PaymentQRCode from "./Pages/Payment/PaymentQRCode";
import OrderConfirmation from "./Pages/Payment/OderConfirmation";
import Checkout from "./Pages/Payment/Checkout";
import AdminDashboard from "./Pages/masterLayout/AdminDashboard/AdminDashboard";
import ADSmartCart from "./Pages/ADShop/ADSmartCart";
import VendorForm from "./Pages/masterLayout/VendorForm/VendorForm";
import DashboardLayout from "./Pages/masterLayout/VendorForm/DashboardLayout";
import Contact from "./Components/Body/Contact";

const RouterCustom = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/google-login" element={<GoogleLogin />} />
      <Route path="/product" element={<Product />} />
      <Route path="/list" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
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
