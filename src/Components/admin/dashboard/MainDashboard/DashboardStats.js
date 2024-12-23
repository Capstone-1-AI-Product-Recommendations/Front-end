import React, { useEffect, useState } from 'react';
import './DashboardStats.css';
import { FaUsers, FaShoppingBag, FaChartLine, FaBox } from 'react-icons/fa';
import adminService from '../../../../services/adminService';

const formatCurrency = (value) => {
  return value.toLocaleString('vi-VN') + ' đ';
};

const DashboardStats = () => {
  const [stats, setStats] = useState({
    seller_count: 0,
    user_count: 0,
    product_count: 0,
    total_revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStatistics();
        setStats(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      id: 1,
      value: stats.seller_count,
      label: 'Người bán',
      bgColor: '#FFE8E8',
      iconColor: '#FF6B6B',
      icon: <FaChartLine />,
    },
    {
      id: 2,
      value: stats.user_count,
      label: 'Người dùng',
      bgColor: '#E8F0FF',
      iconColor: '#4187FF',
      icon: <FaUsers />,
    },
    {
      id: 3,
      value: stats.product_count,
      label: 'Sản phẩm',
      bgColor: '#FFF4E8',
      iconColor: '#FFB648',
      icon: <FaBox />,
    },
    {
      id: 4,
      value: formatCurrency(stats.total_revenue),
      label: 'Doanh thu',
      bgColor: '#E8FFE8',
      iconColor: '#4CAF50',
      icon: <FaShoppingBag />,
    },
  ];

  return (
    <div className="overview">
      <div className="stats-grid">
        {statsData.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: stat.bgColor }}
            >
              {React.cloneElement(stat.icon, { style: { color: stat.iconColor } })}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
