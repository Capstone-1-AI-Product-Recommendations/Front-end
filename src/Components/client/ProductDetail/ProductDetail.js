/** @format */

// src/components/ProductDetail.js

import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from ".././Cart/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { addToCart } = useContext(CartContext); // Sử dụng CartContext

  if (!product) {
    // Xử lý trường hợp không có sản phẩm (ví dụ: chuyển hướng về trang chủ)
    return <div>Product not found</div>;
  }

  return (
    <div className='productDetail'>
      <h1 className='productName'>{product.title}</h1>
      <img
        className='productImage'
        src={product.imageUrl}
        alt={product.title}
      />
      <div className='productInfo'>
        <p className='productDescription'>
          {product.description || "No description available"}
        </p>
        <div className='productPrice'>
          <span className='currentPrice'>{product.price}</span>
          {product.originalPrice && (
            <span className='oldPrice'>{product.originalPrice}</span>
          )}
        </div>
        <button className='addToCartButton' onClick={() => addToCart(product)}>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
