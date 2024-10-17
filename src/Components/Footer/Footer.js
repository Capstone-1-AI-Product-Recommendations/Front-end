/** @format */

// src/components/Footer.js
import React from "react";
import styles from "./Footer.module.css"; // Tạo file CSS cho Footer

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.newsletter}>
          <h2>Bạn có cần trợ giúp không?</h2>
          <p>
            Hỗ trợ 24/7 – Luôn sẵn sàng khi bạn cần, chăm sóc tận tình, giải
            quyết mọi thắc mắc.
          </p>
          <input type='email' placeholder='Enter your email address' />
          <button className={styles.sendButton}>SEND</button>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.footerColumn}>
            <h3>Về Chúng Tôi</h3>
            <ul>
              <li>
                <a href='#'>Giới Thiệu Về Shoppe Việt Nam</a>
              </li>
              <li>
                <a href='#'>Tuyển Dụng </a>
              </li>
              <li>
                <a href='#'>Điều Khoản</a>
              </li>
              <li>
                <a href='#'>Chính Sách Bảo Mật</a>
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
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerColumn}>
            <h3>Chăm sóc khách hàng</h3>
            <ul>
              <li>
                <a href='#'>Trung tâm trợ giúp</a>
              </li>
              <li>
                <a href='#'>Hướng dẫn mua hàng </a>
              </li>
              <li>
                <a href='#'>Chính sách & Quy định</a>
              </li>
              <li>
                <a href='#'>Đánh giá và phản hồi</a>
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
        </div>
        <div className={styles.appDownload}>
          <h3>Download our app</h3>
          <button className={styles.googlePlay}>Get it on Google Play</button>
          <button className={styles.appStore}>Download on the App Store</button>
        </div>

        <div className={styles.socialMedia}>
          <h3>Follow us on social media:</h3>
          <div className={styles.socialIcons}>
            <a href='#'>Facebook</a>
            <a href='#'>Twitter</a>
            <a href='#'>LinkedIn</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>
          Bản quyền 2024 © Jinstore WooCommerce WordPress Theme. Mọi quyền được
          bảo lưu. Được hỗ trợ bởi BlackRise Themes.
        </p>
        <div className={styles.paymentMethods}>
          <img src='payment-icon1.png' alt='Payment Method' />
          <img src='payment-icon2.png' alt='Payment Method' />
          <img src='payment-icon3.png' alt='Payment Method' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
