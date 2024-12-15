import React from 'react';
import './ProductSearch.css';
import productImg from '../../../../img/Product/cake.png';

const ProductSearch = () => {
  const shops = [
    {
      id: 1,
      name: "Bánh Ngọt Homemade",
      rating: 4.8,
      followers: "46.5k",
      shopImage: productImg
    },
    {
      id: 2, 
      name: "Tiệm Bánh Ngọt Healthy",
      rating: 4.9,
      followers: "38.2k",
      shopImage: productImg
    },
    {
      id: 3,
      name: "Sweet Bakery House",
      rating: 4.7,
      followers: "25.1k", 
      shopImage: productImg
    },
    {
      id: 4,
      name: "Bánh Ngọt Handmade",
      rating: 4.6,
      followers: "15.3k",
      shopImage: productImg
    },
    {
      id: 5,
      name: "Bánh Ngọt Handmade",
      rating: 4.6,
      followers: "15.3k",
      shopImage: productImg
    }
  ];

  return (
    <div className="product-search">
      <div className="search-header">
        <h2>SHOP LIÊN QUAN ĐẾN "BÁNH NGỌT"</h2>
        <a href="#" className="more-results">Thêm Kết Quả &gt;</a>
      </div>

      <div className="products-container">
        {shops.map(shop => (
          <div key={shop.id} className="shop-card">
            <img src={shop.shopImage} alt="Shop" className="shop-avatar" />
            <div className="shop-info">
              <h3>{shop.name}</h3>
              <div className="shop-stats">
                <span className="rating">⭐ {shop.rating}</span>
                <span className="followers">{shop.followers} Followers</span>
              </div>
              <button className="view-shop">Xem Shop</button>
            </div>
          </div>
        ))}

        {/* <div className="promo-card">
          <div className="promo-content">
            <span className="promo-text">Giảm ₫10k</span>
            <span className="promo-condition">Đơn tối thiểu ₫119k</span>
            <button className="save-button">Lưu</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductSearch;