import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom"; // Use Navigate hook

const HomePage = ({ userRole }) => {
  const navigate = useNavigate();
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

  // Hàm xử lý khi nhấn "Trở thành người bán"
  const handleBecomeSeller = () => {
    if (userRole === "user") {
      navigate("/signup"); // Chuyển đến trang đăng ký nếu là user
    } else if (userRole === "seller") {
      navigate("/register-seller"); // Chuyển đến trang quản lý seller
    } else if (userRole === "admin") {
      navigate("/admin"); // Chuyển đến trang admin
    }
  };

  return (
    <div className="container-all">
      <div className="main-layout">
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
