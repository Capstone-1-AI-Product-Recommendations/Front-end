/** @format */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FeaturesSection.css"; // Ensure the correct path
import PaymentImg from "../../../img/payment-icon1.png"; // Imported image for payment
import PromotionImg from "../../../img/promotion-icon.png"; // Imported image for promotion
import QualityImg from "../../../img/quality-icon.png"; // Imported image for quality

const FeaturesSection = () => {
  return (
    <div className='features-section container'>
      <div className='row text-center justify-content-start'>
        <div className='col-md-4 feature-item d-flex align-items-center'>
          <img
            src={PaymentImg}
            alt='Thanh toán trực tuyến'
            className='feature-icon mr-3'
          />
          <div className='text-left'>
            <h5 className='feature-title mb-1'>Chỉ thanh toán trực tuyến</h5>
            <p className='feature-description mb-0'>
              Nhanh, an toàn, tiện lợi – thanh toán chỉ trong vài giây.
            </p>
          </div>
        </div>

        <div className='col-md-4 feature-item d-flex align-items-center'>
          <img
            src={PromotionImg}
            alt='Sản phẩm và khuyến mãi'
            className='feature-icon mr-3'
          />
          <div className='text-left'>
            <h5 className='feature-title mb-1'>Sản phẩm mới và khuyến mãi</h5>
            <p className='feature-description mb-0'>
              Ưu đãi sốc mỗi ngày – săn ngay sản phẩm mới nhất!
            </p>
          </div>
        </div>

        <div className='col-md-4 feature-item d-flex align-items-center'>
          <img
            src={QualityImg}
            alt='Đảm bảo chất lượng'
            className='feature-icon mr-3'
          />
          <div className='text-left'>
            <h5 className='feature-title mb-1'>Đảm bảo chất lượng</h5>
            <p className='feature-description mb-0'>
              Chất lượng đỉnh cao – bạn luôn yên tâm mua sắm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
