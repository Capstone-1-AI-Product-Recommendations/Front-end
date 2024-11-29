import React, { useState, useEffect } from "react";
import { BsHouseFill } from "react-icons/bs";
import { PiGreaterThanBold } from "react-icons/pi";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import "./Permission.css";

const Permisson = () => {
  const [permissions, setPermissions] = useState([
    {
      name: "Quản lý sản phẩm",
      admin: true,
      staff: true, 
      customer: false,
    },
    {
      name: "Quản lý đơn hàng",
      admin: true,
      staff: true,
      customer: false,
    },
    {
      name: "Quản lý người dùng",
      admin: true,
      staff: false,
      customer: false,
    },
    {
      name: "Quản lý danh mục",
      admin: true,
      staff: true,
      customer: false,
    },
    {
      name: "Thống kê doanh thu",
      admin: true,
      staff: false,
      customer: false,
    },
    {
      name: "Quản lý khuyến mãi",
      admin: true,
      staff: true,
      customer: false,
    },
    {
      name: "Quản lý kho hàng",
      admin: true,
      staff: true,
      customer: false,
    },
    {
      name: "Phân quyền người dùng",
      admin: true,
      staff: false,
      customer: false,
    },
    {
      name: "Xem sản phẩm",
      admin: true,
      staff: true,
      customer: true,
    },
    {
      name: "Đặt hàng",
      admin: true,
      staff: true,
      customer: true,
    },
    {
      name: "Xem lịch sử đơn hàng",
      admin: true,
      staff: true,
      customer: true,
    },
    {
      name: "Quản lý thông tin cá nhân",
      admin: true,
      staff: true,
      customer: true,
    },
    {
      name: "Đánh giá sản phẩm",
      admin: true,
      staff: true,
      customer: true,
    },
    {
      name: "Quản lý thanh toán",
      admin: true,
      staff: true,
      customer: false,
    },
    {
      name: "Quản lý vận chuyển",
      admin: true,
      staff: true,
      customer: false,
    }
  ]);

  const handleCheckboxChange = (index, field) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index][field] = !updatedPermissions[index][field];
    setPermissions(updatedPermissions);
  };

  useEffect(() => {
    const savePermissions = async () => {
      try {
        console.log("Saving updated permissions:", permissions);
        // Replace with actual API call
        // await api.savePermissions(permissions);
      } catch (error) {
        console.error("Error saving permissions:", error);
      }
    };
    savePermissions();
  }, [permissions]);

  return (
    <div className="permission-container">
      <div className="permission-header">
        <h2>
          <span className="home-icon">
            <BsHouseFill />
          </span>
          <span className="arrow-icon">
            <PiGreaterThanBold />
          </span>
          Phân quyền người dùng
        </h2>

        <div className="permission-legend">
          <div className="legend-item">
            <span className="checkbox-icon">
              <IoIosCheckbox />
            </span>
            Có quyền truy cập
          </div>
          <div className="legend-item">
            <span className="checkbox-icon">
              <MdCheckBoxOutlineBlank />
            </span>
            Không có quyền truy cập
          </div>
        </div>
      </div>

      <div className="permission-table-container">
        <table className="permission-table">
          <thead>
            <tr>
              <th>Chức năng</th>
              <th>Quản trị viên</th>
              <th>Nhân viên</th>
              <th>Khách hàng</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.admin}
                    onChange={() => handleCheckboxChange(index, "admin")}
                    className="permission-checkbox"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.staff}
                    onChange={() => handleCheckboxChange(index, "staff")}
                    className="permission-checkbox"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.customer}
                    onChange={() => handleCheckboxChange(index, "customer")}
                    className="permission-checkbox"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Permisson;
