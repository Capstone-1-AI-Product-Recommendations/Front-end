/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/FeaturedProduct.css";
import { FaHeart } from "react-icons/fa";
import featuredProducts from "../../data/FeaturedProduct"; // Import dữ liệu sản phẩm nổi bật

const FeaturedProduct = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (hoveredProduct !== null) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => ({
          ...prev,
          [hoveredProduct]:
            (prev[hoveredProduct] || 0) + 1 >= featuredProducts[hoveredProduct].images.length
              ? 0
              : (prev[hoveredProduct] || 0) + 1,
        }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hoveredProduct]);

  const handleMouseEnter = (index) => {
    setHoveredProduct(index);
    setCurrentImageIndex((prev) => ({ ...prev, [index]: 0 }));
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h4 className="mb-0">
          Sản phẩm nổi bật
          <span className="text-muted"> - Đừng bỏ lỡ các ưu đãi hiện tại cho đến cuối tháng 3.</span>
        </h4>
        <button
          className="btn view-all-btn"
          onClick={(e) => e.preventDefault()}
        >
          Xem tất cả →
        </button>
      </div>
      <div className="row">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className="col-lg-3 col-md-6 col-sm-12 mb-3"
            onClick={() => handleProductClick(product)}
          >
            <div
              className="card product-card h-100 border-0"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="row g-0">
                <div className="col-6 position-relative">
                  <div className="header-icons-container">
                    <div className="discount-badge">{product.discount}</div>
                    <div className="heart-icon">
                      <FaHeart />
                    </div>
                  </div>
                  <div className="image-container mb-2">
                    <img
                      src={product.images[currentImageIndex[index] || 0]}
                      alt={product.title}
                      className="img-fluid product-image rounded"
                    />
                    <div className="image-indicator d-flex justify-content-center mt-2">
                      {product.images.map((_, i) => (
                        <div
                          key={i}
                          className={`indicator-dot ${
                            i === (currentImageIndex[index] || 0) ? "active" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="badge bg-success text-uppercase product-badge">
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="col-6 d-flex flex-column justify-content-center">
                  <h6 className="product-title mb-2">{product.title}</h6>
                  <p className="price mb-0">
                    <strong className="price-new text-danger">
                      {product.price}
                    </strong>
                    <small className="text-muted ms-2">
                      <del>{product.originalPrice}</del>
                    </small>
                  </p>
                  <div className="rating mb-2 mt-2">
                    {Array.from({ length: 5 }, (_, idx) => (
                      <span
                        key={idx}
                        className={idx < product.rating ? "star filled" : "star"}
                      >
                        ★
                      </span>
                    ))}
                    <span className="reviews"> ({product.reviews})</span>
                  </div>
                  <button className="btn add-to-cart-product w-100 mt-3">
                    Thêm vào giỏ hàng
                    <span className="ms-2">+</span>
                  </button>
                </div>
              </div>
              <p className="note text-muted text-center mt-2">
                Remains until the end of the offer
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
