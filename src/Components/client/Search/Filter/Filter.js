import React, { useState } from "react";
import "./Filter.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    location: [],
    shipping: [],
    brand: [],
    priceRange: { from: 0, to: 20000000 },
    paymentOptions: [],
    rating: [],
    promotions: [],
  });

  const handleCheckboxChange = (section, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: prev[section].includes(value)
        ? prev[section].filter((item) => item !== value)
        : [...prev[section], value],
    }));
  };

  const handlePriceChange = (value) => {
    // Round the price range to the nearest 500k
    const roundedFrom = Math.floor(value[0] / 500000) * 500000;
    const roundedTo = Math.ceil(value[1] / 500000) * 500000;
    setSelectedFilters((prev) => ({
      ...prev,
      priceRange: { from: roundedFrom, to: roundedTo },
    }));
  };

  const handleApply = () => {
    console.log("Applied filters:", selectedFilters);
  };

  const handleClearAll = () => {
    setSelectedFilters({
      category: [],
      location: [],
      shipping: [],
      brand: [],
      priceRange: { from: 0, to: 20000000 },
      paymentOptions: [],
      rating: [],
      promotions: [],
    });
  };

  return (
    <div className="filter-container">
      <h3>BỘ LỌC TÌM KIẾM</h3>

      <div className="filter-section">
        <h4>Theo Danh Mục</h4>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              handleCheckboxChange("category", "Bánh ngọt/ pastry")
            }
          />{" "}
          Bánh ngọt/ pastry (21k+)
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              handleCheckboxChange("category", "Dụng cụ làm bánh")
            }
          />{" "}
          Dụng cụ làm bánh. (21k+)
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("category", "Thời Trang Nữ")}
          />{" "}
          Thời Trang Nữ (6k+)
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("category", "Nhà Sách Online")}
          />{" "}
          Nhà Sách Online (3k+)
        </label>
      </div>

      <div className="filter-section">
        <h4>Nơi Bán</h4>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("location", "TP. Hồ Chí Minh")}
          />{" "}
          TP. Hồ Chí Minh
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("location", "Đà Nẵng")}
          />{" "}
          Đà Nẵng
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("location", "Hưng Yên")}
          />{" "}
          Hưng Yên
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("location", "Đồng Nai")}
          />{" "}
          Đồng Nai
        </label>
      </div>

      <div className="filter-section">
        <h4>Đơn Vị Vận Chuyển</h4>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("shipping", "Hỏa Tốc")}
          />{" "}
          Hỏa Tốc
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("shipping", "Nhanh")}
          />{" "}
          Nhanh
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("shipping", "Tiết Kiệm")}
          />{" "}
          Tiết Kiệm
        </label>
      </div>

      <div className="filter-section">
        <h4>Thương Hiệu</h4>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("brand", "Tân Huê Viên")}
          />{" "}
          Tân Huê Viên
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("brand", "ORION")}
          />{" "}
          ORION
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("brand", "Richy")}
          />{" "}
          Richy
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("brand", "Bảo Minh")}
          />{" "}
          Bảo Minh
        </label>
      </div>

      <div className="filter-section">
        <h4>Khoảng Giá</h4>
        <Slider
          range
          min={0}
          max={20000000}
          value={[
            selectedFilters.priceRange.from,
            selectedFilters.priceRange.to,
          ]}
          onChange={handlePriceChange}
          marks={{
            0: "₫0",
            5000000: "₫5M",
            10000000: "₫10M",
            15000000: "₫15M",
            20000000: "₫20M",
          }}
        />
        <div className="filter-price">
          <div>
            <span> Từ: <b>{selectedFilters.priceRange.from}</b>₫</span>
            <span> Đến: <b>{selectedFilters.priceRange.to}</b>₫</span>
          </div>
        </div>
      </div>

      {/* <div className="filter-section">
        <h4>Các lựa chọn thanh toán</h4>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              handleCheckboxChange("paymentOptions", "0% TRẢ GÓP")
            }
          />{" "}
          0% TRẢ GÓP
        </label>
      </div> */}

      <div className="filter-section">
        <h4>Đánh Giá</h4>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("rating", "5 sao")}
          />{" "}
          5 sao trở lên
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("rating", "4 sao")}
          />{" "}
          4 sao trở lên
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("rating", "3 sao")}
          />{" "}
          3 sao trở lên
        </label>
      </div>

      <div className="filter-section">
        <h4>Dịch Vụ & Khuyến Mãi</h4>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("promotions", "Voucher Xtra")}
          />{" "}
          Voucher Xtra
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("promotions", "Đang giảm giá")}
          />{" "}
          Đang giảm giá
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("promotions", "Gi Cũng Rẻ")}
          />{" "}
          Gi Cũng Rẻ
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange("promotions", "Hàng có sẵn")}
          />{" "}
          Hàng có sẵn
        </label>
      </div>

      <button className="apply-button" onClick={handleApply}>
        ÁP DỤNG
      </button>
      <button className="clear-button" onClick={handleClearAll}>
        XÓA TẤT CẢ
      </button>
    </div>
  );
};

export default Filter;
