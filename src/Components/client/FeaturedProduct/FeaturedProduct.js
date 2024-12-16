import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FeaturedProduct.css";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Add this import

const PRODUCTS_PER_PAGE = 36;

const FeaturedProduct = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Add this line

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Get the current month name
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  useEffect(() => {
    let interval;
    if (hoveredProduct !== null && products[hoveredProduct].altImages) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => ({
          ...prev,
          [hoveredProduct]:
            (prev[hoveredProduct] || 0) + 1 >= products[hoveredProduct].altImages.length
              ? 0
              : (prev[hoveredProduct] || 0) + 1,
        }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hoveredProduct, products]);

  const handleMouseEnter = (index) => {
    setHoveredProduct(index);
    setCurrentImageIndex((prev) => ({ ...prev, [index]: 0 }));
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const range = 2;

    pageNumbers.push(1);

    if (currentPage <= range + 3) {
      for (let i = 2; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) pageNumbers.push("...");
    } else if (currentPage > range + 3 && currentPage < totalPages - range - 2) {
      pageNumbers.push("...");
      for (let i = currentPage - range; i <= currentPage + range; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
    } else {
      pageNumbers.push("...");
      for (let i = totalPages - 4; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className="featured-product-container">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h4 className="mb-0">
          Sản phẩm nổi bật
          <span className="text-muted">
            {" "} - Đừng bỏ lỡ các ưu đãi hiện tại cho đến khi kết thúc {currentMonth}.
          </span>
        </h4>
        <a href="#" className="view-all-btn">
          Tất cả →
        </a>
      </div>

      <div className="row">
        {currentProducts.map((product, index) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <div
              className="card product-card h-100 border-0"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleProductClick(product.product_id)} // Add this line
              style={{ cursor: 'pointer' }} // Add this line
            >
              <div className="row g-0">
                <div className="col-6 position-relative">
                  <div className="header-icons-container">
                    <div className="discount-badge">{product.discount}% </div>
                    <div className="heart-icon">
                      <FaHeart />
                    </div>
                  </div>
                  <div className="image-container mb-2">
                    <img
                      src={
                        product.altImages && product.altImages[currentImageIndex[index] || 0]
                          ? product.altImages[currentImageIndex[index] || 0]
                          : product.imageUrl
                      }
                      alt={product.title}
                      className="img-fluid product-image rounded"
                    />
                  </div>
                  <div className="image-indicator">
                    {product.altImages &&
                      product.altImages.map((_, i) => (
                        <div
                          key={i}
                          className={`indicator-dot ${i === (currentImageIndex[index] || 0) ? "active" : ""}`}
                        />
                      ))}
                  </div>
                </div>
                <div className="col-6 d-flex flex-column justify-content-center">
                  <h6 className="product-title mb-2">{product.title}</h6>
                  <p className="price mb-0">
                    <strong className="price-new text-danger">{product.price}</strong>
                    <small className="text-muted ms-2">
                      <del>{product.originalPrice}</del>
                    </small>
                  </p>
                  <div className="rating mb-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= Math.floor(product.rating);
                      const isHalf = star === Math.ceil(product.rating) && !Number.isInteger(product.rating);
                      const isEmpty = star > Math.ceil(product.rating);

                      return (
                        <span key={star} className={`star ${isFilled ? 'filled' : isHalf ? 'half' : 'empty'}`}>
                          {isFilled ? '★' : isHalf ? '★' : '☆'}
                        </span>
                      );
                    })}
                    <span className="reviews"> ({product.rating})</span>
                  </div>
                  <button className="add-to-cart-product w-100 mt-5">
                    Thêm vào giỏ hàng
                    <span className="ms-2">+</span>
                  </button>
                </div>
              </div>
              <p className="note text-muted text-center mt-2">Remains until the end of the offer</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* <div className="pagination">
        <button
          className="pagination-btn"
          onClick={goToFirstPage}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        <button
          className="pagination-btn"
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={page}
              className={`pagination-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="pagination-btn"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          className="pagination-btn"
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div> */}
    </div>
  );
};

export default FeaturedProduct;
