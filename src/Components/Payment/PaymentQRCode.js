/** @format */

import React from "react";
import "./PaymentQRCode.css";
import vietQRCode from "../../img/vietqr-logo.png";
import sapoIcon from "../../img/sapo-logo.png";
import napasIcon from "../../img/napas-logo.png";
import bidvIcon from "../../img/bidv-logo.png";
import QRCode from "../../img/placeholder-qr-code.png";

const PaymentQRCode = ({
  amount = "10,000,000,000 VND",
  accountName = "Le Nguyen Thuc Doan",
  accountNumber = "21310000965483",
}) => {
  return (
    <div className='payment-qr-container'>
      <div className='payment-qr-title'>Mở Ứng Dụng Ngân Hàng Quét QRCode</div>

      <div className='payment-qr-content'>
        <div className='vietqr-logo'>
          <img src={vietQRCode} alt='VietQR' />
        </div>

        <div className='qr-code-container'>
          <img src={QRCode} alt='QR Code' className='qr-code' />
        </div>

        <div className='payment-logos'>
          <img src={napasIcon} alt='Napas' className='partner-logo' />
          <img src={bidvIcon} alt='BIDV' className='partner-logo' />
        </div>

        <div className='payment-details'>
          <div className='payment-detail-row'>
            <span className='detail-label'>Số tiền:</span>
            <span className='detail-value'>{amount}</span>
          </div>
          <div className='payment-detail-row'>
            <span className='detail-label'>Tên chủ TK:</span>
            <span className='detail-value'>{accountName}</span>
          </div>
          <div className='payment-detail-row'>
            <span className='detail-label'>Số TK:</span>
            <span className='detail-value'>{accountNumber}</span>
          </div>
        </div>

        <div className='payment-footer'>
          <div className='sapo-text'>
            Giải pháp được cung cấp trên nền tảng
            <img src={sapoIcon} alt='Sapo' className='sapo-logo' />
          </div>
          <button className='print-button'>In nhanh mã</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentQRCode;
