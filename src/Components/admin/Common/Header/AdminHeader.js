import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaHome } from "react-icons/fa";

import "./AdminHeader.css";
import userImg from "../../../../img/people.png";

const AdminHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = {
    count: 21,
    items: [
      { id: 1, text: "You have a new lead!" },
      { id: 2, text: "Task assigned to you." },
    ],
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
<header className="custom-header">
  <div className="header-left">
    {/* Breadcrumb */}
    <div className="breadcrumb">
      <FaHome className="breadcrumb-icon" />
      <span>Home</span>
      <span>&gt;</span>
      <span className="breadcrumb-current">Analytics</span>
    </div>
  </div>

  <div className="header-right">
    {/* Search Bar */}
    <form className="search-bar-admin" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search anything"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">
        <FiSearch />
      </button>
    </form>

    {/* Notifications */}
    <div className="notification-container" onClick={toggleNotifications}>
      <IoMdNotificationsOutline className="icon" />
      <span className="notification-count">{notifications.count}</span>
      {showNotifications && (
        <div className="notification-dropdown">
          <div className="dropdown-header">You have {notifications.count} new leads</div>
          {notifications.items.map((item) => (
            <div key={item.id} className="dropdown-item">
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* User Profile */}
    <div className="user-profile">
      <img src={userImg} alt="User" />
      <span className="online-indicator"></span>
    </div>
  </div>
</header>

  );
};

export default AdminHeader;
