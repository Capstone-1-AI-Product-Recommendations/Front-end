// DashboardOverview.js
import React from 'react';
import './DashboardOverview.css';
import Orders from '../Order/Order';

const DashboardOverview = ({ orders = [] }) => {
  const overviewItems = [
    { title: 'Đơn chờ xác nhận', count: orders.filter(order => order.status === 'chờ xác nhận').length, color: 'red' },
    { title: 'Đơn đang giao', count: orders.filter(order => order.status === 'đang xử lý').length, color: 'red' },
    { title: 'Đơn chưa thanh toán', count: orders.filter(order => order.paymentStatus === 'chưa thanh toán').length, color: 'red' },
    { title: 'Sản phẩm hết hàng', count: orders.filter(order => order.stock === 0).length, color: 'green' },
    { title: 'Sản phẩm tồn kho thấp', count: orders.filter(order => order.stock < 5).length, color: 'green' },
    { title: 'Khách hàng cần nhắc nợ', count: orders.filter(order => order.paymentStatus === 'cần nhắc nợ').length, color: 'orange' },
    { title: 'Khách hàng chưa có lịch nhắc nợ', count: orders.filter(order => order.reminder === false).length, color: 'orange' },
    { title: 'Cần thu nợ', count: orders.reduce((total, order) => total + order.total, 0).toLocaleString(), color: 'orange' }
  ];
  
  const actions = {
    'BÁN HÀNG': [
      { title: 'Tạo đơn hàng', icon: '+' },
      { title: 'Tạo đơn tại bàn', icon: '+' }
    ],
    'HÀNG HÓA': [
      { title: 'Tạo sản phẩm mới', icon: '+' },
      { title: 'Nhập kho', icon: '+' },
      { title: 'Kiểm kho', icon: '+' }
    ],
    'TÀI CHÍNH': [
      { title: 'Tạo khoản thu', icon: '+' },
      { title: 'Tạo khoản chi', icon: '+' },
      { title: 'Tạo nợ khách hàng', icon: '+' }
    ]
  }
  return (
    <div className="dashboard-overview">
      {/* <div className="overview-grid">
        {overviewItems.map((item, index) => (
          <div key={index} className={`overview-card ${item.color}`}>
            <div className="card-number">{item.count}</div>
            <div className="card-title">{item.title}</div>
          </div>
        ))}
      </div> */}
      <Orders/>
      {/* <div className="quick-actions">
        <h2>Thao tác nhanh</h2>
        <div className="actions-container">
          {Object.entries(actions).map(([category, items]) => (
            <div key={category} className="action-category">
              <h3>{category}</h3>
              <div className="action-items">
                {items.map((item, index) => (
                  <button key={index} className="action-button">
                    <span className="action-icon">{item.icon}</span>
                    <span className="action-title">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default DashboardOverview;