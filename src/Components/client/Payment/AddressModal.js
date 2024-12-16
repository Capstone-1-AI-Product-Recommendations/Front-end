import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AddressModal.css';
import AddNewAddress from './AddNewAddress';
import AddressForm from './AddressForm';

const AddressModal = ({ isOpen, onClose, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [showAddNew, setShowAddNew] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const loadAddresses = () => {
      const savedAddresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
      setAddresses(savedAddresses);
    };
    loadAddresses();
  }, [updateTrigger]);

  if (!isOpen) return null;

  const handleUpdateClick = (address) => {
    setAddressToEdit({
      id: address.id,
      recipient_name: address.recipient_name,
      recipient_phone: address.recipient_phone,
      recipient_address: address.recipient_address,
      is_default: address.is_default
    });
    setShowEditForm(true);
  };

  const handleSaveNewAddress = () => {
    setShowAddNew(false);
    setUpdateTrigger(prev => prev + 1); // Refresh addresses
  };

  const handleAddressSelect = (address) => {
    setCurrentSelected(address);
  };

  const handleConfirm = () => {
    if (currentSelected) {
      onSelectAddress(currentSelected);
    }
  };

  const handleUpdateSuccess = () => {
    setShowEditForm(false);
    setUpdateTrigger(prev => prev + 1); // Trigger refresh
  };

  const handleAddNewSuccess = async () => {
    setShowAddNew(false);
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="address-modal-overlay">
      {showAddNew ? (
        <AddNewAddress 
          onClose={() => setShowAddNew(false)}
          onSave={handleSaveNewAddress}
        />
      ) : (
        !showEditForm ? (
          <div className="address-modal">
            <div className="modal-header">
              <h2>Địa Chỉ Của Tôi</h2>
              <button className="close-button" onClick={onClose}>&times;</button>
            </div>

            <div className="address-list">
              {addresses.map(address => (
                <div key={address.recipient_phone} className="address-item">
                  <input
                    type="radio"
                    name="address"
                    checked={currentSelected?.recipient_phone === address.recipient_phone}
                    onChange={() => handleAddressSelect(address)}
                    id={`address-${address.recipient_phone}`}
                  />
                  <label htmlFor={`address-${address.recipient_phone}`} className="address-info">
                    <div className="user-info">
                      <span className="name">{address.recipient_name}</span>
                      <span className="phone">{address.recipient_phone}</span>
                      {address.is_default && <span className="default-tag">Mặc định</span>}
                      <span 
                        className="update-link" 
                        onClick={() => handleUpdateClick(address)}
                      >
                        Cập nhật
                      </span>
                    </div>
                    <div className="address-text">
                      {address.recipient_address}
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
            onSave={handleUpdateSuccess}
            isEdit={true}
          />
        )
      )}
    </div>
  );
};

AddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectAddress: PropTypes.func.isRequired
};

export default AddressModal;