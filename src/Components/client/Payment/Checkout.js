/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutData, formatPrice } from "../../../data/CheckoutData";
import AddressModal from "./AddressModal";
import ShippingModal from './ShippingModal';
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { addressData, products, shippingData } = CheckoutData;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addressData);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(shippingData);

  const handleAddressChange = (newAddress) => {
    setSelectedAddress(newAddress);
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
      <div className="delivery-address">
        <h3>Địa Chỉ Nhận Hàng</h3>
        <div className="address-details">
          <span className="user-name">{selectedAddress.name} {selectedAddress.phone}</span>
          <span className="address">{selectedAddress.address}</span>
          <button className="change-btn" onClick={() => setShowAddressModal(true)}>
            Thay Đổi
          </button>
        </div>
      </div>

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        addresses={CheckoutData.addressData}
        onSelectAddress={handleAddressChange}
        onAddNew={() => {/* Xử lý thêm địa chỉ mới */}}
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
          <div className="shipping-method">
            <span>Phương thức vận chuyển: </span>
            <span className="shipping-type">{selectedShipping.method}</span>
            <button className="change-btn" onClick={() => setShowShippingModal(true)}>
              Thay Đổi
            </button>
          </div>
          <div className="shipping-note">
            <p>Nhận hàng vào {selectedShipping.estimatedDelivery}</p>
            <p>{selectedShipping.voucherNote}</p>
          </div>
        </div>
      </div>

      <ShippingModal
        isOpen={showShippingModal}
        onClose={() => setShowShippingModal(false)}
        shippingMethods={[
          {
            id: 1,
            name: "Nhanh",
            price: 16500,
            estimatedDelivery: "29 Tháng 11 - 30 Tháng 11",
          },
          {
            id: 2,
            name: "Hỏa Tốc",
            price: 22000,
            estimatedDelivery: "vào hôm nay",
          },
          {
            id: 3,
            name: "Tiết kiệm",
            price: 13500,
            estimatedDelivery: "vào ngày mai",
          }
        ]}
        onSelectShipping={handleShippingChange}
      />

      <div className="payment-section">
        <div className="payment-method">
          <h3>Phương thức thanh toán</h3>
          <div className="payment-choice">
            <span>Thanh toán khi nhận hàng</span>
            <button className="change-btn">THAY ĐỔI</button>
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
      </div>

      <div className="checkout-footer">
        <p className="terms">
          Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo 
          <a href="#"> Điều khoản ASDmart</a>
        </p>
        <button className="order-button" onClick={handleOrder}>Đặt Hàng</button>
      </div>
    </div>
  );
};

export default Checkout;
