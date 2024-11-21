import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardStats from '../dashboard/DashboardStats';
import DashboardChart from '../dashboard/DashboardChart';
import OrdersTable from '../dashboard/OrdersTable';
import './PublicLayout.css';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      {/* Stats Cards */}
      <DashboardStats />
      
      {/* Charts Section */}
      <div className="charts-section">
        <DashboardChart />
      </div>

      {/* Orders Table */}
      <OrdersTable />

      <Outlet />
    </div>
  );
};

export default PublicLayout; 