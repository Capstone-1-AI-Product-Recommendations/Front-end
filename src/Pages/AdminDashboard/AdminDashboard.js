import React, { useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/admin/Common/Sidebar/Sidebar";
import AdminHeader from "../../Components/admin/Common/Header/AdminHeader";
import Chatbot from "../../Components/client/Chatbot/Chatbot";
const AdminDashboard = ({ userRole }) => {
//   const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="main-layout">
      {/* <Sidebar/> */}
      <div className="main-container">
      {/* <AdminHeader /> */}
      </div>
      </div>
      {/* <AdminHeader/> */}
      <Chatbot />
    </div>
  );
};

export default AdminDashboard;
