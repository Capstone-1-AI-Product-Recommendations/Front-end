import { useNavigate } from "react-router-dom";
import "./AddressForm.css";
import React, { useState, useEffect } from 'react';
import './AddressForm.css';
import addressService from '../../../services/addressService';

const AddressForm = ({ address, onClose, isEdit, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    recipient_name: '',
    recipient_phone: '',
    recipient_address: '',
    is_default: false
  });
  const navigate = useNavigate();


  useEffect(() => {
    if (address && isEdit) {
      setFormData({
        id: address.id,
        recipient_name: address.recipient_name || '',
        recipient_phone: address.recipient_phone || '',
        recipient_address: address.recipient_address || '',
        is_default: address.is_default || false
      });
    }
  }, [address, isEdit]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem('user'))?.user_id;
    
    try {
      await addressService.updateUserAddress(userId, formData);
      if (onSave) {
        onSave(); // Trigger parent update
      }
      onClose();
      // Optionally refresh addresses in parent
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleBack = () => {
    navigate("/register-seller");
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
            value={formData.recipient_name}
            onChange={(e) => setFormData({...formData, recipient_name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="tel"
            value={formData.recipient_phone}
            onChange={(e) => setFormData({...formData, recipient_phone: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Địa chỉ</label>
          <textarea
            value={formData.recipient_address}
            onChange={(e) => setFormData({...formData, recipient_address: e.target.value})}
            required
          />
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            checked={formData.is_default}
            onChange={(e) => setFormData({...formData, is_default: e.target.checked})}
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