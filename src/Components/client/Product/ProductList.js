import { useNavigate } from "react-router-dom";
import React from "react";
import products from "../../../data/product"; // Import danh sách sản phẩm
// import Product from "./Product"; // Import component Product

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img
            src={product.imageUrl}
            alt={product.title}
            onClick={() => handleProductClick(product.id)}
            style={{ cursor: "pointer" }}
          />
          <h2>{product.title}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
