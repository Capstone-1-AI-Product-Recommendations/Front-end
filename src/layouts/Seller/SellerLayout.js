import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderSeller from "../../Components/seller/SellerDashboard/HeaderSeller/HeaderSeller";
import SidebarSeller from '../../Components/seller/SellerDashboard/SidebarSeller/SidebarSeller';
import './SellerLayout.css';
import SellerProducts from '../../Components/seller/SellerDashboard/SellerProduct/SellerProducts';

const SellerLayout = () => {
  return (
    <div className="seller-layout">
      <div className="seller-sidebar">
        <SidebarSeller />
      </div>
      <div className="seller-main-container">
        <HeaderSeller />
        <div className="seller-content">
        {/* <SellerProducts/> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;