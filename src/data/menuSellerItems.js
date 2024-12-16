import {
    FaUser,
    FaTruck,
    FaWarehouse,
    FaStore,
    FaChartLine,
    FaSignOutAlt,
    FaComment,
  } from "react-icons/fa";
  
  const menuSellerItems = [
    {
      id: "dashboard",
      icon: FaUser,
      label: "Dashboard",
      path: "/seller-dashboard",
      subItems: []
    },
    {
      id: "orders",
      icon: FaTruck,
      label: "Đơn hàng",
      path: "/seller-dashboard/order",
      subItems: []
    },
    {
      id: "products",
      icon: FaStore,
      label: "Quản lý sản phẩm",
      path: "/seller-dashboard/products",
      subItems: []
    },
    {
      id: "inventory",
      icon: FaWarehouse,
      label: "Kho hàng",
      path: "/seller-dashboard/inventory",
      subItems: []
    },
    // {
    //   id: "statistics",
    //   icon: FaChartLine,
    //   label: "Thống kê",
    //   subItems: [
    //     {
    //       label: "Doanh thu",
    //       path: "/seller-dashboard/statistics/revenue"
    //     },
    //     {
    //       label: "Sản phẩm",
    //       path: "/seller-dashboard/statistics/products"
    //     },
    //     {
    //       label: "Người dùng",
    //       path: "/seller-dashboard/statistics/users"
    //     }
    //   ]
    // },
    {
      id: "statistics",
      icon: FaChartLine,
      label: "Thống kê",
      path: "/seller-dashboard/statistics",
      subItems: []
    },
    {
      id: "chatbox",
      icon: FaComment,
      label: "Tin nhắn",
      path: "/seller-dashboard/chatbox",
      subItems: []
    },
    {
      id: "logout",
      icon: FaSignOutAlt,
      label: "Thoát",
      path: "/",
      subItems: []
    }
  ];
  
  export default menuSellerItems;  
