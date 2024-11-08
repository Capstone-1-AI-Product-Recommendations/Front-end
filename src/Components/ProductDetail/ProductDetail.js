import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/product";
import featuredProducts from "../../data/FeaturedProduct";
import { CartContext } from "../Cart/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); // Lấy hàm addToCart từ context
  const navigate = useNavigate(); // Khởi tạo navigate để điều hướng

  const product =
    products.find((prod) => prod.id === parseInt(id)) ||
    featuredProducts.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <div>Không có sản phẩm nào!</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    navigate("/cart"); // Điều hướng đến trang giỏ hàng sau khi thêm sản phẩm
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout"); // Điều hướng đến trang checkout sau khi thêm sản phẩm
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
        <div className="special-offers">
          <h3>Special Offer:</h3>
        </div>
        <div className="quantity-control">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <button onClick={handleAddToCart} className="add-to-cart">Thêm vào giỏ hàng</button>
        <button onClick={handleBuyNow} className="buy-now">Mua hàng</button>
        <div className="extra-info">
          <p>Payment and warranty information...</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
