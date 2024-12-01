/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutData, formatPrice } from "../../../data/CheckoutData";
import AddressModal from "./AddressModal";
import ShippingModal from './ShippingModal';
import { ShippingData } from '../../../data/ShippingData';
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { addressData, products, shippingData } = CheckoutData;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addressData[0]);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(ShippingData[0]);
  const [selectedPayment, setSelectedPayment] = useState('cod');

  const handleAddressChange = (newAddress) => {
    setSelectedAddress(newAddress);
    setShowAddressModal(false);
  };

  const handleShippingChange = (newShipping) => {
    setSelectedShipping(newShipping);
  };

  const handleOrder = () => {
    // Logic xử lý đặt hàng
    navigate('/payment'); // Chuyển hướng đến trang thanh toán
  };

  return (
    <div className="checkout-container">
      {/* Left Column */}
      <div className="checkout-left">
        <div className="delivery-address">
          <h3>Địa Chỉ Nhận Hàng</h3>
          <div className="address-info">
            <div className="user-details">
              <span className="name">{selectedAddress?.name}</span>
              <span className="phone">({selectedAddress?.phone})</span>
            </div>
            <div className="address-text">{selectedAddress?.address}</div>
            <button 
              className="change-btn"
              onClick={() => setShowAddressModal(true)}
            >
              Thay Đổi
            </button>
          </div>
        </div>

        <AddressModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          addresses={addressData}
          onSelectAddress={(address) => {
            setSelectedAddress(address);
            setShowAddressModal(false);
          }}
        />

        <div className="products-section">
          <div className="product-header">
            <span>Sản phẩm</span>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
          </div>

          {products.map(item => (
            <div key={item.id} className="product-item">
              <div className="product-info">
                <img src={item.image} alt={item.name} />
                <div className="product-details">
                  <span className="product-name">{item.name}</span>
                  <span className="product-variant">Loại: {item.variant}</span>
                </div>
              </div>
              <div className="product-price">₫{formatPrice(item.price)}</div>
              <div className="product-quantity">{item.quantity}</div>
              <div className="product-total">₫{formatPrice(item.price * item.quantity)}</div>
            </div>
          ))}

          <div className="message-section">
            <span>Lời nhắn:</span>
            <input type="text" placeholder="Lưu ý cho Người bán..." />
          </div>

          <div className="shipping-section">
            <div className="shipping-header">
              <span>Đơn vị vận chuyển:</span>
              <button className="change-btn" onClick={() => setShowShippingModal(true)}>
                THAY ĐỔI
              </button>
            </div>
            
            <div className="shipping-info">
              <div className="shipping-name">
                <span>{selectedShipping.name}</span>
                <span className="shipping-price">₫{selectedShipping.price.toLocaleString()}</span>
              </div>
              <div className="delivery-time">
                Nhận hàng vào {selectedShipping.estimatedDelivery}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="checkout-right">
        <div className="payment-section">
          <h3>Chọn phương thức thanh toán</h3>
          <div className="payment-options">
            <div className="payment-option">
              <input
                type="radio"
                id="qrcode"
                name="payment"
                value="qrcode"
                checked={selectedPayment === 'qrcode'}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <label htmlFor="qrcode">QR Code</label>
            </div>
            
            <div className="payment-option">
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                checked={selectedPayment === 'cod'}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <label htmlFor="cod">Thanh toán khi nhận hàng</label>
            </div>
          </div>
        </div>

        <div className="order-summary">
          <div className="summary-row">
            <span>Tổng tiền hàng</span>
            <span>₫{formatPrice(CheckoutData.calculations.subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Tổng tiền phí vận chuyển</span>
            <span>₫{formatPrice(shippingData.fee)}</span>
          </div>
          <div className="summary-row total">
            <span>Tổng thanh toán</span>
            <span className="total-amount">₫{formatPrice(CheckoutData.calculations.total)}</span>
          </div>
        </div>

        <button className="order-button" onClick={handleOrder}>
          Đặt Hàng
        </button>
      </div>

      <ShippingModal
        isOpen={showShippingModal}
        onClose={() => setShowShippingModal(false)}
        shippingMethods={ShippingData}
        selectedShipping={selectedShipping}
        onSelectShipping={setSelectedShipping}
      />
    </div>
  );
};

export default Checkout;
