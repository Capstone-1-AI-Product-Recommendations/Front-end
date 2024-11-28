// src/Components/Cart/Cart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartData } from '../../../data/cartData';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(cartData);
  const [selectedItems, setSelectedItems] = useState([]);

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Tính tổng số sản phẩm được chọn
  const getSelectedCount = () => {
    return selectedItems.length;
  };

  // Tính tổng tiền các sản phẩm được chọn
  const calculateTotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const product = cartItems.flatMap(shop => shop.products)
        .find(product => product.id === itemId);
      return total + (product ? product.price * product.quantity : 0);
    }, 0);
  };

  // Xử lý chọn/bỏ chọn tất cả
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = cartItems.flatMap(shop => 
        shop.products.map(product => product.id)
      );
      setSelectedItems(allProductIds);
    } else {
      setSelectedItems([]);
    }
  };

  // Xử lý chọn/bỏ chọn từng sản phẩm
  const handleSelectItem = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter(id => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  // Xử lý cập nhật số lượng
  const handleUpdateQuantity = (shopId, productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(shop => {
      if (shop.id === shopId) {
        return {
          ...shop,
          products: shop.products.map(product => {
            if (product.id === productId) {
              return { ...product, quantity: newQuantity };
            }
            return product;
          })
        };
      }
      return shop;
    }));
  };

  // Xử lý xóa sản phẩm
  const handleRemoveProduct = (shopId, productId) => {
    setCartItems(cartItems.map(shop => {
      if (shop.id === shopId) {
        return {
          ...shop,
          products: shop.products.filter(product => product.id !== productId)
        };
      }
      return shop;
    }).filter(shop => shop.products.length > 0));
    setSelectedItems(selectedItems.filter(id => id !== productId));
  };

  // Thêm hàm xử lý chuyển trang
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để mua hàng');
      return;
    }
    navigate('/checkout', { 
      state: { 
        selectedItems: cartItems
          .flatMap(shop => shop.products)
          .filter(product => selectedItems.includes(product.id))
      }
    });
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <div className={styles.headerItem}>
          <input
            type="checkbox"
            checked={selectedItems.length === cartItems.flatMap(shop => shop.products).length}
            onChange={handleSelectAll}
          />
          <span>Sản Phẩm</span>
        </div>
        <div className={styles.headerDetails}>
          <span>Đơn Giá</span>
          <span>Số Lượng</span>
          <span>Số Tiền</span>
          <span>Thao Tác</span>
        </div>
      </div>

      {cartItems.map(shop => (
        <div key={shop.id} className={styles.shopSection}>
          <div className={styles.shopHeader}>
            <input
              type="checkbox"
              checked={shop.products.every(product => 
                selectedItems.includes(product.id)
              )}
              onChange={(e) => {
                const shopProductIds = shop.products.map(product => product.id);
                if (e.target.checked) {
                  setSelectedItems([...selectedItems, ...shopProductIds]);
                } else {
                  setSelectedItems(selectedItems.filter(id => 
                    !shopProductIds.includes(id)
                  ));
                }
              }}
            />
            <div className={styles.shopInfo}>
              <img src={shop.shopIcon} alt={shop.shopName} className={styles.shopIcon} />
              <span className={styles.shopName}>{shop.shopName}</span>
              {shop.isOfficial && <span className={styles.officialBadge}>Mall</span>}
            </div>
          </div>

          {shop.products.map(product => (
            <div key={product.id} className={styles.cartItem}>
              <div className={styles.itemCheckbox}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(product.id)}
                  onChange={() => handleSelectItem(product.id)}
                />
              </div>
              <div className={styles.itemInfo}>
                <img src={product.image} alt={product.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3>{product.name}</h3>
                  <div className={styles.itemVariant}>
                    <span>Phân Loại: {product.variant}</span>
                  </div>
                  {product.badge && (
                    <span className={styles.badge}>{product.badge}</span>
                  )}
                </div>
              </div>
              <div className={styles.priceSection}>
                <span className={styles.originalPrice}>
                  {formatPrice(product.originalPrice)}
                </span>
                <span className={styles.currentPrice}>
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className={styles.quantityControl}>
                <button 
                  onClick={() => handleUpdateQuantity(shop.id, product.id, product.quantity - 1)}
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={product.quantity}
                  onChange={(e) => handleUpdateQuantity(shop.id, product.id, parseInt(e.target.value) || 1)}
                  min="1"
                />
                <button 
                  onClick={() => handleUpdateQuantity(shop.id, product.id, product.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className={styles.itemTotal}>
                ₫{(product.price * product.quantity).toLocaleString()}
              </div>
              <div className={styles.itemActions}>
                <button onClick={() => handleRemoveProduct(shop.id, product.id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className={styles.cartFooter}>
        <div className={styles.footerLeft}>
          <input
            type="checkbox"
            checked={selectedItems.length === cartItems.flatMap(shop => shop.products).length}
            onChange={handleSelectAll}
          />
          <span>Chọn Tất Cả ({cartItems.flatMap(shop => shop.products).length})</span>
          <button className={styles.deleteButton}>Xóa</button>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.totalSection}>
            <span>Tổng thanh toán ({getSelectedCount()} Sản phẩm):</span>
            <span className={styles.totalPrice}>₫{calculateTotal().toLocaleString()}</span>
          </div>
          <button 
            className={styles.checkoutButton} 
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
          >
            Mua Hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
