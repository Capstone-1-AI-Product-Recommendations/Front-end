import React, { useState } from 'react';
import './VendorForm.css';

const VendorForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    shopName: '',
    shopUrl: '',
    phoneNumber: '',
    email: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Vui lòng nhập Họ';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Vui lòng nhập Tên';
    }
    
    if (!formData.shopName.trim()) {
      newErrors.shopName = 'Vui lòng nhập Tên cửa hàng';
    }
    
    if (!formData.shopUrl.trim()) {
      newErrors.shopUrl = 'Vui lòng nhập URL cửa hàng';
    } else if (!formData.shopUrl.startsWith('https://')) {
      newErrors.shopUrl = 'URL cửa hàng phải bắt đầu bằng https://';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập Số điện thoại';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập Email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Vui lòng nhập địa chỉ email hợp lệ';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Bạn phải chấp nhận Điều khoản & Điều kiện';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Thường thì bạn sẽ gửi API ở đây để gửi form
      console.log('Form đã được gửi:', formData);
      alert('Form đã được gửi thành công!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="vendor-form-container">
      <h2>Cập nhật tài khoản thành Người bán</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Họ *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Tên *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="shopName">Tên cửa hàng *</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            value={formData.shopName}
            onChange={handleInputChange}
            className={errors.shopName ? 'error' : ''}
          />
          {errors.shopName && <span className="error-message">{errors.shopName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="shopUrl">URL cửa hàng *</label>
          <input
            type="url"
            id="shopUrl"
            name="shopUrl"
            value={formData.shopUrl}
            onChange={handleInputChange}
            className={errors.shopUrl ? 'error' : ''}
            placeholder="https://kittheme.com/grogin/store/"
          />
          {errors.shopUrl && <span className="error-message">{errors.shopUrl}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Số điện thoại *</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={errors.phoneNumber ? 'error' : ''}
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="terms"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
          />
          <label htmlFor="terms">
            Tôi đã đọc và đồng ý với <a href="#" className="terms-link">Điều khoản & Điều kiện</a>.
          </label>
          {errors.termsAccepted && <span className="error-message">{errors.termsAccepted}</span>}
        </div>

        <button type="submit" className="submit-button">
          Trở thành Người bán
        </button>
      </form>
    </div>
  );
};

export default VendorForm;
