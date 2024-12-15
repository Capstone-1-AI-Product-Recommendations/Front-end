import React, { useState } from "react";
import "./ForgotPassword.css";
import { requestPasswordReset, verifyResetCode, resetPassword } from '../../../services/apiForgotPassword';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset(email);
      setMessage(response.message || 'Mã xác thực đã được gửi đến email của bạn');
      setStep(2);
    } catch (error) {
      setMessage(error.message || 'Email không tồn tại trong hệ thống');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const enteredCode = verificationCode.join("");
    console.log('Sending verification:', { email, code: enteredCode });
    
    try {
      await verifyResetCode(email, enteredCode);
      setMessage("");
      setStep(4);
    } catch (error) {
      console.error('Verification error:', error);
      setMessage(error.message || 'Mã xác thực không hợp lệ');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('Mật khẩu không khớp');
      return;
    }

    // Kiểm tra độ mạnh của mật khẩu
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const isLongEnough = newPassword.length >= 8;

    if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && isLongEnough)) {
      setMessage('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
      return;
    }

    try {  
      await resetPassword(email, newPassword, confirmPassword);
      setMessage('Đặt lại mật khẩu thành công');
      setStep(3);
    } catch (error) {
      setMessage(error.message || 'Không thể đặt lại mật khẩu');
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
          
          {step === 1 && (
            <>
              <h1>Quên mật khẩu</h1>
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
                  Tiếp tục
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1>Kiểm tra email</h1>
              <p className="description">
                Chúng tôi đã gửi đến email {email}
                <br />
                Nhập đoạn mã đã gửi đến email vào ô để xác thực
              </p>
              <form onSubmit={handleVerifyCode}>
                <div className="verification-inputs">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength="1"
                      value={verificationCode[index] || ""}
                      onChange={(e) => {
                        const newCode = [...verificationCode];
                        newCode[index] = e.target.value;
                        setVerificationCode(newCode);
                        
                        if (e.target.value && index < 5) {
                          const nextInput = document.getElementById(`code-${index + 1}`);
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                          const prevInput = document.getElementById(`code-${index - 1}`);
                          if (prevInput) prevInput.focus();
                        }
                      }}
                    />
                  ))}
                </div>
                {message && <div className="message">{message}</div>}
                <button type="submit" className="submit-btn">
                  Xác thực
                </button>
              </form>
              <p className="resend-text">
                Bạn chưa nhận được mã? <a href="#!">Gửi lại</a>
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <p className="description">
                Vui lòng nhập mật khẩu mới
              </p>
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label>Mật khẩu mới</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    required
                  />
                </div>
                {message && <div className="message">{message}</div>}
                <button type="submit" className="submit-btn">
                  Đặt lại mật khẩu
                </button>
              </form>
            </>
          )}
          {step === 3 && (
            <div className="success-message">
              <h1 className="success-title">Thành công <i className="fas fa-check-circle"></i></h1>
              <p className="success-text">
                Xin chúc mừng!
                <br />
                Mật khẩu của bạn đã được thay đổi.
                <br />
                Nhấp vào tiếp tục để đăng nhập
              </p>
              <button onClick={handleClose} className="login-btn">
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