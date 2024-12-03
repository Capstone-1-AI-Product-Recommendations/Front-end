import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../client/Cart/CartContext";
import "./NewProduct.css";

const PRODUCTS_PER_PAGE = 36;

const NewProduct = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHoverTimerActive, setIsHoverTimerActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    let interval;
    if (
      hoveredProduct !== null &&
      products[hoveredProduct]?.altImages &&
      isHoverTimerActive
    ) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex >= products[hoveredProduct].altImages.length - 1
            ? 0
            : prevIndex + 1
        );
      }, 1000);
    } else {
      setCurrentImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [hoveredProduct, isHoverTimerActive, products]);

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
    const range = 2; // Number of pages to show before and after the current page

    // Always show the first page
    pageNumbers.push(1);

    // Show the first five pages initially, or when close to the beginning
    if (currentPage <= range + 3) {
      for (let i = 2; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) {
        pageNumbers.push("...");
      }
    }
    // Show ellipsis, the current range, and the last page when further along
    else if (currentPage > range + 3 && currentPage < totalPages - range - 2) {
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

    // Always show the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="new-product-container">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h4 className="mb-0">
          Hàng mới về 
          <span className="text-muted">
            {" "} - Đừng bỏ lỡ các chương trình giảm giá đặc biệt chỉ có trong tuần này.
          </span>
        </h4>
        <a href="#" className="view-all-btn">
          Tất cả →
        </a>
      </div>
      
      <div className="product-grid">
        {currentProducts.map((product, index) => (
          <div
            key={product.id}
            className="product-card-container"
            onClick={() => handleProductClick(product.id)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="product-card">
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
                  className="product-image"
                />
              </div>
              <span className="product-badge">{product.badge}</span>
              <h6 className="product-title">{product.title}</h6>
              <div className="rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={i < product.rating ? "star filled" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="price">
                <strong className="price-new ">{product.price}</strong>
                <span className="price-old">
                  <del>{product.originalPrice}</del>
                </span>
              </p>
              <button
                className="btn-custom-cart"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart <span className="ms-4">+</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
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
      </div>
    </div>
  );
};

export default NewProduct;
