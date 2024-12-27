import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../../context/CartContext';
import "./NewProduct.css";
import cartService from '../../../services/cartService';
import Toast from "../Toast/Toast";

const PRODUCTS_PER_PAGE = 36;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const NewProduct = ({ products, showNotification }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();
  const { updateCartCount } = useContext(CartContext); // Get updateCartCount from context

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user.user_id : null;
      if (!userId) {
        alert('User not logged in.');
        return;
      }
      const productData = { product_id: product.product_id, quantity: 1 };
      const newCartData = await cartService.addToCart(userId, productData);
      updateCartCount(newCartData);

      // Show toast notification
      setToastMessage("Thêm vào giỏ hàng thành công!");
      setShowToast(true);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setToastMessage("Không thể thêm vào giỏ hàng.");
      setShowToast(true);
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
      <div className="product-grid-new">
        {currentProducts.map((product, index) => (
          <div
            key={product.product_id}
            className="product-card-container"
            onClick={() => handleProductClick(product.product_id)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: 'pointer' }}
          >
            <div className="product-card-new">
              <span className="discount-badge">{product.discount_percentage}%</span>
              <div className="image-container-new">
                <img
                  className="product-image-new"
                  src={
                    product.altImages && product.altImages.length > 0
                      ? product.altImages[0]
                      : "/default-image.png"
                  }
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.png";
                  }}
                />
              </div>
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
                <strong className="price-new">{formatCurrency(product.price)}</strong>
                {product.originalPrice && (
                  <span className="price-old">
                    <del>{formatCurrency(product.originalPrice)}</del>
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

      {/* Toast component */}
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default NewProduct;
