import React, { useState, useEffect } from 'react';
import productService from '../../../../services/productService';
import './ProductSearch.css';

const ProductSearch = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.searchProducts(searchTerm);
        setProducts(data.products);
        setError(null);
      } catch (err) {
        setError('Không thể tìm thấy sản phẩm');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="product-search">
      <div className="search-header">
        <h2>Kết quả tìm kiếm cho "{searchTerm}"</h2>
      </div>
      <div className="products-container">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.product_id} className="shop-card">
              <img src={product.images[0]} alt={product.name} className="shop-avatar" />
              <div className="shop-info">
                <h3>{product.name}</h3>
                <div className="shop-stats">
                  <span className="price">₫{product.price.toLocaleString()}</span>
                </div>
                <button className="view-shop">Xem sản phẩm</button>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;