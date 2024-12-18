import React, { useState, useEffect } from "react";
import "./Filter.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import productService from '../../../../services/productService';
import PropTypes from 'prop-types';

const Filter = ({ onFilterChange }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    subcategories: [],
    cities: [],
    minPrice: 0,
    maxPrice: 20000000,
    rating: null,
  });

  const [topSubCategories, setTopSubCategories] = useState([]);

  const formatSales = (sales) => {
    return sales >= 1000 ? `${(sales / 1000).toFixed(0)}k+` : sales;
  };

  useEffect(() => {
    const fetchTopSubCategories = async () => {
      try {
        const response = await productService.getTopSubCategories();
        setTopSubCategories(response);
      } catch (error) {
        console.error('Error fetching top subcategories:', error);
      }
    };
    fetchTopSubCategories();
  }, []);

  const handleCheckboxChange = (section, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [section]: prev[section].includes(value)
          ? prev[section].filter((item) => item !== value)
          : [...prev[section], value],
      };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handlePriceChange = (value) => {
    const roundedFrom = Math.floor(value[0] / 500000) * 500000;
    const roundedTo = Math.ceil(value[1] / 500000) * 500000;
    const updatedFilters = {
      ...selectedFilters,
      minPrice: roundedFrom,
      maxPrice: roundedTo,
    };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    const updatedFilters = {
      ...selectedFilters,
      rating: rating,
    };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      subcategories: [],
      cities: [],
      minPrice: 0,
      maxPrice: 20000000,
      rating: null,
    };
    setSelectedFilters(clearedFilters);
    setSelectedRating(null);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="filter-container">
      <h3>BỘ LỌC TÌM KIẾM</h3>

      <div className="filter-section">
        <h4>Theo Danh Mục</h4>
        {topSubCategories.map((subCategory, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={selectedFilters.subcategories.includes(subCategory.subcategory_name)}
              onChange={() =>
                handleCheckboxChange("subcategories", subCategory.subcategory_name)
              }
            />{" "}
            {subCategory.subcategory_name} ({formatSales(subCategory.total_sales)})
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Nơi Bán</h4>
        <label>
          <input
            type="checkbox"
            checked={selectedFilters.cities.includes("Hồ Chí Minh")}
            onChange={() => handleCheckboxChange("cities", "Hồ Chí Minh")}
          />{" "}
          Hồ Chí Minh
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedFilters.cities.includes("Đà Nẵng")}
            onChange={() => handleCheckboxChange("cities", "Đà Nẵng")}
          />{" "}
          Đà Nẵng
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedFilters.cities.includes("Hà Nội")}
            onChange={() => handleCheckboxChange("cities", "Hà Nội")}
          />{" "}
          Hà Nội
        </label>
      </div>

      <div className="filter-section">
        <h4>Khoảng Giá</h4>
        <Slider
          range
          min={0}
          max={20000000}
          value={[
            selectedFilters.minPrice,
            selectedFilters.maxPrice,
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
            <span> Từ: <b>{selectedFilters.minPrice}</b>₫</span>
            <span> Đến: <b>{selectedFilters.maxPrice}</b>₫</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h4>Đánh Giá</h4>
        <label>
          <input
            type="radio"
            name="rating"
            checked={selectedRating === "5"}
            onChange={() => handleRatingChange("5")}
          />{" "}
          5 sao trở lên
        </label>
        <label>
          <input
            type="radio"
            name="rating"
            checked={selectedRating === "4"}
            onChange={() => handleRatingChange("4")}
          />{" "}
          4 sao trở lên
        </label>
        <label>
          <input
            type="radio"
            name="rating"
            checked={selectedRating === "3"}
            onChange={() => handleRatingChange("3")}
          />{" "}
          3 sao trở lên
        </label>
      </div>

      <button className="clear-button" onClick={handleClearAll}>
        XÓA TẤT CẢ
      </button>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
