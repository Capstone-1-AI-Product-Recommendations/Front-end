import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductAdBanner.css";
import banners from "../../../data/banner";

const ProductAdBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container container-fluid px-4">
      <div className="row">
        {/* Main Banner */}
        <div className="col-md-8 position-relative">
          <div className="main-banner">
            <img
              src={banners[currentBanner].img}
              alt="Main Banner"
              className="main-banner-image"
            />
            {/* Next and Previous Buttons */}
            <button className="banner-btn prev-btn" onClick={handlePrev}>
              &#8249;
            </button>
            <button className="banner-btn next-btn" onClick={handleNext}>
              &#8250;
            </button>
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
        </div>

        {/* Right Column with two small banners */}
        <div className="col-md-4">
          <div className="small-banners d-flex flex-column gap-3">
            {/* Voucher Banner */}
            <div className="small-banner voucher-banner">
              <div className="voucher-header text-center">
                {/* <h3 className="mb-1">KẾT HỢP VOUCHER</h3> */}
                <h2 className="mb-3">ƯU ĐÃI BẤT NGỜ</h2>
              </div>
              <div className="voucher-types mb-3">
                <span className="voucher-type">Voucher Kiara</span>
                <span className="voucher-type">Voucher ADSmart</span>
                <span className="voucher-type">Voucher Freeship</span>
                <span className="voucher-type">ADSmart Coin</span>
              </div>
              {/* <button className="save-now-btn btn btn-primary w-100">
                Săn ngay
              </button> */}
            </div>

            {/* Sale Banner */}
            <div className="small-banner sale-banner ">
              <div className="sale-header text-center">
                <div className="sale-title mb-2">
                  <h2 className="d-inline-block me-4">12.12</h2>
                  <span className="countdown">CÒN 5 NGÀY</span>
                </div>
                <h1 className="mb-3">X4 ƯU ĐÃI</h1>
                <p className="sale-subtitle">
                  TIẾT KIỆM 4 LẦN TRONG 1 ĐƠN HÀNG
                </p>
              </div>
              <div className="sale-offers d-flex flex-column gap-2">
                {/* <div className="offer">FREESHIP 0Đ</div> */}
                {/* <div className="offer">THU THẬP VOUCHER HOÀN XU ĐẾN 1,2 TRIỆU</div> */}
                {/* <div className="offer">LẤY MÃ FREESHIP ĐẾN 99K</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdBanner;
