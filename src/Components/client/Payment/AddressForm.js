import React, { useState, useEffect } from 'react';
import './AddressForm.css';

const AddressForm = ({ address, onClose, isEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    isDefault: false
  });

  useEffect(() => {
    if (address && isEdit) {
      setFormData(address);
    }
  }, [address, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic lưu địa chỉ ở đây
    onClose();
  };

  return (
    <div className="address-form">
      <div className="form-header">
        <h2>{isEdit ? 'Cập Nhật Địa Chỉ' : 'Thêm Địa Chỉ Mới'}</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Địa chỉ</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            checked={formData.isDefault}
            onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
          />
          <label>Đặt làm địa chỉ mặc định</label>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onClose}>
            Huỷ
          </button>
          <button type="submit" className="save-button">
            {isEdit ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;