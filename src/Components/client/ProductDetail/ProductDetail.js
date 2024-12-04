// // src/Components/ProductDetail/ProductDetail.js
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchProduct } from "../../../services/productAPI"; // Import API mới
// import { addToCart } from "../../../services/cartAPI"; // Đảm bảo bạn đã có API thêm sản phẩm vào giỏ
// import "./ProductDetail.css"; // Import CSS
// =======
// /** @format */

// src/components/ProductDetail.js
import React, { useContext, useState } from "react";
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
    setLikedComments(prev => {
      const isLiked = !prev[commentId];
      const newLikes = {...prev, [commentId]: isLiked};
      
      // Update the comment's like count in the product data
      const updatedComments = product.reviews.commentList.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: isLiked ? comment.likes + 1 : comment.likes - 1
          };
        }
        return comment;
      });

      // Update the product data (this is a simplified example, in a real app you'd probably want to update this on the server)
      product.reviews.commentList = updatedComments;

      return newLikes;
    });
  };

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail-container">
        <div className="product-main-info">
          <div className="row">
            {/* Phần hình ảnh */}
            <div className="col-12 col-md-5">
              <div className="product-images">
                <div className="main-image-container">
                  <img 
                    src={product.altImages[selectedImage]} 
                    alt={product.title} 
                    className="main-image"
                  />
                </div>
                <div className="thumbnail-images">
                  {product.altImages?.map((img, index) => (
                    <img 
                      key={index} 
                      src={img} 
                      alt={`${product.title} ${index + 1}`}
                      className={selectedImage === index ? 'selected' : ''}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Phần thông tin sản phẩm */}
            <div className="col-12 col-md-7">
              <div className="product-info">
                <h1>{product.title}</h1>
                
                <div className="rating-section">
                  <span className="rating">{product.rating}</span>
                  <div className="stars">{"⭐".repeat(Math.floor(product.rating))}</div>
                  <span className="reviews-count">{product.totalReviews} Đánh Giá</span>
                  <span className="sold-count">{product.totalSold} Đã Bán</span>
                  <button className="report-btn">Tố cáo</button>
                </div>

                <div className="price-section">
                  <span className="current-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                  <span className="discount-tag">-{product.discount}</span>
                </div>

                <div className="promotion-section">
                  <div className="promotion-title">Mã Giảm Giá Của Shop</div>
                  <div className="promotion-tags">
                    {product.promotions.map((promo, index) => (
                      <span key={index} className="promo-tag">
                        Giảm {promo.value}đ
                      </span>
                    ))}
                  </div>
                </div>

                <div className="policy-section">
                  <div className="policy-item">
                    <i className="fas fa-undo"></i>
                    <span>{product.shipping.returnPolicy}</span>
                    <span>{product.shipping.freeShipping}</span>
                  </div>
                </div>

                <div className="shipping-section">
                  <div className="shipping-title">Vận Chuyển</div>
                  <div className="shipping-info">
                    <i className="fas fa-truck"></i>
                    <span>Vận Chuyển Tới</span>
                    <select className="shipping-location">
                      <option>{product.shipping.location}</option>
                    </select>
                  </div>
                  <div className="shipping-fee">
                    <span>Phí Vận Chuyển: </span>
                    <span>₫{product.shipping.shippingFee.min} - ₫{product.shipping.shippingFee.max}</span>
                  </div>
                </div>

                <div className="quantity-section">
                  <span className="quantity-label">Số Lượng</span>
                  <div className="quantity-controls">
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={handleIncreaseQuantity}>+</button>
                  </div>
                  <span className="stock">{product.quantity.available} sản phẩm có sẵn</span>
                </div>

                <div className="action-buttons">
                  <button onClick={handleAddToCart} className="add-to-cart">
                    <i className="fas fa-cart-plus"></i>
                    Thêm Vào Giỏ Hàng
                  </button>
                  <button onClick={handleBuyNow} className="buy-now">
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details-table">
          <h2>CHI TIẾT SẢN PHẨM</h2>
          <table>
            <tbody>
              <tr>
                <td>Danh Mục</td>
                <td>
                  {product.details.category.map((cat, index) => (
                    <span key={index}>
                      {index > 0 && " > "}
                      {cat}
                    </span>
                  ))}
                </td>
              </tr>
              <tr>
                <td>Thương Hiệu</td>
                <td>{product.details.brand}</td>
              </tr>
              <tr>
                <td>Xuất Xứ</td>
                <td>{product.details.origin}</td>
              </tr>
              <tr>
                <td>Dung Tích</td>
                <td>{product.details.volume}</td>
              </tr>
              <tr>
                <td>Trọng Lượng</td>
                <td>{product.details.weight}</td>
              </tr>
              <tr>
                <td>Loại Da</td>
                <td>{product.details.skinType}</td>
              </tr>
              <tr>
                <td>Hạn Sử Dụng</td>
                <td>{product.details.expiryDate}</td>
              </tr>
              <tr>
                <td>Mã Sản Phẩm</td>
                <td>{product.details.sku}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="product-description-section">
          <h2>MÔ TẢ SẢN PHẨM</h2>
          <div className="description-content">
            {`${product.description.intro}

Loại da phù hợp: ${product.description.skinType}

Tình trạng da:
${product.description.skinConditions.join('\n')}

Ưu thế nổi bật:
${product.description.highlights.join('\n')}

Thành phần:
${product.description.ingredients}`}
          </div>
          <div className="description-tags">
            {product.description.tags.map((tag, index) => (
              <span key={index} className="description-tag">#{tag} </span>
            ))}
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
                {"★".repeat(Math.floor(product.reviews.averageRating))}
              </div>
            </div>
            
            <div className="rating-filters">
              <button className="filter-btn active">
                Tất Cả ({product.reviews.totalReviews})
              </button>
              {Object.entries(product.reviews.ratingDistribution).reverse().map(([stars, count]) => (
                <button key={stars} className="filter-btn">
                  {stars} Sao ({count})
                </button>
              ))}
            </div>

            <div className="review-types">
              <div className="review-type has-content">
                Có Bình Luận ({product.reviews.withComments})
              </div>
              <div className="review-type has-content">
                Có Hình Ảnh / Video ({product.reviews.withImages})
              </div>
            </div>
          </div>

          <div className="review-list">
            {product.reviews.commentList.map((comment) => (
              <div key={comment.id} className="review-item">
                <div className="review-header">
                  <span className="username">{comment.username}</span>
                  <span className="rating">{"★".repeat(comment.rating)}</span>
                  {comment.verified && <span className="verified-badge">Đã xác minh</span>}
                </div>
                <div className="review-date">{comment.date}</div>
                <div className="review-content">{comment.comment}</div>
                <div className="review-footer">
                  <button 
                    className={`like-button ${likedComments[comment.id] ? 'liked' : ''}`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <i className={`${likedComments[comment.id] ? 'fas' : 'far'} fa-thumbs-up`}></i>
                    Hữu ích?
                    <span className="like-count">{comment.likes}</span>
                  </button>
                  {comment.hasImage && <span className="has-image-badge">Có hình ảnh</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;