/** @format */

import React, { useState } from "react";
import "./ADSmartCart.css";
import product from "../../../img/Product/newProduct.png";

const ADSmartCart = () => {
  const [shops, setShops] = useState([
    {
      id: 1,
      name: "Shop Mini",
      selected: false,
      products: [
        {
          id: 1,
          name: "Nước giặt Be Clean CH45 hương cỏ xanh 3.6L (túi)",
          price: 75400,
          originalPrice: 120000,
          quantity: 1,
          category: "Ngẫu nhiên",
          badge: "Choice",
          image: product,
          selected: false,
        },
        {
          id: 2,
          name: "Tẩy móc siêu sạch Ecogy tẩy sạch móc, thăm kim, vết két mỡ",
          price: 89000,
          originalPrice: 136000,
          quantity: 5,
          badge: "Yêu thích",
          image: product,
          selected: false,
        },
        {
          id: 3,
          name: "Tẩy móc siêu sạch Ecogy tẩy sạch móc, thăm kim, vết két mỡ",
          price: 89000,
          originalPrice: 136000,
          quantity: 1,
          badge: "Yêu thích",
          image: product,
          selected: false,
        },
      ],
    },
    {
      id: 2,
      name: "Shop Mana",
      selected: false,
      products: [
        {
          id: 4,
          name: "Nước rửa chén Mana Fresh 3.6L",
          price: 65000,
          originalPrice: 95000,
          quantity: 1,
          category: "Tẩy rửa",
          badge: "Choice",
          image: product,
          selected: false,
        },
      ],
    },
    {
      id: 3,
      name: "Shop Como",
      selected: false,
      products: [
        {
          id: 5,
          name: "Nước lau sàn Como 1L",
          price: 35000,
          originalPrice: 45000,
          quantity: 1,
          badge: "Yêu thích",
          image: product,
          selected: false,
        },
        {
          id: 6,
          name: "Xịt khử mùi Como Air 300ml",
          price: 55000,
          originalPrice: 75000,
          quantity: 1,
          badge: "Choice",
          image: product,
          selected: false,
        },
      ],
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleQuantityChange = (shopId, productId, change) => {
    setShops((prevShops) =>
      prevShops.map((shop) => {
        if (shop.id === shopId) {
          const updatedProducts = shop.products.map((product) => {
            if (product.id === productId) {
              const newQuantity = Math.max(1, product.quantity + change);
              return { ...product, quantity: newQuantity };
            }
            return product;
          });
          return { ...shop, products: updatedProducts };
        }
        return shop;
      })
    );
  };

  const handleSelectProduct = (shopId, productId) => {
    setShops((prevShops) =>
      prevShops.map((shop) => {
        if (shop.id === shopId) {
          const updatedProducts = shop.products.map((product) => {
            if (product.id === productId) {
              return { ...product, selected: !product.selected };
            }
            return product;
          });
          // Check if all products in shop are selected
          const allSelected = updatedProducts.every(
            (product) => product.selected
          );
          return { ...shop, products: updatedProducts, selected: allSelected };
        }
        return shop;
      })
    );
  };

  const handleSelectShop = (shopId) => {
    setShops((prevShops) =>
      prevShops.map((shop) => {
        if (shop.id === shopId) {
          const newSelected = !shop.selected;
          return {
            ...shop,
            selected: newSelected,
            products: shop.products.map((product) => ({
              ...product,
              selected: newSelected,
            })),
          };
        }
        return shop;
      })
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setShops((prevShops) =>
      prevShops.map((shop) => ({
        ...shop,
        selected: newSelectAll,
        products: shop.products.map((product) => ({
          ...product,
          selected: newSelectAll,
        })),
      }))
    );
  };

  const handleResetSelection = () => {
    setSelectAll(false);
    setShops((prevShops) =>
      prevShops.map((shop) => ({
        ...shop,
        selected: false,
        products: shop.products.map((product) => ({
          ...product,
          selected: false,
        })),
      }))
    );
  };

  const calculateTotal = () => {
    return shops.reduce((total, shop) => {
      return (
        total +
        shop.products
          .filter((product) => product.selected)
          .reduce(
            (shopTotal, product) =>
              shopTotal + product.price * product.quantity,
            0
          )
      );
    }, 0);
  };

  const getSelectedCount = () => {
    return shops.reduce((count, shop) => {
      return count + shop.products.filter((product) => product.selected).length;
    }, 0);
  };

  const getTotalCount = () => {
    return shops.reduce((count, shop) => count + shop.products.length, 0);
  };

  return (
    <div className='cart-container'>
      <div className='cart-header'>
        <div className='header-item header-product'>
          <input
            type='checkbox'
            className='select-all-checkbox'
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <span>Sản Phẩm</span>
        </div>
        <div className='header-item'>Đơn Giá</div>
        <div className='header-item quantity-header'>Số Lượng</div>
        <div className='header-item'>Số Tiền</div>
        <div className='header-item'>Thao Tác</div>
      </div>

      {shops.map((shop) => (
        <div key={shop.id} className='shop-section'>
          <div className='shop-header'>
            <input
              type='checkbox'
              className='shop-checkbox'
              checked={shop.selected}
              onChange={() => handleSelectShop(shop.id)}
            />
            <span className='shop-name'>{shop.name}</span>
          </div>

          {shop.products.map((product) => (
            <div key={product.id} className='cart-item'>
              <div className='item-info'>
                <input
                  type='checkbox'
                  className='item-checkbox'
                  checked={product.selected}
                  onChange={() => handleSelectProduct(shop.id, product.id)}
                />
                <div className='item-image'>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className='item-details'>
                  <div className='item-name'>
                    {product.badge && (
                      <span className={`badge ${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </span>
                    )}
                    {product.name}
                  </div>
                  {product.category && (
                    <div className='item-category'>
                      Phân Loại Hàng: {product.category}
                    </div>
                  )}
                </div>
              </div>

              <div className='item-price'>
                <span className='original-price'>
                  ₫{product.originalPrice.toLocaleString()}
                </span>
                <span className='current-price'>
                  ₫{product.price.toLocaleString()}
                </span>
              </div>

              <div className='quantity-controls'>
                <button
                  className='quantity-btn'
                  onClick={() => handleQuantityChange(shop.id, product.id, -1)}
                >
                  -
                </button>
                <input
                  type='text'
                  value={product.quantity}
                  className='quantity-input'
                  readOnly
                />
                <button
                  className='quantity-btn'
                  onClick={() => handleQuantityChange(shop.id, product.id, 1)}
                >
                  +
                </button>
              </div>

              <div className='item-total'>
                ₫{(product.price * product.quantity).toLocaleString()}
              </div>

              <div className='item-actions'>
                <button className='delete-btn'>Xóa</button>
                <button className='find-similar-btn'>
                  Tìm sản phẩm tương tự
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className='cart-footer'>
        <div className='footer-left'>
          <input
            type='checkbox'
            className='select-all'
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <span>Chọn Tất Cả ({getTotalCount()})</span>
          <button className='delete-selected' onClick={handleResetSelection}>
            Xóa
          </button>
        </div>
        <div className='footer-right'>
          <div className='total-section'>
            <span>Tổng thanh toán ({getSelectedCount()} Sản phẩm):</span>
            <span className='total-amount'>
              ₫{calculateTotal().toLocaleString()}
            </span>
          </div>
          <button className='checkout-btn'>Mua Hàng</button>
        </div>
      </div>
    </div>
  );
};

export default ADSmartCart;
