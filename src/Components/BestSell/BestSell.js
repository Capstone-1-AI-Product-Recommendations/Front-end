/** @format */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from ".././Cart/CartContext";
import "./BestSell.css";

import productData from "../../data/product";
const BestSell = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHoverTimerActive, setIsHoverTimerActive] = useState(false);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    let interval;
    if (
      hoveredProduct !== null &&
      productData[hoveredProduct].altImages &&
      isHoverTimerActive
    ) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex >= productData[hoveredProduct].altImages.length - 1
            ? 0
            : prevIndex + 1
        );
      }, 1000);
    } else {
      setCurrentImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [hoveredProduct, isHoverTimerActive]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleMouseEnter = (index) => {
    setHoveredProduct(index);
    setTimeout(() => {
      setIsHoverTimerActive(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
    setIsHoverTimerActive(false);
  };

  return (
    <div className='new-product-container'>
      <div className='d-flex justify-content-between align-items-center mb-1'>
        <h4 className='mb-0'>
          Bán chạy nhất
          <span className='text-muted'>
            {" "}
            - Top sản phẩm bán chạy nhất trong tuần này.
          </span>
        </h4>
        <a href='#' className='view-all-btn'>
          Xem tất cả →
        </a>
      </div>
      <div className='product-grid'>
        {productData.map((product, index) => (
          <div
            key={product.id}
            className='product-card-container'
            onClick={() => handleProductClick(product.id)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className='product-card'>
              <span className='discount-badge'>{product.discount}</span>
              <div className='image-container'>
                <img
                  src={
                    hoveredProduct === index &&
                    product.altImages &&
                    product.altImages.length > 0
                      ? product.altImages[currentImageIndex]
                      : product.imageUrl
                  }
                  alt={product.title}
                  className='product-image'
                />
              </div>
              <span className='product-badge'>{product.badge}</span>
              <h6 className='product-title'>{product.title}</h6>
              <div className='rating'>
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={i < product.rating ? "star filled" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className='price'>
                <strong className='price-new'>{product.price}</strong>
                <span className='price-old'>
                  <del>{product.originalPrice}</del>
                </span>
              </p>
              <button
                className='btn-custom-cart'
                onClick={(e) => handleAddToCart(e, product)}
              >
                Thêm vào giỏ hàng <span className='ms-4'>+</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSell;
