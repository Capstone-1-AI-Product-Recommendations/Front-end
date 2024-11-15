// ShippingSetting.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShippingSetting.css";
import logo from "../../../img/logo.jpg";

const ShippingSetting = () => {
  const [shippingMethods, setShippingMethods] = useState({
    express: true,
    standard: true,
    economy: true,
    channel: true,
  });

  const navigate = useNavigate();

  // Toggle function for each shipping method
  const handleToggle = (method) => {
    setShippingMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  // Navigation functions
  const handleBack = () => {
    navigate("/register-seller");
  };
  
  const handleNext = () => {
    navigate("/tax-information");
  };

  return (
    <div className="shipping-settings">
      {/* Header Section */}
      <div className="seller-header">
        <div className="seller-logo">
          <img src={logo} alt="Shopee" />
          <span>Đăng ký trở thành Người bán</span>
        </div>
        <div className="seller-user-info">
          <img src={logo} alt="User" className="seller-avatar" />
          <span>minhmanh2709</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="step" onClick={handleBack}>
          <div className="step-number">1</div>
          <div className="step-label">Thông tin Shop</div>
        </div>
        <div className="step active">
          <div className="step-number">2</div>
          <div className="step-label">Cài đặt vận chuyển</div>
        </div>
        <div className="step" onClick={handleNext}>
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

      {/* Shipping Methods */}
      <div className="shipping-header">
        <h2>Phương thức vận chuyển</h2>
        <p>Kích hoạt phương thức vận chuyển phù hợp</p>
      </div>

      <div className="shipping-methods">
        {Object.keys(shippingMethods).map((method) => (
          <div key={method} className="method-item">
            <div className="method-info">
              <h3>{method === "express" ? "Hỏa Tốc" : method === "standard" ? "Nhanh" : method === "economy" ? "Tiết Kiệm" : "Hàng Công Kênh"}</h3>
              <span className="cod-tag">[COD đã được kích hoạt]</span>
            </div>
            <div className="method-actions">
              <span>Thu gọn</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={shippingMethods[method]}
                  onChange={() => handleToggle(method)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        ))}

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

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-back" onClick={handleBack}>Quay lại</button>
        <button className="btn-next" onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
};

export default ShippingSetting;
