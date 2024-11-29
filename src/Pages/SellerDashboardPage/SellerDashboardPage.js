import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../Components/seller/SellerDashboard/Sidebar/Sidebar';
import SellerHeader from '../../Components/seller/SellerDashboard/SellerHeader/SellerHeader';
import SellerProductManagement from '../../Components/seller/SellerDashboard/SellerProductManagement/SellerProductManagement';
import './SellerDashboardPage.css';

const SellerDashboardPage = () => {
  return (
    <div className="seller-dashboard-page">
      <SellerHeader />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<SellerProductManagement />} />
            <Route path="/products" element={<SellerProductManagement />} />
            {/* Thêm các routes khác cho seller dashboard */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage; 