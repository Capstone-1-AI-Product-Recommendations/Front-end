import React from 'react';
import './OrdersTable.css';

const OrdersTable = () => {
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
    // Add more orders here
  ];

  return (
    <div className="orders-table">
      <h3>Recent Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>User ID</th>
            <th>Ordered Placed</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.amount}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <span className={`delivery ${order.delivery.toLowerCase()}`}>
                  {order.delivery}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable; 