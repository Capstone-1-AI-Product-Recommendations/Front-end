// AdminDashboard.js
import React, { useState } from 'react';
import {
  BarChart,
  Activity,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  Tag,
  TrendingUp,
  Truck,
  Shield,
  MessageCircle,
  Settings,
  ChevronDown
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: BarChart, label: 'Tổng Quan', color: '#3b82f6' },
    { id: 'sellers', icon: Users, label: 'Quản Lý Người Bán', color: '#22c55e' },
    { id: 'products', icon: Package, label: 'Quản Lý Sản Phẩm', color: '#a855f7' },
    { id: 'orders', icon: ShoppingCart, label: 'Quản Lý Đơn Hàng', color: '#eab308' },
    { id: 'users', icon: Users, label: 'Quản Lý Người Dùng', color: '#ef4444' },
    { id: 'payments', icon: CreditCard, label: 'Quản Lý Thanh Toán', color: '#6366f1' },
    { id: 'promotions', icon: Tag, label: 'Quản Lý Khuyến Mãi', color: '#ec4899' },
    { id: 'analytics', icon: TrendingUp, label: 'Báo Cáo & Phân Tích', color: '#06b6d4' },
    { id: 'shipping', icon: Truck, label: 'Quản Lý Vận Chuyển', color: '#f97316' },
    { id: 'security', icon: Shield, label: 'Quản Lý Bảo Mật', color: '#14b8a6' },
    { id: 'support', icon: MessageCircle, label: 'Hỗ Trợ Khách Hàng', color: '#f59e0b' },
    { id: 'settings', icon: Settings, label: 'Cấu Hình Hệ Thống', color: '#6b7280' }
  ];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
        <Icon style={{ color }} />
      </div>
      <div className="stat-card-content">
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );

  const DashboardContent = () => (
    <div className="dashboard-grid">
      <StatCard
        title="Doanh Thu Tháng"
        value="$45,231"
        icon={Activity}
        color="#3b82f6"
      />
      <StatCard
        title="Đơn Hàng Mới"
        value="124"
        icon={ShoppingCart}
        color="#22c55e"
      />
      <StatCard
        title="Người Bán Mới"
        value="45"
        icon={Users}
        color="#a855f7"
      />
      <StatCard
        title="Sản Phẩm Đang Chờ"
        value="89"
        icon={Package}
        color="#eab308"
      />
    </div>
  );

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Admin Panel</h1>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${selectedMenu === item.id ? 'active' : ''}`}
              onClick={() => setSelectedMenu(item.id)}
            >
              <item.icon style={{ color: item.color }} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <div className="header-info">
            <h2>{menuItems.find(item => item.id === selectedMenu)?.label}</h2>
            <p>Xem tổng quan và quản lý hệ thống của bạn</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline">
              Xuất Báo Cáo
              <ChevronDown />
            </button>
            <button className="btn btn-primary">
              Thao Tác Mới
              <ChevronDown />
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        {selectedMenu === 'dashboard' && <DashboardContent />}
        {/* Add other content components for different menu items */}
      </div>
    </div>
  );
};

export default AdminDashboard;