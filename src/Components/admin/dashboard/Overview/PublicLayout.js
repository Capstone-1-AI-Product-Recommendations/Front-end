import React from "react";
import { Outlet } from "react-router-dom";
import DashboardStats from "../DashboardStats";
import DashboardChart from "../DashboardChart";
import OrdersTable from "../OrdersTable";
import "./PublicLayout.css";
// import Overview from './Overview';

const PublicLayout = () => {
  return (
    <div className="public-layout">
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
