// import { useNavigate } from "react-router-dom";

// <<<<<<< HEAD:src/Components/client/Product/ProductList.js
// import React from "react";
// import products from "../../../data/product"; // Import danh sách sản phẩm
// import Product from "./Product"; // Import component Product
// =======
// const ProductList = ({ products }) => {
//   const navigate = useNavigate();

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };
// >>>>>>> duyen:src/Components/Product/ProductList.js

//   return (
//     <div>
//       {products.map((product) => (
//         <div key={product.id}>
//           <img
//             src={product.imageUrl}
//             alt={product.title}
//             onClick={() => handleProductClick(product.id)}
//             style={{ cursor: "pointer" }}
//           />
//           <h2>{product.title}</h2>
//           <p>{product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
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
