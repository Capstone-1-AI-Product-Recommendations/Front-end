import React, { createContext, useState, useEffect, useCallback } from 'react';
import cartService from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);

  const calculateCartCount = useCallback((items) => {
    return items.reduce((sum, shop) => sum + shop.items.length, 0);
  }, []);

  const loadCartData = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user_id) {
        const cartData = await cartService.getCart(user.user_id);
        if (cartData && cartData.items) {
          setCartItems(cartData.items);
          const total = calculateCartCount(cartData.items);
          setCartCount(total);
        }
      }
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  }, [calculateCartCount]);

  const dispatchCartUpdateEvent = () => {
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
  };

  const updateCartCount = async (newCartData) => {
    console.log('newCartData:', newCartData); // Log newCartData for debugging
    if (newCartData && typeof newCartData === 'object' && newCartData.items && Array.isArray(newCartData.items)) {
      setCartItems(newCartData.items);
      const total = calculateCartCount(newCartData.items);
      setCartCount(total);
      showNotification('Product added to cart'); // Display notification message
    } else {
      console.error('newCartData is not valid');
      // Fetch the updated cart data from the backend
      await loadCartData();
    }
    dispatchCartUpdateEvent(); // Dispatch event after updating cart
  };

  useEffect(() => {
    loadCartData();
  }, [loadCartData]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Hide notification after 3 seconds
  };

  return (
    <CartContext.Provider value={{ cartCount, cartItems, updateCartCount, loadCartData, showNotification }}>
      {children}
      {notification && <div className="notification">{notification}</div>}
    </CartContext.Provider>
  );
};