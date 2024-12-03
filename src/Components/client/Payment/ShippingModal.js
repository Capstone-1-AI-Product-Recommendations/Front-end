import React from 'react';
import './ShippingModal.css';

const ShippingModal = ({ isOpen, onClose, shippingMethods, onSelectShipping, selectedShipping }) => {
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
            <div
              key={method.id}
              className={`shipping-method-item ${selectedShipping?.id === method.id ? 'selected' : ''}`}
              onClick={() => onSelectShipping(method)}
            >
              <div className="method-info">
                <div className="method-name">{method.name}</div>
                <div className="delivery-estimate">
                  Đảm bảo nhận hàng từ {method.estimatedDelivery}
                </div>
                <div className="voucher-note">
                  Nhận Voucher trị giá ₫15.000 nếu đơn hàng được giao đến bạn sau ngày {method.voucherDate}
                </div>
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