/** @format */
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/homePage/HomePage";
import Cart from "./Components/Cart/Cart";
import LoginScreen from "./Components/Login/LoginScreen";
import SignUpScreen from "./Components/Login/SignUpScreen";
import GoogleLogin from "./Components/Login/GoogleLogin";
import Product from "./Components/Product/Product";
import ProductList from "./Components/Product/ProductList";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import OrderSummary from "./Components/Payment/OrderSummary";
import PaymentQRCode from "./Components/Payment/PaymentQRCode";
import OrderConfirmation from "./Components/Payment/OderConfirmation";
import Checkout from "./Components/Payment/Checkout";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ADSmartCart from "./Components/ADShop/ADSmartCart";
import VendorForm from "./Components/VendorForm/VendorForm";
import DashboardLayout from "./Components/VendorForm/DashboardLayout";
import Contact from "./Components/Contact/Contact";

const RouterCustom = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/signup' element={<SignUpScreen />} />
      <Route path='/login' element={<LoginScreen/>} />
      
      <Route path='/google-login' element={<GoogleLogin />} />
      <Route path='/product' element={<Product/>} />
      <Route path='/list' element={<ProductList />} />
      <Route path='/product-detail' element={<ProductDetail />} />
      <Route path='/order-summary' element={<OrderSummary />} />
      <Route path='/QRCode' element={<PaymentQRCode />} />
      <Route path='/confirmation' element={<OrderConfirmation />} />
      <Route path='/payment' element={<PaymentQRCode />} />
      <Route path='/ADSmartCart' element={<ADSmartCart />} />
      <Route path='/vendor' element={<VendorForm />} />
      <Route path='/dashboard' element={<DashboardLayout />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/contact' element={<Contact />} />
    </Routes>
  );
};

export default RouterCustom;
