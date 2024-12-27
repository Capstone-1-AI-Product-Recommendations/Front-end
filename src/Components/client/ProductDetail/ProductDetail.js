import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import "./ProductDetail.css";
import productService from "../../../services/productService";
import cartService from "../../../services/cartService";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, updateCartItems, updateCart, handleCartUpdate, updateCartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [likedComments, setLikedComments] = useState({});
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // State for description expansion
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false); // State for details expansion

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductDetails(id);
        console.log("Product data:", response);
        setProduct(response); // Direct use of response since axios parses JSON
        setError(null);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const comments = await productService.getComments(id);
        setProduct(prevProduct => ({ ...prevProduct, comments }));
      } catch (error) {
        console.error("Error fetching product comments:", error);
      }
    };

    if (id) {
      fetchProduct();
      fetchComments();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'))?.user_id;
      if (!userId) {
        navigate('/login');
        return;
      }

      await cartService.addToCart(userId, {
        product_id: id,
        quantity: quantity
      });

      // Show notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);

      // Get updated cart data and update count
      const cartData = await cartService.getCart(userId);
      if (cartData && cartData.items) {
        const total = cartData.items.reduce((sum, shop) => {
          return sum + shop.items.reduce((shopTotal, item) => {
            return shopTotal + (parseInt(item.quantity) || 0);
          }, 0);
        }, 0);
        updateCartCount(total);
      }

      // Dispatch event for other components
      window.dispatchEvent(new Event('cartUpdated'));

    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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
      const newLikes = { ...prev, [commentId]: isLiked };
      return newLikes;
    });
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  return (
    <div className="product-detail-wrapper">
      {showNotification && (
        <div className="notification-popup">
          Thêm vào giỏ hàng thành công!
        </div>
      )}
      <div className="product-detail-container">
        <div className="product-main-info">
          <div className="row">
            <div className="col-12 col-md-5">
              <div className="product-images">
                <div className="main-image-container">
                  <img
                    src={product.images[selectedImage].file}
                    alt={product.name}
                    className="main-image"
                  />
                </div>
                <div className="thumbnail-images">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.file}
                      alt={`${product.name} ${index + 1}`}
                      className={selectedImage === index ? 'selected' : ''}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-7">
              <div className="product-info">
                <h1>{product.name}</h1>

                <div className="rating-section">
                  <span className="rating">{product.rating}</span>
                  <div className="stars">{"⭐".repeat(Math.floor(product.rating))}</div>
                  <span className="reviews-count">{product.review_count} Đánh Giá</span>
                  <button className="report-btn">Tố cáo</button>
                </div>

                <div className="price-section">
                  <span className="current-price">{product.price}đ</span>
                </div>

                <div className="quantity-section">
                  <span className="quantity-label">Số Lượng</span>
                  <div className="quantity-controls">
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={handleIncreaseQuantity}>+</button>
                  </div>
                  <span className="stock">{product.quantity} sản phẩm có sẵn</span>
                </div>

                <div className="action-buttons">
                  <button
                    onClick={handleAddToCart}
                    className="add-to-cart"
                    disabled={product.quantity <= 1}
                  >
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
          <div className={`details-content ${isDetailsExpanded ? 'expanded' : 'collapsed'}`}>
            <table>
              <tbody>
                {product.detail_product?.split("\n").map((row, index) => {
                  const [key, value] = row.split(":").map(item => item.trim());
                  return (
                    <tr key={index}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button onClick={toggleDetails} className="toggle-details-btn">
            {isDetailsExpanded ? 'Thu gọn' : 'Xem thêm'}
          </button>
        </div>

        <div className="product-description-section">
          <h2>MÔ TẢ SẢN PHẨM</h2>
          <div className={`description-content ${isDescriptionExpanded ? 'expanded' : 'collapsed'}`}>
            {product.description?.split('\\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <button onClick={toggleDescription} className="toggle-description-btn">
            {isDescriptionExpanded ? 'Thu gọn' : 'Xem thêm'}
          </button>
        </div>

        <div className="product-reviews-section">
          <h2>ĐÁNH GIÁ SẢN PHẨM</h2>
          <div className="reviews-summary">
            <div className="rating-overview">
              <div className="average-rating">
                <span className="rating-number">{product.rating}</span>
                <span className="rating-total">trên 5</span>
              </div>
              <div className="rating-stars">
                {"★".repeat(Math.floor(product.rating))}
              </div>
            </div>
          </div>

          <div className="review-list">
            {product.comments.map((comment) => (
              <div key={comment.id} className="review-item">
                <div className="review-header">
                  <img
                    src={comment.avatar}
                    alt="avatar"
                    className="avatar"
                  />
                  <span className="username">{comment.full_name}</span>
                  <span className="rating">{"★".repeat(comment.rating)}</span>
                </div>
                <div className="review-date">{new Date(comment.created_at).toLocaleDateString()}</div>
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