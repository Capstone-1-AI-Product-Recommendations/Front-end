import React from 'react';
import './DashboardStats.css';

const DashboardStats = () => {
  const stats = [
    { id: 1, value: '250k', label: 'Sales', color: '#FF6B6B' },
    { id: 2, value: '24m', label: 'Customers', color: '#4D96FF' },
    { id: 3, value: '15k', label: 'Products', color: '#FFB84C' },
    { id: 4, value: '180m', label: 'Revenue', color: '#4CAF50' }
  ];

  return (
    <div className="stats-container">
      {stats.map(stat => (
        <div key={stat.id} className="stat-card" style={{ borderColor: stat.color }}>
          <h3 className="stat-value" style={{ color: stat.color }}>{stat.value}</h3>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats; 