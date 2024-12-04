/** @format */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./CartDropdown.css";

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price);
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-header">
        <h3>Sản Phẩm Mới Thêm</h3>
        <span className="items-count">{cartItems.length} sản phẩm</span>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Chưa có sản phẩm</p>
          </div>
        ) : (
          cartItems.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="cart-item"
              onClick={() => handleProductClick(item.id)}
            >
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                <div className="price-quantity">
                  <span className="item-price">{formatPrice(item.price)}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        {cartItems.length > 0 && (
          <div className="cart-total">
            <span>Tổng tiền ({cartItems.length} sản phẩm):</span>
            <span className="total-price">
              {formatPrice(
                cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
              )}
            </span>
          </div>
        )}
        <button 
          className="view-cart-button" 
          onClick={handleCartClick}
          disabled={cartItems.length === 0}
        >
          Xem Giỏ Hàng
        </button>
      </div>
    </div>
  );
};

export default CartDropdown;
