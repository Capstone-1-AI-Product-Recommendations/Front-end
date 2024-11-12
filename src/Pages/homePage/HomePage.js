import React, { useEffect, useState } from "react";
import ProductAdBanner from "../../Components/client/ProductAdBanner/ProductAdBanner";
import FeaturesSection from "../../Components/client/FeaturesSection/FeaturesSection";
import MiniAdBanner from "../../Components/client/MiniAdBanner/MiniAdBanner";
import NewProduct from "../../Components/client/NewProduct/NewProduct";
import FeaturedProduct from "../../Components/client/FeaturedProduct/FeaturedProduct";
import Sidebar from "../../Components/client/Sidebar/Sidebar";
import BestSellingProduct from "../../Components/client/BestSellingProduct/BestSellingProduct";
import Chatbot from "../../Components/client/Chatbot/Chatbot";
import "../../styles/MainLayout.css";
import { fetchNewProducts, fetchFeaturedProducts, fetchBestSellingProducts } from "../../services/apiHomePage"; 

const HomePage = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [BestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
    const getNewProducts = async () => {
      try {
        const response = await fetchNewProducts();
        setNewProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm mới về:", error);
      }
    };

    const getFeaturedProducts = async () => {
      try {
        const response = await fetchFeaturedProducts();
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm nổi bật:", error);
      }
    };

    const getBestSellingProducts = async () => {
      try {
        const response = await fetchBestSellingProducts();
        setBestSellingProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm bán chạy nhất:", error);
      }
    };

    getNewProducts();
    getFeaturedProducts();
    getBestSellingProducts();
  }, []);

  return (
    <div className='container-all'>
      <div className='main-layout'>
        <Sidebar />
        <ProductAdBanner />
      </div>
      <FeaturesSection />
      <MiniAdBanner />
      <NewProduct products={newProducts} /> {/* Truyền dữ liệu "Hàng mới về" */}
      <FeaturedProduct products={featuredProducts} /> {/* Truyền dữ liệu "Sản phẩm nổi bật" */}
      <BestSellingProduct products={BestSellingProducts} /> {/* Truyền dữ liệu "Bán chạy nhất" */}
      <Chatbot />
    </div>
  );
};

export default HomePage;