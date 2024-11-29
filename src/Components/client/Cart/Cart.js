// src/Components/Cart/Cart.js
import React, { useEffect, useState } from 'react';
import { fetchCart, addToCart, updateQuantity, removeFromCart, removeAllItems } from '../../../services/cartAPI';
import './Cart.module.css';

const Cart = () => {
  const [shops, setShops] = useState([
    {
      id: 1,
      name: "Shop ABC",
      selected: false,
      products: [
        {
          id: 1,
          name: "Sản phẩm 1",
          price: 100000,
          originalPrice: 120000,
          quantity: 1,
          image: "path_to_image",
          selected: false,
        },
        // Thêm các sản phẩm khác
      ]
    }
  ]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setShops(shops.map(shop => ({
      ...shop,
      selected: newSelectAll,
      products: shop.products.map(product => ({
        ...product,
        selected: newSelectAll
      }))
    })));
  };

  const handleSelectShop = (shopId) => {
    setShops(shops.map(shop => {
      if (shop.id === shopId) {
        const newSelected = !shop.selected;
        return {
          ...shop,
          selected: newSelected,
          products: shop.products.map(product => ({
            ...product,
            selected: newSelected
          }))
        };
      }
      return shop;
    }));
  };

  const handleQuantityChange = (shopId, productId, change) => {
    setShops(shops.map(shop => {
      if (shop.id === shopId) {
        return {
          ...shop,
          products: shop.products.map(product => {
            if (product.id === productId) {
              return {
                ...product,
                quantity: Math.max(1, product.quantity + change)
              };
            }
            return product;
          })
        };
      }
      return shop;
    }));
  };

  const calculateTotal = () => {
    return shops.reduce((total, shop) => {
      return total + shop.products
        .filter(product => product.selected)
        .reduce((shopTotal, product) => shopTotal + product.price * product.quantity, 0);
    }, 0);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="header-product">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <span>Sản Phẩm</span>
        </div>
        <div className="header-item">Đơn Giá</div>
        <div className="header-item quantity-header">Số Lượng</div>
        <div className="header-item">Số Tiền</div>
        <div className="header-item">Thao Tác</div>
      </div>

      {loading && <div className="loading">Đang tải...</div>}
      {error && <div className="error">{error}</div>}

      {shops.map(shop => (
        <div key={shop.id} className="shop-section">
          {/* Copy phần shop content từ ADSmartCart */}
          {/* startLine: 227, endLine: 309 */}
        </div>
      ))}

      <div className="cart-footer">
        {/* Copy phần footer từ ADSmartCart */}
        {/* startLine: 312, endLine: 334 */}
      </div>
    </div>
  );
};

export default Cart;
