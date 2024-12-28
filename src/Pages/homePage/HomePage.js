import React, { useState, useEffect, useCallback } from "react";
import ProductAdBanner from "../../Components/client/ProductAdBanner/ProductAdBanner";
import FeaturesSection from "../../Components/client/FeaturesSection/FeaturesSection";
import MiniAdBanner from "../../Components/client/MiniAdBanner/MiniAdBanner";
import NewProduct from "../../Components/client/NewProduct/NewProduct";
import FeaturedProduct from "../../Components/client/FeaturedProduct/FeaturedProduct";
import BestSellingProduct from "../../Components/client/BestSellingProduct/BestSellingProduct";
import Chatbot from "../../Components/client/Chatbot/Chatbot";
import "../../styles/MainLayout.css";
import { fetchNewProducts, fetchFeaturedProducts } from "../../services/apiHomePage";
import { createTask, fetchCombinedResults } from "../../services/recommendService";
import { useNavigate } from "react-router-dom"; // Use Navigate hook

const HomePage = ({ userRole }) => {
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Hide notification after 3 seconds
  };

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
      console.log("Data from fetchFeaturedProducts:", response.data);
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
          return fetchCombinedResults(task_id);
        })
        .then((recommendations) => {
          setRecommendations(recommendations); // Lưu kết quả trực tiếp
        })
        .catch((error) => {
          console.error("Error creating or checking task status:", error);
        });
    } else {
      // Nếu không có userId, chỉ lấy behavior status
      fetchCombinedResults(null)
        .then((recommendations) => {
          setRecommendations(recommendations); // Lưu kết quả trực tiếp
        })
        .catch((error) => {
          console.error("Error fetching behavior status:", error);
        });
    }
  }, []);

  console.log("Featured Products:", recommendations);
  return (
    <div className="container-all">
      {notification && <div className="notification">{notification}</div>}
      <div className="main-layout">
        <ProductAdBanner />
      </div>
      <FeaturesSection />
      <MiniAdBanner />
      <NewProduct products={newProducts} showNotification={showNotification} /> {/* Pass showNotification */}
      <FeaturedProduct products={featuredProducts} showNotification={showNotification} /> {/* Pass showNotification */}
      <BestSellingProduct products={recommendations} showNotification={showNotification} /> {/* Pass showNotification */}
      <Chatbot />
    </div>
  );
};

export default HomePage;
