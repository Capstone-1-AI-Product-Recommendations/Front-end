import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logoApp from "../../../../img/logoApp.png";
import menuAdminItems from "../../../../data/menuAdminItems";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const handleItemClick = (item) => {
    if (item.id === "logout") {
      localStorage.clear();
      navigate("/");
    } else if (item.subItems && item.subItems.length > 0) {
      toggleDropdown(item.id);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="sidebar-admin">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src={logoApp} alt="Logo" />
      </div>

      {/* Menu Section */}
      <div className="sidebar-menu">
        {menuAdminItems.map((item) => (
          <div key={item.id}>
            <div
              className={`sidebar-menu-item ${
                activeDropdown === item.id ? "active" : ""
              } ${item.id === "logout" ? "logout-item" : ""}`}
              onClick={() => handleItemClick(item)}
            >
              <item.icon className="sidebar-icon" />
              <span className="sidebar-label">{item.label}</span>
              {item.subItems && item.subItems.length > 0 && (
                <ChevronDown
                  className={`sidebar-chevron ${
                    activeDropdown === item.id ? "rotate" : ""
                  }`}
                />
              )}
            </div>
            {activeDropdown === item.id && item.subItems && item.subItems.length > 0 && (
              <div className="sidebar-submenu">
                {item.subItems.map((subItem, index) => (
                  <div key={index} className="sidebar-submenu-item">
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
