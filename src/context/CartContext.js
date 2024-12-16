import React, { createContext, useState, useEffect } from 'react';
import cartService from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const calculateTotalItems = (items) => {
    return items.reduce((total, shop) => {
      return total + shop.items.reduce((shopTotal, item) => {
        return shopTotal + (parseInt(item.quantity) || 0);
      }, 0);
    }, 0);
  };

  const updateCartCount = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    if (cartData && cartData.items) {
      const total = calculateTotalItems(cartData.items);
      setCartCount(total);
      setCartItems(cartData.items);
    }
  };

  const addToCart = async (userId, productData) => {
    try {
      await cartService.addToCart(userId, productData);
      const newCartData = await cartService.getCart(userId);
      setCartItems(newCartData.items || []);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};