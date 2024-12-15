// Inventory.js
import React, { useState } from 'react';
import './Inventory.css';
import productImg from "../../../../img/Product/newProduct.png";

const Inventory = () => {
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

  const inventoryItems = [
    {
      sku: 'SP0013-1',
      image: productImg,
      name: 'Hươu hà nội',
      description: 'Lên tường màu hồng',
      cost: 130000,
      stock: 1,
      totalValue: 130000,
    },
    {
      sku: 'SP0008',
      image: productImg,
      name: 'Gấu Misa',
      description: '',
      cost: 300000,
      stock: 6,
      totalValue: 1800000,
      warning: true,
    },
    {
      sku: 'SP0023-11',
      image: productImg,
      name: 'MINI',
      description: 'Hồng Xanh',
      cost: 200000,
      stock: 0,
      totalValue: 0,
    },
    {
      sku: 'SP0037',
      image: productImg,
      name: 'Dior flowers',
      description: '',
      cost: 500000,
      stock: 0,
      totalValue: 0,
    },
    {
      sku: 'SP0013-2',
      image: productImg,
      name: 'Hươu hà nội',
      description: 'Lên tường màu xanh',
      cost: 130000,
      stock: 2,
      totalValue: 260000,
    },
  ];

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
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

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

      {/* Inventory Table */}
      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>SẢN PHẨM</th>
              <th>GIÁ VỐN</th>
              <th>TỒN KHO</th>
              <th>GIÁ TRỊ TỒN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td className="product-cell">
                  <img src={item.image} alt={item.name} />
                  <div className="product-info">
                    <div className="product-name">{item.name}</div>
                    <div className="product-description">{item.description}</div>
                  </div>
                </td>
                <td>{item.cost.toLocaleString()}</td>
                <td className={item.warning ? 'warning' : ''}>
                  {item.stock}
                </td>
                <td>{item.totalValue.toLocaleString()}</td>
                <td>
                  <button className="action-button">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;