/** @format */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/BestSell.css";
import NewProductImg from "../../img/newProduct.png";
import AltProductImg1 from "../../img/altProductImg1.png";
import AltProductImg2 from "../../img/altProductImg2.png";

const products = [
  {
    id: 1,
    discount: "21%",
    badge: "COLD SALE",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 4,
  },
  {
    id: 2,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 5,
  },
  {
    id: 3,
    discount: "21%",
    badge: "COLD SALE",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 2,
  },
  {
    id: 4,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 3,
  },
  {
    id: 1,
    discount: "21%",
    badge: "COLD SALE",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 4,
  },
  {
    id: 2,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 5,
  },
  {
    id: 3,
    discount: "21%",
    badge: "COLD SALE",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 2,
  },
  {
    id: 4,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 3,
  },
  {
    id: 4,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 3,
  },
  {
    id: 4,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 3,
  },
  {
    id: 4,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 3,
  },
  {
    id: 4,
    discount: "59%",
    badge: "ORGANIC",
    title: "Cantaloupe Melon Fresh Organic Cut",
    price: "₫ 120.400",
    originalPrice: "₫ 160.780",
    imageUrl: NewProductImg,
    altImages: [AltProductImg1, AltProductImg2],
    rating: 3,
  },
  // Thêm các sản phẩm khác nếu cần thiết
];

const BestSell = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;

    if (hoveredProduct !== null && products[hoveredProduct].altImages) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex >= products[hoveredProduct].altImages.length - 1
            ? 0
            : prevIndex + 1
        );
      }, 1000);
    } else {
      setCurrentImageIndex(0); // Reset về ảnh ban đầu khi không còn hover
    }

    return () => clearInterval(interval);
  }, [hoveredProduct]);

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-1'>
        <h4 className='mb-0'>
          Hàng mới về{" "}
          <span className='text-muted'>
            - Đừng bỏ lỡ cơ hội giảm giá đặc biệt chỉ có trong tuần này.
          </span>
        </h4>
        <a href='#' className='btn view-all-btn'>
          Xem tất cả →
        </a>
      </div>
      <div className='row'>
        {products.map((product, index) => (
          <div key={product.id} className='col-md-2 mb-3'>
            <div className='card product-card h-100'>
              <div className='card-body'>
                <span className='discount-badge'>{product.discount}</span>
                <div className='image-container'>
                  <img
                    src={
                      hoveredProduct === index &&
                      product.altImages &&
                      product.altImages.length > 0
                        ? product.altImages[currentImageIndex]
                        : product.imageUrl
                    }
                    alt={product.title}
                    className='img-fluid product-image mb-3'
                    onMouseEnter={() => setHoveredProduct(index)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  />
                </div>
                <span className='badge bg-success text-uppercase product-badge mb-2'>
                  {product.badge}
                </span>
                <h6 className='product-title mb-2'>{product.title}</h6>
                <div className='rating mt-2'>
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < product.rating ? "star filled" : "star"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className='price mb-0 mt-2'>
                  <strong className='price-new'>{product.price}</strong>
                  <span className='text-muted ms-2 price-old'>
                    <del>{product.originalPrice}</del>
                  </span>
                </p>
                <button className='btn btn-custom-cart btn-sm mt-1 add-to-cart'>
                  Thêm vào giỏ hàng
                  <span className='ms-4'>+</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSell;
