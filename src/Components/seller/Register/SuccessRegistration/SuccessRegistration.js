import React, { useState, useEffect } from 'react';
import './SuccessRegistration.css';
import { useNavigate } from 'react-router-dom';
import checkIcon from '../../../../img/checkIcon.png'; // Đảm bảo có icon này trong thư mục img
import waitingIcon from '../../../../img/waitingIcon.png'; // Đảm bảo có icon này trong thư mục img
import logo from "../../../../img/logo.jpg";

const SuccessRegistration = () => {
  const navigate = useNavigate();
  const [isApproved, setIsApproved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true); // Trạng thái đang xử lý

  // Giả lập quá trình admin duyệt
  useEffect(() => {
    // Giả lập admin duyệt sau 5 giây
    setTimeout(() => {
      setIsProcessing(false);  // Đổi sang trạng thái hoàn thành xử lý
      setIsApproved(true); // Cập nhật trạng thái thành công
    }, 5000); // 5 giây giả lập thời gian duyệt
  }, []);

  const handleAddProduct = () => {
    navigate('/'); // Điều hướng đến trang thêm sản phẩm (thay '/add-product' bằng route bạn muốn)
  };

  const handleBack = () => {
    navigate("/identity-information");
  };

  return (
    <div className="success-registration">
      <div className="seller-header">
        <div className="seller-logo">
          <img src={logo} alt="Shopee" />
          <span>Đăng ký trở thành Người bán </span>
        </div>
        <div className="seller-user-info">
          <img src={logo} alt="User" className="seller-avatar" />
          <span>minhmanh2709</span>
        </div>
      </div>
      <div className="register-seller-content">
        <div className="progress-bar">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-label">Thông tin Shop</div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-label">Cài đặt vận chuyển</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-label">Thông tin thuế</div>
          </div>
          <div className="step">
            <div className="step-number" onClick={handleBack}>4</div>
            <div className="step-label">Thông tin định danh</div>
          </div>
          <div className="step active">
            <div className="step-number">5</div>
            <div className="step-label">Hoàn tất</div>
          </div>
        </div>

        {/* Hiển thị ảnh tuỳ theo trạng thái */}
        <img 
          src={isProcessing ? waitingIcon : checkIcon} 
          alt={isProcessing ? "Waiting" : "Success"} 
          className="check-icon" 
        />

        <h2>{isApproved ? "Đăng ký thành công!" : "Chờ đợi hệ thống xử lý"}</h2>
        <p>
          {isApproved
            ? "Hãy đăng bán sản phẩm đầu tiên để khởi động hành trình bán hàng nhé!"
            : "Đơn đăng ký của bạn đang chờ hệ thống duyệt. Bạn sẽ được thông báo khi tài khoản được phê duyệt."}
        </p>

        {isApproved && (
          <button onClick={handleAddProduct} className="add-product-seller-btn">
            Về trang chủ
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessRegistration;
