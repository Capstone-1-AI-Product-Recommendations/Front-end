// src/Components/ProductDetail/ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../../services/productAPI"; // Import API mới
import { addToCart } from "../../services/cartAPI"; // Đảm bảo bạn đã có API thêm sản phẩm vào giỏ
import "./ProductDetail.css"; // Import CSS

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const navigate = useNavigate(); // Hook để chuyển hướng người dùng
  const [product, setProduct] = useState(null); // Dữ liệu sản phẩm
  const [reviews, setReviews] = useState([]); // Dữ liệu đánh giá
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetchProduct(id); // Gọi API lấy thông tin sản phẩm
        setProduct(response.data); // Lưu thông tin sản phẩm vào state
        setReviews(response.data.comments); // Lưu đánh giá vào state
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      } finally {
        setLoading(false); // Kết thúc quá trình loading
      }
    };

    getProductDetails(); // Gọi hàm khi component mount
  }, [id]); // Gọi lại khi ID thay đổi

  if (loading) {
    return <div>Đang tải...</div>; // Hiển thị khi đang tải dữ liệu
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm!</div>; // Hiển thị khi không tìm thấy sản phẩm
  }

  // Hàm xử lý khi thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {
    try {
      await addToCart(product); // Gọi API thêm sản phẩm vào giỏ hàng
      navigate('/cart'); // Chuyển hướng tới trang giỏ hàng
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ:', error);
    }
  };

  // Hàm xử lý khi người dùng nhấn nút "Mua ngay"
  const handleBuyNow = async () => {
    try {
      await addToCart(product); // Thêm sản phẩm vào giỏ hàng
      navigate('/cart'); // Chuyển hướng tới trang giỏ hàng
    } catch (error) {
      console.error('Lỗi khi mua hàng:', error);
    }
  };

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.imageUrl} alt={product.title} />
      <div className="product-info">
        <p className="price">{product.price}</p>
        <p className="original-price">{product.originalPrice}</p>
        <p className="discount">{product.discount}</p>
        <div className="rating">
          {[...Array(product.rating)].map((_, index) => (
            <span key={index} className="star">★</span>
          ))}
        </div>
      </div>
      <div className="description">
        <h3>Mô tả sản phẩm</h3>
        <p>{product.fullDescription}</p>
      </div>

      {/* Nút "Thêm vào giỏ hàng" */}
      <div className="cart-buttons">
        <button className="buy-button" onClick={handleBuyNow}>Mua ngay</button>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>

      <div className="reviews">
        <h3>Đánh giá</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <strong className="username">{review.username}</strong>:{" "}
              <span className="comment">{review.comment}</span>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
