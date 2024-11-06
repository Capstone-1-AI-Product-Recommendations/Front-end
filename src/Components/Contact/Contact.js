/** @format */

import React, { useState } from "react";
import "./Contact.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form tại đây
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className='contact-container'>
      <div className='contact-info'>
        <h2>Liên hệ với chúng tôi</h2>
        <div className='contact-item'>
          <FaPhone className='contact-icon' />
          <div>
            <h4>Điện thoại</h4>
            <p>0766645115</p>
          </div>
        </div>
        <div className='contact-item'>
          <FaEnvelope className='contact-icon' />
          <div>
            <h4>Email</h4>
            <p>customerservice@ademart.com</p>
          </div>
        </div>
        <div className='contact-item'>
          <FaMapMarkerAlt className='contact-icon' />
          <div>
            <h4>Địa chỉ</h4>
            <p>123 Đường ABC, Thành phố XYZ</p>
          </div>
        </div>
      </div>
      <div className='contact-form'>
        <h2>Gửi tin nhắn</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Tên</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Tin nhắn</label>
            <textarea
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type='submit' className='submit-btn'>
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
