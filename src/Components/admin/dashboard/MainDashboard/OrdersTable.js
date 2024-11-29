import React, { useState } from 'react';
import './OrdersTable.css';

const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const orders = Array.from({ length: 50 }, (_, index) => ({
    id: `ORDER${index + 1}`,
    customer: `Khách hàng ${index + 1}`,
    product: `Sản phẩm ${index + 1}`,
    date: '12/12/2021',
    amount: `$${(index + 1) * 10}.00`,
    status: index % 3 === 0 ? 'Paid' : (index % 3 === 1 ? 'Pending' : 'Error'),
    delivery: index % 2 === 0 ? 'Delivered' : 'Processing'
  }));

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="orders-table">
      <h3>Đơn hàng gần đây</h3>
      <table>
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Sản phẩm</th>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt</th>
            <th>Số tiền</th>
            <th>Trạng thái thanh toán</th>
            <th>Trạng thái đơn hàng</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(order => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.amount}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status === 'Paid' ? 'Đã thanh toán' : 
                   order.status === 'Pending' ? 'Đang chờ' : 'Lỗi'}
                </span>
              </td>
              <td>
                <span className={`delivery ${order.delivery.toLowerCase()}`}>
                  {order.delivery === 'Delivered' ? 'Đã giao hàng' : 'Đang xử lý'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination" style={{marginTop: '20px', textAlign: 'center'}}>
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: currentPage === index + 1 ? '#007bff' : '#fff',
              color: currentPage === index + 1 ? '#fff' : '#000',
              border: '1px solid #007bff',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;