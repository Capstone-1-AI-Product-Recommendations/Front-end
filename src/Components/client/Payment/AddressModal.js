import React, { useState } from 'react';
import './AddressModal.css';

const AddressModal = ({ isOpen, onClose, addresses, onSelectAddress, onAddNew }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="address-modal-overlay">
      <div className="address-modal">
        <div className="modal-header">
          <h2>Địa Chỉ Của Tôi</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="address-list">
          {addresses.map(address => (
            <div key={address.id} className="address-item">
              <input
                type="radio"
                name="address"
                checked={address.isDefault}
                onChange={() => setSelectedAddress(address)}
              />
              <div className="address-info">
                <div className="user-info">
                  <span className="name">{address.name}</span>
                  <span className="phone">{address.phone}</span>
                  {address.isDefault && <span className="default-tag">Mặc định</span>}
                  <span className="update-link">Cập nhật</span>
                </div>
                <div className="address-text">
                  <p>{address.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="add-new-button" onClick={onAddNew}>
            + Thêm Địa Chỉ Mới
          </button>
          <div className="action-buttons">
            <button className="cancel-button" onClick={onClose}>Huỷ</button>
            <button 
              className="confirm-button" 
              onClick={() => {
                onSelectAddress(selectedAddress);
                onClose();
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal; 