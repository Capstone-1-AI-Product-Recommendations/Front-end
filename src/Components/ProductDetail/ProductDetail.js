import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://127.0.0.1/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (operation) => {
    if (operation === "increase") {
      setQuantity(prevQuantity => prevQuantity + 1);
    } else if (operation === "decrease" && quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    navigate("/cart");
  };

  const handleBuyNow = () => {
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
    navigate("/checkout");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Không có sản phẩm nào!</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-images">
        <img
          src={product.imageUrl || product.images[0] || "/path/to/fallback-image.jpg"}
          alt={product.title}
          className="main-image"
        />
        <div className="thumbnail-images">
          {(product.altImages || product.images.slice(1)).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.title} thumbnail ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.title}</h1>
        <div className="product-rating">
          {"⭐".repeat(product.rating || 0)}
        </div>
        <p className="product-description-text">{product.description}</p>
        {product.discount && <span className="discount">{product.discount}</span>}
        <p className="price">
          <span className="current-price">{product.price}</span>
          {product.originalPrice && <span className="original-price">{product.originalPrice}</span>}
        </p>
        <div className="special-offers">
          <h3>Special Offer:</h3>
        </div>
        <div className="quantity-control">
          <button 
            aria-label="Decrease quantity" 
            onClick={() => handleQuantityChange("decrease")}>-</button>
          <span>{quantity}</span>
          <button 
            aria-label="Increase quantity" 
            onClick={() => handleQuantityChange("increase")}>+</button>
        </div>
        <button onClick={handleAddToCart} className="add-to-cart">Thêm vào giỏ hàng</button>
        <button onClick={handleBuyNow} className="buy-now">Mua hàng</button>
        <div className="extra-info">
          <p>Payment and warranty information...</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
