// src/Components/Cart/Cart.js
import React, { useEffect, useState } from 'react';
import { fetchCart, addToCart, updateQuantity, removeFromCart, removeAllItems } from '../../../services/cartAPI';
import styles from '../../../styles/Cart.module.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm loading state
  const [error, setError] = useState(null); // Thêm error state

  // Lấy giỏ hàng khi component được mount
  useEffect(() => {
    const getCartItems = async () => {
      setLoading(true);
      try {
        const response = await fetchCart();
        setCartItems(response.data); // Lưu giỏ hàng vào state
      } catch (error) {
        setError('Lỗi khi lấy giỏ hàng');
        console.error('Lỗi khi lấy giỏ hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, []); // Chỉ chạy khi component mount

  // Hàm thêm sản phẩm vào giỏ
  const handleAddToCart = async (product) => {
    setLoading(true);
    try {
      await addToCart(product);
      const response = await fetchCart(); // Cập nhật lại giỏ hàng sau khi thêm sản phẩm
      setCartItems(response.data);
    } catch (error) {
      setError('Lỗi khi thêm sản phẩm vào giỏ');
      console.error('Lỗi khi thêm sản phẩm vào giỏ:', error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ
  const handleRemoveFromCart = async (productId) => {
    setLoading(true);
    try {
      await removeFromCart(productId);
      const response = await fetchCart(); // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
      setCartItems(response.data);
    } catch (error) {
      setError('Lỗi khi xóa sản phẩm khỏi giỏ');
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ:', error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm cập nhật số lượng sản phẩm trong giỏ
  const handleUpdateQuantity = async (productId, quantity) => {
    setLoading(true);
    try {
      await updateQuantity(productId, quantity);
      const response = await fetchCart(); // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
      setCartItems(response.data);
    } catch (error) {
      setError('Lỗi khi cập nhật số lượng sản phẩm');
      console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa tất cả sản phẩm trong giỏ
  const handleRemoveAllItems = async () => {
    setLoading(true);
    try {
      await removeAllItems();
      const response = await fetchCart(); // Cập nhật lại giỏ hàng sau khi xóa tất cả sản phẩm
      setCartItems(response.data);
    } catch (error) {
      setError('Lỗi khi xóa tất cả sản phẩm');
      console.error('Lỗi khi xóa tất cả sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Giỏ Hàng</h1>
      {loading && <p>Đang tải...</p>} {/* Thêm thông báo loading */}
      {error && <p className={styles.error}>{error}</p>} {/* Hiển thị lỗi nếu có */}
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <div className={styles.cartItemDetails}>
                <p>{item.name}</p>
                <p>{item.quantity} x {item.price} đ</p>
              </div>
              <div className={styles.cartItemActions}>
                <button onClick={() => handleRemoveFromCart(item.id)} className={styles.removeButton}>Xóa</button>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className={styles.updateButton}>Tăng Số Lượng</button>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className={styles.updateButton}>Giảm Số Lượng</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleRemoveAllItems} className={styles.removeAllButton}>Xóa Tất Cả</button>
    </div>
  );
};

export default Cart;
