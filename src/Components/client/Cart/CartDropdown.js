/** @format */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartDropdown.css";

const CartDropdown = ({ items = [] }) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
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
        <span className='items-count'>{items.length} sản phẩm</span>
      </div>

      <div className='cart-items'>
        {items.map((item) => (
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
