import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import PublicLayout from './PublicLayout';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Render layout tương ứng dựa vào route
  return isAdminRoute ? <AdminLayout /> : <PublicLayout />;
};

export default MainLayout; 