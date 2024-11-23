// src/layouts/AdminLayout.js
import React from "react";
import Sidebar from ".././Components/admin/Common/Sidebar/Sidebar";
import AdminHeader from ".././Components/admin/Common/Header/AdminHeader";
import "./AdminLayout.css";
import PublicLayout from "./PublicLayout";
import Permission from "../Components/admin/Permission/Permission"
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader />
        <div className="admin-content">
        <Permission/>
        <PublicLayout/>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
