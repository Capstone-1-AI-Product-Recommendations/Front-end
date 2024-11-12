/** @format */

import { React, useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DashboardComponents.css';

// Dashboard Content Component
export const DashboardContent = () => {
  const salesData = [
    { month: "Jan", sales: 4000, orders: 240, visitors: 2400 },
    { month: "Feb", sales: 3000, orders: 198, visitors: 2210 },
    { month: "Mar", sales: 5000, orders: 300, visitors: 2290 },
    { month: "Apr", sales: 2780, orders: 208, visitors: 2000 },
    { month: "May", sales: 1890, orders: 198, visitors: 2181 },
    { month: "Jun", sales: 2390, orders: 260, visitors: 2500 },
  ];

  const recentOrders = [
    {
      id: "#1234",
      customer: "John Doe",
      date: "2024-03-20",
      status: "Completed",
      total: "$120.00",
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      date: "2024-03-19",
      status: "Processing",
      total: "$85.50",
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      date: "2024-03-19",
      status: "Pending",
      total: "$220.00",
    },
    {
      id: "#1237",
      customer: "Sarah Williams",
      date: "2024-03-18",
      status: "Completed",
      total: "$95.00",
    },
  ];

  const stats = [
    { title: "Total Sales", value: "$12,590", change: "+12.5%", icon: "📈" },
    { title: "Total Orders", value: "156", change: "+8.2%", icon: "📦" },
    {
      title: "Average Order Value",
      value: "$80.70",
      change: "+5.1%",
      icon: "💰",
    },
    { title: "Total Customers", value: "1,245", change: "+15.3%", icon: "👥" },
  ];

  return (
    <div className='dashboard-content'>
      <div className='stats-grid'>
        {stats.map((stat, index) => (
          <div key={index} className='stat-card'>
            <div className='stat-icon'>{stat.icon}</div>
            <div className='stat-info'>
              <h3>{stat.title}</h3>
              <div className='stat-value'>{stat.value}</div>
              <div
                className={`stat-change ${
                  stat.change.startsWith("+") ? "positive" : "negative"
                }`}
              >
                {stat.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='charts-container'>
        <div className='chart-card'>
          <h3>Sales Overview</h3>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='sales' stroke='#8884d8' />
              <Line type='monotone' dataKey='orders' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='chart-card'>
          <h3>Visitor Statistics</h3>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='visitors' fill='#8884d8' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='recent-orders-card'>
        <h3>Recent Orders</h3>
        <div className='table-responsive'>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>
                    <span
                      className={`status-badge ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.total}</td>
                  <td>
                    <button className='action-button'>View</button>
                    <button className='action-button'>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Orders Content Component
export const OrdersContent = () => {
  const orders = [
    {
      id: "#1234",
      customer: "John Doe",
      date: "2024-03-20",
      status: "Completed",
      total: "$120.00",
      items: ["Product A", "Product B"],
      shipping: "Express",
      payment: "Credit Card",
    },
    // Add more orders...
  ];

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status.toLowerCase() === filterStatus;
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className='orders-content'>
      <div className='orders-header'>
        <div className='search-filters'>
          <input
            type='text'
            placeholder='Search orders...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className='status-filter'
          >
            <option value='all'>All Status</option>
            <option value='completed'>Completed</option>
            <option value='processing'>Processing</option>
            <option value='pending'>Pending</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
        <button className='export-button'>Export Orders</button>
      </div>

      <div className='orders-table-container'>
        <table className='orders-table'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Shipping</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.items.join(", ")}</td>
                <td>{order.shipping}</td>
                <td>{order.total}</td>
                <td>
                  <span
                    className={`status-badge ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className='action-buttons'>
                    <button className='action-button'>View</button>
                    <button className='action-button'>Edit</button>
                    <button className='action-button'>Print</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='pagination'>
        <button>&lt; Previous</button>
        <span>Page 1 of 10</span>
        <button>Next &gt;</button>
      </div>
    </div>
  );
};
