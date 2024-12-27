/** @format */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import "./CartDropdown.css";
import cartService from '../../../services/cartService'; // Import the cartService

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const loadCartData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user_id) {
        const cartData = await cartService.getCart(user.user_id);
        if (cartData && cartData.items) {
          const allProducts = cartData.items.flatMap(shop => shop.items);
          setProducts(allProducts);

          const total = allProducts.reduce((sum, product) => {
            const quantity = product.quantity !== null ? product.quantity : 1;
            return sum + quantity;
          }, 0);

          setTotalItems(total);
        }
      }
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  };

  useEffect(() => {
    loadCartData();
  }, []);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="cart-dropdown">     
      <div className="cart-header">
        <h3>Sản phẩm mới thêm ({totalItems})</h3>
      </div>
      <div className="cart-items">
        {products.map(product => {
          return (
            <div 
              key={product.cart_item_id} 
              className="cart-item"
              onClick={() => handleProductClick(product.cart_item_id)}
            >
              <div className="item-image-container">
                <img
                  src={product.product_images?.[0]?.file || '/default-image.png'}
                  alt={product.product_name}
                  className="item-image"
                />
              </div>
              <div className="item-details">
                <span className="item-name" title={product.product_name}>
                  {product.product_name}
                </span>
                <div className="price-quantity">
                  <span className="item-price">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(product.product_price)}
                  </span>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-footer">
        <button className="view-cart-button" onClick={handleCartClick}>
          Xem giỏ hàng ({totalItems})
        </button>
      </div>
    </div>
  );
};

export default CartDropdown;
