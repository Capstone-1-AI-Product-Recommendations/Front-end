// src/layouts/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../Components/admin/Common/Header/AdminHeader';
import Sidebar from '../../Components/admin/Common/Sidebar/Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
