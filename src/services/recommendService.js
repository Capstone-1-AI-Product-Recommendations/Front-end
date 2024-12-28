import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Tạo instance axios với cấu hình chung
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensure withCredentials is set here
  headers: {
    'Content-Type': 'application/json',
  },
});
// Thêm interceptor để xử lý token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gửi yêu cầu tạo task
export const createTask = async (userId) => {
  try {
    console.log("Creating task", userId);
    const response = await api.get(`/recommendations/recommendations/batch/${userId}/`);
    console.log("Lấy task thành công:", response.data.task_id);
    return response.data.task_id;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const getRecommendationStatus = async (taskId) => {
  try {
    console.log("Checking recommendation status", taskId);
    const response = await api.get(`/recommendations/recommendations/batch-status/${taskId}/`);
    return response.data.result || [];
  } catch (error) {
    console.error("Error checking recommendation status:", error);
    throw error;
  }
};

export const getBehaviorStatus = async () => {
  try {
    console.log("Checking behavior status");
    const response = await api.get(`/recommendations/recommend_behavior/`);
    return response.data.result || [];
  } catch (error) {
    console.error("Error checking behavior status:", error);
    throw error;
  }
};

export const combineResults = (recommendations, behaviorResults) => {
  const combinedResults = [
    ...behaviorResults,
    ...recommendations.filter(
      (rec) =>
        !behaviorResults.some((behavior) => behavior.product_id === rec.product_id)
    ),
  ];

  return combinedResults.map((item) => ({
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    imageUrl: item.image_url,
    rating: item.rating,
  }));
};

export const fetchCombinedResults = async (taskId) => {
  try {
    const recommendations = taskId ? await getRecommendationStatus(taskId) : [];
    const behaviorResults = await getBehaviorStatus();

    if (!recommendations.length && !behaviorResults.length) {
      console.log("No data found from both APIs.");
      return [];
    }

    const formattedResults = combineResults(recommendations, behaviorResults);

    console.log("Combined Results:", formattedResults);

    return formattedResults;
  } catch (error) {
    console.error("Error fetching combined results:", error);
    throw error;
  }
};
