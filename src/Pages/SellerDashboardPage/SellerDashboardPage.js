import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../../Components/seller/SellerDashboard/Sidebar/Sidebar';
import SellerHeader from '../../Components/seller/SellerDashboard/SellerHeader/SellerHeader';
import SellerProductManagement from '../../Components/seller/SellerDashboard/SellerProductManagement/SellerProductManagement';
import './SellerDashboardPage.css';
import DashboardOverview from '../../Components/seller/SellerDashboard/DashboardOverview/DashboardOverview';

const SellerDashboardPage = () => {
  return (
    <div className="seller-dashboard-page">
      <SellerHeader />
      <div className="dashboard-content-seller">
        <Sidebar />
        <div className="main-content-seller">
          {/* <Routes> */}
            {/* <Route path="/" element={<SellerProductManagement />} />
            <Route path="/products" element={<SellerProductManagement />} />
            <Route path="/overview" element={<DashboardOverview/>} /> */}
            <Outlet/>
            
            {/* Thêm các routes khác cho seller dashboard */}
          {/* </Routes> */}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage; 