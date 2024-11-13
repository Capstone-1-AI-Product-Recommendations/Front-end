import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import styles from '../../styles/Cart.module.css';

// Hàm chuyển đổi giá từ chuỗi sang số
const formatPrice = (priceString) => {
  return Number(priceString.replace(/[^\d.-]/g, ""));
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, removeAllItems } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm trước khi thanh toán.");
    } else {
      navigate("/checkout");
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) {
      // If quantity is less than 1, remove the item from the cart
      removeFromCart(itemId);
    } else {
      // Otherwise, update the quantity
      updateQuantity(itemId, quantity);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + formatPrice(item.price) * item.quantity, 0);
  };

  const handleProductClick = (product, event) => {
    // Prevent navigation if we're clicking on something other than the row itself
    if (event.target.closest("button") || event.target.closest("input")) {
      return; // Ignore the click if it's on buttons or inputs (like the quantity buttons or checkbox)
    }
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Giỏ Hàng của Bạn</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedItems.length === cartItems.length}
                    onChange={handleSelectAll}
                  />
                  Sản Phẩm
                </th>
                <th>Đơn Giá</th>
                <th>Số Lượng</th>
                <th>Số Tiền</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={(event) => handleProductClick(item, event)} // Prevent navigation when clicking on quantity controls or buttons
                >
                  <td>
                    <div className={styles.productInfo}>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent row click navigation
                          handleSelectItem(item.id);
                        }}
                      />
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className={styles.productImage}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(item, e);
                        }}
                      />
                      <div>
                        <p>{item.name}</p>
                        <p className={styles.productCategory}>Phân Loại Hàng: {item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className={styles.priceOld}><del>{item.originalPrice}</del></p>
                    <p className={styles.priceNew}>{formatPrice(item.price).toLocaleString()} đ</p>
                  </td>
                  <td>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click navigation
                          handleQuantityChange(item.id, item.quantity - 1); // Decrease quantity
                        }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click navigation
                          handleQuantityChange(item.id, item.quantity + 1); // Increase quantity
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{(formatPrice(item.price) * item.quantity).toLocaleString()} đ</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click navigation
                        removeFromCart(item.id); // Manually remove item from cart
                      }}
                      className={styles.removeButton}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.cartSummary}>
            <button onClick={removeAllItems} className={styles.clearCartButton}>Xóa Tất Cả</button>
            <div>
              <p>
                Tổng thanh toán ({selectedItems.length} Sản phẩm): 
                <span> {calculateTotal().toLocaleString()} đ</span>
              </p>
              <button onClick={handleCheckout} className={styles.checkoutButton}>Mua Hàng</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
