import React from "react";
import ProductDetailData from '../../../data/ProductDetailData';

const ProductList = () => {
  return (
    <div className="product-list">
      {ProductDetailData.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.title} />
          <div className="product-info">
            <h3>{product.title}</h3>
            <p className="price">{product.price}</p>
            {product.discount && (
              <span className="discount">{product.discount}</span>
            )}
            {product.badge && (
              <span className="badge">{product.badge}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
