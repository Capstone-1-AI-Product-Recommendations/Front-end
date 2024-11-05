// src/Components/Cart/Cart.js
/** @format */
import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h1>Giỏ Hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Giá: {item.price.toLocaleString()}₫</p>
            <p>Giá gốc: {item.originalPrice.toLocaleString()}₫</p>
            <button onClick={() => removeFromCart(item.id)}>Xóa</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
