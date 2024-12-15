import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../client/Cart/CartContext";
import "./NewProduct.css";
import { fetchNewProducts } from "../../../services/apiHomePage"; // Import the API function

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
    if (hoveredProduct !== null && products[hoveredProduct]?.altImages && isHoverTimerActive) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex >= products[hoveredProduct].altImages.length - 1 ? 0 : prevIndex + 1

        );
        console.log("Số lượng ảnh:", products[hoveredProduct].altImages[0]);

      }, 1000);
    } else {
      setCurrentImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [hoveredProduct, isHoverTimerActive, products]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchNewProducts(); // Use the imported API function
  //       setProducts(response.data); // Assuming response.data contains the product array
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Run once when the component mounts

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
    const range = 2;

    pageNumbers.push(1);

    if (currentPage <= range + 3) {
      for (let i = 2; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) {
        pageNumbers.push("...");
      }
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
            key={product.product_id} // Sử dụng ID sản phẩm làm key
            className="product-card-container"
            onClick={() => handleProductClick(product.product_id)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="product-card">
              <span className="discount-badge">{product.discount}</span>
              <div className="image-container">
                <img
                  className="product-image"
                  src={
                    hoveredProduct === index && product.altImages && product.altImages.length > 0
                      ? product.altImages[currentImageIndex]  // Hiển thị ảnh thay thế khi hover
                      : product.altImages[0] || "/default-image.png"  // Default nếu không có ảnh thay thế
                  }

                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.png";  // Ảnh mặc định khi có lỗi tải ảnh
                  }}
                />

              </div>
              {/* <span className="product-badge">{product.badge}</span> */}
              <h6 className="product-title">{product.name}</h6>
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
                <strong className="price-new">{product.price}VND</strong>
                {product.originalPrice && (
                  <span className="price-old">
                    <del>{product.originalPrice} VND</del>
                  </span>
                )}
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
              className={`pagination-btn ${currentPage === page ? "active" : ""}`}
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
