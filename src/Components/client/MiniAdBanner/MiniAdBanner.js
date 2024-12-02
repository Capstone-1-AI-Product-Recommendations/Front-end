/** @format */

import React, { useState, useEffect } from "react";
import "./MiniAdBanner.css";
import products from "../../../data/miniBanner";

const MiniAdBanner = () => {
  const [activeBanner, setActiveBanner] = useState([0, 1, 2]); // Ensure this array starts with valid indices

  useEffect(() => {
    const intervals = activeBanner.map((_, index) =>
      setInterval(() => {
        setActiveBanner((prevActiveBanner) => {
          const updatedBanners = [...prevActiveBanner];
          updatedBanners[index] = (updatedBanners[index] + 1) % products.length; // Rotate indices correctly
          return updatedBanners;
        });
      }, 2000 + index * 1000) // Stagger transitions for each banner
    );

    return () => {
      intervals.forEach((interval) => clearInterval(interval)); // Clear intervals on unmount
    };
  }, []);

// Thêm phần nhóm banner riêng 
const groupProducts = (arr, size) => {
  return arr.reduce((acc, _, index) => {
    if (index % size === 0) acc.push(arr.slice(index, index + size));
    return acc;
  }, []);
};
const groupedProducts = groupProducts(products, 3);
const [activeIndices, setActiveIndices] = useState([0, 0, 0]);

const handleNext = (bannerIndex) => {
  setActiveIndices((prevIndices) =>
    prevIndices.map((idx, i) => (i === bannerIndex ? (idx + 1) % groupedProducts[i].length : idx))
  );
};

const handlePrevious = (bannerIndex) => {
  setActiveIndices((prevIndices) =>
    prevIndices.map((idx, i) => (i === bannerIndex ? (idx - 1 + groupedProducts[i].length) % groupedProducts[i].length : idx))
  );
};

  return (
    <div className="container mt-1">
      <div className="row">
        {activeBanner.map((activeIndex, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="banner-wrapper">
              <button 
                className="nav-button prev-button" 
                onClick={() => handlePrevious(index)}
              >
                ←
              </button>
              <div className="card h-100">
                <div className="row g-0">
                  <div className="col-8">
                    <div className="card-body">
                      <h6 className="text-tag mb-2">{products[activeIndex].tag}</h6>
                      <h5 className="card-title">{products[activeIndex].title}</h5>
                      <p className="card-text">
                        {products[activeIndex].description}
                      </p>
                      <a href="#" className="btn-custom">
                        {products[activeIndex].buttonLabel}
                      </a>
                    </div>
                  </div>
                  <div className="col-4 d-flex justify-content-center align-items-center">
                    <img
                      src={products[activeIndex].imageUrl}
                      alt={products[activeIndex].title}
                      className="img-fluid rounded-end"
                    />
                  </div>
                </div>
              </div>
              <button 
                className="nav-button next-button" 
                onClick={() => handleNext(index)}
              >
                →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniAdBanner;
