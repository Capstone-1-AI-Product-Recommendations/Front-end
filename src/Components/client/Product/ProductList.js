// src/components/ProductList.js

import React from "react";
import products from "../../../data/product"; // Import danh sách sản phẩm
import Product from "./Product"; // Import component Product

const ProductList = () => {
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
