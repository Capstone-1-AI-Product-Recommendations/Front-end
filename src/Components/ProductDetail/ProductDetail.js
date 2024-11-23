import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/product";
import featuredProducts from "../../data/FeaturedProduct";
import { CartContext } from "../Cart/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const product =
    products.find((prod) => prod.id === parseInt(id)) ||
    featuredProducts.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <div>Không có sản phẩm nào!</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    navigate("/cart");
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="product-detail">
      <div className="product-images">
        <img src={product.imageUrl || product.images[0]} alt={product.title} className="main-image" />
        <div className="thumbnail-images">
          {(product.altImages || product.images.slice(1)).map((img, index) => (
            <img key={index} src={img} alt={`${product.title} thumbnail ${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.title}</h1>
        <div className="product-rating">
          {"⭐".repeat(product.rating)}
        </div>
        <p className="product-description-text">{product.description}</p>
        {product.discount && <span className="discount">{product.discount}</span>}
        <p className="price">
          <span className="current-price">{product.price}</span>
          <span className="original-price">{product.originalPrice}</span>
        </p>       
        <div className="quantity-control">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <button onClick={handleAddToCart} className="add-to-cart">Thêm vào giỏ hàng</button>
        <button onClick={handleBuyNow} className="buy-now">Mua hàng</button>
        <div className="extra-info">
        </div>

        {/* Thêm phần mô tả chi tiết sản phẩm */}
        <div className="product-full-description">
          <h3>Mô tả sản phẩm</h3>
          <p>{product.fullDescription || "Không có mô tả chi tiết nào cho sản phẩm này."}</p>
        </div>  

        {/* Thêm phần đánh giá và bình luận */}
        <div className="product-reviews">
          <h3>Đánh giá và Bình luận</h3>
          {product.comments && product.comments.length > 0 ? (
            product.comments.map((comment) => (
              <div key={comment.id} className="review">
                <strong>{comment.username}:</strong>
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
