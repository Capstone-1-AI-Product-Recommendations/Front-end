/** @format */

import React from "react";
// import Header from "../../Components/Header/Header";
import ProductAdBanner from "../../Components/ProductAdBanner/ProductAdBanner";
import FeaturesSection from "../../Components/FeaturesSection/FeaturesSection";
import MiniAdBanner from "../../Components/MiniAdBanner/MiniAdBanner";
import NewProduct from "../../Components/NewProduct/NewProduct";
import FeaturedProduct from "../../Components/FeaturedProduct/FeaturedProduct";
// import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import BestSell from "../../Components/BestSell/BestSell";
import "../../styles/MainLayout.css";
import Chatbot from "../../Components/Chatbot/Chatbot";

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
        <Chatbot />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default HomePage;
