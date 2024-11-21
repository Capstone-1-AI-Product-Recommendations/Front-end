import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom"; // Use Navigate hook
import Sidebar from "../../Components/admin/Sidebar/Sidebar";
import Chatbot from "../../Components/client/Chatbot/Chatbot";
import AdminHeader from "../../Components/admin/Header/AdminHeader";

const AdminDashboard = ({ userRole }) => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="main-layout">
      <Sidebar />
      <div className="main-container">
      <AdminHeader />
      </div>
      </div>
      {/* <AdminHeader/> */}
      <Chatbot />
    </div>
  );
};

export default AdminDashboard;
