import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './IdentityInformation.css';
import logo from "../../../../img/logo.jpg";

const IdentityInformation = () => {
  const [formData, setFormData] = useState({
    idType: 'CCCD', // CCCD, CMND, passport
    idNumber: '',
    fullName: '',
    frontImage: null,
    backImage: null
  });

  const [agreement, setAgreement] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setFormData(prevState => ({
        ...prevState,
        [type]: file
      }));
    } else {
      alert('File size should not exceed 5MB');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreement) {
      alert("Please accept the privacy policy.");
      return;
    }
    // Handle form submission
  };

  const navigate = useNavigate();
  const handleBack = () => navigate("/tax-information");
  const handleNext = () => navigate("/check-registration");
  const handlePrevious = () => navigate("/shipping-setting");
  const handleBeginning = () => navigate("/register-seller");

  return (
    <div className="identity-container">
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
        <div className="step" onClick={handleBeginning}>
          <div className="step-number">1</div>
          <div className="step-label">Thông tin Shop</div>
        </div>
        <div className="step" onClick={handlePrevious}>
          <div className="step-number">2</div>
          <div className="step-label">Cài đặt vận chuyển</div>
        </div>
        <div className="step" onClick={handleBack}>
          <div className="step-number">3</div>
          <div className="step-label">Thông tin thuế</div>
        </div>
        <div className="step active">
          <div className="step-number">4</div>
          <div className="step-label">Thông tin định danh</div>
        </div>
        <div className="step" onClick={handleNext}>
          <div className="step-number">5</div>
          <div className="step-label">Hoàn tất</div>
        </div>
      </div>

      {/* Information Banner */}
      <div className="info-banner">
        <i className="info-icon">ℹ</i>
        <p>Vui lòng cung cấp Thông Tin Định Danh của Chủ Shop (nếu là cá nhân), hoặc Người Đại Diện Pháp Lý trên giấy đăng ký kinh doanh</p>
      </div>

      {/* Form Section */}
      <form className="identity-form" onSubmit={handleSubmit}>
        {/* ID Type Selection */}
        <div className="form-section">
          <label className="form-label">Hình Thức Định Danh</label>
          <div className="id-type-options">
            {["CCCD", "CMND", "passport"].map(type => (
              <div className="radio-option" key={type}>
                <input
                  type="radio"
                  id={type}
                  name="idType"
                  value={type}
                  checked={formData.idType === type}
                  onChange={handleInputChange}
                />
                <label htmlFor={type}>
                  {type === "CCCD" ? "Căn Cước Công Dân (CCCD)" : type === "CMND" ? "Chứng Minh Nhân Dân (CMND)" : "Hộ chiếu"}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* ID Number Field */}
        <div className="form-section">
          <label className="required">Số Căn Cước Công Dân (CCCD)</label>
          <div className="input-counter">
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              placeholder="Nhập vào"
              maxLength="12"
            />
            <span className="counter">{formData.idNumber.length}/12</span>
          </div>
        </div>

        {/* Full Name Field */}
        <div className="form-section">
          <label className="required">Họ & Tên</label>
          <div className="input-counter">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nhập vào"
              maxLength="100"
            />
            <span className="counter">{formData.fullName.length}/100</span>
          </div>
          <span className="hint">Theo CMND/CCCD/Hộ chiếu</span>
        </div>

        {/* Image Upload Section */}
        <div className="form-section">
          <label className="required">Hình chụp cả thể CMND/CCCD/Hộ chiếu</label>
          <div className="image-upload-container">
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'frontImage')}
                id="frontImage"
              />
              <label htmlFor="frontImage" className="upload-label">
                <div className="upload-icon">+</div>
                <img src={formData.frontImage ? URL.createObjectURL(formData.frontImage) : "/id-card-front.png"} alt="Front ID Preview" className="upload-preview" />
              </label>
              <p className="upload-hint">Vui lòng cung cấp ảnh chụp mặt trước CMND/CCCD/Hộ chiếu của bạn</p>
            </div>

            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'backImage')}
                id="backImage"
              />
              <label htmlFor="backImage" className="upload-label">
                <div className="upload-icon">+</div>
                <img src={formData.backImage ? URL.createObjectURL(formData.backImage) : "/id-card-back.png"} alt="Back ID Preview" className="upload-preview" />
              </label>
              <p className="upload-hint">Vui lòng cung cấp ảnh chụp mặt sau CMND/CCCD/Hộ chiếu của bạn</p>
            </div>
          </div>
        </div>

        {/* Agreement Section */}
        <div className="agreement-section">
          <input
            type="checkbox"
            id="agreement"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
          />
          <label htmlFor="agreement">
            Tôi xác nhận tất cả dữ liệu tôi cung cấp là chính xác và trung thực. Tôi đã đọc và đồng ý với 
            <a href="#" className="privacy-link">Chính Sách Bảo Mật</a> của Shopee.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="btn-back" onClick={handleBack}>Quay lại</button>
          <div className="right-actions">
            <button type="button" className="btn-save">Lưu</button>
            <button type="submit" className="btn-next">Hoàn tất</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IdentityInformation;
