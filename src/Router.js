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
const RouterCustom = () => {
  return (
    <>
      <Header />
      {/* <Body /> */}
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        {/* <Route path='/' element={<Sidebar />} */}
      </Routes>
      <div className='main-layout'>
        <Sidebar />
        <ProductAdBanner />
      </div>
      <FeaturesSection />
      <MiniAdBanner />
      <NewProduct />
      <FeaturedProduct />
      <Footer />
    </>
  );
};

export default RouterCustom;
