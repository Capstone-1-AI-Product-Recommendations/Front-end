// ProductManagement.js
import React, { useState } from 'react';
import './SellerProductManagement.css';

const SellerProductManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchProduct, setSearchProduct] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [viewType, setViewType] = useState('list');

  const tabs = [
    { id: 'all', label: 'Tất cả', count: null },
    { id: 'active', label: 'Đang hoạt động', count: 0 },
    { id: 'violated', label: 'Vi phạm', count: 0 },
    { id: 'pending', label: 'Chờ duyệt bởi Shopee', count: 0 },
    { id: 'unpublished', label: 'Chưa được đăng', count: 0 },
  ];

  const menuItems = [
    {
      title: 'Quản Lý Đơn Hàng',
      items: [
        'Tất cả',
        'Giao Hàng Loạt',
        'Đơn Trả hàng/Hoàn tiền hoặc Đơn hủy',
        'Cài Đặt Vận Chuyển',
        'Bản Giao Đơn Hàng'
      ]
    },
    {
      title: 'Quản Lý Sản Phẩm',
      items: [
        'Tất Cả Sản Phẩm',
        'Thêm Sản Phẩm'
      ]
    },
    {
      title: 'Kênh Marketing',
      items: [
        'Kênh Marketing',
        'Đấu Giá Rẻ Vô Địch',
        'Quảng Cáo Shopee',
        'Tặng Đơn Cùng KOL',
        'Live & Video',
        'Khuyến Mãi của Shop',
        'Flash Sale Của Shop',
        'Mã Giảm Giá Của Shop'
      ]
    }
  ];

  return (
    <div className="product-management">
      {/* Left Sidebar */}
      <div className="sidebar">
        {menuItems.map((section, index) => (
          <div key={index} className="menu-section">
            <div className="section-title">{section.title}</div>
            <ul className="menu-list">
              {section.items.map((item, idx) => (
                <li key={idx} className="menu-item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="content-header">
          <div className="breadcrumb">
            <span>Trang chủ</span>
            <span className="separator">/</span>
            <span>Sản phẩm</span>
          </div>

          {/* Top Actions */}
          <div className="top-actions">
            <h1>Sản phẩm</h1>
            <div className="action-buttons">
              <button className="settings-btn">Cài đặt sản phẩm</button>
              <button className="bulk-btn">Công cụ xử lý hàng loạt</button>
              <button className="add-product-btn">+ Thêm 1 sản phẩm mới</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {tabs.map(tab => (
              <div 
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label} {tab.count !== null && `(${tab.count})`}
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
              />
              <input
                type="text"
                placeholder="Tìm kiếm theo ngành hàng"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              />
              <button className="link-btn">
                <i className="fas fa-link"></i>
              </button>
            </div>
            <div className="search-actions">
              <button className="apply-btn">Áp dụng</button>
              <button className="reload-btn">Nhập Lại</button>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="product-list-header">
          <div className="product-count">
            0 Sản Phẩm
            <span className="limit-info">Hạn mức đăng bán: 1000</span>
          </div>
          <div className="view-options">
            <button 
              className={`list-view ${viewType === 'list' ? 'active' : ''}`}
              onClick={() => setViewType('list')}
            >
              <i className="fas fa-list"></i>
            </button>
            <button 
              className={`grid-view ${viewType === 'grid' ? 'active' : ''}`}
              onClick={() => setViewType('grid')}
            >
              <i className="fas fa-th"></i>
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="empty-state">
          <img src="/empty-box.png" alt="Không tìm thấy sản phẩm" />
          <p>Không tìm thấy sản phẩm</p>
        </div>
      </div>
    </div>
  );
};

export default SellerProductManagement;