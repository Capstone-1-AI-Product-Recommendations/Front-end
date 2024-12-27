import React, { useState, useEffect } from "react";
import "./SearchResults.css";
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ products, loading, error }) => {
  const navigate = useNavigate();
  const productsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("Received products:", products);
  }, [products]);

  const productArray = Array.isArray(products) ? products : products.products;
  console.log("Product array:", productArray);

  if (!productArray || !Array.isArray(productArray)) {
    return <div>No products found.</div>;
  }

  const totalPages = Math.ceil(productArray.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productArray.slice(indexOfFirstProduct, indexOfLastProduct);

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          2,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const renderPagination = () => (
    <div className="pagination">
      <button
        className="nav-button-prev"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {renderPageNumbers().map((number, index) => (
        <button
          key={index}
          className={`page-number ${currentPage === number ? "active" : ""} ${number === "..." ? "dots" : ""}`}
          onClick={() => number !== "..." && setCurrentPage(number)}
          disabled={number === "..."} >
          {number}
        </button>
      ))}

      <button
        className="nav-button-next"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="search-results">
      <div className="products-grid-search">
        {currentProducts.map((product) => (
          <div key={product.product_id} className="product-card-search" onClick={() => handleProductClick(product.product_id)} style={{ cursor: 'pointer' }}>
            <div className="product-image">
              <img src={product.images[0].file || product.images[0]} alt={product.name} />
              {product.label && (
                <div className="sale-label">{product.label}</div>
              )}
              {product.isLiked && <div className="liked-badge">Yêu thích</div>}
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="price-section">
                <span className="price">{product.price}đ</span>
                {product.discount && (
                  <span className="discount">{product.discount}</span>
                )}
              </div>

              <div className="product-stats">
                <div className="rating-search">
                  <span className="stars">⭐ {product.rating}</span>
                  <span className="sold">Đã bán {product.sales_strategy}</span>
                </div>
                <div className="location-info">
                  <span className="delivery-time">{product.deliveryTime}</span>
                  <span className="location">{product.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination ở dưới */}
      <div className="bottom-pagination">
        {renderPagination()}
      </div>
    </div>
  );
};

export default SearchResults;
