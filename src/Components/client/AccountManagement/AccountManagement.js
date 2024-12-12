import React from 'react';
import './AccountManagement.css';

const AccountManagement = () => {
  return (
    <div className="account-management-container">
      <div className="sidebar">
        <div className="avatar-container">
          <img src="/avatar.jpg" alt="User Avatar" className="avatar" />
        </div>
        <div className="account-info">
          <h3>minhnmanh2709</h3>
          <p>Sửa Hồ Sơ</p>
        </div>
        <div className="sidebar-links">
          <a href="#">Đơn Mua</a>
          <a href="#">Tài Khoản Của Tôi</a>
        </div>
      </div>
      <div className="main-content">
        <div className="section">
          <h2>Hồ Sơ Của Tôi</h2>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          <form>
            <div className="form-group">
              <label>Tên:</label>
              <input type="text" placeholder="Nhập tên" />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" placeholder="Nhập email" />
            </div>
            <div className="form-group">
              <label>Số điện thoại:</label>
              <input type="tel" placeholder="Nhập số điện thoại" />
            </div>
            <div className="form-group">
              <label>Giới tính:</label>
              <select>
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
                <option value="khac">Khác</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ngày sinh:</label>
              <input type="date" />
            </div>
            <button type="submit">Lưu</button>
          </form>
        </div>
        <div className="section">
          <h2>Đơn Mua</h2>
          {/* Add content for "Đơn Mua" section */}
        </div>
        <div className="section">
          <h2>Tài Khoản Của Tôi</h2>
          {/* Add content for "Tài Khoản Của Tôi" section */}
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;