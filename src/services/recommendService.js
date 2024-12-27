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

export const checkTaskStatus = async (taskId) => {
  try {
    console.log("Checking task status", taskId);
    const [recommendationResponse, behaviorResponse] = await Promise.all([
      api.get(`/recommendations/recommendations/batch-status/${taskId}/`),
      api.get(`/recommendations/recommend_behavior/`),
    ]);

    const recommendations = recommendationResponse.data.result || [];
    const behaviorResults = behaviorResponse.data.result || [];

    if (!recommendations.length && !behaviorResults.length) {
      console.log("No data found from both APIs.");
      return [];
    }

    const combinedResults = [
      ...behaviorResults,
      ...recommendations.filter(
        (rec) =>
          !behaviorResults.some((behavior) => behavior.product_id === rec.product_id)
      ),
    ];

    const formattedResults = combinedResults.map((item) => ({
      product_id: item.product_id,
      name: item.name,
      price: item.price,
      imageUrl: item.image_url,
      rating: item.rating,
    }));

    console.log("Combined Results:", formattedResults);

    return formattedResults;
  } catch (error) {
    console.error("Error checking task status:", error);
    throw error;
  }
};
