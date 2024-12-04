import React from 'react';
import './NotificationPanel.css';

const NotificationPanel = () => {
    return (
        <div className="notification-panel">
            <div className="notification-icon">
                <span className="badge">21</span>
                <img src="https://path-to-bell-icon.png" alt="Notifications" />
            </div>
            <div className="notification-icon">
                <img src="https://path-to-info-icon.png" alt="Info" />
            </div>
            <div className="notification-icon">
                <span className="badge">98</span>
                <img src="https://path-to-chat-icon.png" alt="Messages" />
            </div>
        </div>
    );
};

export default NotificationPanel;
