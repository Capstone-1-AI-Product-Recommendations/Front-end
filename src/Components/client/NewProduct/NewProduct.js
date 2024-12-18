import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../../context/CartContext';
import "./NewProduct.css";
import { fetchNewProducts } from "../../../services/apiHomePage"; // Import the API function
import cartService from '../../../services/cartService';

const PRODUCTS_PER_PAGE = 36;

const NewProduct = ({ products, updateCartCount }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Assuming user object is stored in localStorage
      const userId = user ? user.user_id : null;
      if (!userId) {
        alert('User not logged in.');
        return;
      }
      const productData = { product_id: product.product_id, quantity: 1 };
      const newCartData = await cartService.addToCart(userId, productData);
      alert('Product added to cart successfully!');
      // Update cart count
      updateCartCount(newCartData);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredProduct(index);
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

  const currentProducts = useMemo(() => {
    return products.slice(
      (currentPage - 1) * PRODUCTS_PER_PAGE,
      currentPage * PRODUCTS_PER_PAGE
    );
  }, [products, currentPage]);

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
            style={{ cursor: 'pointer' }}
          >
            <div className="product-card">
              <span className="discount-badge">{product.discount_percentage}%</span>
              <div className="image-container">
                <img
                  className="product-image"
                  src={
                    product.altImages && product.altImages.length > 0
                      ? product.altImages[0]  // Display the first alternate image if available
                      : "/default-image.png"  // Default image if no alternate images
                  }
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.png";  // Default image on error
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
                 Thêm vào giỏ hàng <span className="ms-4">+</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProduct;
