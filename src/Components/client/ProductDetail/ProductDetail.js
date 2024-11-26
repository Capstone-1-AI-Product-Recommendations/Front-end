/** @format */

// src/components/ProductDetail.js
import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import ProductDetailData from "../../../data/ProductDetailData";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [likedComments, setLikedComments] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Nếu không có id, lấy sản phẩm đầu tiên
  const product = id 
    ? ProductDetailData.find(prod => prod.id === parseInt(id))
    : ProductDetailData[0];

  if (!product) {
    return <div>Không tìm thấy sản phẩm!</div>;
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: quantity
    });
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    navigate("/cart");
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity: quantity
    });
    navigate("/checkout");
  };

  const handleLike = (commentId) => {
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  return (
    <div className="product-detail-container">
      <div className="product-main-info">
        <div className="product-images">
          <img 
            src={product.altImages ? product.altImages[selectedImage] : product.imageUrl} 
            alt={product.title} 
            className="main-image" 
          />
          <div className="thumbnail-images">
            {product.altImages?.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${product.title} thumbnail ${index + 1}`}
                className={selectedImage === index ? 'selected' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="product-meta">
            <div className="price-section">
              <span className="current-price">{product.price}</span>
              {product.originalPrice && (
                <span className="original-price">{product.originalPrice}</span>
              )}
              {product.discount && <span className="discount">{product.discount}</span>}
            </div>
            <div className="rating">
              {"⭐".repeat(product.rating)}
              <span>({product.rating}/5)</span>
            </div>
          </div>

          <div className="details-section">
            {product.details && Object.entries(product.details).map(([key, value]) => (
              <div key={key} className="detail-item">
                <span className="detail-label">{key}:</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="quantity-section">
            <span>Số lượng:</span>
            <div className="quantity-controls">
              <button onClick={handleDecreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleAddToCart} className="add-to-cart">
              Thêm vào giỏ hàng
            </button>
            <button onClick={handleBuyNow} className="buy-now">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      <div className="product-description-section">
        <h2>MÔ TẢ SẢN PHẨM</h2>
        <div className="description-content">
          <pre>{product.description}</pre>
        </div>
      </div>

      <div className="product-reviews-section">
        <h2>ĐÁNH GIÁ SẢN PHẨM</h2>
        <div className="reviews-summary">
          <div className="rating-overview">
            <div className="average-rating">
              <span className="rating-number">{product.reviews.averageRating}</span>
              <span className="rating-total">trên 5</span>
            </div>
            <div className="rating-stars">
              {"★".repeat(product.reviews.averageRating)}
            </div>
          </div>
          
          <div className="rating-filters">
            <button className="filter-btn active">
              Tất Cả ({product.reviews.totalReviews})
            </button>
            <button className="filter-btn">
              5 Sao ({product.reviews.fiveStar})
            </button>
            <button className="filter-btn">
              4 Sao ({product.reviews.fourStar})
            </button>
            <button className="filter-btn">
              3 Sao ({product.reviews.threeStar})
            </button>
            <button className="filter-btn">
              2 Sao ({product.reviews.twoStar})
            </button>
            <button className="filter-btn">
              1 Sao ({product.reviews.oneStar})
            </button>
          </div>

          <div className="review-types">
            <div className="review-type has-content">
              Có Bình Luận ({product.reviews.hasComments})
            </div>
            <div className="review-type has-content">
              Có Hình Ảnh / Video ({product.reviews.hasImages})
            </div>
          </div>
        </div>

        <div className="reviews-list">
          {product.reviews.commentList.map((comment) => (
            <div key={comment.id} className="review-item">
              <div className="reviewer-info">
                <div className="reviewer-name-rating">
                  <span className="reviewer-name">{comment.username}</span>
                  <div className="rating-stars">
                    {"★".repeat(comment.rating)}
                  </div>
                </div>
                <div className="review-date">{comment.date}</div>
              </div>
              
              <div className="review-content">
                {comment.comment}
              </div>
              
              <div className="review-footer">
                <div className="like-button">
                  <button 
                    onClick={() => handleLike(comment.id)}
                    className={`like-btn ${likedComments[comment.id] ? 'liked' : ''}`}
                  >
                    {likedComments[comment.id] ? 'Đã Thích' : 'Thích'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
