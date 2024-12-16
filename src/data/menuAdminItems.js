import {
  FaHome,
  FaUsersCog,
  FaBoxes,
  FaUserShield,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

const menuAdminItems = [
  {
    id: "dashboard",
    icon: FaHome,
    label: "Dashboard",
    path: "/admin/dashboard",
    subItems: []
  },
  {
    id: "permissions",
    icon: FaUserShield,
    label: "Phân quyền",
    path: "/admin/permissions",
    subItems: []
  },
  {
    id: "products",
    icon: FaBoxes,
    label: "Quản lý sản phẩm",
    path: "/admin/products",
    subItems: []
  },
  {
    id: "users",
    icon: FaUsersCog,
    label: "Quản lý người dùng",
    path: "/admin/users",
    subItems: []
  },
  // {
  //   id: "statistics",
  //   icon: FaChartBar,
  //   label: "Thống kê",
  //   subItems: [
  //     {
  //       label: "Doanh thu",
  //       path: "/admin/statistics/revenue"
  //     },
  //     {
  //       label: "Sản phẩm",
  //       path: "/admin/statistics/products"
  //     },
  //     {
  //       label: "Người dùng",
  //       path: "/admin/statistics/users"
  //     }
  //   ]
  // },
  {
    id: "logout",
    icon: FaSignOutAlt,
    label: "Thoát",
    path: "/",
    subItems: []
  }
];

export default menuAdminItems;
