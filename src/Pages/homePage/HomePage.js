/** @format */

import React from "react";
import Header from "../../Components/Header/Header";
import ProductAdBanner from "../../Components/Body/ProductAdBanner";
import FeaturesSection from "../../Components/Body/FeaturesSection";
import MiniAdBanner from "../../Components/Body/MiniAdBanner";
import NewProduct from "../../Components/Body/NewProduct";
import FeaturedProduct from "../../Components/Body/FeaturedProduct";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Body/Sidebar";
import BestSell from "../../Components/Body/BestSell";
import "../../styles/MainLayout.css";

const HomePage = () => {
  return (
    <>
      <div className='container-all'>
        {/* <Header /> */}
        <div className='main-layout'>
          <Sidebar />
          <ProductAdBanner />
        </div>
        <FeaturesSection />
        <MiniAdBanner />
        <NewProduct />
        <FeaturedProduct />
        <BestSell />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default HomePage;
