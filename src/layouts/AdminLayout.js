// src/layouts/AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/admin/Sidebar/Sidebar";
import Header from "../Components/admin/Header/AdminHeader";
import "./AdminLayout.css";
import PublicLayout from "./PublicLayout";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header />
        <div className="admin-content">
        <PublicLayout/>
          {/* <Outlet /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
