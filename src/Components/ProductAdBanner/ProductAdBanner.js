/** @format */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductAdBanner.css";
import productAdBannerImg from "../../img/productAdBanner.png"; // Import hình ảnh sản phẩm

const ProductAdBanner = () => {
  return (
    <div className='product-ad-banner row align-items-center mx-auto p-4'>
      <div className='col-md-6 text-content'>
        <span className='discount-tag'>Giảm giá cuối tuần</span>
        <h2 className='ad-title'>
          Nhận được sản phẩm chất lượng tốt nhất với mức giá thấp nhất
        </h2>
        <p className='ad-description'>
          Chúng tôi đã chuẩn bị các chương trình giảm giá đặc biệt cho bạn đối
          với các sản phẩm tạp hóa. Đừng bỏ lỡ những cơ hội này...
        </p>
        <div className='price-button-wrapper'>
          <button className='buy-now-btn me-3 '>Mua ngay</button>
          <div className='price-content'>
            <span className='price'>$28.99</span>
            <span className='original-price'>$56.67</span>
          </div>
        </div>
        <p className='note'>Đừng bỏ lỡ ưu đãi có thời hạn này.</p>
      </div>
      <div className='col-md-6 image-content'>
        <img
          src={productAdBannerImg}
          alt='Sản phẩm'
          className='product-image'
        />
      </div>
    </div>
  );
};

export default ProductAdBanner;
