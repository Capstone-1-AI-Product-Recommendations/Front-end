import React from 'react';
import './SuccessRegistration.css';
import { useNavigate } from 'react-router-dom';
import checkIcon from '../../../img/checkIcon.png'; // Đảm bảo có icon này trong thư mục img
import logo from "../../../img/logo.jpg";

const SuccessRegistration = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/product-form'); // Điều hướng đến trang thêm sản phẩm (thay '/add-product' bằng route bạn muốn)
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
      <img src={checkIcon} alt="Success" className="check-icon" />
      <h2>Đăng ký thành công</h2>
      <p>
        Hãy đăng bán sản phẩm đầu tiên để khởi động hành trình bán hàng cùng Shopee nhé!
      </p>
      <button onClick={handleAddProduct} className="add-product-btn">
        Thêm sản phẩm
      </button>
    </div>
  );
};

export default SuccessRegistration;
