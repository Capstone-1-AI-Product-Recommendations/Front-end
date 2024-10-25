/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/homePage/HomePage";
import OrderSummary from "./Pages/Payment/OrderSummary";
import PaymentQRCode from "./Pages/Payment/PaymentQRCode";
import OrderConfirmation from "./Pages/Payment/OderConfirmation";
import ADSmartCart from "./Pages/ADShop/ADSmartCart";
import LoginScreen from "./Pages/Login/LoginScreen";
import SignUpScreen from "./Pages/Login/SignUpScreen";
import VendorForm from "./Pages/masterLayout/VendorForm/VendorForm";
// import { DashboardContent } from "./Pages/masterLayout/VendorForm/DashboardComponents";
import DashboardLayout from "./Pages/masterLayout/VendorForm/DashboardLayout";
import Checkout from "./Pages/Payment/Checkout";

const RouterCustom = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} /> {/* Trang chủ */}
      {/* <Route path='/cart' element={<ADSmartCart />} /> Giỏ hàng */}
      <Route path='/order-summary' element={<OrderSummary />} />{" "}
      {/* Tóm tắt đơn hàng */}
      <Route path='/QRCode' element={<PaymentQRCode />} />{" "}
      {/* Mã QR thanh toán */}
      <Route path='/confirmation' element={<OrderConfirmation />} />{" "}
      {/* Xác nhận đơn hàng */}
      <Route path='/payment' element={<PaymentQRCode />} />{" "}
      {/* Xác nhận đơn hàng */}
      <Route path='/ADSmartCart' element={<ADSmartCart />} />{" "}
      <Route path='/login' element={<LoginScreen />} />{" "}
      <Route path='/signup' element={<SignUpScreen />} />{" "}
      <Route path='/vendor' element={<VendorForm />} />{" "}
      <Route path='/dashboard' element={<DashboardLayout />} />{" "}
      <Route path='/checkout' element={<Checkout />} />{" "}

    </Routes>
  );
};

export default RouterCustom;
