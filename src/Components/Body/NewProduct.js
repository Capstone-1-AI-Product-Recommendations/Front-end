/** @format */

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/NewProduct.css";
import productData from "../../data/product"; 

const NewProduct = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHoverTimerActive, setIsHoverTimerActive] = useState(false);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  // Xử lý logic thay đổi ảnh khi hover
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
      }, 1000); // Thay đổi ảnh mỗi giây
    } else {
      setCurrentImageIndex(0); // Reset về ảnh gốc nếu không hover
    }

    return () => clearInterval(interval);
  }, [hoveredProduct, isHoverTimerActive]);

  // Xử lý sự kiện click vào sản phẩm để điều hướng
  const handleProductClick = (productId) => {
    window.scrollTo(0, 0);
    navigate(`/product/${productId}`);
  };

  // Xử lý sự kiện thêm sản phẩm vào giỏ hàng và điều hướng tới trang chi tiết sản phẩm
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài khi thêm vào giỏ hàng
    addToCart(product); // Thêm sản phẩm vào giỏ hàng
    navigate(`/product/${product.id}`, { state: { product } }); // Điều hướng tới trang chi tiết sản phẩm
  };

  // Xử lý khi hover vào sản phẩm
  const handleMouseEnter = (index) => {
    setHoveredProduct(index);
    setTimeout(() => {
      setIsHoverTimerActive(true); // Kích hoạt timer sau một thời gian ngắn
    }, 200);
  };

  // Xử lý khi rời khỏi hover
  const handleMouseLeave = () => {
    setHoveredProduct(null);
    setIsHoverTimerActive(false); // Tắt timer khi rời khỏi hover
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h4 className="mb-0">
          Hàng mới về{" "}
          <span className="text-muted">
            - Đừng bỏ lỡ cơ hội giảm giá đặc biệt chỉ có trong tuần này.
          </span>
        </h4>
        <button className="btn view-all-btn" onClick={(e) => e.preventDefault()}>
          Xem tất cả →
        </button>
      </div>
      <div className="row">
        {productData.map((product, index) => (
          <div
            key={product.id}
            className="col-md-2 mb-3"
            onClick={() => handleProductClick(product.id)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card product-card h-100">
              <div className="card-body">
                <span className="discount-badge">{product.discount}</span>
                <div className="image-container">
                  <img
                    src={
                      hoveredProduct === index &&
                      product.altImages &&
                      product.altImages.length > 0
                        ? product.altImages[currentImageIndex]
                        : product.imageUrl
                    }
                    alt={product.title}
                    className="img-fluid product-image mb-3"
                  />
                </div>
                <span className="badge bg-success text-uppercase product-badge mb-2">
                  {product.badge}
                </span>
                <h6 className="product-title mb-2">{product.title}</h6>
                <div className="rating mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={i < product.rating ? "star filled" : "star"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="price mb-0 mt-2">
                  <strong className="price-new">{product.price}</strong>
                  <span className="text-muted ms-2 price-old">
                    <del>{product.originalPrice}</del>
                  </span>
                </p>
                <button
                  className="btn btn-custom-cart btn-sm mt-1 add-to-cart"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Thêm vào giỏ hàng
                  <span className="ms-4">+</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProduct;
