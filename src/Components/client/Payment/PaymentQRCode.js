/** @format */

import React from "react";
import { useLocation } from "react-router-dom";
import "./PaymentQRCode.css";

const PaymentQRCode = () => {
  const location = useLocation();
  const paymentUrl = location.state?.paymentUrl;
  console.log("Đã nhận Payment URL:", paymentUrl);
  return (
    <div class="payment-qr-container">      
      <div class="payment-qr-content">
        <iframe
          src="https://pay.payos.vn/web/beec2b3290214427802411717fc25128/"
          class="payment-iframe"
          frameborder="0"
          scrolling="no">
        </iframe>
      </div>
    </div>
  );
};

export default PaymentQRCode;
