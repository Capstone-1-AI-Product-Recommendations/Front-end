// ShippingSettings.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ShippingSettings.css';
import logo from "../../../img/logo.jpg"

const ShippingSettings = () => {
  const [shippingMethods, setShippingMethods] = useState({
    express: true,
    standard: true,
    economy: true,
    channel: true
  });

  const handleToggle = (method) => {
    setShippingMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/register-seller");
    // Thêm logic điều hướng về trang chủ nếu cần
  };
  const handleNext = () => {
    navigate("/address-form");
    // Thêm logic điều hướng về trang chủ nếu cần


  return (
    <div className="shipping-settings">
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
        <div className="step ">
          <div className="step-number">1</div>
          <div className="step-label">Thông tin Shop</div>
        </div>
        <div className="step active">
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
      <div className="shipping-header">
        <h2>Phương thức vận chuyển</h2>
        <p>Kích hoạt phương thức vận chuyển phù hợp</p>
      </div>

      <div className="shipping-methods">
        <div className="method-item">
          <div className="method-info">
            <h3>Hỏa Tốc</h3>
            <span className="cod-tag">[COD đã được kích hoạt]</span>
          </div>
          <div className="method-actions">
            <span>Thu gọn</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={shippingMethods.express}
                onChange={() => handleToggle('express')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="method-item">
          <div className="method-info">
            <h3>Nhanh</h3>
            <span className="cod-tag">[COD đã được kích hoạt]</span>
          </div>
          <div className="method-actions">
            <span>Thu gọn</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={shippingMethods.standard}
                onChange={() => handleToggle('standard')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="method-item">
          <div className="method-info">
            <h3>Tiết Kiệm</h3>
            <span className="cod-tag">[COD đã được kích hoạt]</span>
          </div>
          <div className="method-actions">
            <span>Thu gọn</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={shippingMethods.economy}
                onChange={() => handleToggle('economy')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="method-item">
          <div className="method-info">
            <h3>Hàng Công Kênh</h3>
            <span className="cod-tag">[COD đã được kích hoạt]</span>
          </div>
          <div className="method-actions">
            <span>Thu gọn</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={shippingMethods.channel}
                onChange={() => handleToggle('channel')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="additional-shipping">
          <div className="method-info">
            <h3>Thêm Đơn Vị Vận Chuyển</h3>
            <p>Các đơn vị vận chuyển khác được Shopee hỗ trợ</p>
          </div>
          <div className="method-actions">
            <span>Thu gọn</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-back" onClick={handleBack}>Quay lại</button>
        <button className="btn-next" onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
};
};
export default ShippingSettings;