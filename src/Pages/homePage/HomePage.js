import React, { useState, useEffect, useCallback } from "react";
import ProductAdBanner from "../../Components/client/ProductAdBanner/ProductAdBanner";
import FeaturesSection from "../../Components/client/FeaturesSection/FeaturesSection";
import MiniAdBanner from "../../Components/client/MiniAdBanner/MiniAdBanner";
import NewProduct from "../../Components/client/NewProduct/NewProduct";
import FeaturedProduct from "../../Components/client/FeaturedProduct/FeaturedProduct";
// import Sidebar from "../../Components/client/Sidebar/Sidebar";
import BestSellingProduct from "../../Components/client/BestSellingProduct/BestSellingProduct";
import Chatbot from "../../Components/client/Chatbot/Chatbot";
import "../../styles/MainLayout.css";
import { fetchNewProducts, fetchFeaturedProducts } from "../../services/apiHomePage";
import { createTask, checkTaskStatus } from "../../services/recommendService";
import { useNavigate } from "react-router-dom"; // Use Navigate hook

const HomePage = ({ userRole }) => {
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  // const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNewProducts = useCallback(async () => {
    try {
      const response = await fetchNewProducts();
      console.log("Data from fetchNewProducts:", response.data);
      setNewProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm mới về:", error);
    }
  }, []);

  const getFeaturedProducts = useCallback(async () => {
    try {
      const response = await fetchFeaturedProducts();
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm nổi bật:", error);
    }
  }, []);

  useEffect(() => {
    getNewProducts();
    getFeaturedProducts();
  }, [getNewProducts, getFeaturedProducts]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.user_id : null;

    if (userId) {
      // Tạo task ngay khi trang tải
      createTask(userId)
        .then((task_id) => {
          setTaskId(task_id);
          // Sau khi tạo task, kiểm tra trạng thái ngay lập tức
          return checkTaskStatus(task_id);
        })
        .then((data) => {
          setTaskStatus(data.status);

          if (data.status === "SUCCESS") {
            console.log("Recommendations:", data.result);
            setRecommendations(data.result); // Lưu kết quả nếu task thành công
          }
        })
        .catch((error) => {
          console.error("Error creating or checking task status:", error);
        });
    }
  }, []);
  
  return (
    <div className="container-all">
      <div className="main-layout">
        {/* <Sidebar /> */}
        <ProductAdBanner />
      </div>
      <FeaturesSection />
      <MiniAdBanner />
      <NewProduct products={newProducts} /> {/* Truyền dữ liệu "Hàng mới về" */}
      <FeaturedProduct products={featuredProducts} /> {/* Truyền dữ liệu "Sản phẩm nổi bật" */}
      <BestSellingProduct products={recommendations}/> {/* Truyền dữ liệu "Bán chạy nhất" */}
      <Chatbot />
    </div>
  );
};

export default HomePage;
