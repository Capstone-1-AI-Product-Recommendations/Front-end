import React, { useState } from 'react';
import './Inventory.css';
import productImg from "../../../../img/Product/newProduct.png";

// Hàm tạo dữ liệu giả
const generateProducts = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    sku: `SP${String(index + 1).padStart(4, '0')}`,
    image: productImg,
    name: `Sản phẩm ${index + 1}`,
    description: `Mô tả cho sản phẩm ${index + 1}`,
    cost: Math.floor(Math.random() * 500000) + 100000,
    stock: Math.floor(Math.random() * 10),
    totalValue: Math.floor(Math.random() * 5000000),
  }));
};

const Inventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số sản phẩm trên mỗi trang

  const inventoryItems = generateProducts(20); // Tạo 20 sản phẩm giả lập

  // Tính toán phân trang
  const totalPages = Math.ceil(inventoryItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventoryItems.slice(indexOfFirstItem, indexOfLastItem);

  const [activeTab, setActiveTab] = useState('kho-hang');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const inventoryTabs = [
    { id: 'kho-hang', label: 'Kho hàng', icon: '🏪' },
    { id: 'so-kho', label: 'Số kho', icon: '📦' },
    { id: 'so-nhap-hang', label: 'Số nhập hàng', icon: '📥' },
    { id: 'so-xuat-hang', label: 'Số xuất hàng', icon: '📤' },
    { id: 'kiem-kho', label: 'Kiểm kho', icon: '📋' },
  ];

  const inventoryStats = [
    { label: 'Số lượng', value: '842' },
    { label: 'Giá trị tồn', value: '154.193.208' },
    { label: 'Thiếu hàng', value: '18' },
    { label: 'Chưa bắt tồn kho', value: '8' },
  ];

  // Xử lý chuyển trang
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="inventory-container">
         {/* Tab Menu */}
         <div className="inventory-tabs">
        {inventoryTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="inventory-stats">
        {inventoryStats.map((stat, index) => (
          <div key={index} className="stat-card">
          <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
      {/* Inventory Table */}
            {/* Search and Filter */}
            <div className="inventory-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm mã SKU/ Tên SP"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Danh mục</option>
            {/* Add your categories here */}
          </select>
        </div>
        <button className="create-transaction">Tạo giao dịch</button>
      </div>
      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>SẢN PHẨM</th>
              <th>GIÁ VỐN</th>
              <th>TỒN KHO</th>
              <th>GIÁ TRỊ TỒN</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td className="product-cell">
                  <img src={item.image} alt={item.name} />
                  <div className="product-info-inventory">
                    <div className="product-name">{item.name}</div>
                    <div className="product-description">{item.description}</div>
                  </div>
                </td>
                <td>{item.cost.toLocaleString()}</td>
                <td>{item.stock}</td>
                <td>{item.totalValue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      

      {/* Pagination */}
      <div className="pagination">
        <button className="pagination-btn-inventory" onClick={handlePrev} disabled={currentPage === 1}>
          Trước
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button className="pagination-btn-inventory" onClick={handleNext} disabled={currentPage === totalPages}>
          Sau
        </button>
      </div>
    </div>
  );
};

export default Inventory;
