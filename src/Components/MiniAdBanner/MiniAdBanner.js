/** @format */

import React from "react";
import myPhamImage from "../../img/AdBanner.png"; // Update these paths as necessary
import doAnNheImage from "../../img/AdBanner.png";
import chatLuongImage from "../../img/AdBanner.png";
import "./MiniAdBanner.css";

const products = [
  {
    id: 1,
    tag: "Duy nhất tuần này",
    title: "Mỹ phẩm chất lượng với giá cả phải chăng",
    description: "Eat one every day",
    imageUrl: myPhamImage,
    buttonLabel: "Mua ngay →",
  },
  {
    id: 2,
    tag: "Duy nhất tuần này",
    title: "Đồ ăn nhẹ nuôi dưỡng tâm trí và cơ thể của bạn",
    description: "Shine the morning...",
    imageUrl: doAnNheImage,
    buttonLabel: "Mua ngay →",
  },
  {
    id: 3,
    tag: "Duy nhất tuần này",
    title: "Chất lượng, giá cả không giải sách bằng",
    description: "Chỉ tuần này thôi. Đừng bỏ lỡ...",
    imageUrl: chatLuongImage,
    buttonLabel: "Mua ngay →",
  },
  // Include other products as per above pattern
];

const MiniAdBanner = () => {
  return (
    <div className='container mt-1'>
      <div className='row'>
        {products.map((product) => (
          <div key={product.id} className='col-md-4 mb-4'>
            <div className='card h-100'>
              <div className='row g-0'>
                <div className='col-8'>
                  <div className='card-body'>
                    <h6 className='text-tag mb-2'>{product.tag}</h6>
                    <h5 className='card-title'>{product.title}</h5>
                    <p className='card-text'>{product.description}</p>
                    <a href='#' className='btn btn-custom'>
                      {product.buttonLabel}
                    </a>
                  </div>
                </div>
                <div className=' col-4'>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className='img-fluid rounded-end'
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniAdBanner;
