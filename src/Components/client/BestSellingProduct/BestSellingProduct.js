/** @format */

import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../../context/CartContext';
import cartService from '../../../services/cartService';
import Toast from "../Toast/Toast";
import "./BestSellingProduct.css";

const PRODUCTS_PER_PAGE = 18;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const BestSellingProduct = ({ products = [], showNotification }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const navigate = useNavigate();
  const { addToCart, updateCartCount } = useContext(CartContext);

  const productList = Array.isArray(products) ? products : [];

  const totalPages = useMemo(() => {
    return Math.ceil(productList.length / PRODUCTS_PER_PAGE);
  }, [productList]);

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
      setToastMessage('Thêm vào giỏ hàng thành công!');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Không thể thêm vào giỏ hàng.');
      setShowToast(true);
    }
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
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const currentProducts = useMemo(() => {
    return productList.slice(
      (currentPage - 1) * PRODUCTS_PER_PAGE,
      currentPage * PRODUCTS_PER_PAGE
    );
  }, [productList, currentPage]);

  return (
    <div className='best-product-container'>
      <div className='d-flex justify-content-between align-items-center mb-1'>
        <h4 className='mb-0'>
          Đề xuất
          <span className='text-muted'>
            - Đừng bỏ lỡ cơ hội giảm giá đặc biệt chỉ có trong tuần này.
          </span>
        </h4>
        <a href='#' className='view-all-btn'>
          Tất cả →
        </a>
      </div>

      <div className='product-grid-best'>
        {currentProducts.map((product, index) => (
          <div
            key={product.product_id}
            className='product-card-container'
            onClick={() => handleProductClick(product.product_id)}
            style={{ cursor: 'pointer' }}
          >
            <div className='product-card-best'>
              <div className='image-container-best'>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='product-image-best'
                  loading="lazy"
                />
              </div>
              <h6 className='product-title'>{product.name}</h6>
              <div className='rating'>
                {Array.from({ length: 5 }, (_, i) => {
                  const starValue = i + 1;
                  const ratingValue = product.rating;

                  if (starValue <= Math.floor(ratingValue)) {
                    return <span key={i} className="star filled">★</span>;
                  } else if (starValue === Math.ceil(ratingValue) && !Number.isInteger(ratingValue)) {
                    return <span key={i} className="star half-filled">★</span>;
                  }
                  return <span key={i} className="star">★</span>;
                })}
              </div>
              <p className='price'>
                <strong className='price-new '>{formatCurrency(product.price)}</strong>
                {/* <span className='price-old'>
                  <del>{formatCurrency(product.originalPrice)}</del>
                </span> */}
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

      <div className='pagination'>
        <button onClick={goToFirstPage} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {getPageNumbers().map((number, index) => (
          <button
            key={index}
            onClick={() => changePage(number)}
            disabled={number === currentPage}>
            {number}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>

      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default BestSellingProduct;