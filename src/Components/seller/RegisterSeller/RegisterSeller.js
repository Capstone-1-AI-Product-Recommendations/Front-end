// RegisterSeller.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './RegisterSeller.css';
import logo from "../../../img/logo.jpg"


const RegisterSeller = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    email: '',
    phone: ''
  });

  // const [currentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const navigate = useNavigate();
  const handleShipping = () => {
    navigate("/shipping");
    // Thêm logic điều hướng về trang chủ nếu cần
  };

  return (
    <div className="register-seller-top">
      <div className="seller-header">
        <div className="seller-logo">
          <img src={logo} alt="Shopee" />
          <span>Đăng ký trở thành Người bán </span>
        </div>
        <div className="seller-user-info">
          <img src={logo} alt="User" className="seller-avatar" />
          <span>minhmanh2709</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="step active">
          <div className="step-number">1</div>
          <div className="step-label">Thông tin Shop</div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-label">Cài đặt vận chuyển</div>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-label">Thông tin thuế</div>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <div className="step-label">Thông tin định danh</div>
        </div>
        <div className="step">
          <div className="step-number">5</div>
          <div className="step-label">Hoàn tất</div>
        </div>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label>
            <span className="required">*</span>
            Tên Shop
          </label>
          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            className="form-input"
            placeholder="minhmanh2709"
          />
          <span className="char-count">12/30</span>
        </div>

        <div className="form-group">
          <label>
            <span className="required">*</span>
            Địa chỉ lấy hàng
          </label>
          <div className="address-input">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              placeholder="Phan Thanh Nhàn | 84766696559"
            />
            <div className="address-details">
              Thôn Vĩnh Tú,ngã tư đi ra phía biển
              <br />
              Xã Quảng Ngạn
              <br />
              Huyện Quảng Điền
              <br />
              Thừa Thiên Huế
            </div>
            <a href="#" className="edit-link">Chỉnh sửa</a>
          </div>
        </div>

        <div className="form-group">
          <label>
            <span className="required">*</span>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="minhphanh27092003@gmail.com"
          />
        </div>

        <div className="form-group">
          <label>
            <span className="required">*</span>
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="+84766696559"
          />
        </div>

        <div className="button-group">
          <button className="btn-save">Lưu</button>
          <button className="btn-next" onClick={handleShipping}>Tiếp theo</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSeller;