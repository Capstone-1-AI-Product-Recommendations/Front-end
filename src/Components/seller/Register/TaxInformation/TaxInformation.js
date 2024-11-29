import React, { useState } from 'react';
import './TaxInformation.css';
import logo from "../../../../img/logo.jpg";
import { useNavigate } from "react-router-dom";

const TaxInformation = () => {
  const [formData, setFormData] = useState({
    businessType: 'personal',
    businessAddress: '',
    addressDetail: '',
    email: '',
    taxCode: ''
  });

  const [additionalEmails, setAdditionalEmails] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addEmail = () => {
    if (additionalEmails.length < 5) {
      setAdditionalEmails(prev => [...prev, '']);
    }
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...additionalEmails];
    newEmails[index] = value;
    setAdditionalEmails(newEmails);
  };

  const navigate = useNavigate();
  const handleBack = () => navigate("/shipping-setting");
  const handleNext = () => navigate("/identity-information");

  return (
    <div className="tax-information">
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
        <div className="step" onClick={handleBack}>
          <div className="step-number">2</div>
          <div className="step-label">Cài đặt vận chuyển</div>
        </div>
        <div className="step active">
          <div className="step-number">3</div>
          <div className="step-label">Thông tin thuế</div>
        </div>
        <div className="step">
          <div className="step-number" onClick={handleNext}>4</div>
          <div className="step-label">Thông tin định danh</div>
        </div>
        <div className="step">
          <div className="step-number">5</div>
          <div className="step-label">Hoàn tất</div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="info-banner">
        <i className="info-icon">ℹ</i>
        <p>
          Việc thu thập Thông Tin Thuế và Thông Tin Định Danh là bắt buộc theo quy định của Luật an ninh mạng, Thương mại điện tử và Thuế của Việt Nam. Thông Tin Thuế và Thông Tin Định Danh sẽ được bảo vệ theo chính sách bảo mật của Shopee. Người bán hoàn toàn chịu trách nhiệm về tính chính xác của thông tin.
        </p>
      </div>

      {/* Form Section */}
      <form className="tax-form">
        <div className="form-section">
          <label className="required">Loại hình kinh doanh</label>
          <div className="business-type">
            {["personal", "business", "company"].map(type => (
              <div className="radio-option" key={type}>
                <input
                  type="radio"
                  id={type}
                  name="businessType"
                  value={type}
                  checked={formData.businessType === type}
                  onChange={handleInputChange}
                />
                <label htmlFor={type}>{type === "personal" ? "Cá nhân" : type === "business" ? "Hộ kinh doanh" : "Công ty"}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="required">Địa chỉ đăng ký kinh doanh</label>
          <div className="address-input">
            <input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              placeholder="Thừa Thiên Huế / Huyện Quảng Điền / Xã Quảng Ngạn"
            />
            <textarea
              name="addressDetail"
              value={formData.addressDetail}
              onChange={handleInputChange}
              placeholder="Thôn Vĩnh Tụ ngã tư đi ra phía biển"
            />
          </div>
        </div>

        <div className="form-section">
          <label className="required">Email nhận hóa đơn điện tử</label>
          <div className="email-section">
            <div className="email-input">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
              />
              <span className="email-limit">26/100</span>
            </div>
            {additionalEmails.map((email, index) => (
              <div className="email-input" key={index}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  placeholder="example@email.com"
                />
                <span className="email-limit">26/100</span>
              </div>
            ))}
            <button type="button" className="add-email" onClick={addEmail}>
              + Thêm Email ({additionalEmails.length + 1}/5)
            </button>
            <p className="email-note">Hóa đơn điện tử của bạn sẽ được gửi đến địa chỉ email này</p>
          </div>
        </div>

        <div className="form-section">
          <label>Mã số thuế</label>
          <div className="tax-code-input">
            <input
              type="text"
              name="taxCode"
              value={formData.taxCode}
              onChange={handleInputChange}
              placeholder="Nhập vào"
            />
            <span className="tax-limit">0/14</span>
          </div>
          <p className="tax-note">
            Theo quy định về Thương mại điện tử Việt Nam (Nghị định 52/2013/NĐ-CP), Người bán phải cung cấp thông tin Mã số thuế cho sàn Thương mại điện tử
          </p>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="btn-back" onClick={handleBack}>Quay lại</button>
          <div className="right-actions">
            <button type="button" className="btn-save">Lưu</button>
            <button type="button" className="btn-next" onClick={handleNext}>Tiếp theo</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaxInformation;
