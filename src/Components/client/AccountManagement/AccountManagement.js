/** @format */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./AccountManagement.css";
import logoUser from "../../../img/logUser.jpg";
import { fetchUserInfo, updateUserInfo, fetchUserOrders } from "../../../services/apiLogin"; // Import the new API method

const AccountManagement = () => {
  // Lấy state từ router hoặc mặc định là "Hồ Sơ"
  const location = useLocation();
  const initialTab = location.state?.activeTab || "Hồ Sơ";
  const [activeTab, setActiveTab] = useState(initialTab); // State quản lý tab
  const [submenuOpen, setSubmenuOpen] = useState(true); // State quản lý hiển thị submenu

  const [uploadedImage, setUploadedImage] = useState(logoUser); // State lưu ảnh đã tải lên
  const [userInfo, setUserInfo] = useState(null); // State to store user info
  const [orders, setOrders] = useState([]); // State to store user orders
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.user_id; // Assuming user_id is stored in localStorage
        console.log('User ID:', userId);
        if (userId) {
          const userInfoData = await fetchUserInfo(userId);
          setUserInfo(userInfoData);
          const userOrdersData = await fetchUserOrders(userId);
          setOrders(userOrdersData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.user_id;
      const updatedData = {
        full_name: event.target.full_name.value,
        email: event.target.email.value,
        phone_number: event.target.phone_number.value,
        address: event.target.address.value,
        city: event.target.city.value,
      };
      const updatedUserInfo = await updateUserInfo(userId, updatedData);
      setUserInfo(updatedUserInfo);
      alert('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Cập nhật thông tin thất bại!');
    }
  };

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

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const currentOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const range = 2;

    pageNumbers.push(1);

    if (currentPage <= range + 3) {
      for (let i = 2; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) pageNumbers.push("...");
    } else if (currentPage > range + 3 && currentPage < totalPages - range - 2) {
      pageNumbers.push("...");
      for (let i = currentPage - range; i <= currentPage + range; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
    } else {
      pageNumbers.push("...");
      for (let i = totalPages - 4; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
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
            {userInfo ? (
              <div className="profile-details">
                <div className="profile-item">
                  <span className="profile-item-label">Tên đăng nhập:</span>
                  <span className="profile-item-value">{userInfo.username}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-item-label">Tên:</span>
                  <span className="profile-item-value">{userInfo.full_name}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-item-label">Email:</span>
                  <span className="profile-item-value">{userInfo.email}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-item-label">Số điện thoại:</span>
                  <span className="profile-item-value">{userInfo.phone_number}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-item-label">Địa chỉ:</span>
                  <span className="profile-item-value">{userInfo.address}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-item-label">Thành phố:</span>
                  <span className="profile-item-value">{userInfo.city}</span>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
        {activeTab === "Sửa Hồ Sơ" && userInfo && (
          <>
            <form className="profile-form" onSubmit={handleProfileUpdate}>
              <h1 className="profile-title">Sửa Hồ Sơ</h1>
              <p className="profile-description">
                Cập nhật thông tin của bạn để bảo mật tài khoản tốt hơn.
              </p>
              <div className="form-group-profile">
                <label className="form-label">Tên đăng nhập</label>
                <input className="form-input" type="text" value={userInfo.username} readOnly disabled />
              </div>
              <div className="form-group-profile">
                <label className="form-label">Tên</label>
                <input className="form-input" type="text" name="full_name" defaultValue={userInfo.full_name} />
              </div>
              <div className="form-group-profile">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" name="email" defaultValue={userInfo.email} readOnly />
              </div>
              <div className="form-group-profile">
                <label className="form-label">Số điện thoại</label>
                <input className="form-input" type="tel" name="phone_number" defaultValue={userInfo.phone_number} />
              </div>
              <div className="form-group-profile">
                <label className="form-label">Địa chỉ</label>
                <input className="form-input" type="text" name="address" defaultValue={userInfo.address} />
              </div>
              <div className="form-group-profile">
                <label className="form-label">Thành phố</label>
                <input className="form-input" type="text" name="city" defaultValue={userInfo.city} />
              </div>
              <button type="submit" className="save-button">
                Lưu
              </button>
            </form>
            {/* <div className="profile-picture">
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
            </div> */}
          </>
        )}
        {activeTab === "Đơn Mua" && (
          <div className="orders-container">
            <h1 className="profile-title">Đơn Mua</h1>
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <div className="order-card" key={index}>
                  <div className="order-header">
                    <span className="shop-name">{order.shop_name}</span>
                    <span
                      className={`order-status ${order.status === "đã hủy" ? "cancel" : "success"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="order-body">
                    <img
                      src={order.image}
                      alt={order.product_name}
                      className="order-image"
                    />
                    <div className="order-details">
                      <div>
                        <p>{order.product_name}</p>
                        <p>x{order.quantity}</p>
                      </div>
                      <div className="order-buttons">
                        <button className="order-action-button">Mua Lại</button>
                        <button className="order-action-button">Xem Chi Tiết Đơn Hàng</button>
                        <button className="order-action-button">Liên Hệ Người Bán</button>
                      </div>
                    </div>
                  </div>
                  <div className="order-footer">
                    <span className="order-id">Mã đơn hàng: {order.order_id}</span>
                    <div className="order-">
                      
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Hiện chưa có đơn mua nào!</p>
            )}
            <div className="pagination">
              <button onClick={handleFirstPage} disabled={currentPage === 1}>
                First
              </button>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </button>
              {getPageNumbers().map((number, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(number)}
                  className={currentPage === number ? 'active' : ''}
                  disabled={number === "..."}
                >
                  {number}
                </button>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
              <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                Last
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
