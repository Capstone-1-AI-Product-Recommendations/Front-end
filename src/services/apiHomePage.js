import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // Đảm bảo đây là cổng đúng của backend
});

// API cho "Hàng mới về"
export const fetchNewProducts = () => API.get('/products/trending/');

// API cho "Sản phẩm nổi bật"
export const fetchFeaturedProducts = () => API.get('/products/featured/');

// API cho "Bán chạy nhất"
export const fetchBestSellingProducts = () => API.get('/recommendations/recommended/');

