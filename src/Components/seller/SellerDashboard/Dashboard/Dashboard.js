import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', product: 'Laptop', amount: 1200, status: 'Pending' },
    { id: 2, customer: 'Jane Smith', product: 'Phone', amount: 800, status: 'Completed' },
    { id: 3, customer: 'Bob Johnson', product: 'Tablet', amount: 500, status: 'Processing' },
  ]);

  const stats = {
    totalSales: orders.reduce((sum, order) => sum + order.amount, 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'Pending').length,
    completedOrders: orders.filter(order => order.status === 'Completed').length
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>Seller Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Seller</span>
        </div>
      </nav>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>${stats.totalSales}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p>{stats.pendingOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Orders</h3>
          <p>{stats.completedOrders}</p>
        </div>
      </div>

      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>${order.amount}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;