import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra email có tồn tại trong hệ thống
    const accounts = {
      admin: "admin@gmail.com",
      seller: "seller@gmail.com",
      user: "user@gmail.com",
    };

    if (Object.values(accounts).includes(email)) {
      setIsSubmitted(true);
      setMessage("Link đặt lại mật khẩu đã được gửi vào email của bạn!");
    } else {
      setMessage("Email không tồn tại trong hệ thống!");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="forgot-password-container">
        <div className="forgot-password-form">
          <button className="close-btn" onClick={handleClose}>×</button>
          <h1>Quên mật khẩu</h1>
          
          {!isSubmitted ? (
            <>
              <p className="description">
                Vui lòng nhập email để đặt lại mật khẩu của bạn
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email/Số điện thoại</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email hoặc số điện thoại"
                    required
                  />
                </div>
                {message && <div className="message">{message}</div>}
                <button type="submit" className="submit-btn">
                  Đặt lại mật khẩu
                </button>
              </form>
            </>
          ) : (
            <div className="success-message">
              <p>{message}</p>
              <button onClick={handleClose} className="back-btn">
                Quay lại đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 