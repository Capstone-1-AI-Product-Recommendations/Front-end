import React, { useState } from 'react';
import './Permission.css';

const Permission = () => {
  const [permissions, setPermissions] = useState({
    search: {
      admin: true,
      staff: true,
      customer: true
    },
    tourManagement: {
      admin: false,
      staff: true,
      customer: false
    },
    revenueStats: {
      admin: false,
      staff: true,
      customer: false
    },
    permissions: {
      admin: false,
      staff: true,
      customer: false
    }
  });

  const handlePermissionChange = (feature, role) => {
    setPermissions(prev => ({
      ...prev,
      [feature]: {
        ...prev[feature],
        [role]: !prev[feature][role]
      }
    }));
  };

  return (
    <div className="permission-container">
      <div className="permission-header">
        <h2>Phân quyền</h2>
        <div className="permission-toggle">
          <label>
            <input type="checkbox" checked={true} readOnly />
            Có quyền truy cập
          </label>
          <label>
            <input type="checkbox" checked={false} readOnly />
            Không có quyền truy cập
          </label>
        </div>
      </div>

      <table className="permission-table">
        <thead>
          <tr>
            <th>Phân quyền</th>
            <th>Quản trị viên</th>
            <th>Staff</th>
            <th>Khách hàng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tìm kiếm</td>
            <td><input type="checkbox" checked={permissions.search.admin} onChange={() => handlePermissionChange('search', 'admin')} /></td>
            <td><input type="checkbox" checked={permissions.search.staff} onChange={() => handlePermissionChange('search', 'staff')} /></td>
            <td><input type="checkbox" checked={permissions.search.customer} onChange={() => handlePermissionChange('search', 'customer')} /></td>
          </tr>
          <tr>
            <td>Quản lý Tour</td>
            <td><input type="checkbox" checked={permissions.tourManagement.admin} onChange={() => handlePermissionChange('tourManagement', 'admin')} /></td>
            <td><input type="checkbox" checked={permissions.tourManagement.staff} onChange={() => handlePermissionChange('tourManagement', 'staff')} /></td>
            <td><input type="checkbox" checked={permissions.tourManagement.customer} onChange={() => handlePermissionChange('tourManagement', 'customer')} /></td>
          </tr>
          <tr>
            <td>Thống kê doanh thu</td>
            <td><input type="checkbox" checked={permissions.revenueStats.admin} onChange={() => handlePermissionChange('revenueStats', 'admin')} /></td>
            <td><input type="checkbox" checked={permissions.revenueStats.staff} onChange={() => handlePermissionChange('revenueStats', 'staff')} /></td>
            <td><input type="checkbox" checked={permissions.revenueStats.customer} onChange={() => handlePermissionChange('revenueStats', 'customer')} /></td>
          </tr>
          <tr>
            <td>Phân Quyền</td>
            <td><input type="checkbox" checked={permissions.permissions.admin} onChange={() => handlePermissionChange('permissions', 'admin')} /></td>
            <td><input type="checkbox" checked={permissions.permissions.staff} onChange={() => handlePermissionChange('permissions', 'staff')} /></td>
            <td><input type="checkbox" checked={permissions.permissions.customer} onChange={() => handlePermissionChange('permissions', 'customer')} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Permission; 