import React, { useEffect } from 'react';
import "./Toast.css";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification">
      <div className="toast-content">
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

export default Toast;