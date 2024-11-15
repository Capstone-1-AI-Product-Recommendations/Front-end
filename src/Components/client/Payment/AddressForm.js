import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddressForm.css";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "United States (US)",
    district: "",
    ward: "",
    address: "",
    email: "",
    isDefaultAddress: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address form submitted:", formData);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/register-seller");
  };

  return (
    <div className="address-form">
      <h1 className="form-title">Địa chỉ mới</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Họ</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Tên</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Tỉnh/ Thành phố</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="United States (US)">United States (US)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quận/ Huyện</label>
          <input
            type="text"
            name="district"
            placeholder="House number and street name"
            value={formData.district}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Phường/ Xã</label>
          <input
            type="text"
            name="ward"
            value={formData.ward}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Địa chỉ cụ thể</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Email address *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-checkbox">
          <label>
            <input
              type="checkbox"
              name="isDefaultAddress"
              checked={formData.isDefaultAddress}
              onChange={handleInputChange}
            />
            <span>Đặt làm vị trí mặc định</span>
          </label>
        </div>

        <div className="form-buttons">
          <button type="button" className="btn-back" onClick={handleBack}>
            Trở lại
          </button>
          <button type="submit" className="btn-submit">
            Hoàn thành
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
