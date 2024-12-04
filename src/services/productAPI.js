// src/services/productAPI.js
import axios from 'axios';
import ProductDetailData from '../data/ProductDetailData';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
});

// Giả lập delay của API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API để lấy chi tiết sản phẩm
export const fetchProduct = async (productId) => {
  await delay(500); // Giả lập độ trễ mạng
  
  const product = ProductDetailData.find(p => p.id === parseInt(productId));
  
  if (!product) {
    throw new Error('Không tìm thấy sản phẩm');
  }
  
  return { data: product };
};

// API để lấy danh sách sản phẩm
export const fetchProducts = async () => {
  await delay(500);
  return { data: ProductDetailData };
};

// API để thêm sản phẩm vào giỏ hàng (giữ nguyên logic giả)
export const addToCart = async (product) => {
  await delay(300);
  return { data: { message: 'Thêm vào giỏ hàng thành công', product } };
};
