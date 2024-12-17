import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationsContext } from "./NotificationsContext";
import "./NotificationsDropdown.css";

const NotificationsDropdown = () => {
  const navigate = useNavigate();
  const { notifications } = useContext(NotificationsContext);

  const handleViewNotifications = () => {
    navigate("/notifications");
  };

  return (
    <div className="notifications-dropdown">
      <div className="notifications-header">
        <h3>Thông Báo Mới</h3>
        <span className="items-count">{notifications.length} thông báo</span>
      </div>

      <div className="notifications-items">
        {notifications.length === 0 ? (
          <div className="empty-notifications">
            <p>Không có thông báo nào</p>
          </div>
        ) : (
          notifications.slice(0, 5).map((item) => (
            <div key={item.id} className="notification-item">
              <p className="notification-message">{item.message}</p>
              <span className="notification-time">{item.time}</span>
            </div>
          ))
        )}
      </div>

      <div className="notifications-footer">
        <button
          className="view-notifications-button"
          onClick={handleViewNotifications}
          disabled={notifications.length === 0}
        >
          Xem Tất Cả Thông Báo
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
