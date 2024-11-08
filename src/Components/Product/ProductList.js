import { useNavigate } from "react-router-dom";

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
