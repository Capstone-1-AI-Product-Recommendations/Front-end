import React, { useEffect, useState } from 'react';
import adminService from '../../../services/adminService';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleExport = async () => {
    try {
        const fileData = await adminService.exportOrders(); // Call the export API

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${currentDate
            .getDate()
            .toString()
            .padStart(2, '0')}`; // Format: YYYY-MM-DD
        const fileName = `OrderExport_${formattedDate}.csv`; // Dynamic file name

        const blob = new Blob([fileData], {
            type: 'text/csv;charset=utf-8;',
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName; // Use dynamic file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`File ${fileName} has been downloaded successfully.`);
    } catch (error) {
        console.error('Failed to export orders:', error);
    }
  };

  const filteredOrders = searchTerm
    ? orders.filter(order => order.order_id.toString() === searchTerm)
    : orders;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (endPage - startPage < maxPageNumbers - 1) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="order-management">
      <h2>Quản lý đơn hàng</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo mã đơn hàng"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button className="btn btn-secondary" onClick={handleExport}>
        Xuất file
      </button>
      <table className="order-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Giao dịch</th>
            <th>Tên shop</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.product_name}</td>
              <td><img src={order.product_image} alt={order.product_name} width="50" /></td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
              <td>{order.transaction_id}</td>
              <td>{order.shop_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default OrderManagement;