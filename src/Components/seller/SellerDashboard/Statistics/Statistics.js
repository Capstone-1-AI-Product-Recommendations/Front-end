import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './Statistics.css';
import { fetchSalesSummary, fetchYearlySalesSummary, fetchCategoryData } from '../../../../services/sellerService';

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('year'); // Default to 'year'
  const [stats, setStats] = useState({
    totalRevenue: '0 đ',
    totalOrders: '0',
    averageOrder: '0 đ',
  });
  const [yearlySalesData, setYearlySalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user", user);
    const userId = user ? user.user_id : null;
    if (userId) {
      fetchSalesSummary(userId).then(data => {
        setStats({
          totalRevenue: `${data.totalRevenue.toLocaleString()} đ`,
          totalOrders: data.totalOrders.toString(),
          averageOrder: `${data.averageOrderValue.toLocaleString()} đ`,
        });
      }).catch(error => {
        console.error('Error fetching sales summary:', error);
      });

      fetchYearlySalesSummary(userId).then(data => {
        setYearlySalesData(data);
      }).catch(error => {
        console.error('Error fetching yearly sales summary:', error);
      });

      fetchCategoryData(userId).then(data => {
        setCategoryData(data);
      }).catch(error => {
        console.error('Error fetching category data:', error);
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }, []);

  // Data mẫu
  const salesData = {
    week: [
      { name: 'CN', sales: 4000, orders: 24 },
      { name: 'T2', sales: 3000, orders: 18 },
      { name: 'T3', sales: 2000, orders: 15 },
      { name: 'T4', sales: 2780, orders: 20 },
      { name: 'T5', sales: 1890, orders: 14 },
      { name: 'T6', sales: 2390, orders: 17 },
      { name: 'T7', sales: 3490, orders: 22 },
    ],
    month: [
      { name: 'Tuần 1', sales: 12000, orders: 75 },
      { name: 'Tuần 2', sales: 15000, orders: 85 },
      { name: 'Tuần 3', sales: 13500, orders: 80 },
      { name: 'Tuần 4', sales: 16000, orders: 90 },
    ],
    year: [
      { name: 'T1', sales: 45000, orders: 280 },
      { name: 'T2', sales: 48000, orders: 290 },
      { name: 'T3', sales: 52000, orders: 310 },
      { name: 'T4', sales: 49000, orders: 295 },
      { name: 'T5', sales: 53000, orders: 320 },
      { name: 'T6', sales: 56000, orders: 340 },
      { name: 'T7', sales: 54000, orders: 330 },
      { name: 'T8', sales: 58000, orders: 350 },
      { name: 'T9', sales: 57000, orders: 345 },
      { name: 'T10', sales: 60000, orders: 360 },
      { name: 'T11', sales: 62000, orders: 375 },
      { name: 'T12', sales: 65000, orders: 390 },
    ],
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <h2>Thống kê bán hàng</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="week">7 ngày qua</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm nay</option>
        </select>
      </div>

      <div className="stats-summary">
        <div className="stat-card">
          <h3>Tổng doanh thu</h3>
          <p>{stats.totalRevenue}</p>
        </div>
        <div className="stat-card">
          <h3>Tổng đơn hàng</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Giá trị đơn trung bình</h3>
          <p>{stats.averageOrder}</p>
        </div>
        {/* <div className="stat-card">
          <h3>Tỷ lệ chuyển đổi</h3>
          <p>{stats.conversionRate}</p>
        </div> */}
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>Doanh thu theo thời gian</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeRange === 'year' ? yearlySalesData : salesData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                name="Doanh thu"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper">
          <h3>Số lượng đơn hàng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeRange === 'year' ? yearlySalesData : salesData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="orders"
                fill="#82ca9d"
                name="Đơn hàng"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper">
          <h3>Phân bố danh mục</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;