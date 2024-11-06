/** @format */

import React, { useState } from "react";
import "./DashboardLayout.css";
import VendorForm from "./VendorForm";
import { DashboardContent } from "./DashboardComponents"; // Import DashboardContent

const DashboardLayout = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const userEmail = "name@gmail.com";

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "downloads", label: "Downloads", icon: "⬇️" },
    { id: "addresses", label: "Addresses", icon: "📍" },
    { id: "account", label: "Account details", icon: "👤" },
    { id: "wishlist", label: "Wishlist", icon: "❤️" },
    { id: "compare", label: "Compare", icon: "🔄" },
    { id: "logout", label: "Log out", icon: "🚪" },
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (menuId === "logout") {
      console.log("Logging out...");
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardContent />; // Render DashboardContent here
      case "orders":
        return <div className='content-section'>Orders Content</div>;
      case "account":
        return <VendorForm />;
      // Add other cases here
      default:
        return <div className='content-section'>Select a menu item</div>;
    }
  };

  return (
    <div className='dashboard-container'>
      <div className='sidebar'>
        <div className='user-info'>
          <div className='user-avatar'>👤</div>
          <div className='welcome-text'>Welcome back,</div>
          <div className='user-email'>{userEmail}</div>
        </div>

        <nav className='sidebar-menu'>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${activeMenu === item.id ? "active" : ""}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <span className='menu-icon'>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className='main-content'>
        <div className='breadcrumb'>
          <span>Home</span> / <span>My account</span>
          {activeMenu !== "dashboard" &&
            ` / ${menuItems.find((item) => item.id === activeMenu)?.label}`}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardLayout;
