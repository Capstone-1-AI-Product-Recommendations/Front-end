import React, { useState, useEffect } from "react";
import productService from '../../../../services/productService';
import "./SearchResults.css";
import productImg from "../../../../img/Product/cake.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ keyword }) => {
  const sortOptions = ["Liên Quan", "Mới Nhất", "Bán Chạy", "Giá"];
  const [activeSort, setActiveSort] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.searchProducts(keyword);
        setProducts(data.products);
        setError(null);
      } catch (err) {
        setError('Không thể tìm thấy sản phẩm');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchProducts();
    }
  }, [keyword]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const sortProducts = (sortType) => {
    let sortedProducts = [...products];
    switch(sortType) {
      case 0: // Liên Quan - mặc định không sort
        break;
      case 1: // Mới Nhất
        sortedProducts.sort((a, b) => b.dateAdded - a.dateAdded);
        break;
      case 2: // Bán Chạy
        sortedProducts.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case 3: // Giá
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
    setCurrentPage(1);
  };

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
          disabled={number === "..."}>
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

  const trackUserBehavior = (behavior) => {
    const userBehavior = JSON.parse(localStorage.getItem("userBehavior")) || [];
    userBehavior.push(behavior);
    localStorage.setItem("userBehavior", JSON.stringify(userBehavior));
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="search-results">
      <div className="search-info">
        {/* <span className="search-term">
          Kết quả tìm kiếm cho từ khoá '{keyword}'
        </span> */}
      </div>

      <div className="filter-bar">
        <div className="sort-section">
          <span>Sắp xếp theo</span>
          <div className="sort-options">
            {sortOptions.map((option, index) => (
              <button
                key={index}
                className={`sort-button ${activeSort === index ? "active" : ""}`}
                onClick={() => {
                  setActiveSort(index);
                  sortProducts(index);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {/* Pagination ở góc phải */}
        {renderPagination()}
      </div>

      <div className="products-grid-search">
        {currentProducts.map((product) => (
          <div key={product.product_id} className="product-card-search" onClick={() => handleProductClick(product.product_id)} style={{ cursor: 'pointer' }}>
            <div className="product-image">
              <img src={product.images[0]} alt={product.name} />
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
