// Orders.js
import React, { useState } from 'react';
import './Orders.css';
import productImg from "../../../../img/Product/newProduct.png"; // Import a default product image

const Orders = () => {
  const [dateRange, setDateRange] = useState('01-11-2023 - 16-11-2023');
  const [orderType, setOrderType] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [paymentSource, setPaymentSource] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

  const generateRandomOrders = () => {
    const randomOrders = [];
    for (let i = 0; i < 100; i++) {
      const randomUsername = `user${i + 1}`;
      const randomStatus = ['chờ xác nhận', 'đang xử lý', 'đã giao', 'trả hàng', 'đã hủy'][Math.floor(Math.random() * 5)];
      const randomTotal = Math.floor(Math.random() * 1000000);
      const randomPaymentMethod = ['thanh toán khi nhận hàng', 'chuyển khoản'][Math.floor(Math.random() * 2)];
      const randomProductName = `Sản phẩm ${i + 1}`; // Generate a random product name
      randomOrders.push({
        customer: { id: randomUsername },
        date: `15/11/2023 ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
        status: randomStatus,
        total: randomTotal,
        paymentMethod: randomPaymentMethod,
        productName: randomProductName, // Add the random product name to the order
      });
    }
    return randomOrders;
  };

  const orders = generateRandomOrders();

  const calculateOrderStats = () => {
    const orderStats = orders.reduce((acc, order) => {
      if (!acc[order.status]) {
        acc[order.status] = 1;
      } else {
        acc[order.status]++;
      }
      return acc;
    }, {
      'chờ xác nhận': 0,
      'đang xử lý': 0,
      'đã giao': 0,
      'trả hàng': 0,
      'đã hủy': 0,
    });

    return Object.entries(orderStats).map(([label, value]) => ({
      label,
      value: value.toString(),
    }));
  };

  const orderStats = calculateOrderStats();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedOrders = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const renderPagination = () => {
    const paginationItems = [];
    const maxVisiblePages = 5; // Maximum number of visible page buttons
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const middlePage = Math.ceil(maxVisiblePages / 2);
        if (currentPage <= middlePage) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + middlePage - 1 >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - middlePage + 1;
            endPage = currentPage + middlePage - 1;
        }
    }

    // Add previous button
    if (currentPage > 1) {
        paginationItems.push(
            <button key="prev" onClick={() => handlePageChange(currentPage - 1)} className="pagination-nav">
                &lt;
            </button>
        );
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
            <button key={i} onClick={() => handlePageChange(i)} className={`pagination-button ${currentPage === i ? 'active' : ''}`}>
                {i}
            </button>
        );
    }

    // Add ellipsis
    if (startPage > 1) {
        paginationItems.unshift(<span className="ellipsis" key="ellipsis-start">...</span>);
    }
    if (endPage < totalPages) {
        paginationItems.push(<span className="ellipsis" key="ellipsis-end">...</span>);
    }

    // Add next button
    if (currentPage < totalPages) {
        paginationItems.push(
            <button key="next" onClick={() => handlePageChange(currentPage + 1)} className="pagination-nav">
                &gt;
            </button>
        );
    }

    return paginationItems;
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Đơn hàng</h1>
        <div className="header-buttons">
          <button className="create-order">Tạo đơn hàng</button>
          <button className="export-button">
            <span>Xuất file</span>
            <span className="arrow-down">▼</span>
          </button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="order-stats">
        {orderStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>

          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="order-filters">
        <div className="search-box">
          <input type="text" placeholder="Tìm mã đơn / tên / SĐT" />
        </div>
        <div className="date-range">
          <input type="text" value={dateRange} readOnly />
        </div>
        <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
          <option value="all">Kênh bán</option>
        </select>
        <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
          <option value="all">Trạng thái thanh toán</option>
        </select>
        <select value={paymentSource} onChange={(e) => setPaymentSource(e.target.value)}>
          <option value="all">Nguồn tiền nhận</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>TÊN NGƯỜI MUA</th>
              <th>SẢN PHẨM</th>
              <th>ẢNH</th>
              <th>NGÀY TẠO</th>
              <th>PHƯƠNG THỨC THANH TOÁN</th>
              <th>TỔNG TIỀN</th>
              <th>TRẠNG THÁI</th>
              <th>HÀNH ĐỘNG</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr key={index}>
                <td className="customer-info">
                  <div className="customer-id">{order.customer.id}</div>
                </td>
                <td>{order.productName || 'N/A'}</td> {/* Display the random product name */}
                <td>
                  <img src={order.productImage || productImg} alt="Product" style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{order.date}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.total.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="action-button">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Orders;