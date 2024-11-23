import React from 'react';
import './DashboardStats.css';
import { FaUsers, FaShoppingBag, FaChartLine, FaBox } from 'react-icons/fa';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      value: '250k',
      label: 'Sales',
      bgColor: '#FFE8E8',
      iconColor: '#FF6B6B',
      icon: <FaChartLine />,
    },
    {
      id: 2,
      value: '24m',
      label: 'Customers',
      bgColor: '#E8F0FF',
      iconColor: '#4187FF',
      icon: <FaUsers />,
    },
    {
      id: 3,
      value: '15k',
      label: 'Products',
      bgColor: '#FFF4E8',
      iconColor: '#FFB648',
      icon: <FaBox />,
    },
    {
      id: 4,
      value: '180m',
      label: 'Revenue',
      bgColor: '#E8FFE8',
      iconColor: '#4CAF50',
      icon: <FaShoppingBag />,
    },
  ];

  return (
    <div className="overview">
      <div className="stats-grid">
        {stats.map((stat) => (
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
