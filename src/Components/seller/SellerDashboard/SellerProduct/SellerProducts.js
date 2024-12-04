import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './SellerProducts.css';

const SellerProducts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'all', label: 'Tất cả', count: 0 },
    { id: 'active', label: 'Đang hoạt động', count: 0 },
    { id: 'violation', label: 'Vi phạm', count: 0 },
    { id: 'pending', label: 'Chờ duyệt bởi Shopee', count: 0 },
    { id: 'unpublished', label: 'Chưa được đăng', count: 0 }
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
            <option>Cài đặt sản phẩm</option>
          </select>
          <select className="filter-select">
            <option>Công cụ xử lý hàng loạt</option>
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
            <tr className="empty-state">
              <td colSpan="7">
                <div className="empty-content">
                  <img src="/path-to-empty-box-image.png" alt="Không có sản phẩm" />
                  <p>Không tìm thấy sản phẩm</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProducts; 