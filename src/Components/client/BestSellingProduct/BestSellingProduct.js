/** @format */

import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../../context/CartContext';
import cartService from '../../../services/cartService';
import "./BestSellingProduct.css";

const PRODUCTS_PER_PAGE = 18;

const BestSellingProduct = ({ products = [] }) => { // Remove updateCartCount from props
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { addToCart, updateCartCount, showNotification } = useContext(CartContext); // Get updateCartCount and showNotification from context

  // Ensure products is always an array
  const productList = Array.isArray(products) ? products : [];
  console.log("Products:", productList); // Debugging line to check products array

  const totalPages = useMemo(() => {
    console.log("Calculating totalPages");
    return Math.ceil(productList.length / PRODUCTS_PER_PAGE);
  }, [productList]);

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
      console.log('newCartData:', newCartData); // Log newCartData for debugging
      updateCartCount(newCartData); // Update cart count
      showNotification('Product added to cart successfully!'); // Show notification
    } catch (error) {
      console.error('Error adding product to cart:', error);
      showNotification('Failed to add product to cart.'); // Show notification
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

  const currentProducts = useMemo(() => {
    console.log("Calculating currentProducts");
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
            {" "}
            - Đừng bỏ lỡ cơ hội giảm giá đặc biệt chỉ có trong tuần này.
          </span>
        </h4>
        <a href='#' className='view-all-btn'>
          Tất cả →
        </a>
      </div>

      <div className='product-grid'>
        {currentProducts.map((product, index) => (
          <div
            key={product.product_id}
            className='product-card-container'
            onClick={() => handleProductClick(product.product_id)}
            style={{ cursor: 'pointer' }}
          >
            <div className='product-card'>
              <span className='discount-badge'>{product.discount} %</span>
              <div className='image-container'>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className='product-image'
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
                <strong className='price-new '>{product.price}VND</strong>
                <span className='price-old'>
                  <del>{product.originalPrice}</del>
                </span>
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
            disabled={number === currentPage || number === "..."}>
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
    </div>
  );
};

export default BestSellingProduct;
