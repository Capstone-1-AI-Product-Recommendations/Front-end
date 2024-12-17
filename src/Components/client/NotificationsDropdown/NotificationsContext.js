import React, { createContext, useState } from "react";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Đơn hàng của bạn đã được xác nhận!", time: "2 phút trước" },
    { id: 2, message: "Bạn có tin nhắn mới từ người bán.", time: "10 phút trước" },
    { id: 3, message: "Sản phẩm bạn theo dõi đã giảm giá!", time: "30 phút trước" },
  ]);

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
    