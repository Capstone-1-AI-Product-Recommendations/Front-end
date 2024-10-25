/** @format */

// src/components/Footer.js
import React from "react";
import styles from "./Footer.css"; // Tạo file CSS cho Footer

// Footer.js
import './Footer.css';

// Import all images
import paymentMomo from '../../img/sapo-logo.png';
import paymentVnpay from '../../img/sapo-logo.png';
import paymentVisa from '../../img/sapo-logo.png';
import paymentZalopay from '../../img/sapo-logo.png';
import paymentShopeepay from '../../img/sapo-logo.png';
import paymentViettelpay from '../../img/sapo-logo.png';

import shippingGhn from '../../img/sapo-logo.png';
import shippingGhtk from '../../img/sapo-logo.png';
import shippingNinja from '../../img/sapo-logo.png';
import shippingJnt from '../../img/sapo-logo.png';
import shippingAhamove from '../../img/sapo-logo.png';

import appStore from '../../img/sapo-logo.png';
import googlePlay from '../../img/sapo-logo.png';

import phoneIcon from '../../img/sapo-logo.png';
import emailIcon from '../../img/sapo-logo.png';

import facebookIcon from '../../img/sapo-logo.png';
import twitterIcon from '../../img/sapo-logo.png';
import instagramIcon from '../../img/sapo-logo.png';
import linkedinIcon from '../../img/sapo-logo.png';;

export const Footer = () => {
  const supportSection = {
    title: 'Bạn có cần trợ giúp không?',
    description: 'Hỗ trợ 24/7 – Luôn sẵn sàng khi bạn cần, Chăm sóc tận tình, giải quyết mọi thắc mắc',
    phone: '1800 3613',
    email: 'customerservice@ademart.com'
  };

  const sections = [
    {
      title: 'Về chúng tôi',
      links: [
        'Giới Thiệu Về Shopee Việt Nam',
        'Tuyển Dụng',
        'Điều Khoản',
        'Chính Sách Bảo Mật',
        'Chính Hãng',
        'Kênh Người Bán',
        'Flash Sales',
        'Chương Trình Tiếp Thị Liên Kết'
      ]
    },
    {
      title: 'Chăm sóc khách hàng',
      links: [
        'Trung tâm trợ giúp',
        'Hướng dẫn mua hàng',
        'Chính sách & Quy định',
        'Danh giá và phản hồi',
        'Tư vấn trực tuyến',
        'Trả hàng & Hoàn tiền',
        'Hỗ trợ kỹ thuật',
        'Đơn hàng của bạn',
        'Câu hỏi thường gặp (FAQ)'
      ]
    }
  ];

  const paymentMethods = [
    { name: 'MoMo', icon: paymentMomo },
    { name: 'VNPay', icon: paymentVnpay },
    { name: 'Visa', icon: paymentVisa },
    { name: 'ZaloPay', icon: paymentZalopay },
    { name: 'ShopeePay', icon: paymentShopeepay },
    { name: 'ViettelPay', icon: paymentViettelpay }
  ];

  const shippingPartners = [
    { name: 'GHN', icon: shippingGhn },
    { name: 'GHTK', icon: shippingGhtk },
    { name: 'Ninja Van', icon: shippingNinja },
    { name: 'J&T', icon: shippingJnt },
    { name: 'Ahamove', icon: shippingAhamove }
  ];

  const socialLinks = [
    { platform: 'Facebook', icon: facebookIcon, url: '#' },
    { platform: 'Twitter', icon: twitterIcon, url: '#' },
    { platform: 'Instagram', icon: instagramIcon, url: '#' },
    { platform: 'LinkedIn', icon: linkedinIcon, url: '#' }
  ];

  const appDownloads = [
    { platform: 'App Store', icon: appStore, url: '#' },
    { platform: 'Google Play', icon: googlePlay, url: '#' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Support Section */}
        <div className="footer-section support-section">
          <h3>{supportSection.title}</h3>
          <p>{supportSection.description}</p>
          <div className="contact-info">
            <div className="contact-item">
              <img src={phoneIcon} alt="Phone" className="contact-icon" />
              <span>{supportSection.phone}</span>
            </div>
            <div className="contact-item">
              <img src={emailIcon} alt="Email" className="contact-icon" />
              <span>{supportSection.email}</span>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        {sections.map((section, index) => (
          <div key={index} className="footer-section">
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Payment & Shipping Section */}
        <div className="footer-section">
          <h3>Thanh toán</h3>
          <div className="payment-methods">
            {paymentMethods.map((method, index) => (
              <div key={index} className="payment-item">
                <img src={method.icon} alt={method.name} className="payment-icon" />
              </div>
            ))}
          </div>
          
          <h3>Đơn vị vận chuyển</h3>
          <div className="shipping-partners">
            {shippingPartners.map((partner, index) => (
              <div key={index} className="shipping-item">
                <img src={partner.icon} alt={partner.name} className="shipping-icon" />
              </div>
            ))}
          </div>
        </div>

        {/* App Downloads */}
        <div className="footer-section">
          <h3>Tải xuống ứng dụng</h3>
          <div className="app-downloads">
            {appDownloads.map((app, index) => (
              <a key={index} href={app.url} className="app-download-button">
                <img src={app.icon} alt={app.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="copyright">
          Bản quyền 2024 © Jinostore WooCommerce WordPress Theme. Mọi quyền được bảo lưu. Được hỗ trợ bởi BlackRise Themes.
        </div>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a key={index} href={social.url} className="social-link">
              <img src={social.icon} alt={social.platform} className="social-icon" />
            </a>
          ))}
        </div>
        <div className="footer-links">
          <a href="#">Điều khoản và điều kiện</a>
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Theo dõi đơn hàng</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;