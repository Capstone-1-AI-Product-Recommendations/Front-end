/** @format */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./profile.css";
import logoUser from "../../../assets/logUser.jpg";
import { orders } from "../../../data/orders";

const Profile = () => {
  // Lấy state từ router hoặc mặc định là "Hồ Sơ"
  const location = useLocation();
  const initialTab = location.state?.activeTab || "Hồ Sơ";
  const [activeTab, setActiveTab] = useState(initialTab); // State quản lý tab
  const [submenuOpen, setSubmenuOpen] = useState(true); // State quản lý hiển thị submenu

  const [uploadedImage, setUploadedImage] = useState(logoUser); // State lưu ảnh đã tải lên

  // Hàm xử lý khi người dùng chọn ảnh mới
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Cập nhật ảnh đại diện
      };
      reader.readAsDataURL(file);
    }
  };

  // Hàm xử lý khi người dùng xóa ảnh
  const handleImageReset = () => {
    setUploadedImage(logoUser); // Reset ảnh về mặc định
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <img src={logoUser} alt="User Avatar" className="avatar" />
          <p>User</p>
        </div>
        <ul>
          <li
            className="menu-item"
            onClick={() => setSubmenuOpen(!submenuOpen)}
          >
            Tài Khoản Của Tôi
          </li>
          {submenuOpen && (
            <ul className="submenu">
              <li
                className={activeTab === "Hồ Sơ" ? "active" : ""}
                onClick={() => setActiveTab("Hồ Sơ")}
              >
                Hồ Sơ
              </li>
              <li
                className={activeTab === "Sửa Hồ Sơ" ? "active" : ""}
                onClick={() => setActiveTab("Sửa Hồ Sơ")}
              >
                Sửa Hồ Sơ
              </li>
            </ul>
          )}
          <li
            className={activeTab === "Đơn Mua" ? "active" : ""}
            onClick={() => setActiveTab("Đơn Mua")}
          >
            Đơn Mua
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "Hồ Sơ" && (
          <div className="profile-info">
            <h1>Hồ Sơ Của Tôi</h1>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <div className="profile-details">
              <div className="profile-item">
                <span className="profile-item-label">Tên đăng nhập:</span>
                <span className="profile-item-value">User</span>
              </div>
              <div className="profile-item">
                <span className="profile-item-label">Tên:</span>
                <span className="profile-item-value">Trần Thị Mỹ Duyên</span>
              </div>
              <div className="profile-item">
                <span className="profile-item-label">Email:</span>
                <span className="profile-item-value">Trant******@gmail.com</span>
              </div>
              <div className="profile-item">
                <span className="profile-item-label">Số điện thoại:</span>
                <span className="profile-item-value">******60</span>
              </div>
              <div className="profile-item">
                <span className="profile-item-label">Giới tính:</span>
                <span className="profile-item-value">Nữ</span>
              </div>
              <div className="profile-item">
                <span className="profile-item-label">Ngày sinh:</span>
                <span className="profile-item-value">23/01/2003</span>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Sửa Hồ Sơ" && (
          <>
            <form className="profile-form">
              <h1 className="profile-title">Sửa Hồ Sơ</h1>
              <p className="profile-description">
                Cập nhật thông tin của bạn để bảo mật tài khoản tốt hơn.
              </p>
              <div className="form-group">
                <label className="form-label">Tên đăng nhập</label>
                <input className="form-input" type="text" value="kiet_boy" readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Tên</label>
                <input className="form-input" type="text" placeholder="Trần Anh Kiệt" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value="ki******@gmail.com" readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Số điện thoại</label>
                <input className="form-input" type="tel" placeholder="******60" />
              </div>
              <div className="form-group">
                <label className="form-label">Giới tính</label>
                <div className="gender-options">
                  <label>
                    <input type="radio" name="gender" value="male" /> Nam
                  </label>
                  <label>
                    <input type="radio" name="gender" value="female" /> Nữ
                  </label>
                  <label>
                    <input type="radio" name="gender" value="other" /> Khác
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Ngày sinh</label>
                <input className="form-input" type="date" defaultValue="2003-01-23" />
              </div>
              <button type="submit" className="save-button">
                Lưu
              </button>
            </form>
            <div className="profile-picture">
              <img src={uploadedImage} alt="User Avatar" className="avatar" />
              <label htmlFor="upload-input" className="upload-button">
                Chọn Ảnh
              </label>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <p className="file-info">
                Dung lượng file tối đa 1 MB. Định dạng: .JPEG, .PNG
              </p>
              <button
                type="button"
                className="delete-button"
                onClick={handleImageReset}
              >
                Xóa Ảnh
              </button>
            </div>
          </>
        )}
        {activeTab === "Đơn Mua" && (
          <div className="orders-container">
            <h1 className="profile-title">Đơn Mua</h1>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <div className="order-card" key={index}>
                  <div className="order-header">
                    <span className="shop-name">{order.shopName}</span>
                    <span
                      className={`order-status ${order.status === "HOÀN THÀNH" ? "success" : "cancel"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="order-body">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="order-image"
                    />
                    <div className="order-details">
                      <p>{order.product.name}</p>
                      <p>Phân loại hàng: {order.product.type}</p>
                      <p>x{order.product.quantity}</p>
                    </div>
                    <div className="order-actions">
                      {order.actions.map((action, i) => (
                        <button key={i} className="order-action-button">
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="order-footer">
                    <span className="order-price">
                      Thành tiền: ₫{order.product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>Hiện chưa có đơn mua nào!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
