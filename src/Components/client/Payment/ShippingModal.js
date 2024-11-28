import React from 'react';
import './ShippingModal.css';

const ShippingModal = ({ isOpen, onClose, shippingMethods, onSelectShipping }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Chọn phương thức vận chuyển</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="shipping-methods-list">
          <h4>PHƯƠNG THỨC VẬN CHUYỂN LIÊN KẾT VỚI SHOPEE</h4>
          
          {shippingMethods.map((method) => (
            <div key={method.id} className="shipping-method-item" onClick={() => {
              onSelectShipping(method);
              onClose();
            }}>
              <div className="method-info">
                <div className="method-name">{method.name}</div>
                <div className="delivery-estimate">
                  Đảm bảo nhận hàng {method.estimatedDelivery}
                </div>
                {method.voucherNote && (
                  <div className="voucher-note">{method.voucherNote}</div>
                )}
              </div>
              <div className="method-price">₫{method.price.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Trở Lại</button>
          <button className="btn-confirm" onClick={onClose}>Xác Nhận</button>
        </div>
      </div>
    </div>
  );
};

export default ShippingModal; 