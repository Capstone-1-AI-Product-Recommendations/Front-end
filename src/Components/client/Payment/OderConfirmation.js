/** @format */

import React from "react";
import "./OrderConfirmation.css";
import { FaCheckCircle } from "react-icons/fa";

const OrderConfirmation = () => {
  return (
    <div className='order-confirmation'>
      <div className='order-header'>
        <div className='order-info'>
          <div className='info-item'>
            <span className='label'>MÃ ĐƠN HÀNG:</span>
            <span className='value'>12638</span>
          </div>
          <div className='info-item'>
            <span className='label'>NGÀY:</span>
            <span className='value'>27 December, 2021</span>
          </div>
          <div className='info-item'>
            <span className='label'>TỔNG CỘNG:</span>
            <span className='value'>1,000 đ</span>
          </div>
          <div className='info-item'>
            <span className='label'>PHƯƠNG THỨC THANH TOÁN:</span>
            <span className='value'>Ví điện tử MoMo</span>
          </div>
        </div>
      </div>

      <div className='confirmation-message'>
        <div className='check-icon'>
          <FaCheckCircle style={{ color: "#2eb85c", fontSize: 60 }} />
        </div>
        <h2>Bạn đã thanh toán</h2>
        <p>
          Chúng tôi đã nhận được đơn hàng của bạn và sẽ sớm liên hệ với bạn.
        </p>
      </div>

      <div className='order-details'>
        <h3>CHI TIẾT ĐƠN HÀNG</h3>
        <div className='product-list'>
          <div className='product-item'>
            <span className='product-name'>
              Kem đánh răng Colgate Optic White 100g × 1
            </span>
            <span className='product-price'>1,000 đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
