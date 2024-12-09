import React, { useState } from "react";
import "./SearchResults.css";
import productImg from "../../../../img/Product/cake.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SearchResults = () => {
  const sortOptions = ["Liên Quan", "Mới Nhất", "Bán Chạy", "Giá"];
  const [activeSort, setActiveSort] = useState(0);

  const generateProducts = () =>
    Array.from({ length: 5000 }, (_, index) => {
      const randomPrice = Math.floor(Math.random() * (500000 - 10000) + 10000);
      const randomRating = (Math.random() * (5 - 3) + 3).toFixed(1);
      const randomSoldCount = Math.floor(Math.random() * 10000);
      const soldCountDisplay = randomSoldCount > 1000 ? (randomSoldCount/1000).toFixed(1) + 'k' : randomSoldCount;
      const cities = ['TP Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const deliveryDays = Math.floor(Math.random() * 5) + 1;
      const randomDiscount = Math.floor(Math.random() * 70) + 10;
      const productNames = [
        "Bánh đậu kem mix 4 vị đặc biệt",
        "Combo bánh bông lan trứng muối", 
        "Bánh mì phô mai tan chảy",
        "Set bánh ngọt hộp quà tặng",
        "Bánh cookie chocolate chip"
      ];
      const randomName = productNames[Math.floor(Math.random() * productNames.length)];
      const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
      
      return {
        id: index + 1,
        name: randomName,
        price: randomPrice,
        priceDisplay: randomPrice.toLocaleString(),
        rating: parseFloat(randomRating),
        soldCount: randomSoldCount,
        soldCountDisplay: soldCountDisplay,
        location: randomCity,
        deliveryTime: `${deliveryDays} - ${deliveryDays + 1} ngày`,
        isLiked: Math.random() > 0.5,
        image: productImg,
        label: Math.random() > 0.7 ? "Sale" : null,
        originalPrice: Math.random() > 0.3,
        discount: Math.random() > 0.3 ? `-${randomDiscount}%` : null,
        dateAdded: randomDate
      };
    });

  const [products, setProducts] = useState(generateProducts());
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 40;
  const totalPages = Math.ceil(products.length / productsPerPage);

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
          className={`page-number ${
            currentPage === number ? "active" : ""
          } ${number === "..." ? "dots" : ""}`}
          onClick={() => number !== "..." && setCurrentPage(number)}
          disabled={number === "..."}
        >
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

  return (
    <div className="search-results">
      <div className="search-info">
        {/* <span className="search-term">
          Kết quả tìm kiếm cho từ khoá 'bánh ngọt'
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

      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card-search">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {product.label && (
                <div className="sale-label">{product.label}</div>
              )}
              {product.isLiked && <div className="liked-badge">Yêu thích</div>}
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="price-section">
                <span className="price">₫{product.priceDisplay}</span>
                {product.discount && (
                  <span className="discount">{product.discount}</span>
                )}
              </div>

              <div className="product-stats">
                <div className="rating-search">
                  <span className="stars">⭐ {product.rating}</span>
                  <span className="sold">Đã bán {product.soldCountDisplay}</span>
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
