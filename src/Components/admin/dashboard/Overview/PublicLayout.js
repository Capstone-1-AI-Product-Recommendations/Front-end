import React from "react";
import { Outlet } from "react-router-dom";
import DashboardStats from "../MainDashboard/DashboardStats";
import DashboardChart from "../MainDashboard/DashboardChart";
import OrdersTable from "../MainDashboard/OrdersTable";
import "./PublicLayout.css";
// import Overview from './Overview';

const PublicLayout = () => {
  return (

    <div className="public-layout">
    {/* <AdminHeader/> */}
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
