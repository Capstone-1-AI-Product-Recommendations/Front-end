// Inventory.js
import React, { useState, useEffect } from 'react';
import './Inventory.css';
import { fetchInventoryData } from '../../../../services/sellerService';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('kho-hang');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inventoryItems, setInventoryItems] = useState([]);

  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user object from local storage
  const userId = user ? user.user_id : null; // Extract user_id from user object

  useEffect(() => {
    if (userId) {
      const getInventoryData = async () => {
        try {
          const items = await fetchInventoryData(userId);
          setInventoryItems(items);
        } catch (error) {
          console.error('Error fetching inventory data:', error);
        }
      };

      getInventoryData();
    } else {
      console.error('User ID is null');
    }
  }, [userId]);

  const filteredItems = inventoryItems.filter(item =>
    (typeof item.sku === 'string' && item.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof item.name === 'string' && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  const formatDate = (dateString) => {
    if (!dateString) return 'Đang kiểm tra';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  return (
    <div className="inventory-container">
      {/* Tab Menu */}
      {/* <div className="inventory-tabs">
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
      </div> */}

      {/* Stats Cards */}
      {/* <div className="inventory-stats">
        {inventoryStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div> */}

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
        <button className="create-transaction">Thêm sản phẩm</button>
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
              <th>NGÀY THÊM</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td className="product-cell">
                  <img src={item.images[0]} alt={item.name} />
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
                <td>{formatDate(item.recent_date)}</td>
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