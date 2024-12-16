// src/Components/Cart/Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartService from '../../../services/cartService';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))?.user_id;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const response = await cartService.getCart(userId);
        // Transform API response to match expected structure
        const transformedData = (response?.items || []).map(shop => ({
          shop_name: shop.shop_name,
          products: shop.items || [] // Ensure items array exists
        }));
        console.log('Transformed cart data:', transformedData);
        setCartData(transformedData);
      } catch (err) {
        setError('Không thể tải giỏ hàng');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCartData();
    }
  }, [userId]);

  const handleQuantityUpdate = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    // Store previous state for rollback
    const previousCartData = [...cartData];
    
    // Optimistic update
    setCartData(currentCart => 
      currentCart.map(shop => ({
        ...shop,
        products: shop.products.map(product => 
          product.cart_item_id === cartItemId
            ? { ...product, quantity: newQuantity }
            : product
        )
      }))
    );

    try {
      // Make API call
      await cartService.updateItemInCart(userId, {
        cart_item_id: cartItemId,
        quantity: newQuantity
      });

      // Get fresh data in background
      const response = await cartService.getCart(userId);
      const transformedData = (response?.items || []).map(shop => ({
        shop_name: shop.shop_name,
        products: shop.items || []
      }));
      setCartData(transformedData);

    } catch (error) {
      console.error('Error updating quantity:', error);
      // Revert to previous state on error
      setCartData(previousCartData);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getSelectedCount = () => {
    return selectedItems.length;
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const product = cartData
        .flatMap(shop => shop.products)
        .find(product => product.cart_item_id === itemId);
        console.log('Product:', product); // Debug log
      return total + (product ? parseFloat(product.product_price) * product.quantity : 0);
    }, 0);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = cartData.flatMap(shop => 
        (shop.products || []).map(product => product.cart_item_id)
      );
      setSelectedItems(allProductIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter(id => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await cartService.removeItemFromCart(userId, productId);
      setCartData(prevCartData =>
        prevCartData
          .map(shop => ({
            ...shop,
            products: shop.products.filter(product => product.cart_item_id !== productId),
          }))
          .filter(shop => shop.products.length > 0)
      );
      setSelectedItems(selectedItems.filter(id => id !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleCheckout = () => {
    const selectedProducts = cartData.flatMap(shop => 
      shop.products.filter(product => 
        selectedItems.includes(product.cart_item_id)
      )
    );
    
    localStorage.setItem('checkoutProducts', JSON.stringify(selectedProducts));
    navigate('/checkout');
  };

  if (loading) {
    return <div>Đang tải giỏ hàng...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <div className={styles.headerItem}>
          <input
            type="checkbox"
            checked={
              selectedItems.length ===
              cartData.flatMap(shop => shop.products).length
            }
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

      {cartData.map((shop, index) => (
        <div key={index} className={styles.shopSection}>
          <div className={styles.shopHeader}>
            <input
              type="checkbox"
              checked={(shop.products || []).every(product =>
                selectedItems.includes(product.cart_item_id)
              )}
              onChange={(e) => {
                const shopProductIds = (shop.products || [])
                  .map(product => product.cart_item_id);
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
              <span className={styles.shopName}>{shop.shop_name}</span>
            </div>
          </div>

          {(shop.products || []).map(product => (
            <div key={product.cart_item_id} className={styles.cartItem}>
              <div className={styles.itemCheckbox}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(product.cart_item_id)}
                  onChange={() => handleSelectItem(product.cart_item_id)}
                />
              </div>
              <div className={styles.itemInfo}>
                <img
                  src={product.product_images[0].file}
                  alt={product.product_name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3>{product.product_name}</h3>
                </div>
              </div>
              <div className={styles.priceSection}>
                <span className={styles.currentPrice}>
                  {formatPrice(product.product_price)}
                </span>
              </div>
              <div className={styles.quantityControl}>
                <button
                  onClick={() => handleQuantityUpdate(product.cart_item_id, product.quantity - 1)}
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantityDisplay}>
                  {product.quantity}
                </span>
                <button
                  onClick={() => handleQuantityUpdate(product.cart_item_id, product.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className={styles.itemTotal}>
                {formatPrice(parseFloat(product.product_price) * product.quantity)}
              </div>
              <div className={styles.itemActions}>
                <button onClick={() => handleRemoveProduct(product.cart_item_id)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className={styles.cartFooter}>
        <div className={styles.footerLeft}>
          <input
            type="checkbox"
            checked={
              selectedItems.length ===
              cartData.flatMap(shop => shop.products).length
            }
            onChange={handleSelectAll}
          />
          <span>
            Chọn Tất Cả ({cartData.flatMap(shop => shop.products).length})
          </span>
          <button className={styles.deleteButton}>Xóa</button>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.totalSection}>
            <span>
              Tổng thanh toán ({getSelectedCount()} Sản phẩm):
            </span>
            <span className={styles.totalPrice}>
              {formatPrice(calculateTotal())}
            </span>
          </div>
          <button
            className={styles.checkoutButton}
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
          >
            Mua Hàng ({selectedItems.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;