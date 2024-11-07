import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi form ở đây
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-sidebar">
          <h2>Thông Tin Liên Hệ</h2>
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>123 Đường Thương Mại, TP.HCM</p>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <p>+84 123 456 789</p>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>support@yourstore.com</p>
            </div>
          </div>
          <div className="business-hours">
            <h3>Giờ làm việc</h3>
            <p>Thứ 2 - Thứ 6: 8:00 - 20:00</p>
            <p>Thứ 7 - Chủ nhật: 9:00 - 18:00</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
          <p>Hãy cho chúng tôi biết bạn cần gì. Đội ngũ hỗ trợ sẽ phản hồi sớm nhất!</p>
          
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Nội dung tin nhắn"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Gửi Tin Nhắn
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;