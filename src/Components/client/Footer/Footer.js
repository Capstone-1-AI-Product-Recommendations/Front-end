/** @format */

// Footer.js
import React from "react";
import "./Footer.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// Import các biểu tượng
import paymentMomo from "../../../img/sapo-logo.png";
import paymentVnpay from "../../../img/sapo-logo.png";
import paymentVisa from "../../../img/sapo-logo.png";
import paymentZalopay from "../../../img/sapo-logo.png";

import shippingGhn from "../../../img/sapo-logo.png";
import shippingGhtk from "../../../img/sapo-logo.png";
import shippingNinja from "../../../img/sapo-logo.png";
import shippingJnt from "../../../img/sapo-logo.png";

import appStore from "../../../img/sapo-logo.png";
import googlePlay from "../../../img/sapo-logo.png";

import phoneIcon from "../../../img/sapo-logo.png";
import emailIcon from "../../../img/sapo-logo.png";

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container row'>
        {/* Support Section */}
        <div className='footer-section col-md-3'>
          <h3>Bạn có cần trợ giúp không?</h3>
          <p>
            Hỗ trợ 24/7 – Luôn sẵn sàng khi bạn cần, chăm sóc tận tình, giải
            quyết mọi thắc mắc...
          </p>
          <div className='contact-info'>
            <div className='contact-item'>
              <FaPhone className='contact-icon my-2' />
              <span> 1800 3613</span>
            </div>
            <div className='contact-item'>
              <FaEnvelope className='contact-icon my-2' />
              <span> customerservice@ademart.com</span>
            </div>
          </div>
          {/* Application Download  Section */}
          <div className='footer-section col-md-3'>
            <h3>Tải xuống ứng dụng</h3>
            <div className='app-downloads'>
              <img
                src={appStore}
                alt='App Store'
                className='app-download-button'
              />
              <img
                src={googlePlay}
                alt='Google Play'
                className='app-download-button'
              />
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className='footer-section col-md-3'>
          <h3>Về chúng tôi</h3>
          <ul>
            <li>
              <a href='#'>Giới thiệu về ADSmart</a>
            </li>
            <li>
              <a href='#'>Tuyển Dụng</a>
            </li>
            <li>
              <a href='#'>Điều Khoản</a>
            </li>
            <li>
              <a href='#'>Chính sách Bảo Mật</a>
            </li>
            <li>
              <a href='#'>Chính Hãng</a>
            </li>
            <li>
              <a href='#'>Kênh Người Bán</a>
            </li>
            <li>
              <a href='#'>Flash Sales</a>
            </li>
            <li>
              <a href='#'>Chương Trình Tiếp Thị Liên Kết</a>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className='footer-section col-md-3'>
          <h3>Chăm sóc khách hàng</h3>
          <ul>
            <li>
              <a href='#'>Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href='#'>Hướng dẫn mua hàng</a>
            </li>
            <li>
              <a href='#'>Chính sách & Quy định</a>
            </li>
            <li>
              <a href='#'>Danh giá và phản hồi</a>
            </li>
            <li>
              <a href='#'>Tư vấn trực tuyến</a>
            </li>
            <li>
              <a href='#'>Trả hàng & Hoàn tiền</a>
            </li>
            <li>
              <a href='#'>Hỗ trợ kỹ thuật</a>
            </li>
            <li>
              <a href='#'>Đơn hàng của bạn</a>
            </li>
            <li>
              <a href='#'>Câu hỏi thường gặp (FAQ)</a>
            </li>
          </ul>
        </div>

        {/* Payment and Shipping Section */}
        <div className='footer-section col-md-2'>
          <h3>Thanh toán</h3>
          <div className='payment-methods'>
            <img src={paymentMomo} alt='Momo' className='payment-icon' />
            <img src={paymentVnpay} alt='Vnpay' className='payment-icon' />
            <img src={paymentVisa} alt='Visa' className='payment-icon' />
            <img src={paymentZalopay} alt='Zalopay' className='payment-icon' />
          </div>

          <h3>Đơn vị vận chuyển</h3>
          <div className='shipping-partners'>
            <img src={shippingGhn} alt='GHN' className='shipping-icon' />
            <img src={shippingGhtk} alt='GHTK' className='shipping-icon' />
            <img
              src={shippingNinja}
              alt='Ninja Van'
              className='shipping-icon'
            />
            <img src={shippingJnt} alt='J&T' className='shipping-icon' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
