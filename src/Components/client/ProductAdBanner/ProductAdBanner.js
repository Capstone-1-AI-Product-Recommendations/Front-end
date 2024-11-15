/** @format */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductAdBanner.css";
import banners from "../../../data/banner";

const ProductAdBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="product-ad-banner row align-items-center mx-auto p-4">
      <div className="col-md-6 text-content">
        <span className="discount-tag">Giảm giá cuối tuần</span>
        <h2 className="ad-title">{banners[currentBanner].title}</h2>
        <p className="ad-description">{banners[currentBanner].description}</p>
        <div className="price-button-wrapper">
          <button className="buy-now-btn me-3">Mua ngay</button>
          <div className="price-content">
            <span className="price">{banners[currentBanner].price}</span>
            <span className="original-price">
              {banners[currentBanner].originalPrice}
            </span>
          </div>
        </div>
        <p className="note">Đừng bỏ lỡ ưu đãi có thời hạn này.</p>
      </div>
      <div className="col-md-6 image-content">
        <img
          src={banners[currentBanner].img}
          alt="Sản phẩm"
          className="product-image"
        />
      </div>
      <div className="indicator-dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentBanner === index ? "active" : ""}`}
            onClick={() => setCurrentBanner(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProductAdBanner;