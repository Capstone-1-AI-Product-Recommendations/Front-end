/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartDropdown.css";
import product from "../../img/newProduct.png";

const CartDropdown = () => {
  const navigate = useNavigate();
  const cartItems = [
    {
      id: 1,
      name: "Nước giặt Be Clean CH45 hương cỏ",
      price: 475400,
      image: product,
    },
    {
      id: 2,
      name: "Tẩy mốc siêu sạch Ecogy tẩy sạch",
      price: 69000,
      image: product,
    },
    {
      id: 3,
      name: "Bột Tẩy Quần Áo Màu, Đánh Bay Vết",
      price: 35000,
      image: product,
    },
    {
      id: 4,
      name: "Serum Torriden Dive In Tinh chất d",
      price: 215000,
      image: product,
    },
    {
      id: 5,
      name: "[Chuẩn Thái] Hũ Hit Thông Mũi Thái",
      price: 50000,
      image: product,
    },
  ];

  const handleCartClick = () => {
    navigate("/ADSmartCart");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className='cart-dropdown'>
      <div className='cart-header'>
        <h3>Sản Phẩm Mới Thêm</h3>
        <span className='items-count'>{cartItems.length} sản phẩm</span>
      </div>

      <div className='cart-items'>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className='cart-item'
            onClick={() => handleProductClick(item.id)}
          >
            <img src={item.image} alt={item.name} className='item-image' />
            <div className='item-details'>
              <h4 className='item-name'>{item.name}</h4>
              <span className='item-price'>₫{formatPrice(item.price)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className='cart-footer'>
        <button className='view-cart-button' onClick={handleCartClick}>
          Xem Giỏ Hàng
        </button>
      </div>
    </div>
  );
};

export default CartDropdown;
