import React, { useState, useEffect } from 'react';
import './AddNewAddress.css';

const AddNewAddress = ({ onClose, onSave, editAddress = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    address: '',
    addressType: 'home',
    isDefault: false
  });

  useEffect(() => {
    if (editAddress) {
      setFormData({
        name: editAddress.name || '',
        phone: editAddress.phone || '',
        province: editAddress.province || '',
        address: editAddress.address || '',
        addressType: editAddress.addressType || 'home',
        isDefault: editAddress.isDefault || false
      });
    }
  }, [editAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="add-address-container">
      <div className="add-address-content">
        <div className="add-address-header">
          <h2>{editAddress ? 'Cập nhật địa chỉ' : 'Địa chỉ mới'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã</label>
            <input
              type="text"
              value={formData.province}
              onChange={(e) => setFormData({...formData, province: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Địa chỉ cụ thể</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="address-type">
            <label>Loại địa chỉ:</label>
            <div className="type-options">
              <div 
                className={`type-option ${formData.addressType === 'home' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, addressType: 'home'})}
              >
                Nhà Riêng
              </div>
              <div 
                className={`type-option ${formData.addressType === 'office' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, addressType: 'office'})}
              >
                Văn Phòng
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-back" onClick={onClose}>
              Trở Lại
            </button>
            <button type="submit" className="btn btn-submit">
              Hoàn thành
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewAddress; 