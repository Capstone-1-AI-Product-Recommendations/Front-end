import React, { useState, useEffect } from 'react';
import './Orders.css';
import productImg from "../../../../img/Product/newProduct.png"; // Import a default product image
import { fetchOrderData } from '../../../../services/sellerService'; // Import the new API function
import { exportOrders } from '../../../../services/sellerService'; // Import the new API function

const Orders = () => {
  const [dateRange, setDateRange] = useState('01-11-2023 - 16-11-2023');
  const [orderType, setOrderType] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [paymentSource, setPaymentSource] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("useEffect running");
    const user = JSON.parse(localStorage.getItem('user')); // Parse the user object from localStorage
    console.log("User from localStorage:", user);
    const userId = user ? user.user_id : null; // Extract user_id from the user object
    console.log("Extracted userId:", userId);
    if (userId) {
      fetchOrderData(userId).then(data => {
        console.log("Fetched orders:", data); // Log the fetched orders
        setOrders(data);
      }).catch(error => {
        console.error("Error fetching orders:", error);
      });
    } else {
      console.error("No userId found");
    }
  }, []);

  console.log("Orders state:", orders);

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

  const handleExport = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin user
      const sellerId = user ? user.user_id : null;
  
      if (!sellerId) {
        console.error("Seller ID not found");
        return;
      }
  
      const fileData = await exportOrders(sellerId); // Gọi API export
  
      // Lấy ngày hiện tại để tạo tên file
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate
        .getDate()
        .toString()
        .padStart(2, '0')}`; // Format: YYYY-MM-DD
      const fileName = `ThongKeDonHang_${formattedDate}.csv`; // Tên file theo ngày
  
      // Tạo blob và tải file về
      const blob = new Blob([fileData], {
        type: 'text/csv;charset=utf-8;', // CSV mặc định
      });
  
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName; // Sử dụng tên file động
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      console.log(`File ${fileName} has been downloaded successfully.`);
    } catch (error) {
      console.error('Failed to export orders:', error);
    }
  };
  const paginatedOrders = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Đơn hàng</h1>
        <div className="header-buttons">
          <button className="create-order">Tạo đơn hàng</button>
          <div className="export-button" onClick={() => handleExport('csv')}>
            <span>Xuất file</span>
            {/* <span className="arrow-down">▼</span> */}
          </div>
        </div>
      </div>

      {/* Order Stats */}
      <div className="order-stats">
        {orderStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
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
                  <div className="customer-id">{order.fullName}</div>
                </td>
                <td>{order.productName || 'N/A'}</td>
                <td>
                  <img src={order.images[0] || productImg} alt="Product" style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{order.recentDate}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.price.toLocaleString()}</td>
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
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)} className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Orders;