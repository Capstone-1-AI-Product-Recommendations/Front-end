import React from 'react';
import './OrderManagement.css';

const OrderManagement = () => {
  const orders = [
    {
      id: 'Arise827',
      customer: 'Ellie Collins',
      product: 'Ginger Snacks',
      date: '12/12/2021',
      amount: '$18.00',
      status: 'Paid',
      delivery: 'Delivered'
    },
    // Thêm các đơn hàng mẫu khác
  ];

  return (
    <div className="order-management">
      <h2>Quản lý đơn hàng</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Sản phẩm</th>
            <th>Ngày đặt</th>
            <th>Số tiền</th>
            <th>Trạng thái thanh toán</th>
            <th>Trạng thái giao hàng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.date}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>{order.delivery}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement; 