import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './SellerProducts.css';

// Hàm tạo dữ liệu giả
const generateFakeProducts = (num) => {
  const products = [];
  for (let i = 1; i <= num; i++) {
    products.push({
      id: i,
      name: `Sản phẩm ${i}`,
      sales: Math.floor(Math.random() * 1000),
      price: (Math.random() * 100).toFixed(2),
      stock: Math.floor(Math.random() * 100),
      quality: Math.random() > 0.5 ? 'Tốt' : 'Kém',
    });
  }
  return products;
};

const SellerProducts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState(generateFakeProducts(20)); // Tạo 20 sản phẩm giả
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // Số sản phẩm trên mỗi trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const renderPagination = () => (
    <div className="pagination">
      <button
        className="nav-button-prev"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {renderPageNumbers()}

      <button
        className="nav-button-next"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );

  const tabs = [
    { id: 'all', label: 'Tất cả', count: products.length },
    { id: 'active', label: 'Đang hoạt động', count: 0 },
    { id: 'violation', label: 'Vi phạm', count: 0 },
    { id: 'pending', label: 'Chờ duyệt', count: 0 },
  ];

  return (
    <div className="seller-products">
      <div className="products-header">
        <h2>Sản phẩm</h2>
        <button className="add-product-btn">
          <FaPlus /> Thêm 1 sản phẩm mới
        </button>
      </div>

      <div className="products-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="products-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
        <div className="filter-actions">
          <select className="filter-select">
            <option>Quản lý kho hàng</option>
          </select>
          <select className="filter-select">
            <option>Quản lý giá sản phẩm</option>
          </select>
        </div>
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Tên sản phẩm</th>
              <th>Doanh số</th>
              <th>Giá</th>
              <th>Kho hàng</th>
              <th>Chất Lượng Nội Dung</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{product.name}</td>
                <td>{product.sales}</td>
                <td>{product.price} VNĐ</td>
                <td>{product.stock}</td>
                <td>{product.quality}</td>
                <td>
                  <button className="action-button">Chỉnh sửa</button>
                </td>
              </tr>
            ))}
            {currentProducts.length === 0 && (
              <tr className="empty-state">
                <td colSpan="7">
                  <div className="empty-content">
                    <img src="/path-to-empty-box-image.png" alt="Không có sản phẩm" />
                    <p>Không tìm thấy sản phẩm</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bottom-pagination">
        {renderPagination()}
      </div>
    </div>
  );
};

export default SellerProducts; 