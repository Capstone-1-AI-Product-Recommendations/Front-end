// /** @format */

// import React, { useContext } from "react";
// import { CartContext } from "../Cart/CartContext";
// import { Link } from "react-router-dom";
// import  "./Product.module.css";

// const Product = ({ product }) => {
//   const { addToCart } = useContext(CartContext);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={styles.productItem}>
//       <img src={product.imageUrl || ""} alt={product.title || "Product"} />
//       <h3>{product.title || "Product Title"}</h3>
//       <div className={styles.price}>
//         <span className={styles.currentPrice}>{product.price || "N/A"}</span>
//         {product.originalPrice && (
//           <span className={styles.oldPrice}>{product.originalPrice}</span>
//         )}
//       </div>
//       <button onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
//       <Link to={`/product-detail/${product.id}`}>
//         <button>Chi tiết sản phẩm</button>
//       </Link>
//     </div>
//   );
// };

// export default Product;
