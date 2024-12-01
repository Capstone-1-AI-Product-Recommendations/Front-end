import React, { useState, useEffect } from 'react';
import './AddressModal.css';
import AddressForm from './AddressForm';
import AddNewAddress from './AddNewAddress';

const AddressModal = ({ isOpen, onClose, addresses, onSelectAddress, selectedAddress, onAddNew }) => {
  const [currentSelected, setCurrentSelected] = useState(selectedAddress);
  const [showEditForm, setShowEditForm] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [showAddNew, setShowAddNew] = useState(false);

  useEffect(() => {
    setCurrentSelected(selectedAddress);
  }, [selectedAddress]);

  if (!isOpen) return null;

  const handleUpdateClick = (address) => {
    setAddressToEdit(address);
    setShowEditForm(true);
  };

  const handleSaveNewAddress = (newAddress) => {
    onAddNew(newAddress);
    setShowAddNew(false);
  };

  const handleAddressSelect = (address) => {
    setCurrentSelected(address);
  };

  const handleConfirm = () => {
    if (currentSelected) {
      onSelectAddress(currentSelected);
    }
  };

  if (showAddNew) {
    return <AddNewAddress 
      onClose={() => setShowAddNew(false)}
      onSave={handleSaveNewAddress}
    />;
  }

  return (
    <div className="address-modal-overlay">
      {!showEditForm ? (
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
                  checked={currentSelected?.id === address.id}
                  onChange={() => handleAddressSelect(address)}
                  id={`address-${address.id}`}
                />
                <label htmlFor={`address-${address.id}`} className="address-info">
                  <div className="user-info">
                    <span className="name">{address.name}</span>
                    <span className="phone">{address.phone}</span>
                    {address.isDefault && <span className="default-tag">Mặc định</span>}
                    <span 
                      className="update-link" 
                      onClick={() => handleUpdateClick(address)}
                    >
                      Cập nhật
                    </span>
                  </div>
                  <div className="address-text">
                    <p>{address.address}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="modal-footer">  
            <button 
              className="add-new-button" 
              onClick={() => setShowAddNew(true)}
            >
              + Thêm Địa Chỉ Mới
            </button>
            <div className="action-buttons">
              <button className="cancel-button" onClick={onClose}>Huỷ</button>
              <button 
                className="confirm-button" 
                onClick={handleConfirm}
                disabled={!currentSelected}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AddressForm
          address={addressToEdit}
          onClose={() => setShowEditForm(false)}
          isEdit={!!addressToEdit}
        />
      )}
    </div>
  );
};

export default AddressModal; 