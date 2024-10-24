/** @format */

import React from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
// import Body from "./Components/Body/Body";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Body from "./Components/Body/Body";
import Sidebar from "./Components/Body/Sidebar";
import ProductAdBanner from "./Components/Body/ProductAdBanner";
import "./styles/MainLayout.css";
import FeaturesSection from "./Components/Body/FeaturesSection";
import MiniAdBanner from "./Components/Body/MiniAdBanner";
import NewProduct from "./Components/Body/NewProduct";
import FeaturedProduct from "./Components/Body/FeaturedProduct";
import Landing from "./Pages/homePage/HomePage";
import SignUpScreen from "./Pages/Login/SignUpScreen";
import Checkout from "./Pages/Payment/Checkout";
import LoginScreen from "./Pages/Login/LoginScreen";
import VendorForm from "./Pages/masterLayout/VendorForm/VendorForm";
import DashboardLayout from "./Pages/masterLayout/VendorForm/DashboardLayout";
const RouterCustom = () => {
  return (
    <>
      {/* <Landing /> */}
      {/* <LoginScreen /> */}
      {/* <SignUpScreen /> */}
      {/* <Checkout /> */}
      {/* <VendorForm /> */}
      <DashboardLayout />
    </>
  );
};

export default RouterCustom;
